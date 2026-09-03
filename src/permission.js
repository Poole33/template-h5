import router from './router'
// import { useUserStore } from '@/store/user'
// const userStore = useUserStore()
import { getOAuthUrl, testlogin, wxlogin } from './wx-auth'

router.beforeEach(async (to, from, next) => {
  let token = localStorage.getItem('token')
  const code = to.query.code

  if (token) {
    next()
  }
  else if (import.meta.env.DEV) {
    // await testlogin()
    next()
  }
  else if (!code) {
    window.location.replace(getOAuthUrl())
  }
  else if (code) {
    await wxlogin(code)
    if (to.path === '/500')
      next({ name: 'Root' })
    next()
  }
  else {
    next()
  }
})
