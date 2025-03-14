<script lang="ts" setup>
import { ref, unref } from 'vue'
import { commonSpecFormSchema } from './common.spec'
import { useI18n } from '@/hooks/web/useI18n'
import { useMessage } from '@/hooks/web/useMessage'
import { BasicForm, useForm } from '@/components/Form'
import { BasicModal, useModalInner } from '@/components/Modal'
import {CommonSpecVO, createCommonSpec, getCommonSpec, updateCommonSpec} from "@/api/product/spec";
import {isArray} from "lodash-es";

defineOptions({ name: 'CommonSpecModal' })

const emit = defineEmits(['success', 'register'])
const { t } = useI18n()
const { createMessage } = useMessage()
const isUpdate = ref(true)

const [registerForm, { setFieldsValue, resetSchema, resetFields, validate, appendSchemaByField,removeSchemaByField }] = useForm({
  labelWidth: 120,
  baseColProps: { span: 24 },
  schemas: commonSpecFormSchema,
  showActionButtonGroup: false,
  actionColOptions: { span: 23 },
})

const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
  n.value = 0
  resetSchema(commonSpecFormSchema)
  resetFields()
  setModalProps({ confirmLoading: false })
  isUpdate.value = !!data?.isUpdate
  if (unref(isUpdate)) {
    const res = await getCommonSpec(data.record.id)
    if (isArray(res.values)) {
      let i = 0;
      for (i = 0; i < res.values.length; i++) {
        addValueItem(i)
      }
      n.value = i
    }
    setFieldsValue({ ...res })
  }
})

async function handleSubmit() {
  try {
    const values = await validate()
    console.log(values)
    if (values.values) {
      values.values = values.values.filter((v) => v !== null)
    }
    setModalProps({ confirmLoading: true })
    if (unref(isUpdate))
      await updateCommonSpec(values as CommonSpecVO)
    else
      await createCommonSpec(values as CommonSpecVO)

    closeModal()
    emit('success')
    createMessage.success(t('common.saveSuccessText'))
  }
  finally {
    setModalProps({ confirmLoading: false })
  }
}

function del(field: string) {
  removeSchemaByField([`values[${field}].id`, `values[${field}].title`, `values[${field}].sort`, `${field}`]);
}

const n = ref(0);

function addValueItem(num: number) {
  appendSchemaByField( {
    label: '编号',
    field:  `values[${num}].id`,
    show: false,
    component: 'Input',
  }, '')
  appendSchemaByField(
    {
      field: `values[${num}].title`,
      component: 'Input',
      label: '规格值名称',
      required: true,
      colProps: {
        span: 8,
      },
    },
    '',
  );
  appendSchemaByField(
    {
      field: `values[${num}].sort`,
      component: 'InputNumber',
      label: '排序',
      defaultValue:10,
      colProps: {
        span: 8,
      },
    },
    '',
  );

  appendSchemaByField(
    {
      field: `${num}`,
      component: 'Input',
      label: ' ',
      slot: 'del',
      colProps: {
        span: 2,
      },
    },
    '',
  );
}

function add() {
  addValueItem(n.value)
  n.value++;
}
</script>

<template>
  <BasicModal v-bind="$attrs" :title="isUpdate ? t('action.edit') : t('action.create')" @register="registerModal" @ok="handleSubmit">
    <BasicForm @register="registerForm" >
      <template #add="{ }">
        <a-button color="error" @click="add">添加规格值</a-button>
      </template>
      <template #del="{ field }">
        <a-button color="warning" @click="del(field)">删除</a-button>
      </template>
    </BasicForm>
  </BasicModal>
</template>
