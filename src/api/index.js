import axios from "axios"
// import qs from 'qs'
import { MessagePlugin } from 'tdesign-mobile-vue'
import router from "@/router"
import { throttle, cloneDeep } from 'lodash'
const show_error_msg = throttle(showErrorMsg, 5000, { trailing: false })
const tokenKey = import.meta.env.VITE_APP_TOKEN

const service = axios.create({
    timeout: 5000,
    baseURL: import.meta.env.VITE_APP_FIX + import.meta.env.VITE_APP_BASE_API
})

// 请求拦截
service.interceptors.request.use(res => {
    res.headers.Authorization = localStorage.getItem(tokenKey)
    return res
})

// 响应拦截
service.interceptors.response.use(res => {
    // console.log('code', res.data.code)
    if (res.data.code == 200) return res.data
    else {
        if (res.data.code != 401) show_error_msg(res.data.msg)
        if (res.data.code == 404) router.replace({ path: '/404' })
        else if (res.data.code == 401) {
            localStorage.removeItem(tokenKey)
            window.location.reload()
        }
        return res.data
    }
}, error => {
    console.log(error)
    const isTimeout = error.code === 'ECONNABORTED' && error.message.includes('timeout')

    if (isTimeout) {
      show_error_msg('请求超时，请检查网络后重试')
      return error
    }
})

export default {
    get: (url, params) => {
        let _params = formatReq(params)
        return service.get(url, { params: _params })
    },
    post: (url, data, params) => {
        return service.post(url, data, {
            headers: { 'Content-Type': 'application/json' },
            params
        })
    },
    upload: (url, data) => {
        const formData = new FormData()
            Object.keys(data).forEach((key) => {
            formData.append(key, data[key])
        })
        return service.post(url, formData, { header: { 'Content-Type': 'multipart/form-data' } })
    },
    put: () => {},
}

function showErrorMsg(msg) {
  MessagePlugin.error(msg)
}

function formatReq(req) {
    const _req = cloneDeep(req)
    for (let key in _req) {
        if (Array.isArray(_req[key])) _req[key] = _req[key].join(',')
    }
    return _req
}