import type { BasicColumn, FormSchema } from '@/components/Table'
import {listProductCate} from "@/api/system/common-config/cate";

export const columns: BasicColumn[] = [
  {
    title: '名称',
    dataIndex: 'title',
    width: 260,
    align: 'left',
  },
  {
    title: '排序',
    dataIndex: 'sort',
    width: 60,
  },
]

export const searchFormSchema: FormSchema[] = [
  {
    label: '名称',
    field: 'Title',
    component: 'Input',
    colProps: { span: 8 },
  },
  {
    label: '商品ID',
    field: 'product_id',
    component: 'Input',
    defaultValue: '6',
    show: false,
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
    label: '商品ID',
    field: 'product_id',
    show: false,
    component: 'Input',
  },
  {
    label: '属性模版',
    field: 'property_id',
    component: 'ApiSelect',
    componentProps: {
      api: listProductCate,
      labelField: 'title',
      valueField: 'id',
    },
    required: true,
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
]
