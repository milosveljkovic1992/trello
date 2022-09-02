import axios from 'axios';
import store from 'store';
import { updateDone, updatePending } from 'store/loading-slice';

axios.interceptors.request.use(
  function (config) {
    store.dispatch(updatePending());
    return config;
  },
  function (error) {
    store.dispatch(updateDone());
    return Promise.reject(error);
  },
);

axios.interceptors.response.use(
  function (response) {
    store.dispatch(updateDone());
    return response;
  },
  function (error) {
    store.dispatch(updateDone());
    return Promise.reject(error);
  },
);
