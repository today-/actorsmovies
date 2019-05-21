import {request} from './';

export interface ILoginRequest {
  email: string;
  password: string;
}

export interface IRegisterRequest {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

export interface IProfileRequest {
  name: string;
  email: string;
}

export interface IUser {
  id: number;
  email: string;
  name: string;
  photo_url?: string;
}

export function fetchLogin(params: ILoginRequest) {
  return request<void>({
    method: 'post',
    url: '/login',
    data: params
  });
}

export function fetchLogout() {
  return request<void>({
    method: 'post',
    url: '/logout'
  });
}

export function fetchUser() {
  return request<IUser>({
    method: 'get',
    url: '/user'
  });
}

export function fetchRegister(params: IRegisterRequest) {
  return request<IUser>({
    method: 'post',
    url: '/register',
    data: params
  });
}

export function fetchProfile(params: IProfileRequest) {
  return request<IUser>({
    method: 'patch',
    url: '/settings/profile',
    data: params
  });
}
