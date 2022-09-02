import axios from 'axios';
import { API_URL } from 'global/constants';

axios.defaults.baseURL = API_URL;
axios.defaults.headers.post['Accept'] = 'application/json';
axios.defaults.headers.post['Content-Type'] = 'application/json';
