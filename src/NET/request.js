import axios from "axios";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import { serverUrl, getToken } from "./tools";

const instance = axios.create({
  baseURL: serverUrl,
  timeout: 2000,
});

/**
 * 网络请求以及响应拦截
 */
instance.interceptors.request.use(
  function (config) {
    NProgress.start();
    config.headers.token = getToken();
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);
instance.interceptors.response.use(
  function (response) {
    NProgress.done();
    return response;
  },
  function (error) {
    NProgress.done();
    return Promise.reject(error);
  }
);

// get请求
export const get = (url, params) => instance.get(url, { params });

// post请求
export const post = (url, data) => instance.post(url, data);

// put请求
export const put = (url, data) => instance.put(url, data);

// del请求
export const del = (url) => instance.delete(url);
