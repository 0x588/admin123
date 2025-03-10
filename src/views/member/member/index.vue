<script lang="ts" setup>
import { columns, searchFormSchema } from './member.data'
import {BasicTable, TableAction, useRender, useTable} from '@/components/Table'
import {changeMemberStatus, getMemberPage} from '@/api/member/info'
import {useI18n} from "@/hooks/web/useI18n";
import {useMessage} from "@/hooks/web/useMessage";
const { t } = useI18n()
const { createConfirm } = useMessage();
const { createMessage } = useMessage()

defineOptions({ name: 'MemberInfo' })
const [registerTable,  { reload }] = useTable({
  title: '会员列表',
  api: getMemberPage,
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
      await changeMemberStatus(record.id, record.status == 1 ? 0 : 1)
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
        <template v-if="column.key === 'created_at'">
          <div class="flex flex-col items-start">
            <div>最后访问ip: {{ record.last_ip }}</div>
            <div>最后访问时间: {{ useRender.renderDate(record.updated_at) }}</div>
            <div>登录次数：{{ record.visit_count }}</div>
            <div>注册时间: {{ useRender.renderDate(record.created_at) }}</div>
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
