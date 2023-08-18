import { useContext, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import AppContext from '../../AppContext.js';

const Auth = () => {
  const { api } = useContext(AppContext);
  const { search } = useLocation();
  const navigate = useNavigate();

  const auth = async () => {
    await api.auth(search);

    navigate('/');
  };

  useEffect(() => {
    auth();
  }, []);

  return <>Выполняется вход</>;
};

export default Auth;
