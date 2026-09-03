import { ref } from 'vue'

/**
 * 通用分页列表。
 *
 * @param {(params: Record<string, unknown>) => Promise<unknown>} request 请求函数
 * @param {object} options 配置项
 * @param {Record<string, unknown> | import('vue').Ref<Record<string, unknown>>} [options.defaultParams] 初始查询参数
 * @param {object} [options.pageKeys] 页码字段名，用来定义 分页 中对应的字段别名。默认 page: 'current', pageSize: 'pageSize'
 * @param {object} [options.pagination] 默认分页信息，默认 page: 1, pageSize: 10
 * @param {boolean} [options.immediate] 是否创建时自动加载第一页，默认 true
 * @param {(response: unknown) => unknown[]} [options.getResult] 从响应中取列表数据
 * @param {(params: Record<string, unknown>) => Record<string, unknown>} [options.formatParams] 请求前转换参数
 */
export default function usePagination(request, options = {}) {
  if (typeof request !== 'function')
    throw new TypeError('usePagination 的第一个参数必须是请求函数')

  const {
    defaultParams = {},
    pageKeys = { page: 'current', pageSize: 'pageSize' },
    pagination = { page: 1, pageSize: 10 },
    immediate = true,
    getResult = response => Array.isArray(response?.data) ? response.data : response?.data?.records ?? [],
    formatParams = params => params,
  } = options

  let params = _initParams(defaultParams)
  const list = ref([])
  const loading = ref(false)
  const refreshing = ref(false)
  const hasMore = ref(true)

  function load() {
    if (!hasMore.value)
      return Promise.resolve(undefined)

    return _request(params[pageKeys.page], false)
  }

  function refresh() {
    return _request(pagination.page, true)
  }

  async function _request(page, refresh) {
    if (loading.value || refreshing.value)
      return undefined

    const req = { ...params, [pageKeys.page]: page }

    if (refresh)
      refreshing.value = true
    else
      loading.value = true

    try {
      const response = await request(formatParams({ ...req }))

      const data = getResult(response)
      const _data = Array.isArray(data) ? data : []
      const newList = refresh ? _data : [...list.value, ..._data]

      // 成功后再移动游标；失败重试时仍会请求同一页。
      params[pageKeys.page] = page + 1
      list.value = newList
      hasMore.value = _data.length >= req[pageKeys.pageSize]

      return response
    }
    catch (err) {
      return err
    }
    finally {
      loading.value = false
      refreshing.value = false
    }
  }

  function reset(newParams = { ...defaultParams }) {
    params = _initParams(newParams)
    list.value = []
    hasMore.value = true
    loading.value = false
    refreshing.value = false
  }

  function updateParams(newParams) {
    reset({ ...params, ...newParams })
  }

  function _initParams(params) {
    return {
      ...params,
      [pageKeys.page]: pagination.page,
      [pageKeys.pageSize]: pagination.pageSize,
    }
  }

  if (immediate)
    refresh()

  return {
    list,
    hasMore,
    loading,
    refreshing,
    load,
    refresh,
    reset,
    updateParams,
  }
}
