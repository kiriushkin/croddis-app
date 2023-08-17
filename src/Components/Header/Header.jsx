import './Header.scss';
import { useContext } from 'react';
import AppContext from '../../AppContext.js';

const Header = () => {
  return (
    <header>
      <LoginButton />
    </header>
  );
};

const LoginButton = () => {
  const { api } = useContext(AppContext);

  const redirect = async () => {
    const url = await api.getAuthUrl();
    window.open(url, '_self');
  };

  return <button onClick={redirect}>Login</button>;
};

export default Header;
