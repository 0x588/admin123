<script lang="ts" setup>
import {onMounted} from 'vue'
import { formSchema } from './pointConfig.data'
import { useI18n } from '@/hooks/web/useI18n'
import { useMessage } from '@/hooks/web/useMessage'
import { BasicForm, useForm } from '@/components/Form'
import {getPointConfig, updatePointConfig} from "@/api/market/point-config";
import {CollapseContainer} from "@/components/Container";

defineOptions({ name: 'CouponTypeModal' })

const { t } = useI18n()
const { createMessage } = useMessage()

const [registerForm, { setFieldsValue,validate }] = useForm({
  labelWidth: 280,
  baseColProps: { span: 24 },
  schemas: formSchema,
  showActionButtonGroup: true,
  showSubmitButton: true,
  showResetButton: false,
  submitButtonOptions: {
    text: "保存"
  },
  actionColOptions: { span: 23 },
})

onMounted(async () => {
  const ret = await getPointConfig()
  setFieldsValue({...ret})
})

async function handleSubmit() {
  try {
    const values = await validate()
    await updatePointConfig(values)
    createMessage.success(t('common.saveSuccessText'))
  }
  finally {
  }
}
</script>

<template>
  <CollapseContainer  title="积分抵现">
    <div class="flex justify-center mt-10">
      <BasicForm class="w-50%" @register="registerForm"  @submit="handleSubmit" />
    </div>
  </CollapseContainer>
</template>
