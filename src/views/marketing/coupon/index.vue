<script lang="ts" setup>
import { columns, searchFormSchema } from './coupon.data'
import { useI18n } from '@/hooks/web/useI18n'
import { useMessage } from '@/hooks/web/useMessage'
import {BasicTable, useRender, useTable} from '@/components/Table'
import { Tag } from 'ant-design-vue';
import {curTimeStatus} from "@/utils/dateUtil";
import {getCouponPage} from "@/api/market/coupon";

defineOptions({ name: 'CouponList' })

const { t } = useI18n()
const { createMessage } = useMessage()
const [register, { reload, deleteTableDataRecord, updateTableDataRecord }] = useTable({
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
        <template v-if="column.key == 'get_type'">
          <div v-if="record.get_type == 0">无限制</div>
          <div v-if="record.get_type == 1">
            <div><span>开始:</span>{{useRender.renderDate(record.get_start_time)}}</div>
            <div><span>结束:</span>{{useRender.renderDate(record.get_end_time)}}</div>
            <div><Tag>{{ curTimeStatus(record.get_start_time as number, record.get_end_time as number)}}</Tag></div>
          </div>
        </template>
        <template v-if="column.key == 'validity_type'">
          <div v-if="record.validity_type == 0">
            <div><span>开始:</span>{{useRender.renderDate(record.start_time)}}</div>
            <div><span>结束:</span>{{useRender.renderDate(record.end_time)}}</div>
            <div><Tag>{{ curTimeStatus(record.start_time as number, record.end_time as number)}}</Tag></div>
          </div>
          <div v-if="record.validity_type == 1">
            <div><span>领取后:</span>{{record.validity_days}}天内有效</div>
          </div>
        </template>
        <template v-if="column.key === 'count'">
          <div><span>发布：</span> {{record.count}}</div>
          <div class="text-red-4"><span >剩余：</span> {{record.count - record.get_count}}</div>
        </template>
      </template>
    </BasicTable>
  </div>
</template>
