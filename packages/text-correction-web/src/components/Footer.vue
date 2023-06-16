<!--
 * @Author: Hong.Zhang
 * @Date: 2022-09-24 00:05:39
 * @Description: 
-->
<template>
  <div class="container">
    <div class='wrapper'>
      <img src="../assets/police.png">
      <a class='police' target="_blank" href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=51019002005101" >
        川公网安备 51019002005101号
      </a>
      <a class='icp' href="https://beian.miit.gov.cn/" target="_blank">蜀ICP备2022022861号-1</a>
    </div>
  </div>
</template>

<script setup>
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  height: 100%;
  position: relative;
  .wrapper {
    position: absolute;
    display: flex;
    flex-direction: row;
    align-items: center;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    // text-decoration: none;
  }
  .police {
    color: #ccc;
    &:hover {
      color: #666;
    }
  }
  .icp {
    margin-left: 20px;
    color: #ccc;
    &:hover {
      color: #666;
    }
  }
}
</style>