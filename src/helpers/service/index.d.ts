import { RequestResult } from '../request/index.d';

export type SetData = (data: any) => void;
export type SetLoading = (loading: boolean) => void;

export interface ServiceProps {
  data?: any;
  identity?: any;
  loading?: boolean;
  url?: string;

  setData: SetData;
  setLoading: SetLoading;
}

declare function Service(props: ServiceProps): ServiceResult;

export interface ServiceResult {
  get: RequestResult;
  post: RequestResult;
  put: RequestResult;
  delete: RequestResult;

  setData?: SetData;
  setLoading?: SetLoading;
}

export interface HookServiceResult extends ServiceResult {
  data?: any;
  loading: boolean;
}
