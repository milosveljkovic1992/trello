import axios from 'axios';
import store from 'store';
import {
  signalLoadingStarted,
  signalLoadingFinished,
} from 'store/loading-slice';

axios.interceptors.request.use(
  (config) => {
    if (store.getState().loading.loadingState !== 'loading') {
      store.dispatch(signalLoadingStarted());
    }
    return config;
  },
  (error) => {
    store.dispatch(signalLoadingFinished());
    return Promise.reject(error);
  },
);

axios.interceptors.response.use(
  (response) => {
    store.dispatch(signalLoadingFinished());
    return response;
  },
  (error) => {
    store.dispatch(signalLoadingFinished());
    return Promise.reject(error);
  },
);
