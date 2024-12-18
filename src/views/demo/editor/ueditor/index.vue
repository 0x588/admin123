<template>
    <PageWrapper title="富文本组件示例">
      <div class="w-full h-full bg-gray">

      <vue-ueditor-wrap v-model="content"
                        editor-id="editor"
                        :config="editorConfig"
                        :editorDependencies="['ueditor.config.js','ueditor.all.js']"
                        />
      </div>
    </PageWrapper>
</template>

<script lang="ts" setup>
import {ref} from 'vue';
import { PageWrapper } from '@/components/Page';


const content = ref('<p>Hello UEditorPlus</p>');
const editorConfig = {
  // 后端服务地址，后端处理参考
  // https://open-doc.modstart.com/ueditor-plus/backend.html
  serverUrl: '/api/ueditor',
  UEDITOR_HOME_URL: '/static/UEditorPlus/',
  UEDITOR_CORS_URL: '/static/UEditorPlus/',
  initialFrameWidth: 1000,
  initialFrameHeight: 500,
}
</script>
