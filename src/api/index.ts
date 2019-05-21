import axios, {AxiosError, AxiosRequestConfig, AxiosResponse} from 'axios';

class ApiError extends Error {
  public readonly code: string;
  public readonly details: any;
  public readonly status: number;

  constructor(error: AxiosError) {
    super('Request Error');

    this.code = 'INTERNAL_ERROR';
    this.details = error.response || error;
    this.status = error.response && error.response.status;

    if (error.response && error.response.data) {
      const {code, message} = error.response.data;
      this.code = code || this.code;
      this.message = message || this.message;
    }

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ApiError);
    }
  }
}

export function setBaseUrl(context: string) {
  axios.defaults.baseURL = context;
}

export function onError(callback: (err: AxiosError) => Promise<any>): number {
  return axios.interceptors.response.use(null, callback);
}

export async function request<TResult>(config: AxiosRequestConfig): Promise<TResult> {
  let response: AxiosResponse<TResult> = null;

  try {
    response = await axios.request<TResult>(config);

    if (response && response.data) {
      return response.data;
    }
  } catch (error) {
    throw new ApiError(error);
  }

  return null;
}

export async function requestData<TResult>(config: AxiosRequestConfig): Promise<TResult> {
  const {data} = await request<{ data: TResult }>(config);
  return data;
}
