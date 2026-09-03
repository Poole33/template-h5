// import { useUserStoreWithout } from '@/store/modules/user'
import { login, loginwecom } from '@/api/module/login'

export async function wxlogin(code) {
  const tokenKey = import.meta.env.VITE_APP_TOKEN

  const res = await loginwecom({ code })

  localStorage.setItem(tokenKey, res.data.token)
}

export async function testlogin() {
  const tokenKey = import.meta.env.VITE_APP_TOKEN

  const res = await login()

  localStorage.setItem(tokenKey, res.data.token)
}

export function getOAuthUrl() {
  const appId = import.meta.env.VITE_WX_APP_ID
  const agentId = import.meta.env.VITE_WX_AGENT_ID
  const fix = import.meta.env.VITE_APP_FIX
  const scope = 'snsapi_base' // 静默授权
  const responseType = 'code'
  const redirectUrl = encodeURIComponent(`${window.location.origin}${fix}`)

  return `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appId}&redirect_uri=${redirectUrl}&response_type=${responseType}&scope=${scope}&agentid=${agentId}#wechat_redirect`
}
