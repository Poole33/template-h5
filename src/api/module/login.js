import request from '@/api/index'

export function login(req) {
    return request.post('/user/login',  req || { username: 'sunqr36267', password: '123456' })
}

export function loginwecom(req) {
    return request.post('/user/wecom', req)
}
