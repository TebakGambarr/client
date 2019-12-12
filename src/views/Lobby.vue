<template>
    <div class="container">
        {{room}}
    </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'lobby',
  computed: {
    ...mapState(['room'])
  }
}
</script>

<style>

</style>
