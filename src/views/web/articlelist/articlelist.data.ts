import type { BasicColumn, FormSchema } from '@/components/Table'
import { useRender } from '@/components/Table'
import { DICT_TYPE, getDictOptions } from '@/utils/dict'
import {uploadApi} from "@/api/sys/upload";
import {h} from "vue";
import {Ueditor} from "@/components/Ueditor";
import {DescItem} from "@/components/Description";

export const columns: BasicColumn[] = [
  {
    title: '编号',
    dataIndex: 'id',
    width: 60,
  },
  {
    title: '标题',
    dataIndex: 'title',
    width: 150,
  },
  {
    title: '排序',
    dataIndex: 'sort',
    width: 40,
  },
  {
    title: '状态',
    dataIndex: 'status',
    width: 40,
    customRender: ({ text }) => {
      return useRender.renderDict(text, DICT_TYPE.COMMON_STATUS)
    },
  },
  {
    title: '语言',
    dataIndex: 'lang',
    width: 80,
    customRender: ({ text }) => {
      return useRender.renderDict(text, DICT_TYPE.WEB_LANG)
    },
  },
  {
    title: '创建时间',
    dataIndex: 'created_at',
    width: 120,
    customRender: ({ text }) => {
      return useRender.renderDate(text)
    },
  },
]

export const searchFormSchema: FormSchema[] = [
  {
    label: '标题',
    field: 'title',
    component: 'Input',
    colProps: { span: 8 },
  },
  {
    label: '状态',
    field: 'status',
    component: 'Select',
    componentProps: {
      options: getDictOptions(DICT_TYPE.COMMON_STATUS) as any,
    },
    colProps: { span: 8 },
  },
  {
    label: '语言',
    field: 'lang',
    component: 'Select',
    componentProps: {
      options: getDictOptions(DICT_TYPE.WEB_LANG, 'string') as any,
    },
    colProps: { span: 8 },
  },
  {
    label: '创建时间',
    field: 'createdTime',
    component: 'RangePicker',
    colProps: { span: 8 },
  },
]

export const formSchema: FormSchema[] = [
  {
    label: '编号',
    field: 'id',
    show: false,
    component: 'Input',
  },
  {
    label: '分类',
    field: 'cate_id',
    required: true,
    show: false,
    component: 'Input',
  },
  {
    label: '标题',
    field: 'title',
    required: true,
    component: 'Input',
  },
  {
    label: '封面图',
    field: 'cover',
    component: 'ImageUpload',
    componentProps: {
      api: uploadApi,
      accept: ['png', 'jpeg', 'jpg'],
      maxSize:5,
      maxNumber: 1,
    },
  },
  {
    label: '搜索关键词',
    field: 'seo_key',
    component: 'Input',
  },
  {
    label: '简要描述',
    field: 'desc',
    component: 'InputTextArea',
  },
  {
    field: 'content',
    component: 'Input',
    label: '文章内容',
    rules: [{ required: true }],
    render: ({ model, field }) => {
      return h(Ueditor, {
        modelValue: model[field],
        editorId: 'editor-' + field,
        onChange: (value: string) => {
          model[field] = value;
        },
      });
    },
  },
  {
    label: '排序',
    field: 'sort',
    required: true,
    defaultValue: 1,
    component: 'InputNumber',
  },
  {
    label: '状态',
    field: 'status',
    required: true,
    defaultValue: 1,
    component: 'Select',
    componentProps: {
      options: getDictOptions(DICT_TYPE.COMMON_STATUS) as any,
    },
  },
  {
    label: '语言',
    required: true,
    field: 'lang',
    component: 'Select',
    componentProps: {
      options: getDictOptions(DICT_TYPE.WEB_LANG, 'string') as any,
    },
  },
]


export const detailSchema: DescItem[] = [
  {
    field: 'id',
    label: 'ID',
  },
  {
    field: 'title',
    label: '标题',
  },
  {
    field: 'cover',
    label: '封面',
    render: (curVal, data) => {
      return useRender.renderImg(curVal)
    },
  },
  {
    field: 'seo_key',
    label: '搜索关键字',
  },
  {
    field: 'desc',
    label: '简要描述',
  },
  {
    field: 'content',
    label: '内容',
    render: (curVal, data) => {
      return h('div', { innerHTML: curVal });
    },
  },
  {
    label: '语言',
    field: 'lang',
    render: (curVal, data) => {
      return useRender.renderDict(curVal, DICT_TYPE.WEB_LANG)
    },
  },
  {
    label: '创建时间',
    field: 'created_at',
    render: (curVal, data) => {
      return useRender.renderDate(curVal)
    },
  },
]
