<script lang="ts" setup>
import {onMounted, reactive, ref} from 'vue'
import { useI18n } from '@/hooks/web/useI18n'
import { useMessage } from '@/hooks/web/useMessage'
import { useModal } from '@/components/Modal'
import { IconEnum } from '@/enums/appEnum'
import { BasicTable, TableAction, useTable } from '@/components/Table'
import {columns, searchFormSchema} from "./paramcate";
import CreateCateModal from "./CreateCateModal.vue";
import {deleteParamCate, getParamCatePage} from "@/api/web/parametercate";
import {useRoute} from "vue-router";
import ParamList from "@/views/web/parameter/ParamList.vue";
import {getArticle} from "@/api/web/article";

defineOptions({ name: 'WebParameter' })
const route = useRoute();
const { t } = useI18n()
const { createMessage } = useMessage()
const [registerModal, { openModal }] = useModal()
const searchInfo = reactive<Recordable>({})
const cateSearchInfo = reactive<Recordable>({})
const product = ref<any>({})

const [registerTable, { reload }] = useTable({
  title: '参数分类',
  api: getParamCatePage,
  columns: columns ,
  formConfig: {
    labelWidth: 120,
    schemas: searchFormSchema,
  },
  useSearchForm: false,
  showTableSetting: false,
  showIndexColumn: false,
  actionColumn: {
    width: 140,
    title: t('common.action'),
    dataIndex: 'action',
    fixed: 'right',
  },
})

onMounted(() => {
  cateSearchInfo.product_id = route.params?.productId;
  getArticle(Number(route.params?.productId)).then(res => {
    product.value = res
  })
})

function handleRowClick(record) {
  searchInfo.cate_id = record.id
  searchInfo.property_id = record.property_id
}

function handleCreate() {
  openModal(true, { isUpdate: false, product_id: route.params?.productId })
}

function handleEdit(record: Recordable) {
  openModal(true, { record, isUpdate: true })
}

async function handleDelete(record: Recordable) {
  await deleteParamCate(record.id)
  createMessage.success(t('common.delSuccessText'))
  reload()
}
</script>

<template>
  <div>
  <div class="p-2">
    <h1> 设置 <span class="text-blue-500">{{ product.title }}</span>  参数，请先添加参数分类，再点击分类名称添加参数列表</h1>
  </div>
  <div class="flex">
    <BasicTable class="w-1/3"  :search-info="cateSearchInfo" @register="registerTable" @row-click="handleRowClick">
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
    <ParamList class="w-2/3" :search-info="searchInfo"></ParamList>
    <CreateCateModal @register="registerModal" @success="reload()"></CreateCateModal>
  </div>
  </div>
</template>
