<script lang="ts" setup>
import { columns, searchFormSchema } from './feedback.data'
import { useI18n } from '@/hooks/web/useI18n'
import { useMessage } from '@/hooks/web/useMessage'
import { IconEnum } from '@/enums/appEnum'
import {BasicTable, TableAction, useTable} from '@/components/Table'
import {getFeedBackPage, deleteFeedBack} from "@/api/web/feedback";

defineOptions({ name: 'FeedBack' })

const { t } = useI18n()
const { createMessage } = useMessage()
const [registerTable, { reload }] = useTable({
  title: '留言列表',
  api: getFeedBackPage,
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

async function handleDelete(record: Recordable) {
  await deleteFeedBack(record.id)
  createMessage.success(t('common.delSuccessText'))
  reload()
}
</script>

<template>
  <div>
    <BasicTable @register="registerTable">
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'action'">
          <TableAction
            :drop-down-actions="[
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
  </div>
</template>
