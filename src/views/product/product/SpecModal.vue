<template>
  <BasicModal
    v-bind="$attrs"
    @register="register"
    title="添加规格"
    @ok="handleSubmit"
  >
    <div class="pt-3px pr-3px">
      <BasicForm @register="registerForm"/>
    </div>
  </BasicModal>
</template>
<script lang="ts" setup>
import {BasicModal, useModalInner} from '@/components/Modal';
import {BasicForm, FormSchema, useForm} from '@/components/Form';
import {DICT_TYPE, getDictOptions} from "@/utils/dict";
import {CommonSpecVO, createCommonSpec} from "@/api/product/spec";
const emit = defineEmits(['success', 'register']);

const schemas: FormSchema[] = [
  {
    label: '规格名称',
    field: 'title',
    required: true,
    component: 'Input',
    colProps: {
      span: 24,
    },
  },
  {
    label: '类型',
    field: 'type',
    required: true,
    defaultValue: 1,
    colProps: {
      span: 12,
    },
    component: 'Select',
    componentProps: {
      options: getDictOptions(DICT_TYPE.SPEC_TYPE) as any,
    },
  },
];

const [
  registerForm, {resetFields, validate}
] = useForm({
  labelWidth: 120,
  schemas,
  showActionButtonGroup: false,
  actionColOptions: {
    span: 24,
  },
});

const [register, {setModalProps, closeModal}] = useModalInner((data) => {
  resetFields()
});

async function handleSubmit() {
  try {
    const values = await validate()
    setModalProps({confirmLoading: true})
    let body = {isTmp:true, sort:10, ...values} as CommonSpecVO
    let data = await createCommonSpec(body)
    closeModal()
    body.id = data
    emit('success', body)
  } finally {
    setModalProps({confirmLoading: false})
  }
}

</script>
