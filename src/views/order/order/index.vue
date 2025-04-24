<script lang="ts" setup>
import { columns, searchFormSchema } from './order.data'
import {BasicTable, TableAction, useTable} from '@/components/Table'
import {useI18n} from "@/hooks/web/useI18n";
import {getOrderPage, getOrderStatusCount, OrderPageReqVO, updateOrder} from "@/api/order/order";
import {message, Tabs} from 'ant-design-vue';
import {ref} from "vue";
import {useDrawer} from "@/components/Drawer";
import DetailDrawer from "@/views/order/order/DetailDrawer.vue";
import { createPrompt } from '@/components/Prompt';


const { t } = useI18n()

defineOptions({ name: 'OrderList' })
const [registerTable,  { reload, getForm }] = useTable({
  title: '订单列表',
  api: getList,
  columns,
  formConfig: { labelWidth: 120, schemas: searchFormSchema },
  useSearchForm: true,
  showTableSetting: false,
  showIndexColumn: false,
  actionColumn: {
    width: 100,
    title: t('common.action'),
    dataIndex: 'action',
    fixed: 'right',
  },
})

const activeKey = ref("")
const statusCount = ref<any>([])
async function getList() {
  var params = getForm().getFieldsValue() as OrderPageReqVO
  params.order_status = activeKey.value
  statusCount.value = await getOrderStatusCount(params)
  const res = await getOrderPage(params)
  return res
}

function handleTabChange(tab) {
  reload()
}

const [registerDrawer, { openDrawer }] = useDrawer();

function handleView(record: Recordable) {
  openDrawer(true, {
    orderId: record.id,
  });
}

function handleMemo(record: Recordable) {
  createPrompt({
    title: '请输入订单备注',
    required: true,
    label: '商家备注',
    defaultValue: record.seller_memo,
    onOK: async (memo: string) => {
      var ret = await updateOrder(record.id, {
        seller_memo: memo,
      })
      if(ret){
        message.success('修改成功');
      }
    },
    inputType: 'InputTextArea',
  });
}

</script>

<template>
  <div>

    <BasicTable @register="registerTable">
      <template #headerTop>
        <Tabs v-model:activeKey="activeKey" @change="handleTabChange">
          <Tabs.TabPane key="" :tab="statusCount['']??'全部(0)'"></Tabs.TabPane>
          <Tabs.TabPane key="0" :tab="statusCount['0']??'待付款(0)'"></Tabs.TabPane>
          <Tabs.TabPane key="1" :tab="statusCount['1']??'已付款(0)'"></Tabs.TabPane>
          <Tabs.TabPane key="19" :tab="statusCount['19']??'部分发货(0)'"></Tabs.TabPane>
          <Tabs.TabPane key="20" :tab="statusCount['20']??'已发货(0)'"></Tabs.TabPane>
          <Tabs.TabPane key="30" :tab="statusCount['30']??'已签收(0)'"></Tabs.TabPane>
          <Tabs.TabPane key="40" :tab="statusCount['40']??'已完成(0)'"></Tabs.TabPane>
          <Tabs.TabPane key="-10" :tab="statusCount['-10']??'申请退款(0)'"></Tabs.TabPane>
          <Tabs.TabPane key="-11" :tab="statusCount['-11']??'退款中(0)'"></Tabs.TabPane>
          <Tabs.TabPane key="-12" :tab="statusCount['-12']??'已退款(0)'"></Tabs.TabPane>
          <Tabs.TabPane key="-20" :tab="statusCount['-20']??'已关闭(0)'"></Tabs.TabPane>
        </Tabs>
      </template>
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'buyer_nickname'">
         <span>{{record.buyer_nickname}} ID: {{record.buyer_id}}</span>
        </template>
        <template v-if="column.key === 'action'">
          <TableAction
            :actions="[
              {
                label: '详情',
                onClick: handleView.bind(null, record),
              },
              {
                label: '备注',
                onClick: handleMemo.bind(null, record),
              }
            ]"
          />
        </template>
      </template>
    </BasicTable>
    <DetailDrawer @register="registerDrawer"/>
  </div>
</template>
