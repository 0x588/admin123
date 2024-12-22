<script lang="ts" setup>
import { nextTick } from 'vue'
import CateModal from './CateModal.vue'
import { columns, searchFormSchema } from './cate.data'
import { useI18n } from '@/hooks/web/useI18n'
import { useMessage } from '@/hooks/web/useMessage'
import { useModal } from '@/components/Modal'
import { IconEnum } from '@/enums/appEnum'
import { BasicTable, TableAction, useTable } from '@/components/Table'
import {deleteArticleCate, getArticleCateTree} from '@/api/web/articlecate'

defineOptions({ name: 'ArticleCate' })

const { t } = useI18n()
const { createMessage } = useMessage()
const [registerModal, { openModal }] = useModal()

const [register, { expandAll, collapseAll, reload }] = useTable({
  title: '部门列表',
  api: getList,
  columns,
  rowKey: 'id',
  formConfig: { labelWidth: 120, schemas: searchFormSchema },
  isTreeTable: true,
  pagination: false,
  useSearchForm: false,
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
  const res = await getArticleCateTree()
  return res
}

function handleCreate() {
  openModal(true, { isUpdate: false })
}

function handleEdit(record: Recordable) {
  openModal(true, { record, isUpdate: true })
}

async function handleDelete(record: Recordable) {
  await deleteArticleCate(record.id)
  createMessage.success(t('common.delSuccessText'))
  reload()
}

function onFetchSuccess() {
  nextTick(expandAll)
}

</script>

<template>
  <div>
    <BasicTable @register="register" @fetch-success="onFetchSuccess">
      <template #toolbar>
        <a-button type="primary" :pre-icon="IconEnum.ADD" @click="handleCreate">
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
              { icon: IconEnum.EDIT, label: t('action.edit'), auth: 'system:dept:update', onClick: handleEdit.bind(null, record),
               ifShow: () => record.id !== 1 },
              {
                icon: IconEnum.DELETE,
                danger: true,
                label: t('action.delete'),
                auth: 'system:dept:delete',
                popConfirm: {
                  title: t('common.delMessage'),
                  placement: 'left',
                  confirm: handleDelete.bind(null, record),
                },
                ifShow: () => record.id !== 1,
              },
            ]"
          />
        </template>
      </template>
    </BasicTable>
    <CateModal @register="registerModal" @success="reload()" />
  </div>
</template>
