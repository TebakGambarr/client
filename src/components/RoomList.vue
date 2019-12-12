<template>
    <div>
        <h3>Rooms</h3>
        <ul class="p-0">
            <li v-for="(room, i) in rooms"
                :key=i
                class="d-flex justify-content-between my-3">
                {{room.name}}
                <button v-if="username" @click.prevent="joinRoom(room)">Join</button>
            </li>
        </ul>
    </div>
</template>

<script>
import socket from '@/config/socket.js'
import { mapState } from 'vuex'

export default {
  name: 'roomList',
  data () {
    return {
      rooms: []
    }
  },
  methods: {
    getRooms () {
      socket.on('getRooms', (data) => {
        this.rooms = data
      })
    },
    joinRoom (room) {
      socket.emit('joinRoom', room, this.username)
      socket.on('connectToRoom', (data) => {
        this.$store.commit('SET_ROOM', data)
        this.$router.push('/lobby')
      })
    }
  },
  mounted () {
    this.getRooms()
  },
  computed: {
    ...mapState(['username'])
  }
}
</script>

<style>

</style>
