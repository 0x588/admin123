import type { BasicColumn, FormSchema } from '@/components/Table'
import { useRender } from '@/components/Table'
import { DICT_TYPE, getDictOptions } from '@/utils/dict'
import {uploadApi} from "@/api/sys/upload";
import {getArticleCateTree} from "@/api/web/articlecate";

export const columns: BasicColumn[] = [
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
    label: '分类',
    field: 'cate_id',
    show: false,
    defaultValue: 6,
    component: 'InputNumber',
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
    component: 'ApiTreeSelect',
    dynamicDisabled: true,
    componentProps: {
      api: () => getArticleCateTree(),
      labelField: 'title',
      valueField: 'id',
    },
  },
  {
    label: '标题',
    field: 'title',
    required: true,
    component: 'Input',
  },
  {
    label: '资源文件',
    field: 'content',
    component: 'Upload',
    rules: [{ required: true, message: '请选择上传文件' }],
    componentProps: {
      api: uploadApi,
      maxSize:500,
    },
  },
  {
    label: '显示顺序',
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
]

