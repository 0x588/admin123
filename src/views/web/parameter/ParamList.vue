<script lang="ts" setup>
import { onMounted, watch} from 'vue'
import { searchFormSchema } from './param'
import { useI18n } from '@/hooks/web/useI18n'
import { useMessage } from '@/hooks/web/useMessage'
import { useModal } from '@/components/Modal'
import { IconEnum } from '@/enums/appEnum'
import {type BasicColumn, BasicTable, TableAction, useRender, useTable} from '@/components/Table'
import CreateParamListModal from "@/views/web/parameter/CreateParamListModal.vue";
import {deleteParamList, getParamListPage} from "@/api/web/parameter";
import {getConfigListWithCateId} from "@/api/system/common-config/config";

defineOptions({ name: 'ParamList' })

const props = defineProps({
  searchInfo: {
    type: Object as PropType<Recordable>,
    default: () => ({}),
  },
})

const { t } = useI18n()
const { createMessage } = useMessage()
const [registerModal, { openModal }] = useModal()

const [registerTable, { reload, setColumns, getForm }] = useTable({
  title: '分类下的列表',
  api: getApi,
  // columns: columns,
  formConfig: {
    labelWidth: 120,
    schemas: searchFormSchema,
    autoSubmitOnEnter: true,
  },
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

async function getApi() {
  var res = await getParamListPage({"cate_id":props.searchInfo.cate_id})
  res.list = res.list.map((item) => {
    var content = JSON.parse(item.content)
    return {...item, ...content}
  })
  console.log(res)
  return res
}

function handleCreate() {
  if (!props.searchInfo.cate_id) {
    createMessage.error('请在左边先选择分类')
    return
  }
  openModal(true, {
    isUpdate: false,
    "property_id": props.searchInfo.property_id,
    "cate_id": props.searchInfo.cate_id
  })
}

function handleEdit(record: Recordable) {
  openModal(true, { record,
    isUpdate: true,
    "property_id": props.searchInfo.property_id,
    "cate_id": props.searchInfo.cate_id
  })
}

async function handleDelete(record: Recordable) {
  await deleteParamList(record.id)
  createMessage.success(t('common.delSuccessText'))
  reload()
}

watch(
  () => props.searchInfo,
  (val) => {
    updateTableColumns()
    val && reload()
  },
  { deep: true },
)

async function updateTableColumns() {
  if (props.searchInfo.property_id === undefined)
    return
  var cates = await getConfigListWithCateId(props.searchInfo.property_id)
  var columns : BasicColumn[] = []
  for (const cfg of cates) {
    var column: BasicColumn = {
      dataIndex: cfg.name,
      title: cfg.title,
    }
    if (cfg.type !== 'Input') {
      column.customRender = ({ text }) => {
          return useRender.renderJsonPreview(text)
      }
    }
    columns.push(column)
  }
  await setColumns(columns)
}

onMounted(async () => {
  updateTableColumns()
})

watch(
  () => props.searchInfo.property_id,
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
    <CreateParamListModal @register="registerModal" @success="reload()" />
  </div>
</template>
