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
    title: '领取人',
    dataIndex: 'member_id',
    width: 160,
  },
  {
    title: '优惠内容',
    dataIndex: 'discount_type',
    width: 120,
  },
  {
    title: '过期时间',
    dataIndex: 'end_time',
    width: 160,
    customRender: ({ text }) => {
      return useRender.renderDate(text)
    },
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
    title: '状态',
    dataIndex: 'state',
    width: 80,
    customRender: ({ text }) => {
      return useRender.renderDict(text, DICT_TYPE.COUPON_STATE)
    },
  },
  {
    title: '领取时间',
    dataIndex: 'fetch_time',
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
