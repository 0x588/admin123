<script setup lang="ts">

import {PageWrapper} from "@/components/Page";
import {BasicForm, useForm} from "@/components/Form";
import {formSchema} from "@/views/web/article/article.data";
import {useRoute} from "vue-router";
import {onMounted} from "vue";
import {getArticle} from "@/api/web/article";

defineOptions({ name: 'WebArticleEdit' })

const route = useRoute();

const [registerForm, { setFieldsValue, resetFields, validate }] = useForm({
  labelWidth: 120,
  baseColProps: { span: 24 },
  schemas: formSchema,
  showActionButtonGroup: false,
  actionColOptions: { span: 23 },
})

onMounted(async () => {
  await resetFields()
  if (!route.params?.id) {
    return
  }
  const res = await getArticle(Number(route.params?.id))
  await setFieldsValue({ ...res })
})

</script>

<template>
  <PageWrapper title="编辑" contentFullHeight>
    <BasicForm @register="registerForm" />
  </PageWrapper>
</template>

<style scoped lang="less">

</style>
