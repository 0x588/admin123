<script setup lang="ts">
import { ref, watch} from "vue";
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

const publicPath = import.meta.env.VITE_PUBLIC_PATH || '/';

const content  = ref<String>();
const editorConfig = {
  serverUrl: '/api/ueditor',
  UEDITOR_HOME_URL: publicPath + 'static/UEditorPlus/',
  UEDITOR_CORS_URL: publicPath + 'static/UEditorPlus/',
  initialFrameWidth: 1000,
  initialFrameHeight: 500,
  autoHeightEnabled: false,
}
watch(() => props.modelValue, (val) => {
  if (val !== undefined) {
    content.value = val;
  }
})

watch(() => content.value, (val) => {
  if (val !== undefined && val !== props.modelValue) {
    emit('change', val);
  }
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
