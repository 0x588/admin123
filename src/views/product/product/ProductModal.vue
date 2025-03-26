<script lang="ts" setup>
import {ref, unref, watch} from 'vue'
import { useI18n } from '@/hooks/web/useI18n'
import { Tabs } from 'ant-design-vue';
import { useMessage } from '@/hooks/web/useMessage'
import {BasicForm, useForm, UseFormReturnType} from '@/components/Form'
import { BasicModal, useModalInner } from '@/components/Modal'
import {tabsFormSchema, productModel} from "@/views/product/product/product";
import {
  ProductSkuVo,
  ProductSpecVo,
} from "@/api/product/product";
import {omit} from "lodash-es";
import SpecList from "@/views/product/product/SpecList.vue";
import SkuList from "@/views/product/product/SkuList.vue";
import {getCommonSpecsByTemplateId} from "@/api/product/spec-temp";
import AttributeList from "@/views/product/product/AttributeList.vue";
import {AttributeValue, getCommonAttribute} from "@/api/product/attribute";
import {deepMerge} from "@/utils";


defineOptions({ name: 'ProductModal' })

const emit = defineEmits(['success', 'register'])
const { t } = useI18n()
const { createMessage } = useMessage()
const isUpdate = ref(true)
const TabPane = Tabs.TabPane;
type TabsFormType = {
  key: string;
  tab: string;
  forceRender?: boolean;
  Form: UseFormReturnType;
};
const tabsForms = ref<TabsFormType[]>([]);
const activeKey = ref('tabs0');
const tabTitle = ['基本信息', '商品规格', '商品图片', '商品参数']

function createSchema() {
  for (let i = 0; i < tabsFormSchema.length; i++) {
    const tabsKey = `tabs${i}`;
    tabsForms.value.push({
      key: tabsKey,
      tab: tabTitle[i],
      forceRender: true,
      Form: useForm({
        labelWidth: 120,
        baseColProps: { span: 24 },
        schemas: tabsFormSchema[i],
        showActionButtonGroup: false,
        actionColOptions: { span: 23 },
      })
    })
  }
}

createSchema()

const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
  console.log("1234")
  activeKey.value = 'tabs0'
  setModalProps({ confirmLoading: false })
  isUpdate.value = !!data?.isUpdate
  // if (unref(isUpdate)) {
  //   const res = await getProduct(data.record.id)
  //   // setFieldsValue({ ...res })
  // }
})

async function handleSubmit() {
  let lastKey = '';
  try {
    let values: Recordable = {};
    setModalProps({ confirmLoading: true })
    for (const item of tabsForms.value) {
      lastKey = item.key;
      const { validate, getFieldsValue } = item.Form[1];
      console.log('11', validate, getFieldsValue)
      await validate();
      console.log('22')
      // 表单已支持多级key
      values = deepMerge(getFieldsValue(), values);
      console.log(values)
    }
    if (values.is_spec) {
      if (specList.length <= 0 || skuList.value.length <= 0 ) {
        activeKey.value = 'tabs1';
        createMessage.error('请填写规格信息,并选择规格值');
        return
      }
      values.spec_list = specList
    } else {

    }
    values.sku_list = skuList.value

    console.log('submit values: ', values);
    closeModal()
    emit('success')
    createMessage.success('提交成功');
  } catch (e) {
    // 验证失败或出错，切换到对应标签页
    activeKey.value = lastKey;
    console.log(e);
  } finally {
    setModalProps({ confirmLoading: false })
  }
}

let specList:ProductSpecVo[] = []
let specTempList = ref<ProductSpecVo[]>([])

function specChanged(v: any) {
}

let skuList = ref<ProductSkuVo[]>([])

function specOptionsChanged(v: any) {
  console.log(v)
  specList = v
  let arr = v.reduce((acc, curr) => {
    const result:any = [];
    acc.forEach(a => {
      curr.values.forEach(b => {
        result.push([...a, {...b, pid:curr.id, pname:curr.title}]);
      });
    });
    return result;
  }, [[]]);
  console.log(arr);
  skuList.value = arr.map((v:any)=>{
    let obj:ProductSkuVo = {
      stock: 0,
      price: 0,
      cost_price: 0,
      market_price: 0,
      sku_no: '',
      bar_code: '',
      weight: 0,
      volume: 0,
      picture: [],
    }
    obj.data = v.map(item => item.id).join('-');
    obj.items = v;
    return obj
  })
}

function skuChanged(v: any) {
  console.log(v)
}

watch(()=>productModel.is_spec, (v)=>{
    console.log("11", v)
  if (!v) {
    skuList.value = [
      {
        stock: 0,
        price: 0,
        cost_price: 0,
        market_price: 0,
        sku_no: '',
        bar_code: '',
        weight: 0,
        volume: 0,
        picture: [],
      }
    ]
  } else {

  }
})

watch(()=>productModel.spec_template_id,  async (v) => {
  if (v) {
    let res = await getCommonSpecsByTemplateId(v)
    specTempList.value = res
    console.log(specTempList.value)
  }
})

let attributes = ref<AttributeValue[]>([])
watch(()=>productModel.attribute_id,  async (v)=>{
  if (v) {
    let res = await getCommonAttribute(v)
    attributes.value = res.values
    console.log(res)
  }
})

watch( attributes, (v) => {
  console.log("aaa", v)
})

</script>

<template>
  <BasicModal :maskClosable="false" :destroyOnClose="false" v-bind="$attrs" :title="isUpdate ? t('action.edit') : t('action.create')"
              @register="registerModal" @ok="handleSubmit">
    <Tabs v-model:activeKey="activeKey">
      <TabPane
        v-for="item in tabsForms"
        :key="item.key"
        v-bind="omit(item, ['Form', 'key'])"
      >
        <BasicForm @register="item.Form[0]"/>
        <template v-if="item.key == 'tabs1'">
          <SpecList v-if="productModel.is_spec" :spec-list="specTempList"  @options-change="specOptionsChanged" @change="specChanged"></SpecList>
          <SkuList :data-list="skuList" @change="skuChanged"></SkuList>
        </template>
        <template v-else-if="item.key == 'tabs3'">
         <AttributeList v-model:values="attributes"></AttributeList>
        </template>
      </TabPane>
    </Tabs>
  </BasicModal>
</template>
