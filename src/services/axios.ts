import axios, { AxiosInstance, AxiosResponse, AxiosError } from 'axios';
import { AuthStorageService } from './auth-storage';

const authStorageService = new AuthStorageService();

export class AxiosService {
  axiosInstance: AxiosInstance;

  constructor() {
    // Init axiosInstance
    this.axiosInstance = axios.create({
      baseURL: process.env.REACT_APP_API_URL,
      // Common header
      headers: {
        'Content-Type': 'application/json',
      },
    });
    this._setInterceptors();
  }

  createURL(uri: (string | object)[]) {
    let paramsUrl: any;
    if (typeof uri[uri.length - 1] !== 'string') {
      paramsUrl = uri.pop();
      let url = uri.join('/');
      Object.keys(paramsUrl).forEach((x) => {
        url = url.replace(`:${x}`, paramsUrl[x]);
      });
      return url;
    } else {
      return uri.join('/');
    }
  }

  get(uri: (string | object)[], params = {}, moreConfigs = {}) {
    return new Promise((resolve, reject) => {
      const request = this.axiosInstance.get(this.createURL(uri), {
        params,
        ...moreConfigs,
      });
      this._handleRespond(request, resolve, reject);
    });
  }

  post(uri: (string | object)[], data = {}, moreConfigs = {}) {
    return new Promise((resolve, reject) => {
      const request = this.axiosInstance.post(
        this.createURL(uri),
        data,
        moreConfigs
      );
      this._handleRespond(request, resolve, reject);
    });
  }

  private _handleRespond(request: any, resolve: any, reject: any) {
    return request
      .then((resp: AxiosResponse) => {
        resolve(resp.data);
      })
      .catch((err: any) => {
        reject(err);
      });
  }

  private _setInterceptors() {
    this.axiosInstance.interceptors.request.use((request) => {
      if (authStorageService.token) {
        Object.assign(request.headers, {
          Authorization: authStorageService.token,
        });
      }
      return request;
    });
    this.axiosInstance.interceptors.response.use(
      (response: AxiosResponse) => response,
      (error: AxiosError) => this._handleError(error)
    );
  }

  private async _handleError(error: AxiosError) {
    if (error.isAxiosError && error.response) {
      // Axios error
      return Promise.reject({
        data: error.response.data,
      });
    } else {
      // Default | Network errors | CORS | ...
      return Promise.reject({});
    }
  }
}
