<template>
  <div class="w-screen h-screen flex flex-col">
    <main class="flex-1 flex flex-row bg-slate-50">
      <div class="w-2/3 flex">
        <Left />
      </div>
      <div class="w-1/3 flex">
        <Right />
      </div>
    </main>
    <!-- <footer class="footer">
      <Footer />
    </footer> -->
  </div>
</template>

<script setup>
import Left from './Left.vue';
import Right from './Right.vue';
import Footer from './Footer.vue';
</script>

<style lang="scss" scoped>
</style>