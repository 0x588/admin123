<script lang="ts" setup>
import { onMounted } from 'vue'
import { columns, searchFormSchema } from './expressfee.data'
import { useI18n } from '@/hooks/web/useI18n'
import { useMessage } from '@/hooks/web/useMessage'
import { useModal } from '@/components/Modal'
import { IconEnum } from '@/enums/appEnum'
import {BasicTable, TableAction, useTable} from '@/components/Table'
import {
  deleteExpressFee,
  ExpressFeePageReqVO,
  getExpressFeePage
} from "@/api/shops/express-fee";
import {useRoute} from "vue-router";
import ExpressFeeModal from "@/views/shops/express-fee/ExpressFeeModal.vue";

defineOptions({ name: 'ExpressList' })

const { t } = useI18n()
const route = useRoute();
const { createMessage } = useMessage()
const [registerModal, { openModal }] = useModal()
const [register, { reload, deleteTableDataRecord, updateTableDataRecord, getSearchInfo }] = useTable({
  title: '运费模版',
  api: getPage,
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

async function getPage() {
  const params = getSearchInfo()
  params.express_id = route.params.id
  const res = await getExpressFeePage(params as ExpressFeePageReqVO)
  return res
}

function handleCreate(pid: number) {
  openModal(true, {isUpdate: false , express_id: route.params.id})
}

function handleEdit(record: Recordable) {
  openModal(true, { record, isUpdate: true })
}

async function handleDelete(record: Recordable) {
  await deleteExpressFee(record.id)
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
    <ExpressFeeModal width="60%" @register="registerModal" @success="handleSuccess" />
  </div>
</template>
