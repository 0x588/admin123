<template>
  <PageWrapper title="富文本嵌入表单示例">
    <CollapseContainer title="富文本表单">
      <BasicForm
        :labelWidth="100"
        :schemas="schemas"
        :actionColOptions="{ span: 24 }"
        :baseColProps="{ span: 24 }"
        @submit="handleSubmit"
      />
    </CollapseContainer>
  </PageWrapper>
</template>
<script lang="ts" setup>
import {h } from 'vue';
  import { BasicForm, FormSchema } from '@/components/Form';
  import { CollapseContainer } from '@/components/Container';
  import { useMessage } from '@/hooks/web/useMessage';
  import { PageWrapper } from '@/components/Page';
  import { Ueditor } from '@/components/Ueditor'

  const schemas: FormSchema[] = [
    {
      field: 'title',
      component: 'Input',
      label: 'title',
      defaultValue: 'defaultValue',
      rules: [{ required: true }],
    },
    {
      field: 'ueditor',
      component: 'Input',
      label: 'ueditor',
      defaultValue: 'defaultValue',
      rules: [{ required: true }],
      render: ({ model, field }) => {
        return h(Ueditor, {
          modelValue: model[field],
          onChange: (value: string) => {
            model[field] = value;
          },
        });
      },
    },
  ];
  const { createMessage } = useMessage();

  function handleSubmit(values: any) {
    createMessage.success('click search,values:' + JSON.stringify(values));
  }
</script>
