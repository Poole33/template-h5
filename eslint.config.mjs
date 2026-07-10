import antfu from '@antfu/eslint-config'

export default antfu({
  // Vue 项目打开；非 Vue 可以删掉
  vue: true,

  // React 项目才打开
  // react: true,

  // 如果用了 UnoCSS 才打开
  // unocss: true,

  formatters: {
    css: true,
    html: true,
  },

  rules: {
    // 允许无用的return语句
    'no-useless-return': 'off',
    // 允许使用console
    'no-console': 'off',
    // 允许未使用的变量
    'no-unused-vars': 'off',
    // 允许Vue中未使用的ref变量
    'vue/no-unused-refs': 'off',
    // 允许未使用的导入变量
    'unused-imports/no-unused-vars': 'off',
    // 允许无限制使用eslint-disable注释
    'eslint-comments/no-unlimited-disable': 'off',
    // 关闭JSDoc参数名称检查
    'jsdoc/check-param-names': 'off',
    // 关闭JSDoc返回值描述要求
    'jsdoc/require-returns-description': 'off',
    // 允许空对象类型
    'ts/no-empty-object-type': 'off',
    // 允许扩展原生对象原型
    'no-extend-native': 'off',
    // 允许使用 ==
    'eqeqeq': 'on',
    // vue SFC 调换顺序改这里
    'vue/block-order': ['error', {
      order: [['script', 'template'], 'style'],
    }],
    'style/max-statements-per-line': 'off',
  },
})
