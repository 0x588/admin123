<template>
  <Dropdown placement="bottomLeft" :overlayClassName="`${prefixCls}-dropdown-overlay`">
    <span :class="[prefixCls, `${prefixCls}--${theme}`]" class="flex">
      <img :class="`${prefixCls}__header`" :src="getUserInfo.avatar" />
      <span :class="`${prefixCls}__info hidden md:block`">
        <span :class="`${prefixCls}__name`" class="truncate">
          {{ getUserInfo.nickname }}
        </span>
      </span>
    </span>

    <template #overlay>
      <Menu @click="handleMenuClick">
        <MenuItem
          key="doc"
          :text="t('layout.header.dropdownItemDoc')"
          icon="ion:document-text-outline"
          v-if="getShowDoc"
        />
        <Menu.Divider v-if="getShowDoc" />
        <MenuItem
          v-if="getShowApi"
          key="api"
          :text="t('layout.header.dropdownChangeApi')"
          icon="ant-design:swap-outlined"
        />
        <MenuItem
          v-if="getUseLockPage"
          key="lock"
          :text="t('layout.header.tooltipLock')"
          icon="ion:lock-closed-outline"
        />
        <MenuItem
          key="pwd"
          text="修改密码"
          icon="ion:locked"
        />
        <MenuItem
          key="logout"
          :text="t('layout.header.dropdownItemLoginOut')"
          icon="ion:power-outline"
        />
        <MenuItem
          key="clear"
          text="清除缓存"
          icon="ion:trash-bin"
        />
      </Menu>
    </template>
  </Dropdown>
  <LockAction @register="register" />
  <ChangeApi @register="registerApi" />
  <ChangePwd @register="registerPwd" />
</template>
<script lang="ts" setup>
  import { Dropdown, Menu } from 'ant-design-vue';
  import type { MenuInfo } from 'ant-design-vue/lib/menu/src/interface';
  import { computed } from 'vue';
  import { DOC_URL } from '@/settings/siteSetting';
  import { useUserStore } from '@/store/modules/user';
  import { useHeaderSetting } from '@/hooks/setting/useHeaderSetting';
  import { useI18n } from '@/hooks/web/useI18n';
  import { useDesign } from '@/hooks/web/useDesign';
  import { useModal } from '@/components/Modal';
  import headerImg from '@/assets/images/header.jpg';
  import { propTypes } from '@/utils/propTypes';
  import { openWindow } from '@/utils';
  import { createAsyncComponent } from '@/utils/factory/createAsyncComponent';
  import {usePermissionStore} from "@/store/modules/permission";
  import {useMultipleTabStore} from "@/store/modules/multipleTab";
  import {useAppStore} from "@/store/modules/app";

  type MenuEvent = 'logout' | 'doc' | 'lock' | 'api' | 'pwd' | 'clear';

  const MenuItem = createAsyncComponent(() => import('./DropMenuItem.vue'));
  const LockAction = createAsyncComponent(() => import('../lock/LockModal.vue'));
  const ChangeApi = createAsyncComponent(() => import('../ChangeApi/index.vue'));
  const ChangePwd = createAsyncComponent(() => import('../changePwd/index.vue'));

  defineOptions({ name: 'UserDropdown' });

  defineProps({
    theme: propTypes.oneOf(['dark', 'light']),
  });

  const { prefixCls } = useDesign('header-user-dropdown');
  const { t } = useI18n();
  const { getShowDoc, getUseLockPage, getShowApi } = useHeaderSetting();
  const userStore = useUserStore();
  const permissionStore = usePermissionStore();
  const tabStore = useMultipleTabStore();
  const appStore = useAppStore();

  const getUserInfo = computed(() => {
    const { nickname = '', avatar } = userStore.getUserInfo.user || {};
    return { nickname, avatar: avatar || headerImg};
  });

  const [register, { openModal }] = useModal();
  const [registerApi, { openModal: openApiModal }] = useModal();
  const [registerPwd, { openModal: openPwdModal }] = useModal();

  function handleLock() {
    openModal(true);
  }

  function handleApi() {
    openApiModal(true, {});
  }

  function handlePwd() {
    openPwdModal(true, {});
  }
  //  login out
  function handleLoginOut() {
    userStore.confirmLoginOut();
  }

  function handleClear() {
    localStorage.clear();
    appStore.resetAllState();
    permissionStore.resetState();
    tabStore.resetState();
    userStore.resetState();
    location.reload();
  }

  // open doc
  function openDoc() {
    openWindow(DOC_URL);
  }

  function handleMenuClick(e: MenuInfo) {
    switch (e.key as MenuEvent) {
      case 'logout':
        handleLoginOut();
        break;
      case 'doc':
        openDoc();
        break;
      case 'lock':
        handleLock();
        break;
      case 'api':
        handleApi();
        break;
      case 'pwd':
        handlePwd();
        break;
      case 'clear':
        handleClear();
        break;
    }
  }
</script>
<style lang="less">
  @prefix-cls: ~'@{namespace}-header-user-dropdown';

  .@{prefix-cls} {
    align-items: center;
    height: @header-height;
    padding: 0 0 0 10px;
    padding-right: 10px;
    overflow: hidden;
    font-size: 12px;
    cursor: pointer;

    img {
      width: 24px;
      height: 24px;
      margin-right: 12px;
    }

    &__header {
      border-radius: 50%;
    }

    &__name {
      font-size: 14px;
    }

    &--dark {
      &:hover {
        background-color: @header-dark-bg-hover-color;
      }
    }

    &--light {
      &:hover {
        background-color: @header-light-bg-hover-color;
      }

      .@{prefix-cls}__name {
        color: @text-color-base;
      }

      .@{prefix-cls}__desc {
        color: @header-light-desc-color;
      }
    }

    &-dropdown-overlay {
      .ant-dropdown-menu-item {
        min-width: 160px;
      }
    }
  }
</style>
