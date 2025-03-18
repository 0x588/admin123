<script lang="ts" setup>
import {ref, toRaw, unref} from 'vue'
import {formSchema, tableValuesColumns} from './common.attribute'
import { useI18n } from '@/hooks/web/useI18n'
import { useMessage } from '@/hooks/web/useMessage'
import { BasicForm, useForm } from '@/components/Form'
import { BasicModal, useModalInner } from '@/components/Modal'
import {
  CommonAttributeVO,
  createCommonAttribute,
  getCommonAttribute,
  updateCommonAttribute
} from "@/api/product/attribute";
import {BasicTable, TableAction, useTable} from "@/components/Table";
import {IconEnum} from "@/enums/appEnum";
import { Select, Button, Modal, Textarea } from 'ant-design-vue';

defineOptions({ name: 'CommonAttributeModal' })

const emit = defineEmits(['success', 'register'])
const { t } = useI18n()
const { createMessage } = useMessage()
const isUpdate = ref(true)

const [registerForm, { setFieldsValue, resetSchema, resetFields, validate }] = useForm({
  labelWidth: 120,
  baseColProps: { span: 24 },
  schemas: formSchema,
  showActionButtonGroup: false,
  actionColOptions: { span: 23 },
})

let values: any[] = []

const [registerTable,{setTableData, getDataSource, deleteTableDataRecord}] = useTable({
  title: '属性列表',
  dataSource: values,
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

const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
  resetSchema(formSchema)
  resetFields()
  setTableData([])
  setModalProps({ confirmLoading: false })
  isUpdate.value = !!data?.isUpdate
  if (unref(isUpdate)) {
    const res = await getCommonAttribute(data.record.id)
    setFieldsValue({ ...res })
    setTableData(res.values)
  }
})

async function handleSubmit() {
  try {
    const values = await validate()
    var value2 = toRaw(getDataSource())
    console.log(value2)

    if (value2 != null && value2.length > 0) {
      values.values = value2.filter((v) => v !== null && v.title !== null && v.title !== '')
    }
    console.log("123", values)
    setModalProps({ confirmLoading: true })
    if (unref(isUpdate))
      await updateCommonAttribute(values as CommonAttributeVO)
    else
      await createCommonAttribute(values as CommonAttributeVO)

    closeModal()
    emit('success')
    createMessage.success(t('common.saveSuccessText'))
  }
  finally {
    setModalProps({ confirmLoading: false })
  }
}

function handleCreate() {
  values = getDataSource()
  console.log(values)
  values.push({
    title: '',
    type: 1,
    value: '',
    sort: 10,
  })
  console.log('value', values)
  setTableData(values)
}

async function handleDelete(record: Recordable) {
  deleteTableDataRecord(record.key)
}

const typeOptions = [
  { value: 1, label: '输入框' },
  { value: 2, label: '单选' },
  { value: 3, label: '多选' },
];

const open = ref<boolean>(false);
var currentKey:any
const handleOk = (e: MouseEvent) => {
  open.value = false;
  var v = getDataSource()
  v = v.map(item => {
      if (item.key === currentKey) {
        item.value = editValue.value
      }
      return toRaw(item)
    }
  );
  setTableData(v)
}

const btnClick = (record: Record<string, any>) => {
  open.value = true;
  currentKey = record.key
  editValue.value = record.value
}
const editValue = ref<string>('')
</script>

<template>
  <BasicModal v-bind="$attrs" :title="isUpdate ? t('action.edit') : t('action.create')" @register="registerModal" @ok="handleSubmit">
    <BasicForm @register="registerForm" >
      <template #formFooter>
        <BasicTable
          @register="registerTable"
        >
          <template #toolbar>
            <a-button type="primary" :pre-icon="IconEnum.ADD" @click="handleCreate">
              {{ t('action.create') }}
            </a-button>
          </template>
          <template #bodyCell="{ column, record }">
            <template v-if="['title', 'sort'].includes(column.dataIndex as string)">
              <a-input v-model:value="record[column.dataIndex as string]"></a-input>
            </template>
            <template v-if="column.dataIndex === 'type'">
              <Select style="width: 120px" v-model:value="record[column.dataIndex as string]" :options="typeOptions"></Select>
            </template>
            <template v-if="column.dataIndex === 'value'">
              <template v-if="record.type != 1">
                <div>{{record.value}}</div>
                <Button type="primary" @click="btnClick(record)">编辑</Button>
              </template>
              <template v-else>用户输入</template>
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
                  confirm: handleDelete.bind(null, record),
                },
              },
            ]"
              />
            </template>
          </template>
        </BasicTable>
      </template>
    </BasicForm>
  </BasicModal>
  <Modal title="属性值编辑" v-model:open="open" :centered="true" @ok="handleOk">
    <Textarea style="height: 200px" v-model:value="editValue"></Textarea>
    <p class="m-2">一行为一个属性值，多个属性值用换行输入</p>
  </Modal>
</template>
