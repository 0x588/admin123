<script lang="ts" setup>
import { ref, unref } from 'vue'
import { formSchema, formApiParam } from './coupontype.data'
import { useI18n } from '@/hooks/web/useI18n'
import { useMessage } from '@/hooks/web/useMessage'
import { BasicForm, useForm } from '@/components/Form'
import { BasicModal, useModalInner } from '@/components/Modal'
import {randomUUID} from "@/views/form-design/utils";
import {createCuponType, getCouponType, updateCouponType} from "@/api/market/coupon-type";
import dayjs from "dayjs";

defineOptions({ name: 'CouponTypeModal' })

const emit = defineEmits(['success', 'register'])
const { t } = useI18n()
const { createMessage } = useMessage()
const isUpdate = ref(true)

const [registerForm, { setFieldsValue, resetFields, validate }] = useForm({
  labelWidth: 120,
  baseColProps: { span: 24 },
  schemas: formSchema,
  showActionButtonGroup: false,
  actionColOptions: { span: 23 },
})

const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
  resetFields()
  setModalProps({ confirmLoading: false })
  isUpdate.value = !!data?.isUpdate
  if (unref(isUpdate)) {
    const res = await getCouponType(data.record.id)
    setFieldsValue({ ...res })
  } else {
    if (data?.pid) {
      setFieldsValue({ "pid": data?.pid })
    }
  }
})

async function handleSubmit() {
  try {
    const values = await validate()
    if (values.get_start_time) {
      values.get_start_time = dayjs(values.get_start_time).unix()
    }
    if (values.get_end_time) {
      values.get_end_time = dayjs(values.get_end_time).unix()
    }
    if (values.start_time) {
      values.start_time = dayjs(values.start_time).unix()
    }
    if (values.end_time) {
      values.end_time = dayjs(values.end_time).unix()
    }
    setModalProps({ confirmLoading: true })
    if (unref(isUpdate))
      await updateCouponType(values as any)
    else
      await createCuponType(values as any)
    formApiParam['title'] = randomUUID()
    closeModal()
    emit('success', unref(isUpdate), values)
    createMessage.success(t('common.saveSuccessText'))
  }
  finally {
    setModalProps({ confirmLoading: false })
  }
}
</script>

<template>
  <BasicModal :maskClosable="false"
    v-bind="$attrs" :title="isUpdate ? t('action.edit') : t('action.create')" @register="registerModal"
    @ok="handleSubmit"
  >
    <BasicForm @register="registerForm" />
  </BasicModal>
</template>
