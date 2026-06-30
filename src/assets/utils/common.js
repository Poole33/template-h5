
// 获取区间内的随机数，前开后闭
export function getRandom(min, max) {
    return Math.floor(Math.random() * (max-min)) + min
}
