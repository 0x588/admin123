import type { BasicColumn, FormSchema } from '@/components/Table'
import { useRender } from '@/components/Table'
import {DICT_TYPE } from "@/utils/dict";

export const columns: BasicColumn[] = [
  {
    title: '订单号',
    dataIndex: 'order_sn',
    width: 100,
  },
  {
    title: '买家',
    dataIndex: 'buyer_nickname',
    width: 80,
  },
  {
    title: '实收金额',
    dataIndex: 'pay_money',
    width: 60,
  },
  {
    title: '交易单号',
    dataIndex: 'out_trade_no',
    width: 120,
  },
  {
    title: '支付方式',
    dataIndex: 'pay_type',
    width: 100,
  },
  {
    title: '配送方式',
    dataIndex: 'shipping_type',
    width: 80,
  },
  {
    title: '订单状态',
    dataIndex: 'order_status',
    width: 40,
    customRender: ({ text }) => {
      return useRender.renderDict(text, DICT_TYPE.ORDER_STATUS)
    },
  },
  {
    title: '下单时间',
    dataIndex: 'created_at',
    width: 120,
    customRender: ({ text }) => {
      return useRender.renderDate(text)
    },
  },
]

export const searchFormSchema: FormSchema[] = [
  {
    label: '订单号',
    field: 'order_sn',
    component: 'Input',
    colProps: { span: 4 },
  },
  {
    label: '交易单号',
    field: 'out_trade_no',
    component: 'Input',
    colProps: { span: 4 },
  },
  {
    label: '买家ID',
    field: 'buyer_id',
    component: 'Input',
    colProps: { span: 4 },
  },
  {
    label: '订单类型',
    field: 'order_type',
    component: 'Input',
    colProps: { span: 4 },
  },
  {
    label: '订单来源',
    field: 'order_from',
    component: 'Input',
    colProps: { span: 4 },
  },
  {
    label: '支付类型',
    field: 'payment_type',
    component: 'Input',
    colProps: { span: 4 },
  },
  {
    label: '创建时间',
    field: 'createdTime',
    component: 'RangePicker',
    colProps: { span: 8 },
  },
]
