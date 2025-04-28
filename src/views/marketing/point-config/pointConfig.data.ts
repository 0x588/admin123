import type { FormSchema } from '@/components/Table'
export const formSchema: FormSchema[] = [
  {
    label: '编号',
    field: 'id',
    show: false,
    component: 'Input',
  },
  {
    label: '开启积分抵现',
    field: 'status',
    required: true,
    component: 'RadioGroup',
    defaultValue: 0,
    componentProps: {
      options: [
        {
          label: '关闭',
          value: 0,
        },
        {
          label: '开启',
          value: 1,
        },
      ],
    },
    helpMessage: "只有启用该选项，才可以使用积分抵现功能",
  },
  {
    label: '积分抵现比率',
    subLabel: '单位(元)',
    field: 'convert_rate',
    component: 'InputNumber',
    required: true,
    componentProps: {
      min: 0.0001,
      precision: 4,
    },
    helpMessage: "1积分可抵多少元现金",
  },
  {
    label: '订单金额门槛',
    field: 'min_order_money',
    component: 'InputNumber',
    required: true,
    componentProps: {
      min: 0.01,
      precision: 2,
    },
    helpMessage: "订单金额超出该金额可使用积分抵现",
  },
  {
    label: '抵现金额上限',
    field: 'deduction_type',
    component: 'RadioGroup',
    defaultValue: 0,
    componentProps: {
      options: [
        {
          label: '不限制',
          value: 0,
        },
        {
          label: '订单金额',
          value: 1,
        },
        {
          label: '订单比例',
          value: 2,
        },
      ],
    },
  },
  {
    label: '每笔订单最多抵扣金额',
    field: 'max_money',
    component: 'InputNumber',
    required: true,
    componentProps: {
      min: 0.01,
      precision: 2,
    },
    helpMessage: "订单金额超出该金额可使用积分抵现",
    ifShow: ({ values }) => {
      return values.deduction_type == 1
    }
  },
  {
    label: '每笔订单最多抵扣比率',
    subLabel: '单位(%)',
    field: 'max_rate',
    component: 'InputNumber',
    required: true,
    componentProps: {
      min: 0.01,
      max: 100,
      precision: 2,
    },
    helpMessage: "0 - 100之间",
    ifShow: ({ values }) => {
      return values.deduction_type == 2
    }
  },
  {
    label: '备注',
    field: 'explain',
    component: 'Input',
  },
]
