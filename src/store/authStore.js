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
            this.rol = null
        },
        setUser(user) {
            this.authUser = user
            this.rol = user.rol
        },
        async fetchUser() {
            try {
                const response = await get('/auth/getinfo');
                this.rol = response.data.user.rol
                this.authUser = response.data.user;
            } catch (error) {
                this.authUser = null;
                this.isAuthenticated = false;
                console.log(error)
                throw error
            }
        }
    },
});