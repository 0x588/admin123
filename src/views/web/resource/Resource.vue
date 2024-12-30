<script lang="ts" setup>
import { watch } from 'vue'
import { columns, searchFormSchema } from './rs'
import { useI18n } from '@/hooks/web/useI18n'
import { useMessage } from '@/hooks/web/useMessage'
import { useModal } from '@/components/Modal'
import { IconEnum } from '@/enums/appEnum'
import { BasicTable, TableAction, useTable } from '@/components/Table'
import {deleteArticle, getArticlePage} from "@/api/web/article";
import WebResourceModal from "@/views/web/resource/ResourceModal.vue";

defineOptions({ name: 'ResourceList' })

const props = defineProps({
  searchInfo: {
    type: Object as PropType<Recordable>,
    default: () => ({}),
  },
})

const { t } = useI18n()
const { createMessage } = useMessage()
const [registerModal, { openModal }] = useModal()

const [registerTable, { reload }] = useTable({
  title: '',
  api: getArticlePage,
  columns: columns,
  formConfig: {
    labelWidth: 120,
    schemas: searchFormSchema,
    autoSubmitOnEnter: true,
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
  if (!props.searchInfo.cate_id) {
    createMessage.error('请在左边先选择分类')
    return
  }
  openModal(true, {
    record: {"cate_id": props.searchInfo.cate_id},
    isUpdate: false,
  })
}

function handleEdit(record: Recordable) {
  openModal(true, { record, isUpdate: true })
}

async function handleDelete(record: Recordable) {
  await deleteArticle(record.id)
  createMessage.success(t('common.delSuccessText'))
  reload()
}

watch(
  () => props.searchInfo,
  (val) => {
    val && reload()
  },
  { deep: true },
)
</script>

<template>
  <div>
    <BasicTable :search-info="searchInfo" @register="registerTable">
      <template #toolbar>
        <a-button v-if="searchInfo.cate_id"  type="primary" :pre-icon="IconEnum.ADD" @click="handleCreate">
          {{ t('action.create') }}
        </a-button>
      </template>
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'action'">
          <TableAction
            :actions="[
              { icon: IconEnum.EDIT, label: t('action.edit'),  onClick: handleEdit.bind(null, record) },
              {
                icon: IconEnum.DELETE,
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
    <WebResourceModal @register="registerModal" @success="reload()" />
  </div>
</template>
