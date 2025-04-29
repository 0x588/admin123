<script lang="ts" setup>
import { onMounted } from 'vue'
import { columns, searchFormSchema } from './express.data'
import { useI18n } from '@/hooks/web/useI18n'
import { useMessage } from '@/hooks/web/useMessage'
import { useModal } from '@/components/Modal'
import { IconEnum } from '@/enums/appEnum'
import {BasicTable, TableAction, useTable} from '@/components/Table'
import ExpressModal from "@/views/shops/express/ExpressModal.vue";
import {deleteExpress, getExpressPage} from "@/api/shops/express";
import {useGo} from "@/hooks/web/usePage";

defineOptions({ name: 'ExpressList' })

const go = useGo();
const { t } = useI18n()
const { createMessage } = useMessage()
const [registerModal, { openModal }] = useModal()
const [register, { reload, deleteTableDataRecord, updateTableDataRecord }] = useTable({
  title: '物流配送',
  api: getExpressPage,
  columns,
  rowKey: 'id',
  formConfig: { labelWidth: 120, schemas: searchFormSchema },
  pagination: true,
  useSearchForm: true,
  showTableSetting: false,
  showIndexColumn: false,
  actionColumn: {
    width: 140,
    title: t('common.action'),
    dataIndex: 'action',
    fixed: 'right',
  },
})

function handleCreate(pid: number) {
  openModal(true, {isUpdate: false , pid: pid})
}

function handleEdit(record: Recordable) {
  openModal(true, { record, isUpdate: true })
}

async function handleDelete(record: Recordable) {
  await deleteExpress(record.id)
  createMessage.success(t('common.delSuccessText'))
  deleteTableDataRecord(record.id)
}

function handleSuccess(isUpdate: boolean, record: Record<any, any>) {
  if (isUpdate) {
    updateTableDataRecord(record.id, record)
  } else {
    reload()
  }
}

function handleFee(record: Recordable) {
  go(`/express-fee/${record.id}`)
}

onMounted(async () => {
})
</script>

<template>
  <div>
    <BasicTable @register="register">
      <template #toolbar>
        <a-button  type="primary" :pre-icon="IconEnum.ADD" @click="handleCreate">
          {{ t('action.create') }}
        </a-button>
      </template>
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'action'">
          <TableAction
            :actions="[
              { label: '运费模版', onClick: handleFee.bind(null, record) },
              { label: t('action.edit'), onClick: handleEdit.bind(null, record) },
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
    <ExpressModal width="50%" @register="registerModal" @success="handleSuccess" />
  </div>
</template>
