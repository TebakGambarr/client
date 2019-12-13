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
  // mounted: function () {
  //   this.playSound('http://soundbible.com/mp3/Air Plane Ding-SoundBible.com-496729130.mp3')
  // },
  // methods: {
  //   playSound (sound) {
  //     if(sound) {
  //       var audio = new Audio(sound);
  //       audio.play();
  //     }
  //   }
  // }
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
  color: black;
}
</style>
