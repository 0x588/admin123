<script lang="ts" setup>
import {onMounted} from 'vue'
import { formSchema } from './fullMail.data'
import { useI18n } from '@/hooks/web/useI18n'
import { useMessage } from '@/hooks/web/useMessage'
import { BasicForm, useForm } from '@/components/Form'
import {CollapseContainer} from "@/components/Container";
import {getFullMail, updateFullMail} from "@/api/market/full-mail";

defineOptions({ name: 'FullMail' })

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
  const ret = await getFullMail()
  ret.no_mail_province_ids = JSON.parse(ret.no_mail_province_ids)
  setFieldsValue({...ret})
})

async function handleSubmit() {
  try {
    const values = await validate()
    await updateFullMail(values)
    createMessage.success(t('common.saveSuccessText'))
  }
  finally {
  }
}
</script>

<template>
  <CollapseContainer  title="满额包邮">
    <div class="flex justify-center mt-10">
      <BasicForm class="w-50%" @register="registerForm"  @submit="handleSubmit" />
    </div>
  </CollapseContainer>
</template>
