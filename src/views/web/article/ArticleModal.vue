<script lang="ts" setup>
import { ref, unref } from 'vue'
import { formSchema } from './article.data'
import { useI18n } from '@/hooks/web/useI18n'
import { useMessage } from '@/hooks/web/useMessage'
import { BasicForm, useForm } from '@/components/Form'
import { BasicModal, useModalInner } from '@/components/Modal'
import {createArticle, ArticleVO, getArticle, updateArticle} from '@/api/web/article'

defineOptions({ name: 'WebArticleModal' })

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
  await resetFields()
  setModalProps({ confirmLoading: false })
  isUpdate.value = !!data?.isUpdate
  if (unref(isUpdate)) {
    const res = await getArticle(data.record.id)
    await setFieldsValue({ ...res })
  }
})

async function handleSubmit() {
  try {
    const values = await validate()
    if (values.cover && values.cover.length > 0)
    {
      values.cover = values.cover[0]
    }
    console.log(values)
    setModalProps({ confirmLoading: true })
    if (unref(isUpdate))
      await updateArticle(values as ArticleVO)
    else
      await createArticle(values as ArticleVO)

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
  <BasicModal :destroyOnClose="true" v-bind="$attrs" :title="isUpdate ? t('action.edit') : t('action.create')" @register="registerModal" @ok="handleSubmit" width="80%">
    <BasicForm @register="registerForm" />
  </BasicModal>
</template>
