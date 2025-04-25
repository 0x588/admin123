<script setup lang="ts">

import { getProductPage} from "@/api/product/product";
import { Tag} from 'ant-design-vue';
import {BasicModal, useModalInner} from "@/components/Modal";
import {BasicTable, useTable} from "@/components/Table";
import {searchFormSchema, selectColumns} from "@/views/product/product/product";

const emit = defineEmits(['success', 'register'])

const [registerTable, {
  getSelectRows,
  setSelectedRowKeys,
}] = useTable({
  title: '商品列表',
  api: getProductPage,
  columns: selectColumns,
  formConfig: {
    labelWidth: 120,
    schemas: searchFormSchema,
  },
  useSearchForm: true,
  showTableSetting: false,
  showIndexColumn: false,
  rowKey: 'id',
  rowSelection: {
    type: 'checkbox',
  },
  showSelectionBar: true, // 显示多选状态栏
})

const [registerModal, { closeModal }] = useModalInner(async (data) => {
    setSelectedRowKeys(data.selectedRowKeys)
})

function handleSubmit() {
  const rows = getSelectRows()
  closeModal()
  emit("success", rows)
}

</script>

<template>
  <BasicModal v-bind="$attrs" :maskClosable="false" width="60%"
    title="选择商品" @register="registerModal"
    @ok="handleSubmit"
  >
    <BasicTable  @register="registerTable">
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'name'">
          <div class="whitespace-normal break-wordsi text-left" style="display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical;">{{record.name}}</div>
          <div class="flex mt-2">
            <Tag class="ml-1" color="blue" size="small" v-if="record.is_hot">热门</Tag>
            <Tag class="ml-1" color="blue" size="small" v-if="record.is_recommend">推荐</Tag>
            <Tag class="ml-1" color="blue" size="small" v-if="record.is_new">新品</Tag>
            <Tag class="ml-1" color="blue" size="small" v-if="record.is_spec">多规格</Tag>
            <Tag class="ml-1" color="blue" size="small" v-if="record.shipping_type === 1">包邮</Tag>
          </div>
        </template>
        <template v-if="column.key === 'cate_id'">
          {{record.cate.title}}
        </template>
      </template>
    </BasicTable>
  </BasicModal>
</template>

<style scoped lang="less">

</style>
