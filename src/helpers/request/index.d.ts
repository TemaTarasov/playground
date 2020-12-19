import { AxiosPromise, AxiosRequestConfig, Method } from 'axios';

export type SetData = (data: any) => void;
export type SetLoading = (loading: boolean) => void;

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

  setData?: SetData;
  setLoading?: SetLoading;
}

export type RequestResult = (options?: RequestOptions) => AxiosPromise;

export type HookRequestResult = (type: Method) => RequestResult;
