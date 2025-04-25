<script lang="ts" setup>
import { nextTick, onMounted } from 'vue'
import { columns, searchFormSchema, formApiParam } from './coupontype.data'
import { useI18n } from '@/hooks/web/useI18n'
import { useMessage } from '@/hooks/web/useMessage'
import { useModal } from '@/components/Modal'
import { IconEnum } from '@/enums/appEnum'
import {BasicTable, TableAction, useTable} from '@/components/Table'
import CouponTypeModal from "@/views/marketing/coupon-type/CouponTypeModal.vue";
import {deleteCouponType, getCouponTypePage} from "@/api/market/coupon-type";

defineOptions({ name: 'CouponTypeList' })

const { t } = useI18n()
const { createMessage } = useMessage()
const [registerModal, { openModal }] = useModal()
const [register, { reload, deleteTableDataRecord, updateTableDataRecord }] = useTable({
  title: '优惠券列表',
  api: getCouponTypePage,
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
  await deleteCouponType(record.id)
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
        <a-button v-auth="['system:dept:create']" type="primary" :pre-icon="IconEnum.ADD" @click="handleCreate">
          {{ t('action.create') }}
        </a-button>
      </template>
      <template #bodyCell="{ column, record }">
        <template v-if="column.key == 'discount_type'">
          <span v-if="record.at_least <= 0">无门槛 </span>
          <span v-if="record.at_least > 0">满{{record.at_least}}元 </span>
          <span v-if="record.discount_type == 1">减{{record.discount}}元</span>
          <span v-if="record.discount_type == 2">打{{record.discount}}折</span>
        </template>
        <template v-if="column.key == 'get_type'">
          <div v-if="record.get_type == 0">无限制</div>
          <div v-if="record.get_type == 1">

          </div>
        </template>
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
