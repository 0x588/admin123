<script lang="ts" setup>
import {useI18n} from '@/hooks/web/useI18n'
import {
  ActionItem,
  BasicColumn,
  BasicTable,
  EditRecordRow,
  TableAction,
  useTable
} from '@/components/Table'
import {ProductSkuVo} from "@/api/product/product";
import {skuColumns} from "@/views/product/product/product";
import {ref, toRaw, watch} from "vue";
import {cloneDeep, isEqual} from "lodash-es";
import {uploadApi} from "@/api/sys/upload";
import PicUpload from "@/components/Upload/src/PicUpload.vue";
import {Input, InputNumber, Button} from 'ant-design-vue';
import HeaderCell from "@/components/Table/src/components/HeaderCell.vue";


defineOptions({name: 'SkuList'})

const {t} = useI18n()
const currentEditKeyRef = ref('');

const props = defineProps({
  dataList: {
    type: Array<ProductSkuVo>,
    default: []
  },
})
const emit = defineEmits(['change']);

let data: ProductSkuVo[] = []

const [registerTable, {setTableData, setColumns}] = useTable({
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
      let columns: BasicColumn[] = []
      let items = value[0].items
      if (items && items.length > 0) {
        items.forEach(item => {
          columns.push({
            title: item.pname,
            dataIndex: item.pid,
            width: 30,
            key: 'specValue',
          })
        })
      }
      columns.push(...skuColumns)
      setColumns(columns)
    } else {
      setColumns(skuColumns)
    }
    data = toRaw(value)
    setTableData(data)
  },
  {deep: true},
);

function handleEdit(record: EditRecordRow) {
  currentEditKeyRef.value = record.key;
  record.onEdit?.(true);
}

function handleCancel(record: EditRecordRow) {
  currentEditKeyRef.value = '';
  record.onEdit?.(false, false);
}

async function handleSave(record: EditRecordRow) {
  const valid = await record.onValid?.();
  if (valid) {
    try {
      let rowData = cloneDeep(record.editValueRefs);
      const pass = await record.onEdit?.(false, true);
      if (pass) {
        currentEditKeyRef.value = '';
      }
      data.forEach((item) => {
        if (item.data == record.data) {
          return Object.assign(item, rowData);
        }
        return item;
      })
      emit('change', data)
    } catch (error) {
    }
  } else {
  }
}

function createActions(record: EditRecordRow): ActionItem[] {
  if (!record.editable) {
    return [
      {
        label: '编辑',
        disabled: currentEditKeyRef.value ? currentEditKeyRef.value !== record.key : false,
        onClick: handleEdit.bind(null, record),
      },
    ];
  }
  return [
    {
      label: '保存',
      onClick: handleSave.bind(null, record),
    },
    {
      label: '取消',
      popConfirm: {
        title: '是否取消编辑',
        confirm: handleCancel.bind(null, record),
      },
    },
  ];
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

let batchProductSku = ref({
  picture: [],
  price: '',
  market_price: '',
  cost_price: '',
  stock: '',
  sku_no: '',
  bar_code: '',
  weight: '',
  volume: '',
})

function clearBatchProductSku() {
  batchProductSku.value = {
    picture: [],
    price: '',
    market_price: '',
    cost_price: '',
    stock: '',
    sku_no: '',
    bar_code: '',
    weight: '',
    volume: '',
  }
}

function setBatchProductSku() {
  data.forEach((item) => {
    for (const kk in batchProductSku.value) {
      if (kk === 'picture' && batchProductSku.value.picture.length > 0) {
        item.picture = batchProductSku.value.picture
      } else if (batchProductSku.value[kk] !== '' && batchProductSku.value[kk] !== undefined) {
        item[kk] = batchProductSku.value[kk]
      }
    }
  })
  setTableData(data)
  emit('change', data)
}

</script>

<template>
  <div class="flex">
    <BasicTable @register="registerTable">
      <template #headerCell="{ column }">
        <template v-if="['sku_no', 'bar_code'].includes(column.key as string)">
          <div>{{ column.title }}</div>
          <Input v-model:value="batchProductSku[column.key as string]" size="small"></Input>
        </template>
        <template
          v-else-if="['price', 'market_price', 'cost_price', 'stock', 'weight', 'volume'].includes(column.key as string)">
          <div>{{ column.title }}</div>
          <InputNumber :min="0" v-model:value="batchProductSku[column.key as string]"
                       size="small"></InputNumber>
        </template>
        <template v-else-if="column.key === 'picture'">
          <div>{{ column.title }}</div>
          <PicUpload v-model:value="batchProductSku.picture" :max-number="1"
                     :api="uploadApi"></PicUpload>
        </template>
        <template v-else-if="column.key === 'action'">
          <div>{{ column.title }}</div>
          <div class="flex justify-center">
            <Button @click="setBatchProductSku" type="link" danger>批量设置</Button>
            <Button @click="clearBatchProductSku" type="link" danger>清空</Button>
          </div>
        </template>
        <template v-else>
          <HeaderCell :column="column"/>
        </template>
      </template>
      <template #bodyCell="{ column, record }">
        <template v-if="column.key == 'specValue'">
          {{ getSpecValue(record.items, column.dataIndex) }}
        </template>
        <template v-if="column.key == 'picture'">
          <PicUpload v-model:value="record.picture" :max-number="1" :api="uploadApi"></PicUpload>
        </template>
        <template v-if="column.key === 'action'">
          <TableAction :actions="createActions(record)"/>
        </template>
      </template>
    </BasicTable>
  </div>
</template>
