import './App.scss';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import AppContext from './AppContext.js';
import useApi from './Hooks/useApi.js';
import Header from './Components/Header/Header.jsx';

function App() {
  const api = useApi();

  return (
    <AppContext.Provider value={{ api }}>
      <Router>
        <div className="app">
          <Header />
        </div>
      </Router>
    </AppContext.Provider>
  );
}

export default App;
