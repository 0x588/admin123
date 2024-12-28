<script lang="ts" setup>
import ArticleModal from './ArticleModal.vue'
import { columns, searchFormSchema } from './articlelist.data'
import { useI18n } from '@/hooks/web/useI18n'
import { useMessage } from '@/hooks/web/useMessage'
import { useModal } from '@/components/Modal'
import { IconEnum } from '@/enums/appEnum'
import {BasicTable, TableAction, TableImg, useTable} from '@/components/Table'
import { getArticlePage, deleteArticle } from '@/api/web/article'
import {onMounted, reactive} from "vue";
import {useGo} from "@/hooks/web/usePage";
import {useRoute} from "vue-router";
import {useTabs} from "@/hooks/web/useTabs";
import {getArticleCate} from "@/api/web/articlecate";

defineOptions({ name: 'WebArticleCateList' })

const searchInfo = reactive<Recordable>({})
const { t } = useI18n()
const go = useGo();
const { setTitle } = useTabs();
const route = useRoute();
const { createMessage } = useMessage()
const [registerModal, { openModal }] = useModal()
const [registerTable, { reload }] = useTable({
  title: '文章列表',
  api: getArticlePage,
  columns,
  formConfig: { labelWidth: 120, schemas: searchFormSchema },
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
  openModal(true, { isUpdate: false, cate_id: route.params?.cateId })
}

function handleEdit(record: Recordable) {
  openModal(true, { record, isUpdate: true })
}

async function handleDelete(record: Recordable) {
  await deleteArticle(record.id)
  createMessage.success(t('common.delSuccessText'))
  reload()
}

onMounted(() => {
  console.log(route.params)
  searchInfo.cate_id = route.params?.cateId;
  updateTitle()
  reload();
})

function updateTitle() {
  if (route.params?.cateId) {
    getArticleCate(Number(route.params?.cateId)).then((res) => {
      setTitle(res.title + "管理");
    });
  }
}

function handleView(record: Recordable) {
  go('/article/article-detail/' + record.id);
}
</script>

<template>
  <div class="flex">
    <BasicTable :search-info="searchInfo"  @register="registerTable">
      <template #toolbar>
        <a-button type="primary" :pre-icon="IconEnum.ADD" @click="handleCreate">
          {{ t('action.create') }}
        </a-button>
      </template>
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'cover'">
          <TableImg :size="120" :simpleShow="true" :imgList="[record.cover]" />
        </template>
        <template v-if="column.key === 'action'">
          <TableAction
            :actions="[
              { icon: IconEnum.EDIT, label: t('action.edit'), onClick: handleEdit.bind(null, record) },
              {
                icon: 'clarity:info-standard-line',
                label: '详情',
                onClick: handleView.bind(null, record),
              },
            ]"
            :drop-down-actions="[
              {
                icon: IconEnum.DELETE,
                danger: true,
                label: t('action.delete'),
                auth: 'system:role:delete',
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
    <ArticleModal @register="registerModal" @success="reload()" />
  </div>
</template>
