import { createStore } from 'vuex'
import router from './router'
import api from './api'

const store = createStore({
    state() {
        return {
            user: {},
        }
    },
    mutations: {
        updateUser(state, userData) {
            state.user = userData
        },
    },
    actions: {
        async isAuthenticated(context) {
            try {
                let user = (await api().get('/auth/me' , {withCredentials : true})).data
                context.commit('updateUser', user)
            }
            catch (e) {
                context.commit('updateUser' , null)
            }
        },
        async redirectUser(context) {
            await store.dispatch('isAuthenticated')
            if (!context.state.user) {
                router.push('/')
            }
        }
    }
})

store.dispatch('isAuthenticated')

export default store