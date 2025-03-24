<script lang="ts" setup>
import { useI18n } from '@/hooks/web/useI18n'
import { useMessage } from '@/hooks/web/useMessage'
import { IconEnum } from '@/enums/appEnum'
import {BasicColumn, BasicTable, TableAction, useTable} from '@/components/Table'
import {ProductSkuVo} from "@/api/product/product";
import {skuColumns} from "@/views/product/product/product";
import {ref, watch} from "vue";
import {isEqual} from "lodash-es";
import ImageUpload from "@/components/Upload/src/components/ImageUpload.vue";
import {uploadApi} from "@/api/sys/upload";
import PicUpload from "@/components/Upload/src/PicUpload.vue";

defineOptions({ name: 'SkuList' })

const { t } = useI18n()
const { createMessage } = useMessage()

const props = defineProps({
  dataList: {
    type: Array<ProductSkuVo>,
    default:[]
  },
})

let data = ref<ProductSkuVo[]>([])



const [registerTable, { reload, setColumns }] = useTable({
  title: '商品属性',
  dataSource: data,
  columns: skuColumns,
  useSearchForm: false,
  showTableSetting: false,
  showIndexColumn: false,
  pagination: false,
  actionColumn: {
    width: 140,
    title: t('common.action'),
    dataIndex: 'action',
    fixed: 'right',
  },
})

watch(
  () => props.dataList,
  (value, oldValue) => {
    if (isEqual(value, oldValue)) return;
    if (value.length > 0) {
      let columns:BasicColumn[] = []
      let items = value[0].items
      items.forEach(item => {
        columns.push( {
          title: item.pname,
          dataIndex: item.pid,
          width: 30,
          key: 'specValue',
        })
      })
      columns.push(...skuColumns)
      setColumns(columns)
    } else {
      setColumns(skuColumns)
    }
    data.value = value
  },
  { deep: true},
);

async function handleDelete(record: Recordable) {
  createMessage.success(t('common.delSuccessText'))
  reload()
}

async function handleEdit(record: Recordable) {
  record.onEdit?.(true);
}

function getSpecValue(items: any, pid: any) {
  let result = ''
  items.forEach(item => {
    if (item.pid == pid) {
      result = item.title
    }
  })
  return result
}

</script>

<template>
  <div class="flex">
    <BasicTable  @register="registerTable">
      <template #bodyCell="{ column, record }">
        <template v-if="column.key == 'specValue'">
          {{getSpecValue(record.items, column.dataIndex)}}
        </template>
        <template v-if="column.key == 'picture'">
          <PicUpload v-model:value="record.picture" :max-number="1" :api="uploadApi"></PicUpload>
        </template>
        <template v-if="column.key === 'action'">
          <TableAction
            :actions="[
              { icon: IconEnum.EDIT, label: t('action.edit'), auth: 'system:dict:update', onClick: handleEdit.bind(null, record) },
              {
                icon: IconEnum.DELETE,
                danger: true,
                label: t('action.delete'),
                auth: 'system:dict:delete',
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
