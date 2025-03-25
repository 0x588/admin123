<script lang="ts" setup>
import {ref, unref, watch} from 'vue'
import { useI18n } from '@/hooks/web/useI18n'
import { Tabs } from 'ant-design-vue';
import { useMessage } from '@/hooks/web/useMessage'
import {BasicForm, useForm, UseFormReturnType} from '@/components/Form'
import { BasicModal, useModalInner } from '@/components/Modal'
import {tabsFormSchema, productModel} from "@/views/product/product/product";
import {createProduct, ProductSkuVo, ProductVO, updateProduct} from "@/api/product/product";
import {omit} from "lodash-es";
import SpecList from "@/views/product/product/SpecList.vue";
import SkuList from "@/views/product/product/SkuList.vue";


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
  try {
    const values = {}
    setModalProps({ confirmLoading: true })
    if (unref(isUpdate))
      await updateProduct(values as ProductVO)
    else
      await createProduct(values as ProductVO)

    closeModal()
    emit('success')
    createMessage.success(t('common.saveSuccessText'))
  }
  finally {
    setModalProps({ confirmLoading: false })
  }
}

function specChanged(v: any) {
  console.log(v)
}

let skuList = ref<ProductSkuVo[]>([])

function specOptionsChanged(v: any) {
  console.log(v)
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
  console.log(skuList.value)
}

function skuChanged(v: any) {
  console.log(v)
}

watch(()=>productModel.is_spec, (v)=>{
    console.log("11", v)
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
          <SpecList v-if="productModel.is_spec"  @options-change="specOptionsChanged" @change="specChanged"></SpecList>
          <SkuList :data-list="skuList" @change="skuChanged"></SkuList>
        </template>
      </TabPane>
    </Tabs>
  </BasicModal>
</template>
