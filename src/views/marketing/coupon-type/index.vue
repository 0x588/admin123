<script lang="ts" setup>
import { nextTick, onMounted } from 'vue'
import { columns, searchFormSchema, formApiParam } from './coupontype.data'
import { handleTree } from '@/utils/tree'
import { useI18n } from '@/hooks/web/useI18n'
import { useMessage } from '@/hooks/web/useMessage'
import { useModal } from '@/components/Modal'
import { IconEnum } from '@/enums/appEnum'
import {BasicTable, TableAction, useTable} from '@/components/Table'
import { deleteCate, getCatePage } from '@/api/product/cate'
import {randomUUID} from "@/views/form-design/utils";
import CouponTypeModal from "@/views/marketing/coupon-type/CouponTypeModal.vue";

defineOptions({ name: 'CouponTypeList' })

const { t } = useI18n()
const { createMessage } = useMessage()
const [registerModal, { openModal }] = useModal()
const [register, { expandAll, collapseAll, getForm, reload, deleteTableDataRecord, updateTableDataRecord }] = useTable({
  title: '商品分类',
  api: getList,
  columns,
  rowKey: 'id',
  formConfig: { labelWidth: 120, schemas: searchFormSchema },
  isTreeTable: true,
  pagination: false,
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

async function getList() {
  const res = await getCatePage(getForm().getFieldsValue() as any)
  return handleTree(res, 'id', 'pid')
}

function handleCreate(pid: number) {
  openModal(true, {isUpdate: false , pid: pid})
}

function handleEdit(record: Recordable) {
  openModal(true, { record, isUpdate: true })
}

async function handleDelete(record: Recordable) {
  await deleteCate(record.id)
  createMessage.success(t('common.delSuccessText'))
  formApiParam['title'] = randomUUID()
  deleteTableDataRecord(record.id)
}

function onFetchSuccess() {
  nextTick(expandAll)
}

function handleSuccess(isUpdate: boolean, record: Record<any, any>) {
  if (isUpdate) {
    updateTableDataRecord(record.id, record)
  } else {
    reload()
  }
}

onMounted(async () => {
})
</script>

<template>
  <div>
    <BasicTable @register="register" @fetch-success="onFetchSuccess">
      <template #toolbar>
        <a-button v-auth="['system:dept:create']" type="primary" :pre-icon="IconEnum.ADD" @click="handleCreate">
          {{ t('action.create') }}
        </a-button>
        <a-button @click="expandAll">
          {{ t('component.tree.expandAll') }}
        </a-button>
        <a-button @click="collapseAll">
          {{ t('component.tree.unExpandAll') }}
        </a-button>
      </template>
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'action'">
          <TableAction
            :actions="[
              { label: t('action.edit'), onClick: handleEdit.bind(null, record) },
              {
                label: '添加子类',
                onClick: handleCreate.bind(null, record.id),
              },
              {
                danger: true,
                label: t('action.delete'),
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
    <CouponTypeModal width="50%" @register="registerModal" @success="handleSuccess" />
  </div>
</template>
