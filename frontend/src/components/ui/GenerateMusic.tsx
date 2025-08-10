import { useState, useRef, useEffect } from "react";
import { Music4Icon, HomeIcon, Mic2Icon } from "lucide-react";
import { Link } from "react-router-dom";
import { axiosInstance } from "@/lib/axios";
const GenerateMusic = () => {
  const [prompt, setPrompt] = useState("");
  const [lyrics, setLyrics] = useState("");
  const [audioUrl, setAudioUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const generateLyrics = async () => {
    try {
      setLoading(true);
      const { data } = await axiosInstance.post("/generate-lyrics", { prompt });
      setLyrics(data.lyrics);
    } catch (error) {
      console.error(error);
      alert("Failed to generate lyrics");
    } finally {
      setLoading(false);
    }
  };

  const singLyrics = async () => {
    try {
      setLoading(true);
      const { data } = await axiosInstance.post("/sing", { lyrics });
      setAudioUrl(data.audioUrl);
    } catch (error) {
      console.error(error);
      alert("Failed to generate audio");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.addEventListener("play", () => setIsPlaying(true));
      audioRef.current.addEventListener("pause", () => setIsPlaying(false));
    }
  }, [audioUrl]);

  return (
    <div className="flex min-h-screen bg-gradient-to-b from-zinc-900 via-zinc-800 to-black text-white">
      {/* Sidebar */}
      <div className="hidden md:flex flex-col w-60 bg-zinc-900 p-6 space-y-6">
        <Link to="/" className="flex items-center gap-2 text-xl font-bold hover:text-green-500">
          <HomeIcon /> Home
        </Link>
        <Link to="/generate-music" className="flex items-center gap-2 text-xl font-bold text-green-500">
          <Music4Icon /> Generate Music
        </Link>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        <header className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Music4Icon className="text-green-500" /> Generate Your Own Music
          </h1>
        </header>

        <textarea
          className="w-full bg-zinc-800 text-white rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-green-500 resize-none h-32 mb-4"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Describe your music idea (e.g., 'A happy summer vibe with love theme')..."
        />

        <button
          className="bg-green-500 hover:bg-green-600 text-black font-semibold px-6 py-3 rounded-full transition-colors mr-2"
          onClick={generateLyrics}
          disabled={loading}
        >
          {loading ? "Generating..." : "Generate Lyrics"}
        </button>

        {lyrics && (
          <>
            <h2 className="text-xl font-semibold mt-8 mb-2">Lyrics</h2>
            <div className="bg-zinc-800 rounded-lg p-4 whitespace-pre-wrap">
              {lyrics}
            </div>
            <button
              className="mt-4 bg-green-500 hover:bg-green-600 text-black font-semibold px-6 py-3 rounded-full transition-colors flex items-center gap-2"
              onClick={singLyrics}
              disabled={loading}
            >
              <Mic2Icon />
              {loading ? "Singing..." : "Sing It"}
            </button>
          </>
        )}

        {audioUrl && (
          <div className="mt-6 flex flex-col items-center gap-4">
           <audio ref={audioRef} controls className="w-full max-w-md">
  <source src={audioUrl} type="audio/wav" />
</audio>
            {isPlaying && (
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div
                    key={i}
                    className="w-1 bg-green-500 animate-bounce"
                    style={{ height: `${10 + i * 5}px`, animationDelay: `${i * 0.1}s` }}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default GenerateMusic;
