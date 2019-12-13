<template>
<div>
  <drawArena />
  <chat-box />
</div>
</template>

<script>
import ChatBox from '@/components/ChatBox.vue'
import drawArena from '../components/board3'

export default {
  name: 'home',
  components: {
    ChatBox,
    drawArena
  }
}
</script>
