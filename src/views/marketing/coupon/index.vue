<script lang="ts" setup>
import { columns, searchFormSchema } from './coupon.data'
import { useI18n } from '@/hooks/web/useI18n'
import { useMessage } from '@/hooks/web/useMessage'
import {BasicTable, useTable} from '@/components/Table'
import {getCouponPage} from "@/api/market/coupon";

defineOptions({ name: 'CouponList' })

const [register] = useTable({
  title: '领取列表',
  api: getCouponPage,
  columns,
  rowKey: 'id',
  formConfig: { labelWidth: 120, schemas: searchFormSchema },
  pagination: true,
  useSearchForm: true,
  showTableSetting: false,
  showIndexColumn: false,
})

</script>

<template>
  <div>
    <BasicTable @register="register">
      <template #toolbar>
      </template>
      <template #bodyCell="{ column, record }">
        <template v-if="column.key == 'discount_type'">
          <span v-if="record.at_least <= 0">无门槛 </span>
          <span v-if="record.at_least > 0">满{{record.at_least}}元 </span>
          <span v-if="record.discount_type == 1">减{{record.discount}}元</span>
          <span v-if="record.discount_type == 2">打{{record.discount}}折</span>
        </template>

        <template v-if="column.key == 'member_id'">
          <div>{{record.member.nickname}} ID:{{record.member_id}}</div>
          <div>{{record.member.phone}}</div>
        </template>
        <template v-if="column.key === 'count'">
          <div><span>发布：</span> {{record.count}}</div>
          <div class="text-red-4"><span >剩余：</span> {{record.count - record.get_count}}</div>
        </template>
      </template>
    </BasicTable>
  </div>
</template>
