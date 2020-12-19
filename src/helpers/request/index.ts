import { RequestProps, RequestOptions, RequestResult, HookRequestResult } from './index.d';

import axios, { AxiosError, AxiosResponse } from 'axios';
import { get } from 'lodash';
import { useCallback } from 'react';

export function useRequest(props: Omit<RequestProps, 'type'>): HookRequestResult {
  const { url, identity, setData, setLoading } = props;

  return useCallback(type => Request({ type, url, identity, setData, setLoading }), [
    url,
    identity,
    setData,
    setLoading
  ]);
}

export default function Request(props: RequestProps): RequestResult {
  const { url: __url, identity: __identity, type, setData, setLoading } = props;

  return function (options: RequestOptions = {}) {
    const {
      applyData = type === 'get',
      data,
      dataPath = '',
      identity = __identity,
      prefix,
      silent = type !== 'get',
      single,
      suffix,
      url: _url = __url,

      mapper,
      setData: _setData = setData,
      setLoading: _setLoading = setLoading,

      ...rest
    } = options;

    const url = `/${prefix ? prefix : ''}/${_url}/${suffix ? suffix : ''}`.replace(/\/+/g, '/').replace(/\/$/g, '');
    const marker: any = `${identity}:${type}:${url}`;

    if (single && identity) {
      if (window[marker]) {
        // @ts-ignore
        window[marker]('request canceled');
      }

      rest.cancelToken = new axios.CancelToken(c => {
        // @ts-ignore
        window[marker] = c;
      });
    }

    if (!silent) {
      _setLoading(true);
    }

    // @ts-ignore
    return axios[type](url, ['get', 'delete'].includes(type) ? { data, ...rest } : data, rest)
      .then(({ data }: AxiosResponse) => {
        delete window[marker];

        const result = mapper ? mapper(data) : get(data, dataPath, data);

        if (applyData) {
          _setData(result);
        }

        if (!silent) {
          _setLoading(false);
        }

        return result;
      })
      .catch((err: AxiosError) => {
        if (axios.isCancel(err)) {
          return Promise.reject(undefined);
        }

        delete window[marker];

        if (!silent) {
          _setLoading(false);
        }

        return Promise.reject(err);
      });
  };
}
