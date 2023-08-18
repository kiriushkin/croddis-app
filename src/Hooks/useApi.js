import axios from 'axios';
import { useState, useEffect } from 'react';

const { NODE_ENV } = process.env;

const useApi = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState('');
  const [userData, setUserData] = useState({});

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
      setToken(token);
    }
  }, []);

  const baseUrl =
    NODE_ENV === 'production'
      ? 'https://api.kiriushkin.pro/croddis-api'
      : 'http://192.168.31.3:3000';

  const getAuthUrl = async () => {
    const resp = await axios.get(baseUrl + '/auth/link');

    return resp.data;
  };

  const auth = async (search) => {
    const resp = await axios.get(baseUrl + '/auth/request' + search);

    const { access_token: token } = resp.data;

    if (!token) return;

    localStorage.setItem('token', token);

    setToken(token);
    setIsLoggedIn(true);

    return true;
  };

  const getUserData = async () => {
    const resp = await axios.get(baseUrl + '/users', {
      headers: { Authorization: `Bearer ${token}` },
    });

    setUserData(resp.data);

    return true;
  };

  const logout = async () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    setToken('');
  };

  return { isLoggedIn, userData, getAuthUrl, auth, logout, getUserData };
};

export default useApi;
