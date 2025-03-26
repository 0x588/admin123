import type { BasicColumn, FormSchema } from '@/components/Table'
import { useRender } from '@/components/Table'
import { DICT_TYPE, getDictOptions } from '@/utils/dict'
import {listSimpleCate} from "@/api/product/cate";
import {listSimpleTag} from "@/api/product/tag";
import {h, reactive} from "vue";
import {listSimpleSpecTemplate} from "@/api/product/spec-temp";
import {uploadApi} from "@/api/sys/upload";
import {Ueditor} from "@/components/Ueditor";
import {listSimpleAttribute} from "@/api/product/attribute";

export let productModel = reactive({
  is_spec: false,
  spec_template_id: 0,
  attribute_id: 0,
})

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
      component: 'InputTextArea',
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
    {
      field: 'delivery_type',
      component: 'RadioGroup',
      label: '配送方式',
      required: true,
      defaultValue: 1,
      componentProps: {
        options: [
          {
            label: '物流配送',
            value: 1,
          },
          {
            label: '同城配送',
            value: 2,
          },
          {
            label: '买家自提',
            value: 100,
          },
        ],
      },
    },
    {
      field: 'shipping_type',
      component: 'RadioGroup',
      label: '运费类型',
      defaultValue: 1,
      colProps: {
        span: 12,
      },
      componentProps: {
        options: [
          {
            label: '包邮',
            value: 1,
          },
          {
            label: '买家承担运费',
            value: 2,
          },
          {
            label: '统一邮费',
            value: 3,
          },
        ],
      },
    },
    {
      field: 'shipping_fee',
      component: 'Input',
      label: '运费(元)',
      colProps: {
        span: 12,
      },
      ifShow: ({ values }) => {
        return values.shipping_type == 3;
      },
      dynamicRules: ({ values }) => {
        return values.shipping_type == 3 ? [{ required: true, message: '字段4必填' }] : [];
      },
    },
    {
      label: '运费模版',
      field: 'shipping_fee_id',
      component: 'ApiSelect',
      colProps: {
        span: 12,
      },
      componentProps: {
        api: listSimpleTag,
        labelField: 'title',
        valueField: 'id',
      },
      ifShow: ({ values }) => {
        return values.shipping_type == 2;
      },
      dynamicRules: ({ values }) => {
        return values.shipping_type == 2 ? [{ required: true, message: '字段4必填' }] : [];
      },
    },
    {
      field: 'shipping_fee_type',
      component: 'RadioGroup',
      label: '计价方式',
      defaultValue: 1,
      colProps: {
        span: 12,
      },
      componentProps: {
        options: [
          {
            label: '计件',
            value: 1,
          },
          {
            label: '体积',
            value: 2,
          },
          {
            label: '重量',
            value: 3,
          },
        ],
      },
      ifShow: ({ values }) => {
        return values.shipping_type == 2;
      },
    },
    {
      label: '商品单位',
      required: true,
      colProps: {
        span: 12,
      },
      field: 'unit',
      component: 'Input',
    },
    {
      label: '最少买几件',
      required: true,
      defaultValue: 1,
      colProps: {
        span: 8,
      },
      field: 'min_buy_num',
      component: 'InputNumber',
    },
    {
      label: '总限购',
      required: true,
      defaultValue: 0,
      colProps: {
        span: 8,
      },
      field: 'max_buy_num',
      component: 'InputNumber',
    },
    {
      label: '单笔下单限购',
      required: true,
      defaultValue: 0,
      colProps: {
        span: 8,
      },
      field: 'order_max_buy_num',
      component: 'InputNumber',
    },
    {
      label: '虚拟销量',
      field: 'sales',
      defaultValue: 0,
      colProps: {
        span: 8,
      },
      component: 'InputNumber',
    },
    {
      label: '商品点击数',
      field: 'view',
      defaultValue: 0,
      colProps: {
        span: 8,
      },
      component: 'InputNumber',
    },
    {
      label: '商品分享数',
      field: 'transmit_num',
      defaultValue: 0,
      colProps: {
        span: 8,
      },
      component: 'InputNumber',
    },
    {
      field: 'production_date',
      component: 'DatePicker',
      label: '生产日期',
      colProps: {
        span: 12,
      },
    },
    {
      field: 'shelf_life',
      component: 'Input',
      label: '保质期(单位:天)',
      colProps: {
        span: 12,
      },
    },
    {
      field: 'is_new',
      component: 'Checkbox',
      defaultValue: false,
      label: '新品',
      colProps: {
        span: 8,
      },
    },
    {
      field: 'is_hot',
      component: 'Checkbox',
      defaultValue: false,
      label: '热销',
      colProps: {
        span: 8,
      },
    },
    {
      field: 'is_recommend',
      component: 'Checkbox',
      defaultValue: false,
      label: '推荐',
      colProps: {
        span: 8,
      },
    },
    {
      label: '商品状态',
      field: 'status',
      defaultValue: 1,
      component: 'Select',
      colProps: {
        span: 12,
      },
      componentProps: {
        options: getDictOptions(DICT_TYPE.PRODUCT_STATUS) as any,
      },
    },


  ],
  //Tab2
  [
    {
      label: '库存预警',
      field: 'stock_warning_num',
      component: 'InputNumber',
      defaultValue: 0,
      colProps: {
        span: 12,
      },
    },
    {
      label: '库存扣减类型',
      field: 'stock_deduction_type',
      helpMessage: ['付款减库存: 买家提交订单，扣减库存数量，可能存在恶意占用库存风险。商品参加“拼团”活动时，默认为付款减库存。', '拍下减库存: 买家支付成功扣减库存数量，可能存在超卖风险。可以设置人工处理超卖订单。商品参加“砍价”活动时，默认为拍下减库存'],
      component: 'RadioGroup',
      defaultValue: 1,
      colProps: {
        span: 12,
      },
      componentProps: {
        options: [
          {
            label: '付款减库存',
            value: 1,
          },
          {
            label: '拍下减库存',
            value: 2,
          },

        ],
      },
    },
    {
      field: 'is_stock_visible',
      component: 'Checkbox',
      defaultValue: true,
      label: '显示库存',
    },
    {
      label: '规格类型',
      field: 'is_spec',
      component: 'RadioGroup',
      defaultValue: 0,
      colProps: {
        span: 12,
      },

      componentProps: {
        options: [
          {
            label: '单规格',
            value: 0,
          },
          {
            label: '多规格',
            value: 1,
          },
        ],
        onChange: (e) => {
          productModel.is_spec = e.target.value
        }
      },
    },
    {
      label: '规格模版',
      field: 'spec_template_id',
      component: 'ApiSelect',
      colProps: {
        span: 12,
      },
      componentProps: {
        api: listSimpleSpecTemplate,
        labelField: 'title',
        valueField: 'id',
        onChange: (e, v) => {
          if (v) {
            productModel.spec_template_id = v.value
          }
        },
      },
      ifShow: ({ values }) => {
        return values.is_spec == 1;
      },
    },
  ],
  [
    {
      label: '幻灯片',
      field: 'covers',
      component: 'ImageUpload',
      helpMessage: '建议尺寸：800*800像素，第一张图片将作为商品主图',
      required: true,
      componentProps: {
        api: uploadApi,
        accept: ['png', 'jpeg', 'jpg'],
        maxSize:5,
        maxNumber: 5,
      },
    },
    {
      label: '展示视频',
      field: 'video_url',
      component: 'Upload',
      helpMessage: '建议时长 9-30 秒、视频宽高和商品图一致',
      componentProps: {
        api: uploadApi,
        accept: ['mp4', 'mov'],
        maxSize:100,
        maxNumber: 1,
      },
    },
    {
      field: 'intro',
      component: 'Input',
      label: '商品描述',
      rules: [{ required: true }],
      render: ({ model, field }) => {
        return h(Ueditor, {
          modelValue: model[field],
          editorId: 'editor-' + field,
          onChange: (value: string) => {
            model[field] = value;
          },
        });
      },
    },
  ],
  [
    {
      label: '商品参数模版',
      field: 'attribute_id',
      component: 'ApiSelect',
      colProps: {
        span: 12,
      },
      componentProps: {
        api: listSimpleAttribute,
        labelField: 'title',
        valueField: 'id',
        onChange: (e, v) => {
          if (v) {
            productModel.attribute_id = v.value
          }
        },
      },
    },
  ],
]


export const skuColumns: BasicColumn[] = [
  {
    title: '图片',
    dataIndex: 'picture',
    width: 20,
  },
  {
    title: '销售价(元)',
    editRow: true,
    dataIndex: 'price',
    editComponent: 'InputNumber',
    editComponentProps:{
      precision:2,
      min:0,
    },
    width: 50,
  },
  {
    title: '市场价(元)',
    editRow: true,
    dataIndex: 'market_price',
    editComponent: 'InputNumber',
    editComponentProps:{
      precision:2,
      min:0,
    },
    width: 50,
  },
  {
    title: '成本价(元)',
    editRow: true,
    dataIndex: 'cost_price',
    editComponent: 'InputNumber',
    editComponentProps:{
      precision:2,
      min:0,
    },
    width: 50,
  },
  {
    title: '库存',
    editRow: true,
    dataIndex: 'stock',
    width: 40,
    editComponent: 'InputNumber',
    editComponentProps:{
      precision:0,
      min:0,
    },
  },
  {
    title: '重量(kg)',
    editRow: true,
    dataIndex: 'weight',
    editComponent: 'InputNumber',
    editComponentProps:{
      precision:2,
      min:0,
    },
    width: 50,
  },
  {
    title: '体积(m³)',
    editRow: true,
    dataIndex: 'volume',
    editComponent: 'InputNumber',
    editComponentProps:{
      precision:2,
      min:0,
    },
    width: 50,
  },
  {
    title: '商品编码',
    editRow: true,
    dataIndex: 'sku_no',
    width: 40,
  },
  {
    title: '商品条码',
    editRow: true,
    dataIndex: 'bar_code',
    width: 40,
  },
]

export const tableValuesColumns: BasicColumn[] = [
  {
    title: 'ID',
    dataIndex: 'id',
    width: 20,
    ifShow: false,
  },
  {
    title: '参数名称',
    dataIndex: 'title',
    width: 120,
  },
  {
    title: '参数值',
    dataIndex: 'data',
    width: 220,
  },
  {
    title: '排序',
    dataIndex: 'sort',
    width: 50,
  },
]
