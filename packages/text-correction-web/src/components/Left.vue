<template>
  <div class="w-full h-full p-6 relative">
    <div class="bg-white w-full h-full outline-none p-4 whitespace-pre-wrap rounded-md" contenteditable="true" @input="input" ref="divRef" >
    </div>
    <div class=" absolute left-10 right-10 bottom-10 h-20 shadow-lg px-4 flex items-center">
      <!-- <div class="flex"> -->
        <div class="flex-1">
          <div v-show="!!editorData.count" class=" text-slate-800">
            {{ editorData.count }}
          </div>
        </div>
        <div class="flex space-x-4">
          <el-button @click="audit" class=" bg-blue-400 rounded-full px-10 py-2 text-white hover:bg-blue-700 " v-loading.fullscreen.lock="loading">审核</el-button>
          <el-button @click="clear" class=" bg-rose-400 rounded-full px-10 py-2 text-white hover:bg-rose-700">清空</el-button>
        </div>
      <!-- </div> -->
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, watch } from 'vue';
import { editorStore } from '../stores/EditorStore';
import { storeToRefs } from "pinia";

const editorData = editorStore();
const { source, results, loading } = storeToRefs(editorData);

const divRef = ref();

function audit() {
  editorData.audit();
}

function clear() {
  editorData.clear();
}

function input(e) {
  editorData.setSource(e.target.innerText);
}

function assembleDecoredSource() {
  const sourceValue = source.value;
  const resultsValue = results.value;
  let cuurentIndex = 0;
  let arr = [];
  for (let i=0;i<resultsValue.length;i++) {
    const { startPos, endPos } = resultsValue[i]; 
    arr.push(sourceValue.substring(cuurentIndex, startPos));
    arr.push(`<span style="color: red;">${sourceValue.substring(startPos, endPos)}</span>`);
    cuurentIndex = endPos;
  }
  arr.push(sourceValue.substring(cuurentIndex));
  return arr.join("");
}

watch(results, () => {
  divRef.value.innerHTML = assembleDecoredSource();
})


</script>

<style lang="scss" scoped>
</style>