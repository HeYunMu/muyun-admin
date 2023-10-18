import { cloneDeep } from 'lodash-es'
import { reactive } from 'vue'

function foramtColumns(columns) {
  if (columns.length <= 0) {
    return [{}, {}]
  }
  const field = columns
  const _form = {}
  const _form_options = {}
  for (const key in field) {
    const formProp = field[key].prop
    if (field[key].search === 'date') {
      _form[`${formProp}Between`] = []
    } else {
      _form[`${formProp}`] = ''
    }
    if (field[key].formatValue) {
      const _ = []
      for (const [_key, _value] of Object.entries(field[key].formatValue)) {
        _.push({
          value: _key,
          label: _value
        })
      }
      _form_options[formProp] = _
    }
  }
  return [_form, _form_options]
}

export default function ({ columns = [], config = {} }) {
  const search = reactive({
    form: {},
    last: {},
    option: {},
    columns: columns,
    showMore: false,
    /** 是否显示更多按钮哇 */
    moreButtonShowed: false,
    ...config
  })

  ;[search.form, search.option] = foramtColumns(columns)
  search.last = search.form;
  // 点击搜索
  function doSearch() {
    call.search && call.search(search.form)
  }

  // 点击重置
  function doCancel() {
    for (const key in search.form) {
      search.form[key] = ''
    }
    call.cancel && call.cancel(search.form)
  }

  // 显示更多
  function doMore() {
    search.showMore = !search.showMore
  }

  /** 格式化搜索数据 */
  const formatSearchData = (/**数据内容*/ __) => {
    const _ = cloneDeep(__);
    for (const key in _) {
      if (Array.isArray(_[key]) && _[key].length > 0) {
        // console.log(_[key].join())
        _[key] = _[key].join();
      }
    }
    return _;
  };

  // 点击回调
  const call = reactive({
    search: () => {},
    cancel: () => {}
  })

  return {
    search,
    doSearch,
    doCancel,
    doMore,
    formatSearchData,
    call
  }
}
