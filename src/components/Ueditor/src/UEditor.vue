<script setup lang="ts">
import {ref, watch} from "vue";
defineOptions({ name: 'UEditor', inheritAttrs: false });
const emit = defineEmits(['change'])
const props = defineProps({
  editorId: {
    type: String,
    default: 'ueditor-id',
  },
  modelValue: {
    type: String,
  },
})

const content  = ref<String>();
const editorConfig = {
  serverUrl: '/api/ueditor',
  UEDITOR_HOME_URL: '/static/UEditorPlus/',
  UEDITOR_CORS_URL: '/static/UEditorPlus/',
  initialFrameWidth: 1000,
  initialFrameHeight: 500,
}
watch(() => props.modelValue, (val) => {
  content.value = val;
})

watch(() => content.value, (val) => {
  emit('change', val);
})

</script>

<template>
  <vue-ueditor-wrap v-model="content"
                    :editor-id="props.editorId"
                    :config="editorConfig"
                    :editorDependencies="['ueditor.config.js','ueditor.all.js']"
  />
</template>

<style scoped lang="less">

</style>
