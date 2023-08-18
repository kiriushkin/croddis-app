import './App.scss';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AppContext from './AppContext.js';
import useApi from './Hooks/useApi.js';
import Main from './Components/Main/Main.jsx';
import Auth from './Components/Auth/Auth.jsx';

function App() {
  const api = useApi();

  return (
    <AppContext.Provider value={{ api }}>
      <Router>
        <div className="app">
          <Routes>
            <Route path="/auth" Component={Auth} />
            <Route path="/" Component={Main} />
          </Routes>
        </div>
      </Router>
    </AppContext.Provider>
  );
}

export default App;
