import type { BasicColumn, FormSchema } from '@/components/Table'
import { useRender } from '@/components/Table'
import { DICT_TYPE, getDictOptions } from '@/utils/dict'
import {uploadApi} from "@/api/sys/upload";

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
    title: '广告位置',
    dataIndex: 'location',
    width: 80,
    customRender: ({ text }) => {
      return useRender.renderDict(text, DICT_TYPE.WEB_ADV_LOCATION)
    },
  },
  {
    title: '广告封面',
    dataIndex: 'cover',
    width: 150,
    customRender: ({ text }) => {
      return useRender.renderImg(text)
    },
  },
  {
    title: '跳转类型',
    dataIndex: 'jump_type',
    width: 80,
    customRender: ({ text }) => {
      return useRender.renderDict(text, DICT_TYPE.WEB_ADV_JUMP_TYPE)
    },
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
    label: '广告位置',
    field: 'location',
    component: 'Select',
    componentProps: {
      options: getDictOptions(DICT_TYPE.WEB_ADV_LOCATION, 'string') as any,
    },    colProps: { span: 8 },
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
    label: '广告位置',
    field: 'location',
    required: true,
    component: 'Select',
    componentProps: {
      options: getDictOptions(DICT_TYPE.WEB_ADV_LOCATION, 'string') as any,
    },
  },
  {
    label: '编号',
    field: 'id',
    show: false,
    component: 'Input',
  },
  {
    label: '广告标题',
    field: 'title',
    required: true,
    component: 'Input',
  },
  {
    label: '广告封面图',
    field: 'cover',
    required: true,
    component: 'ImageUpload',
    componentProps: {
      api: uploadApi,
      accept: ['png', 'jpeg', 'jpg'],
      maxSize:5,
      maxNumber: 1,
    },
  },
  {
    label: '广告描述',
    field: 'desc',
    component: 'InputTextArea',
  },
  {
    label: '跳转类型',
    field: 'jump_type',
    required: true,
    defaultValue:0,
    component: 'Select',
    componentProps: {
      options: getDictOptions(DICT_TYPE.WEB_ADV_JUMP_TYPE) as any,
    },
  },
  {
    label: '跳转链接',
    field: 'jump_link',
    component: 'Input',
    ifShow: ({ values }) => values.jump_type !== 1,
  },
  {
    label: '跳转参数',
    field: 'jump_param',
    component: 'Input',
    ifShow: ({ values }) => values.jump_type !== 1,
  },
  {
    label: '排序',
    field: 'sort',
    required: true,
    defaultValue: 0,
    component: 'InputNumber',
  },
  {
    label: '状态',
    field: 'status',
    required: true,
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

