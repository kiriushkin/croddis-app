import axios from 'axios';

const { NODE_ENV } = process.env;

const useApi = () => {
  const baseUrl =
    NODE_ENV === 'production'
      ? 'https://api.kiriushkin.pro/croddis-api'
      : 'http://192.168.31.3:3000';

  const getAuthUrl = async () => {
    const resp = await axios.get(baseUrl + '/auth/link');

    return resp.data;
  };

  return { getAuthUrl };
};

export default useApi;
