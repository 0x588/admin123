import type { BasicColumn, FormSchema } from '@/components/Table'
import { useRender } from '@/components/Table'
import { DICT_TYPE, getDictOptions } from '@/utils/dict'
import {h, reactive} from "vue";
import {listSimpleCate} from "@/api/product/cate";
import ProductSelect from "@/views/product/product/ProductSelect.vue";
export const columns: BasicColumn[] = [
  {
    title: 'ID',
    dataIndex: 'id',
    width: '40',
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
    title: '排序',
    dataIndex: 'sort',
    width: 40,
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
    label: '优惠券名称',
    field: 'title',
    required: true,
    component: 'Input',
  },
  {
    label: '备注',
    field: 'remark',
    component: 'Input',
  },
  {
    label: '满多少元可用',
    field: 'at_least',
    component: 'InputNumber',
    defaultValue: 0,
    required: true,
    componentProps: {
      min: 0,
      precision: 2,
    },
  },
  {
    label: '优惠券类型',
    field: 'discount_type',
    component: 'RadioGroup',
    required: true,
    colProps: {
      span: 12,
    },
    componentProps: {
      options: [
        {
          label: '优惠金额',
          value: 1,
        },
        {
          label: '折扣',
          value: 2,
        },
      ],
    },
  },
  {
    label: ({ values }) => {
      return values.discount_type ==2?"折扣":"金额";
    },
    field: 'discount',
    component: 'InputNumber',
    colProps: {
      span: 12,
    },
    required: true,
    componentProps: {
      min: 0.01,
      precision: 2,
    },
    helpMessage: ({values}) => {
      return values.discount_type == 2?"折扣比例: 范围为0-9.9。设置0为全部抵扣,设置9.9为优惠百分之一":"减免金额";
    },
  },
  {
    label: '发放数量',
    field: 'count',
    component: 'InputNumber',
    required: true,
    componentProps: {
      min: 0,
      precision: 0,
    },
  },
  {
    label: '每人最大领取数量',
    field: 'max_fetch',
    component: 'InputNumber',
    defaultValue: 0,
    required: true,
    colProps: {
      span: 12,
    },
    componentProps: {
      min: 0,
      precision: 0,
    },
    helpMessage: "输入0表示无限制",
  },
  {
    label: '每人每天最大领取数量',
    field: 'max_fetch_per_day',
    component: 'InputNumber',
    defaultValue: 0,
    required: true,
    colProps: {
      span: 12,
    },
    componentProps: {
      min: 0,
      precision: 0,
    },
    helpMessage: "输入0表示无限制",
  },
  {
    label: '是否限时领取',
    field: 'get_type',
    component: 'RadioGroup',
    required: true,
    componentProps: {
      options: [
        {
          label: '否',
          value: 0,
        },
        {
          label: '限时',
          value: 1,
        },
      ],
    },
  },
  {
    field: '[get_start_time, get_end_time]',
    label: '领取时间',
    required: true,
    component: 'RangePicker',
    componentProps: {
      format: 'YYYY-MM-DD HH:mm:ss',
      placeholder: ['开始日期、时间', '结束日期、时间'],
      showTime: { format: 'HH:mm:ss' },
    },
    ifShow: ({ values }) => {
      return values.get_type == 1
    }
  },
  {
    label: '使用有效期类型',
    field: 'validity_type',
    component: 'RadioGroup',
    defaultValue: 0,
    required: true,
    colProps: {
      span: 12,
    },
    componentProps: {
      options: [
        {
          label: '时间段',
          value: 0,
        },
        {
          label: '天数',
          value: 1,
        },
      ],
    },
  },
  {
    field: '[start_time, end_time]',
    label: '有效期',
    colProps: {
      span: 12,
    },
    required: true,
    component: 'RangePicker',
    componentProps: {
      format: 'YYYY-MM-DD HH:mm:ss',
      placeholder: ['开始日期、时间', '结束日期、时间'],
      showTime: { format: 'HH:mm:ss' },
    },
    ifShow: ({ values }) => {
      return values.validity_type == 0
    }
  },
  {
    label: '天数',
    field: 'validity_days',
    component: 'InputNumber',
    required: true,
    colProps: {
      span: 12,
    },
    componentProps: {
      min: 1,
      precision: 0,
    },
    ifShow: ({ values }) => {
      return values.validity_type == 1
    }
  },
  {
    label: '参与商品',
    field: 'rang_type',
    component: 'RadioGroup',
    required: true,
    componentProps: {
      options: [
        {
          label: '全部商品',
          value: 0,
        },
        {
          label: '指定商品',
          value: 1,
        },
        {
          label: '指定分类',
          value: 2,
        },
      ],
    },
  },
  {
    label: '选择指定分类',
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
    ifShow: ({ values }) => {
      return values.rang_type == 2
    }
  },
  {
    label: '选择指定商品',
    field: 'productIds',
    component: 'Input',
    required: true,
    render: ({ model, field }) => {
      return h(ProductSelect, {
        values: model[field],
        'onUpdate:values': (val) => {
          model[field] = val
        },
      });
    },
    ifShow: ({ values }) => {
      return values.rang_type == 1
    }
  },
  {
    label: '新人券',
    field: 'is_new_people',
    component: 'RadioGroup',
    required: true,
    colProps: {
      span: 12,
    },
    componentProps: {
      options: [
        {
          label: '否',
          value: 0,
        },
        {
          label: '是',
          value: 1,
        },
      ],
    },
    helpMessage: "未下单支付用户可领",
  },
  {
    label: '单品券',
    field: 'single_type',
    component: 'RadioGroup',
    required: true,
    colProps: {
      span: 12,
    },
    componentProps: {
      options: [
        {
          label: '否',
          value: 0,
        },
        {
          label: '是',
          value: 1,
        },
      ],
    },
    helpMessage: "\"是\" 取符合商品中最高价的一个进行抵扣, \"否\" 则是符合的商品累加价格进行抵扣"
  },
  {
    label: '显示顺序',
    field: 'sort',
    required: true,
    defaultValue: 6,
    colProps: {
      span: 12,
    },
    component: 'InputNumber',
  },
  {
    label: '状态',
    field: 'status',
    defaultValue: 1,
    colProps: {
      span: 12,
    },
    component: 'Select',
    componentProps: {
      options: getDictOptions(DICT_TYPE.COMMON_STATUS) as any,
    },
  },
]
