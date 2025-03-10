import type { BasicColumn, FormSchema } from '@/components/Table'
import { useRender } from '@/components/Table'
import {DICT_TYPE } from "@/utils/dict";

export const columns: BasicColumn[] = [
  {
    title: 'ID',
    dataIndex: 'id',
    width: 60,
  },
  {
    title: '头像',
    dataIndex: 'avatar',
    width: 40,
    customRender: ({ text }) => {
      return useRender.renderImg(text)
    },
  },
  {
    title: '昵称',
    dataIndex: 'nickname',
    width: 100,
  },
  {
    title: '手机号',
    dataIndex: 'title',
    width: 100,
  },
  {
    title: '邀请人',
    dataIndex: 'pid',
    width: 80,
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
    title: '时间',
    dataIndex: 'created_at',
    width: 120,
  },
]

export const searchFormSchema: FormSchema[] = [
  {
    label: 'ID',
    field: 'id',
    component: 'Input',
    colProps: { span: 4 },
  },
  {
    label: '手机号',
    field: 'phone',
    component: 'Input',
    colProps: { span: 4 },
  },
  {
    label: '昵称',
    field: 'nickname',
    component: 'Input',
    colProps: { span: 4 },
  },
  {
    label: '推荐人ID',
    field: 'pid',
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
