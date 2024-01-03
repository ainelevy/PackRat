// export const api = "http://add your ip address";

import { NODE_ENV, API_URL } from '@env';
let api = 'https://packrat.onrender.com';
// let api = 'http://localhost:3000/api';

if (NODE_ENV === 'production') {
  api = API_URL;
} else {
  // api = 'http://localhost:3000/api';
  // api = 'https://packrat-dev-qj5h.onrender.com/api';
  api = 'https://packrat.onrender.com';
}

export { api };
