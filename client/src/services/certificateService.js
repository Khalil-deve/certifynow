// certificateService.js

import axios from 'axios';

export const getCertificateById = (id) => {
  return axios.get(`http://localhost:5000/api/certificates/${id}`);
};

export const getAllCertificates = () => {
  return axios.get('http://localhost:5000/api/certificates');
};

export const createCertificate = (data) => {
  return axios.post('http://localhost:5000/api/certificates', data);
};
