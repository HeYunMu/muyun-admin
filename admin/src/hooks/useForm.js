import { reactive } from "vue";
import { cloneDeep } from "lodash-es";

export function useForm(_form = {}, _header = {}) {
  const headerText = Object.assign(
    {
      add: "添加",
      edit: "编辑",
    },
    _header
  );

  let form = reactive({
    ref: undefined,
    // 表单数据
    items: {},
    // 方法 add edit
    method: "",
    // 加载
    loading: false,
    // 默认数据
    defaultItems: {},
    // 补充数据
    extra: {},
  });

  form = Object.assign(form, _form);

  /**
   * 打开表单
   */
  function toggleForm(method = "", defaultItems = {}) {
    if (method == "add") {
      form.items = Object.assign({}, form.defaultItems, defaultItems);
    } else if (method == "edit") {
      form.items = Object.assign({}, defaultItems);
    }
    form.method = method;
    listener["toggleForm"] && listener["toggleForm"](form.method);
  }

  /**
   * 保存
   */
  function onSave(v) {
    if (v) {
      form.ref = v;
    }
    for (const key in form.items) {
      if (form.items[key] === null) {
        delete form.items[key];
      }
    }
    listener["onSave"] &&
      listener["onSave"](form.method, cloneDeep(form.items));
  }

  const listener = reactive({
    toggleForm: () => {},
    onSave: () => {
      toggleForm("");
    },
  });

  return { headerText, form, toggleForm, onSave, listener };
}
