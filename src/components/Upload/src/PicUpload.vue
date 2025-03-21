<template>
  <div>
      <template v-if="fileList.length">
        <div @click.stop="openUploadModal">
          <Image :width="30" :preview="false" :src="fileList[0].url"></Image>
        </div>
      </template>
      <template v-else>
        <a-button
          size="small"
          @click="openUploadModal"
          :disabled="disabled"
        >
          <plus-outlined />
        </a-button>
      </template>
    <UploadModal
      v-bind="bindValue"
      :previewFileList="fileList"
      :fileListOpenDrag="fileListOpenDrag"
      :fileListDragOptions="fileListDragOptions"
      @register="registerUploadModal"
      @change="handleChange"
      @delete="handleDelete"
    />

    <UploadPreviewModal
      :value="fileList"
      :max-number="bindValue.maxNumber"
      @register="registerPreviewModal"
      @list-change="handlePreviewChange"
      @delete="handlePreviewDelete"
      :preview-columns="props.previewColumns"
      :before-preview-data="props.beforePreviewData"
    />
  </div>
</template>
<script lang="ts" setup>
  import { ref, watch, unref, computed, useAttrs } from 'vue';
  import { Recordable } from '@vben/types';
  import { PlusOutlined } from '@ant-design/icons-vue';
  import {  Image } from 'ant-design-vue';
  import { useModal } from '@/components/Modal';
  import { uploadContainerProps } from './props';
  import { omit } from 'lodash-es';
  import { useI18n } from '@/hooks/web/useI18n';
  import { isArray, isObject, isString } from '@/utils/is';
  import UploadModal from './components/UploadModal.vue';
  import UploadPreviewModal from './components/UploadPreviewModal.vue';
  import { BaseFileItem } from './types/typing';
  import { buildUUID } from '@/utils/uuid';
  defineOptions({ name: 'PicUpload' });

  const props = defineProps(uploadContainerProps);

  const emit = defineEmits(['change', 'delete', 'preview-delete', 'update:value']);

  const attrs = useAttrs();
  const { t } = useI18n();
  // 上传modal
  const [registerUploadModal, { openModal: openUploadModal }] = useModal();

  //   预览modal
  const [registerPreviewModal, { openModal: openPreviewModal }] = useModal();

  const fileList = ref<BaseFileItem[] | any[]>([]);

  const showPreview = computed(() => {
    const { emptyHidePreview } = props;
    if (!emptyHidePreview) return true;
    return emptyHidePreview ? fileList.value.length > 0 : true;
  });

  const bindValue = computed(() => {
    const value = { ...attrs, ...props };
    return omit(value, 'onChange');
  });

  const isFirstRender = ref<boolean>(true)

  function getValue(valueKey="url") {
    const list = (fileList.value || []).map((item: any) => {
      return item[valueKey];
    });
    return list;
  }
  function genFileListByUrls(urls: string[]) {
    const list = urls.map((e) => {
      return {
        uid: buildUUID(),
        url: e,
      };
    });
    return list;
  }
  watch(
    () => props.value,
    (v = []) => {
      let values: string[] = [];
      if (v) {
        if (isArray(v)) {
          values = v;
        } else if (typeof v == 'string') {
          values.push(v);
        }
        fileList.value = values.map((item,i) => {
          if (item && isString(item)) {
            return {
              uid: buildUUID(),
              url: item,
            };
          } else if (item && isObject(item)) {
            return item;
          } else {
            return;
          }
        }) as any;
      }
      emit('update:value', values);
      if(!isFirstRender.value){
        emit('change', values);
        isFirstRender.value = false
      }
    },
    { 
      immediate: true, 
      deep: true,
    },
  );

  // 上传modal保存操作
  function handleChange(urls: string[],valueKey:string) {
    fileList.value = [...unref(fileList), ...(genFileListByUrls(urls) || [])];
    console.log(fileList);
    const values = getValue(valueKey);
    emit('update:value', values);
    emit('change', values);
  }

  // 预览modal保存操作
  function handlePreviewChange(fileItems: string[],valueKey:string) {
    fileList.value = [...(fileItems || [])];
    const values = getValue(valueKey);
    emit('update:value', values);
    emit('change', values);
  }

  function handleDelete(record: Recordable<any>) {
    emit('delete', record);
  }

  function handlePreviewDelete(url: string) {
    emit('preview-delete', url);
  }
</script>
