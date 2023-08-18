import axios from 'axios';
import { useState, useEffect } from 'react';

const { NODE_ENV } = process.env;

const useApi = () => {
  const [token, setToken] = useState('');
  const [userData, setUserData] = useState({});

  const baseUrl =
    NODE_ENV === 'production'
      ? 'https://api.kiriushkin.pro/croddis-api'
      : 'http://192.168.31.3:3000';

  const readToken = () => {
    const token = localStorage.getItem('token');

    setToken(token);
    return token;
  };

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

    return true;
  };

  const getUserData = async (steamid = null) => {
    if (steamid) return await getUserBySteamid(steamid);

    const token = readToken();

    if (!token) return;

    try {
      const resp = await axios.get(baseUrl + '/users/me', {
        headers: { Authorization: `Bearer ${token}` },
      });

      setUserData(resp.data);

      return resp.data;
    } catch (error) {
      if (error.response.status === 401) await logout();
    }
  };

  const getUserBySteamid = async (steamid) => {
    try {
      const resp = await axios.get(baseUrl + '/users/' + steamid);

      return resp.data;
    } catch (error) {
      if (error.response.status === 404) return null;
    }
  };

  const getAllUsers = async () => {
    const resp = await axios.get(baseUrl + '/users');

    return resp.data;
  };

  const updateUser = async (id, data) => {
    const token = readToken();

    if (!token) return;

    try {
      const resp = await axios.patch(baseUrl + '/users/' + id, data, {
        headers: { Authorization: `Bearer ${token}` },
      });
    } catch (error) {
      if (error.response.status === 404) return null;
    }
  };

  const logout = async () => {
    localStorage.removeItem('token');
    setToken('');
  };

  return {
    token,
    userData,
    getAuthUrl,
    auth,
    logout,
    getUserData,
    getAllUsers,
    updateUser,
  };
};

export default useApi;
