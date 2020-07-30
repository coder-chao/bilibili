<template>
  <div id="app">
    <keep-alive>
        <router-view v-if="$route.meta.keepalive"/>
    </keep-alive>
     <router-view v-if="!$route.meta.keepalive"/>
  </div>
</template>

<style lang="less">
    *{
        margin: 0;
        padding: 0;
         box-sizing: border-box;
    }
    body{
        box-sizing: border-box;
        background: #f4f4f4;
    }
    a{
        color: #555;
    }
</style>

