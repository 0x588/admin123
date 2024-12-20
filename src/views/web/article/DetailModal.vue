<script setup lang="ts">
import {Description, useDescription} from "@/components/Description";
import {PageWrapper} from "@/components/Page";
import {useGo} from "@/hooks/web/usePage";
import {onMounted, ref} from "vue";
import {useRoute} from "vue-router";
import {getArticle} from "@/api/web/article";
import {detailSchema} from "./article.data"

defineOptions({ name: 'ArticleDetail' });

const route = useRoute();
const go = useGo();

const articleId = ref(route.params?.id);


const [register, de] = useDescription({
  title: '详情',
  schema: detailSchema
});

onMounted(async () => {
  var ret =  await getArticle(Number(articleId.value))
  de.setDescProps({data: ret})
});


function goBack() {
  go('/article/articlelist');
}
</script>

<template>
  <PageWrapper :title="`文章`+ articleId" contentBackground @back="goBack">
      <Description
        @register="register"
        class="mt-4"
        :column="1"
       />
  </PageWrapper>
</template>

<style scoped lang="less">

</style>
