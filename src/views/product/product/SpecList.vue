<script setup lang="ts">

import {onMounted, ref, toRaw, watch} from "vue";
import {ProductSpecVo} from "@/api/product/product";
import {Button, CheckableTag, Modal, Select, SelectOption} from 'ant-design-vue';
import PicUpload from "@/components/Upload/src/PicUpload.vue";
import {uploadApi} from "@/api/sys/upload";
import { DeleteOutlined } from '@ant-design/icons-vue';
import { createPrompt } from '@/components/Prompt';
import {
  createCommonSpecValue,
  SpecValueVo
} from "@/api/product/spec";
import {useModal} from "@/components/Modal";
import SpecModal from "@/views/product/product/SpecModal.vue";


defineOptions({ name: 'SpecList' })
const props = defineProps({
  specList: {
    type: Array<ProductSpecVo>,
    default: []
  },
})
const emit = defineEmits(['options-change', 'change']);

let specs = ref<ProductSpecVo[]>([])

const [register, { openModal: openModal }] = useModal();

// onMounted(()=>{
//   specs.value?.push({
//     id: 3,
//     title: '颜色',
//     type:1,
//     show_image: false,
//     values: [
//       {id: 31, title: '红色', pitch_on:false},
//       {id: 32, title: '蓝色', pitch_on:false},
//       {id: 33, title: '绿色', pitch_on:false},
//     ]
//   })
//   specs.value?.push({
//     id: 4,
//     title: 'jjj',
//     type:1,
//     show_image: false,
//     values: [
//       {id: 41, title: 'A', pitch_on:false},
//       {id: 42, title: 'B', pitch_on:false},
//       {id: 43, title: 'C', pitch_on:false},
//     ]
//   })
//   console.log(specs.value)
// })

watch(() => props.specList, (newValue, oldValue) => {
    specs.value = toRaw(newValue)
    dataChanged()
    optionsChange()
})

onMounted(() => {
  specs.value = toRaw(props.specList)
  dataChanged()
  optionsChange()
})

function  createSpec() {
  openModal(true)
}

function addSpecSuc(value: any) {
  specs.value.push(value)
  dataChanged()
}

function deleteSpecValue(v: any) {
  Modal.confirm({
    title: '删除规格值',
    content: '确定删除规格值吗？',
    onOk() {
      v.spec.values.splice(v.spec.values.indexOf(v), 1)
      dataChanged()
    },
  })
}

function deleteSpec(v: any) {
  Modal.confirm({
    title: '删除规格',
    content: '确定删除规格吗？',
    onOk() {
      specs.value.splice(specs.value.indexOf(v), 1)
      dataChanged()
      optionsChange()
    },
  })
}

function addSpecValue(v: any) {
  console.log(v)
  console.log(specs.value)
  createPrompt({
    title: '请输入规格名称',
    required: true,
    label: '规格名称',
    onOK: async (email: string) => {
      let data = {
        title: email,
        specId: v.id,
        isTmp: true,
    } as SpecValueVo
    let ret = await createCommonSpecValue(data)
      data.id = ret
      if (v.values) {
        v.values.push(data)
      } else {
        v.values = [data]
      }
     console.log(ret)
     dataChanged()
    },
    inputType: 'Input',
  });
}

function dataChanged() {
  emit('change', toRaw(specs.value))
}

function optionsChange() {
  let ret:ProductSpecVo[] = []
  toRaw(specs.value).forEach((v)=>{
    if (v.values && v.values?.length > 0) {
      let values = v.values.filter((v) => v.pitch_on)
      if (values.length > 0) {
        let spec = {...v}
        spec.values = values
        ret.push(spec)
      }
    }
  })
  emit('options-change', ret)
}

</script>

<template>
  <div>商品规格</div>
  <Button class="m-2" size="small" @click="createSpec">新增规格</Button>
  <div class="p-2 my-1 bg-gray:10 hover:bg-gray:20" v-for="spec in specs">
    <div class="mb-2">
      <div class="mb-1"><span>规格名称:  </span><span>{{ spec.title }}</span> <Button class="ml-10" type="primary" danger size="small" @click="deleteSpec(spec)" >删除规格</Button> </div>
      <span>展示样式: </span><Select size="small" class="w-30" v-model:value="spec.type"><SelectOption :value="1">文字</SelectOption> <SelectOption :value="3">图片</SelectOption></Select>
    </div>
    <div class="mb-1 text-red-4">请点击选择规则值</div>
    <div class="flex justify-between mx-4">
      <div class="flex align-center items-center">
        <div class="bg-danger-500" v-for="value in spec.values">
          <div class="flex  group items-start mr-2">
            <CheckableTag class="w-20 h-10 flex  items-center justify-center" :key="value.id" v-model:checked="value.pitch_on" @change="optionsChange">
              {{ value.title }}
              <PicUpload class="ml-1" v-if="spec.type == 3" v-model:value="value.data" :max-number="1" :api="uploadApi">shang</PicUpload>
            </CheckableTag>
            <DeleteOutlined v-if="!value.pitch_on" @click="deleteSpecValue({spec, value})" class="opacity-0 group-hover:opacity-100 hover:opacity-100" />
          </div>
        </div>
      </div>
      <Button size="small" @click="addSpecValue(spec)">增加规格值</Button>
    </div>
  </div>
  <SpecModal @register="register" @success="addSpecSuc"></SpecModal>
</template>

<style scoped lang="less">

</style>
