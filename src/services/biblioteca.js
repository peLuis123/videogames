import { post, get } from './apiConnection'
export const Library = {
    addLibrary: (data) => post(`/library/add`, data),
    getLibrary: () => get(`/library`),
}