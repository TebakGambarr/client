<template>
<div>
  {{ this.timers }}
</div>
</template>

<script>
import { timer } from 'vue-timers'

export default {
  timers: [
    timer('log', 1000)
  ],
  methods: {
    log () {
      console.log('It works!')
    }
  }
}
</script>

<style>

</style>
