<template>
  <BasicModal
    title="修改密码"
    v-bind="$attrs"
    @register="register"
    @ok="handelSubmit"
    @cancel="handelCancel"
  >
    <BasicForm @register="registerForm">
    </BasicForm>
  </BasicModal>
</template>
<script lang="ts" setup>
  import { BasicModal, useModalInner } from '@/components/Modal';
  import { BasicForm, useForm } from '@/components/Form';
  import { updateUserPwd} from "@/api/system/user";
  import { useMessage } from '@/hooks/web/useMessage';
  import {useI18n} from "@/hooks/web/useI18n";
  import {useUserStore} from "@/store/modules/user";
  const { createMessage } = useMessage()
  const { t } = useI18n()
  const userStore = useUserStore();

  const [register, { closeModal }] = useModalInner();

  const [registerForm, { validateFields  }] = useForm({
    showActionButtonGroup: false,
    labelWidth: 120,
    baseColProps: { span: 24 },
    schemas: [
      {
        field: 'pwd',
        label: '当前密码',
        component: 'InputPassword',
        required: true,
      },
      {
        field: 'newPwd',
        label: '新密码',
        component: 'StrengthMeter',
        componentProps: {
          placeholder: '新密码',
        },
        rules: [
          {
            required: true,
            message: '请输入新密码',
          },
        ],
      },
      {
        field: 'confirmPassword',
        label: '确认密码',
        component: 'InputPassword',

        dynamicRules: ({ values }) => {
          return [
            {
              required: true,
              validator: (_, value) => {
                if (!value) {
                  return Promise.reject('密码不能为空');
                }
                if (value !== values.newPwd) {
                  return Promise.reject('两次输入的密码不一致!');
                }
                return Promise.resolve();
              },
            },
          ];
        },
      },
    ],
  });
  const handelSubmit = async () => {
    const values = await validateFields();
    await updateUserPwd(values);
    closeModal()
    createMessage.success(t('common.saveSuccessText'))
    userStore.logout(true)
  };
  const handelCancel = () => {
    closeModal();
  };
</script>
