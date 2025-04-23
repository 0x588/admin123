<script setup lang="ts">
import {BasicDrawer, useDrawerInner} from '@/components/Drawer';
import {Description, useDescription} from "@/components/Description";
import {Tabs} from "ant-design-vue";
import {getOrder} from "@/api/order/order";
import {BasicTable, useTable} from "@/components/Table";
import {baseSchema, productsColumns} from "@/views/order/order/order.data";

defineOptions({ name: 'DetailDrawer' });

const [registerTable, { setTableData, reload }] = useTable({
  title: '',
  columns: productsColumns,
  useSearchForm: false,
  showTableSetting: false,
  showIndexColumn: false,
  size: "small",
})


const [registerDesc, {setDescProps}] = useDescription({
  title: "用户信息",
  bordered: false,
  schema: baseSchema,
  column: 2,
});

const [register] = useDrawerInner(async (data) => {
  console.log(data)
  const ret = await getOrder(data.orderId)
  setTableData(ret.order_product)
  reload()
  setDescProps({
    data:ret
  });
})


</script>

<template>
  <BasicDrawer v-bind="$attrs" @register="register" title="订单详情" width="50%">
    <Tabs>
      <Tabs.TabPane key="1" tab="订单信息">
        <Description @register="registerDesc"/>
      </Tabs.TabPane>
      <Tabs.TabPane :forceRender="true" key="2" tab="商品信息">
        <BasicTable @register="registerTable">
        </BasicTable>
      </Tabs.TabPane>
    </Tabs>
  </BasicDrawer>
</template>

<style scoped lang="less">

</style>
