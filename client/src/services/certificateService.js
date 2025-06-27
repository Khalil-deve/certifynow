// certificateService.js

import axios from 'axios';

export const getCertificateById = (id) => {
  return axios.get(`https://certifynow.vercel.app/api/certificates/${id}`);
};

export const getAllCertificates = () => {
  return axios.get('https://certifynow.vercel.app/api/certificates');
};

export const createCertificate = (data) => {
  return axios.post('https://certifynow.vercel.app/api/certificates', data);
};
