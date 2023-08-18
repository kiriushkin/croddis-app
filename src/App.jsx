import './App.scss';
import { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import AppContext from './AppContext.js';
import useApi from './Hooks/useApi.js';
import Main from './Components/Main/Main.jsx';
import Profile from './Components/Profile/Profile.jsx';
import Auth from './Components/Auth/Auth.jsx';
import wFavIcon from './Icons/white/favicon.ico';
import bFavIcon from './Icons/black/favicon.ico';

function App() {
  const [systemTheme, setSystemTheme] = useState('light');
  const api = useApi();

  useEffect(() => {
    if (
      window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches
    )
      setSystemTheme('dark');

    window
      ?.matchMedia('(prefers-color-scheme: dark)')
      .addEventListener('change', (e) => {
        setSystemTheme(e.matches ? 'dark' : 'light');
      });
  }, []);

  useEffect(() => {
    const el = document.querySelector('link[rel~="icon"]');

    el.href = systemTheme === 'dark' ? wFavIcon : bFavIcon;
  }, [systemTheme]);

  return (
    <AppContext.Provider value={{ api }}>
      <Router>
        <div className="app">
          <Routes>
            <Route path="/auth" element={<Auth />} />
            <Route path="/user/:steamid" element={<Profile />} />
            <Route path="/" element={<Main />} />
            <Route path="*" element={<Navigate to="/" replace={true} />} />
          </Routes>
        </div>
      </Router>
    </AppContext.Provider>
  );
}

export default App;
