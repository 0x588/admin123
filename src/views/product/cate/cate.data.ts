import type { BasicColumn, FormSchema } from '@/components/Table'
import { useRender } from '@/components/Table'
import { DICT_TYPE, getDictOptions } from '@/utils/dict'
import {uploadApi} from "@/api/sys/upload";
import {treeSimpleCate} from "@/api/product/cate";
import {reactive} from "vue";

export const columns: BasicColumn[] = [
  {
    title: '名称',
    dataIndex: 'title',
    width: 260,
    align: 'left',
  },
  {
    title: '副标题',
    dataIndex: 'sub_title',
    width: 120,
  },
  {
    title: '分类图标',
    dataIndex: 'cover',
    width: 150,
    customRender: ({ text }) => {
      return useRender.renderImg(text)
    },
  },
  {
    title: '是否推荐',
    dataIndex: 'is_recommend',
    width: 80,
    customRender: ({ text }) => {
      if (text) {
        return useRender.renderTag('是', 'green')
      } else {
        return useRender.renderTag('否', 'red')
      }
    }
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
export const formApiParam = reactive({})
export const formSchema: FormSchema[] = [
  {
    label: '编号',
    field: 'id',
    show: false,
    component: 'Input',
  },
  {
    label: '上级类目',
    field: 'pid',
    required: true,
    component: 'ApiTreeSelect',
    componentProps: {
      api: () => treeSimpleCate(),
      labelField: 'title',
      valueField: 'id',
      params:formApiParam,
    },
  },
  {
    label: '名称',
    field: 'title',
    required: true,
    component: 'Input',
  },
  {
    label: '副标题',
    field: 'sub_title',
    component: 'Input',
  },
  {
    label: '分类图标',
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
    label: '是否推荐',
    field: 'is_recommend',
    component: 'Switch',
    componentProps: {
      checkedChildren: '推荐',
      unCheckedChildren: '不推荐',
    },
  },
  {
    label: '显示顺序',
    field: 'sort',
    required: true,
    defaultValue: 6,
    component: 'InputNumber',
  },
  {
    label: '状态',
    field: 'status',
    defaultValue: 1,
    component: 'Select',
    componentProps: {
      options: getDictOptions(DICT_TYPE.COMMON_STATUS) as any,
    },
  },
]
