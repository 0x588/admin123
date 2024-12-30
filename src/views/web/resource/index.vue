<script lang="ts" setup>
import { reactive} from 'vue'
import { useI18n } from '@/hooks/web/useI18n'
import { useMessage } from '@/hooks/web/useMessage'
import { useModal } from '@/components/Modal'
import { IconEnum } from '@/enums/appEnum'
import { BasicTable, TableAction, useTable } from '@/components/Table'
import { deleteDictType } from '@/api/system/dict/type'
import {columns, searchFormSchema} from "@/views/web/resource/rscate";
import CreateCateModal from "@/views/web/resource/CreateCateModal.vue";
import {getArticleCatePage} from "@/api/web/articlecate";
import ResourceList from "@/views/web/resource/Resource.vue";

defineOptions({ name: 'WebResource' })

const { t } = useI18n()
const { createMessage } = useMessage()
const [registerModal, { openModal }] = useModal()
const searchInfo = reactive<Recordable>({})

const [registerTable, { reload }] = useTable({
  title: '资源分类',
  api: getArticleCatePage,
  columns: columns ,
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


function handleRowClick(record) {
  searchInfo.cate_id = record.id
}

function handleCreate() {
  openModal(true, { isUpdate: false })
}

function handleEdit(record: Recordable) {
  openModal(true, { record, isUpdate: true })
}

async function handleDelete(record: Recordable) {
  await deleteDictType(record.id)
  createMessage.success(t('common.delSuccessText'))
  reload()
}
</script>

<template>
  <div class="flex">
    <BasicTable class="w-1/2" @register="registerTable" @row-click="handleRowClick">
      <template #toolbar>
        <a-button type="primary" :pre-icon="IconEnum.ADD" @click="handleCreate">
          {{ t('action.create') }}
        </a-button>
      </template>
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'action'">
          <TableAction
            :actions="[
              { icon: IconEnum.EDIT, label: t('action.edit'), onClick: handleEdit.bind(null, record) },
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
    <ResourceList class="w-1/2" :search-info="searchInfo"></ResourceList>
    <CreateCateModal @register="registerModal" @success="reload()"></CreateCateModal>
  </div>
</template>
