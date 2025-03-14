<script lang="ts" setup>
import { ref, unref } from 'vue'
import { useI18n } from '@/hooks/web/useI18n'
import { useMessage } from '@/hooks/web/useMessage'
import { BasicForm, useForm } from '@/components/Form'
import { BasicModal, useModalInner } from '@/components/Modal'
import {commonSpecTempFormSchema} from "@/views/product/spec-temp/template.spec";
import {
  CommonSpecTemplateVO,
  createCommonSpecTemp,
  getCommonSpecTemp,
  updateCommonSpecTemp
} from "@/api/product/spec-temp";

defineOptions({ name: 'CommonSpecTempModal' })

const emit = defineEmits(['success', 'register'])
const { t } = useI18n()
const { createMessage } = useMessage()
const isUpdate = ref(true)

const [registerForm, { setFieldsValue, resetSchema, resetFields, validate}] = useForm({
  labelWidth: 120,
  baseColProps: { span: 24 },
  schemas: commonSpecTempFormSchema,
  showActionButtonGroup: false,
  actionColOptions: { span: 23 },
})

const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
  resetSchema(commonSpecTempFormSchema)
  resetFields()
  setModalProps({ confirmLoading: false })
  isUpdate.value = !!data?.isUpdate
  if (unref(isUpdate)) {
    const res = await getCommonSpecTemp(data.record.id)
    res.specIds = JSON.parse(res.specIds)
    setFieldsValue({ ...res })
  }
})

async function handleSubmit() {
  try {
    const values = await validate()
    console.log(values)
    if (values.specIds) {
      values.specIds = JSON.stringify(values.specIds)
    }
    setModalProps({ confirmLoading: true })
    if (unref(isUpdate))
      await updateCommonSpecTemp(values as CommonSpecTemplateVO)
    else
      await createCommonSpecTemp(values as CommonSpecTemplateVO)

    closeModal()
    emit('success')
    createMessage.success(t('common.saveSuccessText'))
  }
  finally {
    setModalProps({ confirmLoading: false })
  }
}

</script>

<template>
  <BasicModal v-bind="$attrs" :title="isUpdate ? t('action.edit') : t('action.create')" @register="registerModal" @ok="handleSubmit">
    <BasicForm @register="registerForm" >
    </BasicForm>
  </BasicModal>
</template>
