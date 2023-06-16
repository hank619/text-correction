<!--
 * @Author: Hong.Zhang
 * @Date: 2022-07-29 14:28:06
 * @Description: 
-->
<template>
  <div class="flex flex-col overflow-auto w-full h-full p-4">
    <div class=" my-6 p-6 self-center text-rose-400 text-center bg-rose-100 rounded-lg">
      全部错误数: <br> {{ editorData.results.length }}
    </div>
    <div v-for="(mistake, index) in editorData.results">
      <div class="px-3 py-4 bg-white shadow-sm">
        <span class=" text-gray-400">
          {{ `${index + 1}`.padStart(2, '0') }}
        </span>
        <span class="text-rose-400">
          {{ ` ${mistake.origin}` }}
        </span>
        <span :class="!!mistake.correct ? ' font-bold' : 'text-rose-400'">
          {{ !!mistake.correct ? ` ---> ${mistake.correct}` : '(删除)' }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { editorStore } from '../stores/EditorStore';

const editorData = editorStore();

</script>

<style lang="scss" scoped>
</style>