<script lang="ts" setup>
import { columns, searchFormSchema } from './auth.data'
import {BasicTable, TableAction,  useTable} from '@/components/Table'
import {useI18n} from "@/hooks/web/useI18n";
import {useMessage} from "@/hooks/web/useMessage";
import {getMemberAuthPage} from "@/api/member/auth";
const { t } = useI18n()
const { createConfirm } = useMessage();
const { createMessage } = useMessage()

defineOptions({ name: 'MemberAuth' })
const [registerTable,  { reload }] = useTable({
  title: '授权用户列表',
  api: getMemberAuthPage,
  columns,
  formConfig: { labelWidth: 120, schemas: searchFormSchema },
  useSearchForm: true,
  showTableSetting: false,
  showIndexColumn: false,
  actionColumn: {
    width: 40,
    title: t('common.action'),
    dataIndex: 'action',
    fixed: 'right',
  },
})

function handleView(record: Recordable) {
  createConfirm({
    iconType: 'warning',
    content: () => '确定操作吗？',
    onOk: async () => {

      createMessage.success("操作成功")
      reload()
    },
  });
}
</script>

<template>
  <div>
    <BasicTable @register="registerTable">
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'member'">
          <div class="flex items-start flex-col ml-4">
            <div>ID: {{ record.member.id }}</div>
            <div>昵称: {{ record.member.nickname }}</div>
            <div>手机: {{ record.member.phone }}</div>
          </div>
        </template>
        <template v-if="column.key === 'pid'">
          <template v-if="record.pid === 0">
            <div>---</div>
          </template>
          <template v-else>
            <div>{{ record.pid }}</div>
          </template>
        </template>
        <template v-if="column.key === 'action'">
          <TableAction
            :actions="[
              {
                label: record.status == 1 ?'冻结用户':'解除冻结',
                onClick: handleView.bind(null, record),
              },
            ]"
          />
        </template>
      </template>
    </BasicTable>
  </div>
</template>
