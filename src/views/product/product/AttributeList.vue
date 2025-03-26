<script setup lang="ts">

import {IconEnum} from "@/enums/appEnum";
import {Select} from "ant-design-vue";
import {BasicTable, TableAction, useTable} from "@/components/Table";
import {useI18n} from "@/hooks/web/useI18n";
import {AttributeValue} from "@/api/product/attribute";
import {watch} from "vue";
import {isEqual} from "lodash-es";
import {tableValuesColumns} from "@/views/product/product/product";
const { t } = useI18n()
const props = defineProps({
  values: {
    type: Array<AttributeValue>,
    default: []
  },
})
const emit = defineEmits(['update:values']);

const [registerTable,{setTableData, deleteTableDataRecord}] = useTable({
  title: '参数列表',
  dataSource: props.values,
  columns: tableValuesColumns,
  showIndexColumn: false,
  bordered: true,
  pagination:false,
  actionColumn: {
    width: 60,
    title: t('common.action'),
    dataIndex: 'action',
    fixed: 'right',
  },
});


watch(() => props.values, (value, oldValue) => {
  if (isEqual(value, oldValue)) return;
  setTableData(value)
})


function handleCreate() {
  props.values.push({
    title: '',
    type: 1,
    value: '',
    data: '',
    sort: 10,
  })
  setTableData(props.values)
}

function handleChange(index: number, key: any, e :any) {
  const newValues = [...props.values];
  newValues[index][key] = e.target.value;
  emit("update:values", newValues);
}

function handleChangeSelect() {
  const newValues = [...props.values];
  emit("update:values", newValues);
}

async function handleDelete(record: Recordable, index: number) {
  props.values.splice(index, 1);
  deleteTableDataRecord(record.key)
  const newValues = [...props.values];
  emit("update:values", newValues);
}

function dataOptions(text :string) {
  return text.split('\n').map((item) => {
    return {
      value: item,
      label: item,
    };
  });
}

</script>

<template>
  <BasicTable
    @register="registerTable"
  >
    <template #toolbar>
      <a-button type="primary" :pre-icon="IconEnum.ADD" @click="handleCreate">
        {{ t('action.create') }}
      </a-button>
    </template>
    <template #bodyCell="{ column, record, index }">
      <template v-if="['sort'].includes(column.dataIndex as string)">
        <a-input :value="record[column.dataIndex as string]" @change="handleChange(index, column.dataIndex, $event)"></a-input>
      </template>
      <template v-if="['title'].includes(column.dataIndex as string)">
        <a-input v-if="record.id === undefined" :value="record[column.dataIndex as string]" @change="handleChange(index, column.dataIndex, $event)"></a-input>
        <div v-else>{{record[column.dataIndex as string]}}</div>
      </template>
      <template v-if="column.dataIndex === 'data'">
        <a-input v-if="record.type == 1" :value="record[column.dataIndex]" @change="handleChange(index, column.dataIndex, $event)"></a-input>
        <Select v-if="record.type == 2" style="width: 120px" v-model:value="values[index][column.dataIndex as string]" :options="dataOptions(values[index].value as string)" @change="handleChangeSelect"></Select>
        <Select v-if="record.type == 3" mode="multiple" style="width: 120px" v-model:value="values[index][column.dataIndex as string]" :options="dataOptions(values[index].value as string)" @change="handleChangeSelect"></Select>
      </template>
      <template v-if="column.key === 'action'">
        <TableAction
          :actions="[
              {
                icon: IconEnum.DELETE,
                danger: true,
                label: t('action.delete'),
                popConfirm: {
                  title: t('common.delMessage'),
                  placement: 'left',
                  confirm: handleDelete.bind(null, record, index),
                },
              },
            ]"
        />
      </template>
    </template>
  </BasicTable>
</template>

<style scoped lang="less">

</style>
