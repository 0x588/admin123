<script lang="ts" setup>
import { useI18n } from '@/hooks/web/useI18n'
import { useMessage } from '@/hooks/web/useMessage'
import { useModal } from '@/components/Modal'
import { IconEnum } from '@/enums/appEnum'
import { BasicTable, TableAction, useTable } from '@/components/Table'
import {deleteProduct, getProductPage} from "@/api/product/product";
import {columns, searchFormSchema} from "@/views/product/product/product";
import ProductModal from "@/views/product/product/ProductModal.vue";
import { Tag } from 'ant-design-vue';

defineOptions({ name: 'ProductList' })

const { t } = useI18n()
const { createMessage } = useMessage()
const [registerModal, { openModal }] = useModal()

const [registerTable, { reload }] = useTable({
  title: '商品列表',
  api: getProductPage,
  columns: columns,
  formConfig: {
    labelWidth: 120,
    schemas: searchFormSchema,
  },
  useSearchForm: true,
  showTableSetting: true,
  showIndexColumn: false,
  actionColumn: {
    width: 140,
    title: t('common.action'),
    dataIndex: 'action',
    fixed: 'right',
  },
})

function handleCreate() {
  openModal(true, { isUpdate: false })
}

function handleEdit(record: Recordable) {
  openModal(true, { record, isUpdate: true })
}

async function handleDelete(record: Recordable) {
  await deleteProduct(record.id)
  createMessage.success(t('common.delSuccessText'))
  reload()
}

function handleSuc() {
  reload()
}

</script>

<template>
  <div class="flex">
    <BasicTable  @register="registerTable">
      <template #toolbar>
        <a-button type="primary" :pre-icon="IconEnum.ADD" @click="handleCreate">
          {{ t('action.create') }}
        </a-button>
      </template>
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
        <template v-if="column.key === 'action'">
          <TableAction
            :actions="[
              { icon: IconEnum.EDIT, label: t('action.edit'), auth: 'system:dict:update', onClick: handleEdit.bind(null, record) },
              {
                icon: IconEnum.DELETE,
                danger: true,
                label: t('action.delete'),
                auth: 'system:dict:delete',
                popConfirm: {
                  title: t('common.delMessage'),
                  placement: 'left',
                  confirm: handleDelete.bind(null, record),
                },
              },
            ]"
          />
        </template>
      </template>
    </BasicTable>
    <ProductModal width="90%"  @register="registerModal" @success="handleSuc()" />
  </div>
</template>
