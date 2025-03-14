<script lang="ts" setup>
import {onMounted, reactive} from 'vue'
import {commonSpecTempColumns, commonSpecTempSearchFormSchema} from './template.spec'
import { useI18n } from '@/hooks/web/useI18n'
import { useMessage } from '@/hooks/web/useMessage'
import { useModal } from '@/components/Modal'
import { IconEnum } from '@/enums/appEnum'
import { BasicTable, TableAction, useTable } from '@/components/Table'
import { Tag } from 'ant-design-vue';
import CommonSpecTempModal from "@/views/product/spec-temp/SpecTemplateModal.vue";
import {deleteCommonSpecTemp, getCommonSpecTempPage} from "@/api/product/spec-temp";
import {listSimpleSpec} from "@/api/product/spec";

defineOptions({ name: 'ProductSpecTemp' })

const { t } = useI18n()
const { createMessage } = useMessage()
const [registerModal, { openModal }] = useModal()
const searchInfo = reactive<Recordable>({})

const [registerTable, { reload }] = useTable({
  title: '规格模版列表',
  api: getCommonSpecTempPage,
  columns: commonSpecTempColumns,
  formConfig: {
    labelWidth: 120,
    schemas: commonSpecTempSearchFormSchema,
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
  searchInfo.dictType = record.type
}

function handleCreate() {
  openModal(true, { isUpdate: false })
}

function handleEdit(record: Recordable) {
  openModal(true, { record, isUpdate: true })
}

async function handleDelete(record: Recordable) {
  await deleteCommonSpecTemp(record.id)
  createMessage.success(t('common.delSuccessText'))
  reload()
}

function handleSuc() {
  reload()
}

let idForSpecTitle = reactive({})

onMounted( async () => {
  var res =  await listSimpleSpec()
  for (const item of res) {
    idForSpecTitle[item.id] = item.title
  }
})

</script>

<template>
  <div class="flex">
    <BasicTable  @register="registerTable" @row-click="handleRowClick">
      <template #toolbar>
        <a-button type="primary" :pre-icon="IconEnum.ADD" @click="handleCreate">
          {{ t('action.create') }}
        </a-button>
      </template>
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'specIds'">
          <Tag color="red" v-for="item in JSON.parse(record.specIds)">{{idForSpecTitle[item]}}</Tag>
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
    <CommonSpecTempModal width="80%"  @register="registerModal" @success="handleSuc()" />
  </div>
</template>
