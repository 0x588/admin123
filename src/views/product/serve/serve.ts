import type { BasicColumn, FormSchema } from '@/components/Table'
import { useRender } from '@/components/Table'
import { DICT_TYPE, getDictOptions } from '@/utils/dict'
import {uploadApi} from "@/api/sys/upload";

export const columns: BasicColumn[] = [
  {
    title: '服务名称',
    dataIndex: 'name',
    width: 120,
  },
  {
    title: '广告封面',
    dataIndex: 'cover',
    width: 80,
    customRender: ({ text }) => {
      return useRender.renderImg(text)
    },
  },
  {
    title: '服务说明',
    dataIndex: 'explain',
    width: 250,
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

export const searchFormSchema: FormSchema[] = [
  {
    label: '服务名称',
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
    label: '服务名称',
    field: 'name',
    required: true,
    component: 'Input',
  },
  {
    label: '广告封面图',
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
    label: '服务说明',
    field: 'explain',
    component: 'InputTextArea',
  },
  {
    label: '显示排序',
    field: 'sort',
    component: 'InputNumber',
    colProps: {
      span: 8,
    },
    defaultValue: 10,
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
]
