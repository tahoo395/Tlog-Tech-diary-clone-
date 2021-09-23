import { createStore } from 'vuex'
import router from './router'
import api from './api'

const store = createStore({
    state() {
        return {
            user: {},
            blogs: [],
            loading: true,
        }
    },
    mutations: {
        updateUser(state, userData) {
            state.user = userData
        },
        loading(state, status) {
            state.loading = status
        },
        addBlogs(state, blogData) {
            state.blogs.push(...blogData)
        },
        deleteBlog(state, index) {
            state.blogs.splice(index, 1)
        }
    },
    actions: {
        async isAuthenticated(context) {
            try {
                let user = (await api().get('/auth/me', { withCredentials: true })).data
                context.commit('updateUser', user)
            }
            catch (e) {
                context.commit('updateUser', '')
            }
        },
        async redirectUser(context) {
            await store.dispatch('isAuthenticated')
            if (!context.state.user) {
                router.push('/')
            }
        },
        async getBlogs(context, pageNo) {
            context.commit('loading', true)
            let blogs = await api().get(`/blogs/${pageNo}`);
            if (blogs) {
                context.commit('addBlogs', blogs.data);
            }
            context.commit('loading', false)
        },
        async getBlog(context, { user, blog, edit = false }) {
            return (await api().get(
                `/blogs/blog/${edit ? 'edit/' : ''}${user}/${blog}`
            )).data
        },
        async postBlog(context, { blog, blogTitle, blogCover, tags, blogId = "", edit = false }) {
            let blogData = await api().post("/blogs/" + (edit ? "blog/edit/" + `${context.state.user.username}/${blogTitle}_${blogId}` : 'newBlog'), {
                blog, blogTitle, blogCover, tags,
            })

            return blogData.data
        },
        async deleteBlog(context, { user, blog, index }) {
            await api().delete(`blogs/blog/delete/${user}/${blog}`)

            context.commit('deleteBlog', index)
        }
    }
})

store.dispatch('isAuthenticated')

export default store