<template>
  <ScrollContainer>
    <div ref="wrapperRef" :class="prefixCls">
      <template v-if="siglePannel">
          <BaseSetting :cats="settingList" :cat-id="0"></BaseSetting>
      </template>
      <template v-else>
      <Tabs tab-position="left" :tabBarStyle="tabBarStyle">
        <template v-for="item in settingList" :key="item.id">
          <TabPane :tab="item.title">
            <BaseSetting :cats="item.children" :catId="item.id"></BaseSetting>
          </TabPane>
        </template>
      </Tabs>
      </template>
    </div>
  </ScrollContainer>
</template>

<script lang="ts" setup>
  import { Tabs } from 'ant-design-vue';
  import { ScrollContainer } from '@/components/Container';
  import {computed, onMounted, ref} from "vue";
  import {allConfigEdit} from "@/api/system/config-edit";
  import BaseSetting from "@/views/system/config-edit/BaseSetting.vue";
  import {useRoute} from "vue-router";

  defineOptions({ name: 'ConfigEdit' })

  const TabPane = Tabs.TabPane;
  const route = useRoute();

  const prefixCls = 'account-setting';
  const tabBarStyle = {
    width: '220px',
  };

  var settingList = ref()
  onMounted(async  () => {
    settingList.value = await allConfigEdit(route.params?.app)
    console.log(settingList)
  })

  var siglePannel = computed(() => {
    return settingList.value != null && settingList.value.length == 1 && (settingList.value[0].children === null || settingList.value[0].children.length == 0)
  })

</script>
<style lang="less">
  .account-setting {
    margin: 12px;
    background-color: @component-background;

    .base-title {
      padding-left: 0;
    }

    .ant-tabs-tab-active {
      background-color: @item-active-bg;
    }
  }
</style>
