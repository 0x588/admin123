import type { BasicColumn, FormSchema } from '@/components/Table'
import { useRender } from '@/components/Table'
import {DICT_TYPE, getDictOptions} from '@/utils/dict'

export const columns: BasicColumn[] = [
  {
    title: '访问编号',
    dataIndex: 'id',
    width: 100,
  },
  {
    title: '日志类型',
    dataIndex: 'logType',
    width: 120,
    customRender: ({ text }) => {
      return useRender.renderDict(text, DICT_TYPE.SYSTEM_LOGIN_TYPE)
    },
  },
  {
    title: '用户名称',
    dataIndex: 'username',
    width: 120,
  },
  {
    title: '登录地址',
    dataIndex: 'userIp',
    width: 120,
  },
  {
    title: 'userAgent',
    dataIndex: 'userAgent',
    width: 400,
  },
  {
    title: '结果',
    dataIndex: 'result',
    width: 100,
    customRender: ({ text }) => {
      return useRender.renderDict(text, DICT_TYPE.SYSTEM_LOGIN_RESULT)
    },
  },
  {
    title: '登录日期',
    dataIndex: 'created_at',
    width: 180,
    customRender: ({ text }) => {
      return useRender.renderDate(text)
    },
  },
]

export const searchFormSchema: FormSchema[] = [
  {
    label: '登录地址',
    field: 'userIp',
    component: 'Input',
    colProps: { span: 8 },
  },
  {
    label: '用户名称',
    field: 'username',
    component: 'Input',
    colProps: { span: 8 },
  },
  {
    label: '结果',
    field: 'result',
    component: 'Select',
    componentProps: {
      options: getDictOptions(DICT_TYPE.SYSTEM_LOGIN_RESULT) as any,
    },
    colProps: { span: 8 },
  },
  {
    label: '登录时间',
    field: 'createTime',
    component: 'RangePicker',
    colProps: { span: 8 },
  },
]
