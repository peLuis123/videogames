import { get } from './apiConnection'
export const User = {
    getUsers: () => get(`/user`), 
}