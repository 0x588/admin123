import type {BasicColumn, FormSchema} from '@/components/Table'
import {useRender} from '@/components/Table'
import {DICT_TYPE, getDictOptions} from '@/utils/dict'
import {areaOption} from "@/utils/areas";

export const columns: BasicColumn[] = [
  {
    title: 'ID',
    dataIndex: 'id',
    width: 40,
  },
  {
    title: '模板名称',
    dataIndex: 'title',
    width: 120,
  },
  {
    title: '默认模版',
    dataIndex: 'is_default',
    width: 60,
    customRender: ({text}) => {
      return useRender.renderDict(text, DICT_TYPE.YES_NO)
    },
  },
  {
    title: '排序',
    dataIndex: 'sort',
    width: 40,
  },
  {
    title: '状态',
    dataIndex: 'status',
    width: 80,
    customRender: ({text}) => {
      return useRender.renderDict(text, DICT_TYPE.COMMON_STATUS)
    },
  },
  {
    title: '创建时间',
    dataIndex: 'created_at',
    width: 150,
    customRender: ({text}) => {
      return useRender.renderDate(text)
    },
  },
]

export const searchFormSchema: FormSchema[] = [
  {
    label: '模版名称',
    field: 'title',
    component: 'Input',
    colProps: {span: 8},
  },
  {
    label: '状态',
    field: 'status',
    component: 'Select',
    componentProps: {
      options: getDictOptions(DICT_TYPE.OPEN_STATUS) as any,
    },
    colProps: {span: 8},
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
    label: '物流ID',
    field: 'express_id',
    show: false,
    component: 'Input',
  },
  {
    label: '模版名称',
    field: 'title',
    required: true,
    component: 'Input',
  },
  {
    label: '物流区域类型',
    field: 'area_type',
    component: 'RadioGroup',
    required: true,
    defaultValue: 0,
    componentProps: {
      options: [
        {
          label: '全国',
          value: 0,
        },
        {
          label: '指定区域',
          value: 1,
        },
      ],
    },
  },
  {
    label: '选择指定区域',
    field: 'areas',
    required: true,
    component: 'Cascader',
    componentProps: {
      options: areaOption,
      multiple: true,
      showCheckedStrategy: 'SHOW_CHILD',
      maxTagCount: 'responsive',
    },
    ifShow: ({values}) => {
      return values.area_type == 1
    }
  },
  {
    field: 'piece_used',
    component: 'Checkbox',
    defaultValue: false,
    label: '按计件计算运费',
  },
  {
    label: '首件(件)',
    field: 'piece',
    component: 'InputNumber',
    colProps: {span: 6},
    componentProps: {
      min: 0,
      precision: 0,
    },
    ifShow: ({values}) => {
      return values.piece_used == true
    }
  },
  {
    label: '首件运费(元)',
    field: 'piece_price',
    component: 'InputNumber',
    colProps: {span: 6},
    componentProps: {
      min: 0,
      precision: 2,
    },
    ifShow: ({values}) => {
      return values.piece_used == true
    }
  },
  {
    label: '续件(件)',
    field: 'piece_more',
    component: 'InputNumber',
    colProps: {span: 6},
    componentProps: {
      min: 0,
      precision: 0,
    },
    ifShow: ({values}) => {
      return values.piece_used == true
    }
  },
  {
    label: '续件运费(元)',
    field: 'piece_more_price',
    component: 'InputNumber',
    colProps: {span: 6},
    componentProps: {
      min: 0,
      precision: 2,
    },
    ifShow: ({values}) => {
      return values.piece_used == true
    }
  },
  {
    field: 'weight_used',
    component: 'Checkbox',
    defaultValue: false,
    label: '按重量计算运费',
  },
  {
    label: '首重(kg)',
    field: 'weight',
    component: 'InputNumber',
    colProps: {span: 6},
    componentProps: {
      min: 0.01,
      precision: 2,
    },
    ifShow: ({values}) => {
      return values.weight_used == true
    }
  },
  {
    label: '首重运费(元)',
    field: 'weight_price',
    component: 'InputNumber',
    colProps: {span: 6},
    componentProps: {
      min: 0,
      precision: 2,
    },
    ifShow: ({values}) => {
      return values.weight_used == true
    }
  },
  {
    label: '续重(kg)',
    field: 'weight_more',
    component: 'InputNumber',
    colProps: {span: 6},
    componentProps: {
      min: 0.01,
      precision: 2,
    },
    ifShow: ({values}) => {
      return values.weight_used == true
    }
  },
  {
    label: '续重运费(元)',
    field: 'weight_more_price',
    component: 'InputNumber',
    colProps: {span: 6},
    componentProps: {
      min: 0,
      precision: 2,
    },
    ifShow: ({values}) => {
      return values.weight_used == true
    }
  },
  {
    field: 'volume_used',
    component: 'Checkbox',
    defaultValue: false,
    label: '按体积计算运费',
  },
  {
    label: '首体积量(m³)',
    field: 'volume',
    component: 'InputNumber',
    colProps: {span: 6},
    componentProps: {
      min: 0.01,
      precision: 2,
    },
    ifShow: ({values}) => {
      return values.volume_used == true
    }
  },
  {
    label: '首体积运费(元)',
    field: 'volume_price',
    component: 'InputNumber',
    colProps: {span: 6},
    componentProps: {
      min: 0,
      precision: 2,
    },
    ifShow: ({values}) => {
      return values.volume_used == true
    }
  },
  {
    label: '续体积量(m³)',
    field: 'volume_more',
    component: 'InputNumber',
    colProps: {span: 6},
    componentProps: {
      min: 0.01,
      precision: 2,
    },
    ifShow: ({values}) => {
      return values.volume_used == true
    }
  },
  {
    label: '续体积运费(元)',
    field: 'volume_more_price',
    component: 'InputNumber',
    colProps: {span: 6},
    componentProps: {
      min: 0,
      precision: 2,
    },
    ifShow: ({values}) => {
      return values.volume_used == true
    }
  },
  {
    label: '默认模板',
    field: 'is_default',
    component: 'RadioGroup',
    required: true,
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
