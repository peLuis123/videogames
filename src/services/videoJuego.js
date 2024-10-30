import { get, post, patch, destroy } from './apiConnection'
export const Game = {
    addGame: (data) => post(`/game/add`, data),
    editGame: ({ id, data }) => patch(`/game/update/${id}`, data),
    deleteGame: (id) => destroy(`/game/delete/${id}`),
    getGames: () => get('/game'),
}