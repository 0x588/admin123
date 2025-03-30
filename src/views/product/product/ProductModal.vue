<script lang="ts" setup>
import {ref, toRaw, unref, watch} from 'vue'
import { useI18n } from '@/hooks/web/useI18n'
import { Tabs } from 'ant-design-vue';
import { useMessage } from '@/hooks/web/useMessage'
import {BasicForm, useForm, UseFormReturnType} from '@/components/Form'
import { BasicModal, useModalInner } from '@/components/Modal'
import {tabsFormSchema, productModel} from "@/views/product/product/product";
import {
  createProduct, getProduct,
  ProductSkuVo,
  ProductSpecVo, ProductVO, updateProduct,
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
  activeKey.value = 'tabs0'
  setModalProps({ confirmLoading: false })
  isUpdate.value = !!data?.isUpdate
  if (unref(isUpdate)) {
    const res = await getProduct(data.record.id)
    console.log(res)
    for (const item of tabsForms.value) {
      const { setFieldsValue } = item.Form[1];
      setFieldsValue({ ...res })
    }
    productModel.is_spec = res.is_spec
    if (res.attributes)
      attributes.value = res.attributes
    if (res.sku_list) {
      let tmpSku = res.sku_list.map(item => {
        if (item.picture && item.picture.length > 0) {
          item.picture = [item.picture]
        } else {
          item.picture = []
        }
        return item
      })
      skuList.value = tmpSku
    } else {
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
    }
    specChanged(res.spec_list)


  } else {
    for (const item of tabsForms.value) {
      const { resetFields } = item.Form[1];
      resetFields()
    }
  }
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
      console.log('22', getFieldsValue())
      // 表单已支持多级key
      values = deepMerge(getFieldsValue(), values);
      console.log(values)
    }
    if (values.is_spec) {
      if (specTempList.value.length <= 0 || skuList.value.length <= 0 ) {
        activeKey.value = 'tabs1';
        createMessage.error('请填写规格信息,并选择规格值');
        return
      }
      values.spec_list = toRaw(specTempList.value)
    } else {

    }

    let tmpSku:any = []
    skuList.value.forEach(item => {
      let pic = ''
      if (item.picture && item.picture.length > 0) {
        pic = item.picture[0]
      }
      var name = ""
      if (item.items)
        name = item.items.map((v:any)=>v.title).join(' ')
      tmpSku.push(Object.assign(item, {picture: pic, name: name}))
    })
    values.sku_list = tmpSku

    let selectAttributes:AttributeValue[] = []
    attributes.value.forEach((v)=>{
      if (v.title && v.data) {
        selectAttributes.push(toRaw(v))
      }
    })
    values.attributes = selectAttributes
    if (unref(isUpdate)) {
      await updateProduct(values as ProductVO)
    } else {
      await createProduct(values as ProductVO)
    }
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

let specTempList = ref<ProductSpecVo[]>([])
let skuList = ref<ProductSkuVo[]>([])

function specChanged(v: any) {
  specTempList.value = v
  console.log("spec change", v)
  let selectedSpecs:ProductSpecVo[] = []
  specTempList.value.forEach((v)=>{
    if (v.values && v.values?.length > 0) {
      let values = v.values.filter((v) => v.pitch_on)
      if (values.length > 0) {
        let spec = {...v}
        spec.values = values
        selectedSpecs.push(spec)
      }
    }
  })
  specOptionsChanged(selectedSpecs)
}

let oldSkuList:ProductSkuVo[] = []
function specOptionsChanged(v: any) {
  let arr = v.reduce((acc, curr) => {
    const result:any = [];
    acc.forEach(a => {
      curr.values.forEach(b => {
        result.push([...a, {...b, pid:curr.id, pname:curr.title}]);
      });
    });
    return result;
  }, [[]]);
  console.log("arr", arr);
  const merged = [...oldSkuList, ...toRaw((skuList.value))];
  oldSkuList = Array.from(new Map(merged.map(item => [item.data, item])).values()
  );
  skuList.value = arr.map((v:any)=>{
    let data = v.map((item:any) => item.id).join('-');
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
    if (oldSkuList.length > 0) {
      let old = oldSkuList.find((item)=>item.data == data)
      if (old) {
        obj = old
      }
    }
    obj.data = v.map(item => item.id).join('-');
    obj.items = v;
    return obj
  })
  console.log("old",oldSkuList)
  console.log("new",skuList.value)
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
    specChanged(specTempList.value)
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
          <SpecList v-if="productModel.is_spec" :spec-list="specTempList"  @change="specChanged"></SpecList>
          <SkuList :data-list="skuList" @change="skuChanged"></SkuList>
        </template>
        <template v-else-if="item.key == 'tabs3'">
         <AttributeList v-model:values="attributes"></AttributeList>
        </template>
      </TabPane>
    </Tabs>
  </BasicModal>
</template>
