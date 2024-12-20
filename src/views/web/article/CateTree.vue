<script lang="ts" setup>
import { onMounted, ref } from 'vue'

import type { TreeItem } from '@/components/Tree'
import { BasicTree } from '@/components/Tree'
import { getArticleCateTree } from '@/api/web/articlecate'

defineOptions({ name: 'ArticleCateTree' })

const emit = defineEmits(['select'])
const treeRef = ref()
const treeData = ref<TreeItem[]>([])

async function fetch() {
  const res = await getArticleCateTree()
  treeData.value = res
}

function handleSelect(keys) {
  emit('select', keys[0])
}

onMounted(() => {
  fetch()
})
</script>

<template>
  <div class="m-4 mr-0 overflow-hidden" v-bind="$attrs">
    <BasicTree
      ref="treeRef"
      title="分类列表"
      toolbar
      search
      tree-wrapper-class-name="h-[calc(100%-35px)] overflow-auto"
      :click-row-to-expand="false"
      :tree-data="treeData"
      :field-names="{ key: 'id', title: 'title' }"
      @select="handleSelect"
    />
  </div>
</template>
