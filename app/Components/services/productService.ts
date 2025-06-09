import axios from 'axios';

const API_URL = 'https://fe-psi-nine.vercel.app/';

export const getProducts = async () => {
  const res = await axios.get(API_URL);
  return res.data;
};
