import type { BasicColumn, FormSchema } from '@/components/Table'
import { useRender } from '@/components/Table'
import { DICT_TYPE, getDictOptions } from '@/utils/dict'

export const tableColumns: BasicColumn[] = [
  {
    title: '参数名称',
    dataIndex: 'title',
    width: 120,
  },
  {
    title: '属性',
    dataIndex: 'values',
    width: 220,
  },
  {
    title: '状态',
    dataIndex: 'status',
    width: 60,
    customRender: ({ text }) => {
      return useRender.renderDict(text, DICT_TYPE.COMMON_STATUS)
    },
  },
  {
    title: '排序',
    dataIndex: 'sort',
    width: 50,
  },
]

export const tableSearchFormSchema: FormSchema[] = [
  {
    label: '参数名称',
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
]

export const formSchema: FormSchema[] = [
  {
    label: '编号',
    field: 'id',
    show: false,
    component: 'Input',
  },
  {
    label: '参数名称',
    field: 'title',
    required: true,
    component: 'Input',
  },
  {
    label: '显示排序',
    field: 'sort',
    component: 'InputNumber',
    colProps: {
      span: 8,
    },
    defaultValue: 1,
  },
  {
    label: '状态',
    field: 'status',
    defaultValue: 1,
    colProps: {
      span: 8,
    },
    component: 'Select',
    componentProps: {
      options: getDictOptions(DICT_TYPE.COMMON_STATUS) as any,
    },
  },
  {
    field: 'divider-others',
    component: 'Divider',
    label: '',
    colProps: {
      span: 24,
    },
  },
]


export const tableValuesColumns: BasicColumn[] = [
  {
    title: 'ID',
    dataIndex: 'id',
    width: 20,
    ifShow: false,
  },
  {
    title: '属性名称',
    dataIndex: 'title',
    width: 120,
  },
  {
    title: '类型',
    dataIndex: 'type',
    width: 120,
  },
  {
    title: '属性值',
    dataIndex: 'value',
    width: 220,
  },
  {
    title: '排序',
    dataIndex: 'sort',
    width: 50,
  },
]
