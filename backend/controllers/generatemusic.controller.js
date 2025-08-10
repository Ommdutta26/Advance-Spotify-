
const OPENROUTER_KEY = process.env.OPENROUTER_KEY;

module.exports.generateMusic=async(req, res)=>{
  const {prompt}=req.body;
  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method:"POST",
      headers:{
        Authorization:`Bearer ${OPENROUTER_KEY}`,
        "Content-Type": "application/json",
      },
      body:JSON.stringify({
        model:"openai/gpt-3.5-turbo",
        messages: [{role:"user",content:`Write song lyrics for: ${prompt}`}],
      }),
    });
    const result=await response.json();
    const lyrics=result?.choices?.[0]?.message?.content || "Could not generate lyrics.";
    res.json({lyrics});
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to generate lyrics" });
  }
};

module.exports.singMusic=async(req, res)=>{
  const { lyrics } = req.body;
  console.log("Lyrics received:", lyrics);
  try {
    const dummyAudioUrl="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3";
    res.json({audioUrl:dummyAudioUrl});
  } catch (error) {
    console.error("Error returning dummy audio:",error);
    res.status(500).json({error:"Failed to return dummy audio"});
  }
};
