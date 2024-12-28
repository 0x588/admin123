import { getArticleCateTree } from '@/api/web/articlecate'
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
    title: '编号',
    dataIndex: 'id',
    width: 60,
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
    label: '上级部门',
    field: 'pid',
    required: true,
    component: 'ApiTreeSelect',
    componentProps: {
      api: () => getArticleCateTree(),
      labelField: 'title',
      valueField: 'id',
    },
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
    defaultValue: 0,
    component: 'InputNumber',
  },
  {
    label: '状态',
    field: 'status',
    component: 'Select',
    componentProps: {
      options: getDictOptions(DICT_TYPE.COMMON_STATUS) as any,
    },
  },
]
