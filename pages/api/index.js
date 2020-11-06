import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.airtable.com/v0/appzbWSyUGrDmyr4A',
  headers: {
    'Content-type': 'application/json',
  },
});
export default api;
// export default axios.create({
//   baseURL: 'https://api.airtable.com/v0/appzbWSyUGrDmyr4A',
//   headers: {
//     'Content-type': 'application/json',
//   },
// });
