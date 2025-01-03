<script setup lang="ts">
import {Description, useDescription} from "@/components/Description";
import {detailSchema} from "./article.data"
import {BasicModal, useModalInner} from "@/components/Modal";

defineOptions({ name: 'DetailModal' });

const [register, de] = useDescription({
  schema: detailSchema
});

const [registerModal, { setModalProps }] = useModalInner(async (data) => {
  setModalProps({ confirmLoading: false, showOkBtn: false, showCancelBtn:false })
  de.setDescProps({data: data.record})
})

</script>

<template>
  <BasicModal :destroyOnClose="true"
              v-bind="$attrs"
              @register="registerModal"
              width="80%">
     <Description
        @register="register"
        size="middle"
        class="mt-4"
        :column="1"
       />
  </BasicModal>
</template>

<style scoped lang="less">

</style>
