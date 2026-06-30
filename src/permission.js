import router from './router'
// import { useUserStore } from '@/store/user'
// const userStore = useUserStore()
import { getOAuthUrl, wxlogin, testlogin } from './wx-auth'

router.beforeEach(async(to, from, next) => {
    let tokenKey = import.meta.env.VITE_APP_TOKEN || 'token'
    let token = localStorage.getItem(tokenKey)
    const code = to.query.code

    console.log('to', to, from)
    console.log('token', token)
    console.log('code', code)
    
    if (token) next()
    else if (import.meta.env.DEV) {
        // await testlogin()
        next()
    }
    else if (!code) window.location.replace(getOAuthUrl())
    else if (code) {
        await wxlogin(code)
        if (to.path === '/500') next({ name: 'Root' })
        next()
    }
    else next()
})