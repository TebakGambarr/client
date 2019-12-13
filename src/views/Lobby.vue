<template>
  <div class="container">
    <chat-box />
  </div>
</template>

<script>
import ChatBox from '@/components/ChatBox.vue'
// import socket from '@/config/socket.js'
// import { mapState } from 'vuex'

export default {
  name: 'lobby',
  components: {
    ChatBox
  }
}
</script>

<style scoped>
body {
background-color: #3498db;
-webkit-font-smoothing: antialiased;
-moz-osx-font-smoothing: grayscale;
text-rendering: optimizeLegibility;
}
.container {
margin: 60px auto;
background: #fff;
padding: 0;
border-radius: 7px;
}
</style>
