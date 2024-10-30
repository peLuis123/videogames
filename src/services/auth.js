import { get, post } from './apiConnection'
export const Auth = {
    Login: ({ data }) => post(`/auth/login`, data), 
    GetInfo: () => get('/auth/getinfo'),
    Logout: () => get('/auth/logout'),
    Register: ({ data }) => post('/auth/register', data)
}