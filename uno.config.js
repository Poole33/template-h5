// uno.config.ts
import { defineConfig, presetAttributify, presetUno, presetMini, presetIcons } from 'unocss'

import presetRemToPx from '@unocss/preset-rem-to-px'

export default defineConfig({
    // ...UnoCSS options
    presets: [
        presetUno(),
        presetAttributify(),
        presetIcons(),
        presetRemToPx({
            // 这里为什么要设置基础字体大小？看下面这篇文章
            // https://juejin.cn/post/7262975395620618298
            // baseFontSize: 4,
        }),
        presetMini()
    ]
})