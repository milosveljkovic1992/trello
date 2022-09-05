import axios from 'axios';
import store from 'store';
import {
  signalLoadingStarted,
  signalLoadingFinished,
} from 'store/loading-slice';

axios.interceptors.request.use(
  function (config) {
    if (store.getState().loading.loadingState !== 'loading') {
      store.dispatch(signalLoadingStarted());
    }
    return config;
  },
  function (error) {
    store.dispatch(signalLoadingFinished());
    return Promise.reject(error);
  },
);

axios.interceptors.response.use(
  function (response) {
    store.dispatch(signalLoadingFinished());
    return response;
  },
  function (error) {
    store.dispatch(signalLoadingFinished());
    return Promise.reject(error);
  },
);
