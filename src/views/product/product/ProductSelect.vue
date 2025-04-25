<script setup lang="ts">

import {onMounted, ref, watch} from "vue";
import {getProductByIds } from "@/api/product/product";
import {Table, TableColumn, Button } from 'ant-design-vue';
import {useModal} from "@/components/Modal";
import ProductSelectModal from "@/views/product/product/ProductSelectModal.vue";
import {isEqual} from "lodash-es";

const props = defineProps({
  values: {
    type: Array,
    default: () => []
  }
})

const emits = defineEmits(['update:values'])

var products = ref<any>([])

function handleDelete(row) {
  console.log(row)
  products.value.splice(products.value.indexOf(row), 1)
  const selectedRowKeys = products.value.map((row) => row.id)
  emits("update:values", selectedRowKeys);
}

watch(()=> props.values, async (value, oldValue) => {
  if (isEqual(value, oldValue)) {
    return
  }
  const ret = await getProductByIds(value as number[])
  products.value = ret
})

onMounted(async () => {
 if (props.values) {
   const ret = await getProductByIds(props.values as number[])
   products.value = ret
 }
})

const [registerModal, { openModal }] = useModal()

function openProductSelect() {
  const selectedRowKeys = products.value.map((row) => row.id)
  openModal(true, {
    selectedRowKeys: selectedRowKeys
  })
}

function handleSelectRows(rows) {
  console.log(rows)
  products.value = rows
  const selectedRowKeys = products.value.map((row) => row.id)
  emits("update:values", selectedRowKeys);
}

</script>

<template>
<div>
  <Button class="my-1" type="primary" @click="openProductSelect" size="small">选择商品</Button>
  <Table size="small" :pagination="false" :dataSource="products" rowKey="id">
    <TableColumn title="ID" dataIndex="id" />
    <TableColumn title="名称" dataIndex="name" />
    <TableColumn title="价格" dataIndex="price" />
    <TableColumn title="库存" dataIndex="stock" />
    <TableColumn title="操作">
      <template #customRender="{ record }">
        <Button danger size="small" @click="handleDelete(record)">删除</Button>
      </template>
    </TableColumn>
  </Table>
  <ProductSelectModal @register="registerModal" @success="handleSelectRows"></ProductSelectModal>
</div>
</template>

<style scoped lang="less">

</style>
