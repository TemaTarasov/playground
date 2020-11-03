import { useMemo, useState } from 'react';
import { ServiceProps, ServiceResult, HookServiceResult } from './index.d';

import { Method } from 'axios';

import Request, { useRequest } from '../request';

export function useService(props: Omit<ServiceProps, 'setData' | 'setLoading'>): HookServiceResult {
  const { url, identity } = props;

  const [data, setData] = useState(() => props.data || []);
  const [loading, setLoading] = useState(() => props.loading || false);

  const baseRequest = useRequest({ url, identity, setData, setLoading });

  const getFn = useMemo(() => baseRequest('get'), [baseRequest]);
  const postFn = useMemo(() => baseRequest('post'), [baseRequest]);
  const putFn = useMemo(() => baseRequest('put'), [baseRequest]);
  const deleteFn = useMemo(() => baseRequest('delete'), [baseRequest]);

  return useMemo(
    () => ({
      data,
      setData,
      loading,
      setLoading,

      get: getFn,
      post: postFn,
      put: putFn,
      delete: deleteFn
    }),
    [data, setData, loading, setLoading, getFn, postFn, putFn, deleteFn]
  );
}

export default function Service(props: Omit<ServiceProps, 'data' | 'loading'>): ServiceResult {
  const { url, identity, setData, setLoading } = props;

  const baseRequest = (type: Method) => Request({ type, url, identity, setData, setLoading });

  return {
    setData,
    setLoading,

    get: baseRequest('get'),
    post: baseRequest('post'),
    put: baseRequest('put'),
    delete: baseRequest('delete')
  };
}
