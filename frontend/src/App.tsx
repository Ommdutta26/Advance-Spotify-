import { Routes, Route } from 'react-router-dom';
import HomePage from './Pages/HomePage';
import AuthCallBackPage from './Pages/AuthCallBackPage';
import MainLayout from './Layout/MainLayout';
import { AuthenticateWithRedirectCallback } from '@clerk/clerk-react';
import ChatPage from './Pages/ChatPage';
import AlbumPage from './Pages/AlbumPage';
import AdminPage from './Pages/AdminPage';
import GenerateMusic from './components/ui/GenerateMusic';

const App = () => {
  return (
    <>
      <Routes>
        <Route
          path="/sso-callback"
          element={<AuthenticateWithRedirectCallback signUpForceRedirectUrl="/auth-callback" />}
        />
        <Route path="/auth-callback" element={<AuthCallBackPage />} />
        <Route path='/admin' element={<AdminPage/>}/>
        <Route path='/generate-music' element={<GenerateMusic/>}/>
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/chat" element={<ChatPage />} />
          <Route path='/albums/:albumId' element={<AlbumPage/>}/>
        </Route>
      </Routes>
    </>
  );
};

export default App;
