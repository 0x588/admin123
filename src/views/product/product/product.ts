import type { BasicColumn, FormSchema } from '@/components/Table'
import { useRender } from '@/components/Table'
import { DICT_TYPE, getDictOptions } from '@/utils/dict'
import {listSimpleCate} from "@/api/product/cate";
import {listSimpleTag} from "@/api/product/tag";

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

export const tabsFormSchema: FormSchema[][] = [
  [
    {
      label: '编号',
      field: 'id',
      show: false,
      component: 'Input',
    },
    {
      label: '商品名称',
      required: true,
      field: 'name',
      component: 'Input',
    },
    {
      label: '商品卖点',
      field: 'sketch',
      component: 'Input',
      componentProps: {
        placeholder: '在商品详情页标题下面展示卖点信息，建议60字以内',
      },
    },
    {
      label: '商品分类',
      field: 'cateIds',
      required: true,
      component: 'ApiCascader',
      componentProps: {
        api: listSimpleCate,
        apiParamKey: 'pid',
        labelField: 'title',
        valueField: 'id',
        multiple: true,
        initFetchParams: {
          pid: 0,
        },
        isLeaf: (record) => {
          if (record.children == null) return true
          return false
        },
      },
    },
    {
      label: '商品标签',
      field: 'tags',
      component: 'ApiSelect',
      componentProps: {
        api: listSimpleTag,
        labelField: 'title',
        valueField: 'id',
        modes: 'tags',
      },
    },
  ],
  [
    {
      label: '编号',
      field: 'id',
      show: false,
      component: 'Input',
    }
  ],
  [
    {
      label: '编号',
      field: 'id',
      show: false,
      component: 'Input',
    }
  ],
  [
    {
      label: '编号',
      field: 'id',
      show: false,
      component: 'Input',
    }
  ],
]
