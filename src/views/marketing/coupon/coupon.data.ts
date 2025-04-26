import type { BasicColumn, FormSchema } from '@/components/Table'
import { useRender } from '@/components/Table'
import { DICT_TYPE, getDictOptions } from '@/utils/dict'
export const columns: BasicColumn[] = [
  {
    title: 'ID',
    dataIndex: 'id',
    width: 40,
  },
  {
    title: '优惠券名称',
    dataIndex: 'title',
    width: 120,
  },
  {
    title: '参与商品',
    dataIndex: 'rang_type',
    width: 100,
    customRender: ({ text }) => {
      return useRender.renderDict(text, DICT_TYPE.RANGE_TYPE)
    },
  },
  {
    title: '优惠内容',
    dataIndex: 'discount_type',
    width: 120,
  },
  {
    title: '领取时间',
    dataIndex: 'get_type',
    width: 160,
  },
  {
    title: '生效时间',
    dataIndex: 'validity_type',
    width: 160,
  },
  {
    title: '单品券',
    dataIndex: 'single_type',
    width: 60,
    customRender: ({ text }) => {
      return useRender.renderDict(text, DICT_TYPE.YES_NO)
    },
  },
  {
    title: '新人券',
    dataIndex: 'is_new_people',
    width: 60,
    customRender: ({ text }) => {
      return useRender.renderDict(text, DICT_TYPE.YES_NO)
    },
  },
  {
    title: '数量',
    dataIndex: 'count',
    width: 100,
  },
  {
    title: '排序',
    dataIndex: 'sort',
    width: 40,
  },
  {
    title: '是否开启',
    dataIndex: 'status',
    width: 80,
    customRender: ({ text }) => {
      return useRender.renderDict(text, DICT_TYPE.OPEN_STATUS)
    },
  },
  {
    title: '创建时间',
    dataIndex: 'created_at',
    width: 150,
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
      options: getDictOptions(DICT_TYPE.OPEN_STATUS) as any,
    },
    colProps: { span: 8 },
  },
]
