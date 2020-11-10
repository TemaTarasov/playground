import { AxiosPromise, AxiosRequestConfig, Method } from 'axios';

export interface RequestProps {
  identity?: string;
  type: Method;
  url?: string;

  setData: SetData;
  setLoading: SetLoading;
}

export interface RequestOptions extends AxiosRequestConfig {
  applyData?: boolean;
  data?: any;
  dataPath?: string;
  identity?: string;
  prefix?: string;
  silent?: boolean;
  single?: boolean;
  suffix?: string;
  url?: string;

  mapper?: (data: any) => any;
}

export type RequestResult = (options?: RequestOptions) => AxiosPromise;

export type HookRequestResult = (type: Method) => RequestResult;
