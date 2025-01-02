<script lang="ts" setup>
import {h, ref, unref} from 'vue'
import { formSchema } from './param'
import { useI18n } from '@/hooks/web/useI18n'
import { useMessage } from '@/hooks/web/useMessage'
import {BasicForm, FormSchema, useForm} from '@/components/Form'
import { BasicModal, useModalInner } from '@/components/Modal'
import {getConfigListWithCateId} from "@/api/system/common-config/config";
import {uploadApi} from "@/api/sys/upload";
import {Tinymce} from "@/components/Tinymce";
import {Ueditor} from "@/components/Ueditor";
import {createParamList, getParamList, ParamListVO, updateParamList} from "@/api/web/parameter";

defineOptions({ name: 'CreateParamListModal' })

const emit = defineEmits(['success', 'register'])
const { t } = useI18n()
const { createMessage } = useMessage()
const isUpdate = ref(true)

const [registerForm, { setFieldsValue, resetFields, validate, appendSchemaByField }] = useForm({
  labelWidth: 120,
  baseColProps: { span: 24 },
  schemas: formSchema,
  showActionButtonGroup: false,
  actionColOptions: { span: 23 },
})

const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
  await resetFields()
  setModalProps({ confirmLoading: false })
  await updateFormItems(data.property_id)
  isUpdate.value = !!data?.isUpdate
  if (unref(isUpdate)) {
    const res = await getParamList(data.record.id)
    var others = JSON.parse(res.content)
    await setFieldsValue({ "id":res.id, "cate_id":res.cate_id, ...others  })
  } else {
    await setFieldsValue({ "cate_id":data.cate_id })
  }
})

async function updateFormItems(property_id :string) {
  var cates = await getConfigListWithCateId(property_id)
  for (const cfg of cates) {
    var schema: FormSchema = {
      field: cfg.name,
      label: cfg.title,
      component: cfg.type as any,
      colProps: {
        span: 18,
      },
      helpMessage(renderCallbackParams) {
        return cfg.remark
      },
    }
    if (cfg.type === 'Select' || cfg.type === 'CheckboxGroup' || cfg.type == 'RadioGroup') {
      schema.componentProps = {
        options: JSON.parse(cfg.options)
      }
    } else if (cfg.type === 'ImageUpload') {
      schema.componentProps = {
        api: uploadApi,
        accept: ['png', 'jpeg', 'jpg'],
        maxNumber: 1,
        maxSize: 100,
      }
    } else if (cfg.type === 'Upload') {
      schema.componentProps = {
        api: uploadApi,
        maxNumber: 1,
        maxSize: 100,
      }
    } else if (cfg.type === 'Tinymce') {
      schema.component = 'Input'
      schema.render = ({ model, field }) => {
        return h(Tinymce, {
          value: model[field],
          onChange: (value: string) => {
            model[field] = value;
          },
        });
      }
    } else if (cfg.type === 'UEditor') {
      schema.component = 'Input'
      schema.render = ({ model, field }) => {
        return h(Ueditor, {
          modelValue: model[field],
          editorId: 'editor-' + field,
          onChange: (value: string) => {
            model[field] = value;
          },
        });
      }
    }
    else if (cfg.type == 'DatePicker' || cfg.type == 'TimePicker') {
      schema.componentProps = {
        valueFormat: 'YYYY-MM-DD HH:mm:ss',
      }
    }
    await appendSchemaByField(
      schema,
      ''
    );
  }
}

async function handleSubmit() {
  try {
    const values = await validate()
    var content = JSON.stringify(values)
    console.log(values)
    setModalProps({ confirmLoading: true })
    if (unref(isUpdate))
      await updateParamList({ "id":values.id, "cate_id": values.cate_id, "content":content, "sort":values.sort})
    else
      await createParamList({"cate_id": values.cate_id, "content":content, "sort":values.sort} as ParamListVO)
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
