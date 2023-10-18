import { NButton, NSpace } from 'naive-ui'
import { h, reactive } from 'vue'

export function useTable() {
  const table = reactive({
    data: [],
    loading: false
  })

  function loadData(_data = []) {
    table.data = _data ?? []
  }

  function options(methods = [], config = {}) {
    if (methods.length > 0) {
      return {
        key: 'option',
        title: '操作',
        width: 200,
        fixed: 'right',
        ...config,
        render: (row) =>
          h(
            NSpace,
            {},
            {
              default: () =>
                methods.map((it) => {
                  return h(
                    NButton,
                    {
                      type: it.type || 'primary',
                      disabled: it.disabled ?? false,
                      onClick: () => {
                        it.onClick(row)
                      },
                      ...(it?.props ?? {})
                    },
                    {
                      default: () => it.label
                    }
                  )
                })
            }
          )
      }
    }
  }

  return {
    table,
    loadData,
    options
  }
}

export function usePage(callback = () => {}) {
  function onChange() {
    callback()
  }
  function onPageSizeChange() {
    callback()
  }

  const pagination = reactive({
    page: 1,
    pageSize: 10,
    showSizePicker: true,
    pageCount: 1,
    pageSizes: [10, 20, 30, 40],
    onChange,
    onPageSizeChange,
    setTotalSize(totalSize) {
      pagination.pageCount = Math.ceil(totalSize / pagination.pageSize)
    },
    reset() {
      pagination.pageCount = 1
      pagination.page = 1
    }
  })
  return pagination
}
