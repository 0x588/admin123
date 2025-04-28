import type { FormSchema } from '@/components/Table'

import provinces from '@/assets/area/provinces.json'
import areas from '@/assets/area/areas.json'
import cities from '@/assets/area/cities.json'

const options = provinces.map(province => {
  const childrenCities = cities
    .filter(city => city.provinceCode === province.code)
    .map(city => {
      const childrenAreas = areas
        .filter(area => area.cityCode === city.code)
        .map(area => ({
          label: area.name,
          value: area.code,
          isLeaf: true,
        }));
      return {
        label: city.name,
        value: city.code,
        children: childrenAreas,
      };
    });
  return {
    label: province.name,
    value: province.code,
    children: childrenCities,
  };
});

export const formSchema: FormSchema[] = [
  {
    label: '编号',
    field: 'id',
    show: false,
    component: 'Input',
  },
  {
    label: '开启满额包邮',
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
    helpMessage: "只有启用该选项，才可以使用满额包邮功能",
  },
  {
    label: '选择不包邮地区',
    field: 'no_mail_province_ids',
    component: 'Cascader',
    componentProps: {
      options: options,
      multiple: true,
    }
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
    helpMessage: "订单金额超出该金额可使用满额包邮",
  },
]
