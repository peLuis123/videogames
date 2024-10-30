import { get, post } from './apiConnection'
export const Subs = {
    getSubs: () => get(`/sub`),
    asignSub: (data) => post(`/sub/assign`,data),
    deleteSub: (data) => post(`/sub/cancelAssign`,data),
}