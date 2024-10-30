import { defineStore } from 'pinia';
import { get } from '@/services/apiConnection'
export const useAuthStore = defineStore('auth', {
    state: () => ({
        authUser: null,
        rol: null
    }),
    getters: {
        isAuthenticated: (state) => !!state.authUser
    },
    actions: {

        async logout() {
            this.isAuthenticated = false;
            this.user = null;
        },
        setUser(user) {
            this.authUser = user
        },
        async fetchUser() {
            try {
                const response = await get('/auth/getinfo');
                console.log(response.data.user)
                this.rol = response.data.user.rol
                this.authUser = response.data.user;
            } catch (error) {
                this.authUser = null;
                console.log(error)
                throw error
            }
        }
    },
});