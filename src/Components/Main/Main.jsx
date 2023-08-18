import { useContext, useEffect } from 'react';
import AppContext from '../../AppContext.js';
import Header from '../Header/Header.jsx';

const Main = () => {
  const { api } = useContext(AppContext);

  useEffect(() => {
    api.getUserData();
  }, []);
  return (
    <>
      <Header />
    </>
  );
};

export default Main;
