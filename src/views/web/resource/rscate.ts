import type { BasicColumn, FormSchema } from '@/components/Table'
import { useRender } from '@/components/Table'
import { DICT_TYPE, getDictOptions } from '@/utils/dict'


export const columns: BasicColumn[] = [
  {
    title: '名称',
    dataIndex: 'title',
    width: 260,
    align: 'left',
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
    title: '排序',
    dataIndex: 'sort',
    width: 60,
  },
  {
    title: '状态',
    dataIndex: 'status',
    width: 180,
    customRender: ({ text }) => {
      return useRender.renderDict(text, DICT_TYPE.COMMON_STATUS)
    },
  },
  {
    title: '创建时间',
    dataIndex: 'created_at',
    width: 180,
    customRender: ({ text }) => {
      return useRender.renderDate(text)
    },
  },
]

export const searchFormSchema: FormSchema[] = [
  {
    label: '名称',
    field: 'name',
    component: 'Input',
    colProps: { span: 8 },
  },
  {
    label: '上级',
    field: 'pid',
    component: 'Input',
    defaultValue: '6',
    show: false,
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
    label: '状态',
    field: 'status',
    component: 'Select',
    componentProps: {
      options: getDictOptions(DICT_TYPE.COMMON_STATUS) as any,
    },
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
    label: '上级',
    field: 'pid',
    show: false,
    defaultValue: 6,
    component: 'InputNumber',
  },
  {
    label: '名称',
    field: 'title',
    required: true,
    component: 'Input',
  },
  {
    label: '显示顺序',
    field: 'sort',
    required: true,
    defaultValue: 1,
    component: 'InputNumber',
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
]
