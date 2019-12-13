<template>
    <div>
        <form @submit.prevent="submitUsername">
            <div class="form-group">
                <input type="text" class="form-control" placeholder="Enter username" v-model="username">
            </div>
            <button type="submit" class="btn btn-primary">Submit</button>
        </form>
    </div>
</template>

<script>
export default {
  name: 'nameForm',
  data () {
    return {
      username: null
    }
  },
  methods: {
    submitUsername () {
      localStorage.setItem('username', this.username)
      this.$store.commit('SET_USERNAME', this.username)
    }
  }
}
</script>

<style>

</style>
