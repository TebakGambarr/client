<template>
  <div class="row no-gutters">
    <div class="col-md-4 border-right">
      <div class="settings-tray">
        <h1>{{ room.name }}</h1>
        <!-- <img class="profile-image" src="https://filiprastovic.com/wp-content/themes/filip-rastovic/assets/img/bootstrap-chat-app-assets/filip.jpg" alt="Profile img"> -->
        <!-- <span class="settings-tray--right">
          <i class="material-icons">cached</i>
          <i class="material-icons">message</i>
          <i class="material-icons">menu</i>
        </span> -->
        <button class="btn" @click.prevent="startArena" :disabled="isDisabled">start play!</button>
      </div>
      <div class="search-box">
        <div class="input-wrapper">
          <i class="fa fa-search">search</i>
          <input placeholder="Search here" type="text">
        </div>
      </div>
      <div class="friend-drawer friend-drawer--onhover" v-for="(player, index) in room.players" :key="index">
        <!-- <img class="profile-image" src="https://filiprastovic.com/wp-content/themes/filip-rastovic/assets/img/bootstrap-chat-app-assets/robocop.jpg" alt=""> -->
        <div class="text">
          <h6>{{ player }}</h6>
          <!-- <p class="text-muted">Hey, you're arrested!</p> -->
        </div>
        <!-- <span class="time text-muted small">13:21</span> -->
      </div>
      <hr>
    </div>
    <div class="col-md-8">
      <div class="settings-tray">
          <div class="friend-drawer no-gutters friend-drawer--grey">
          <img class="profile-image" src="https://filiprastovic.com/wp-content/themes/filip-rastovic/assets/img/bootstrap-chat-app-assets/robocop.jpg" alt="">
          <div class="text">
            <h6>{{ username }}</h6>
            <!-- <p class="text-muted">Layin' down the law since like before Christ...</p> -->
          </div>
          <span class="settings-tray--right">
            <button class="btn" @click.prevent="leaveRoom">leave room</button>
          </span>
        </div>
      </div>
      <div class="chat-panel">
        <div class="row no-gutters" v-for="(chat, index) in chats" :key="index">
          <div class="col-md-3 offset-md-9">
            <div class="chat-bubble chat-bubble--left">
              {{ chat.username }}: {{ chat.message }}
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-12">
            <div class="chat-box-tray">
              <!-- <i class="material-icons">sentiment_very_satisfied</i> -->
              <input type="text" placeholder="Type your message here..." v-model="message">
              <!-- <i class="material-icons">mic</i> -->
              <button class="btn" @click.prevent="sendMessage"><i class="fa fa-paper-plane">send</i></button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import socket from '@/config/socket.js'
import { mapState } from 'vuex'

export default {
  name: 'ChatBox',
  data () {
    return {
      chats: [],
      temp: [],
      message: '',
      username: '',
      enoughPlayers: false
    }
  },
  methods: {
    sendMessage: function () {
      socket.emit('recieveMessage', {
        room: this.room,
        username: this.username,
        message: this.message
      })
      console.log(1)
      this.temp.push({
        username: this.username,
        message: this.message
      })
      // console.log(this.temp)
      this.message = ''
      this.temp = []
    },
    publishMessage: function () {
      socket.on('publishMessage', function (data) {
      // console.log(4)
        console.log('masuk publish')
        this.chats.push(data)
      })
    },
    startArena: function (room) {
      socket.emit('joinArena', this.room)
      socket.on('connectToArena', () => {
        this.$router.push('/arena')
      })
    },
    leaveRoom: function (room) {
      socket.emit('leaveRoom', this.room, this.username)
      socket.on('backToHome', (data) => {
        this.$router.push('/')
      })
    }
  },
  created: function () {
    this.username = localStorage.getItem('username')
  },
  computed: {
    ...mapState(['room']),
    isDisabled: function () {
      if (this.room.players >= 2) {
        return this.enoughPlayers = true
      } else {
        return this.enoughPlayers = false
      }
    }
  },
  // mounted: function () {

  // },
  watch: {
    temp: function () {
      console.log('masuk watch')
      this.publishMessage()
    }
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
.profile-image {
  width: 50px;
  height: 50px;
  border-radius: 40px;
}
.settings-tray {
  background: #eee;
  padding: 10px 15px;
  border-radius: 7px;
}
.settings-tray .no-gutters {
  padding: 0;
}
.settings-tray--right {
  float: right;
}
.settings-tray--right i {
  margin-top: 10px;
  font-size: 25px;
  color: grey;
  margin-left: 14px;
  transition: 0.3s;
}
.settings-tray--right i:hover {
  color: seagreen;
  cursor: pointer;
}
.search-box {
  background: #fafafa;
  padding: 10px 13px;
}
.search-box .input-wrapper {
  background: #fff;
  border-radius: 40px;
}
.search-box .input-wrapper i {
  color: grey;
  margin-left: 7px;
  vertical-align: middle;
}
input {
  border: none;
  border-radius: 30px;
  width: 80%;
}
input::placeholder {
  color: #e3e3e3;
  font-weight: 300;
  margin-left: 20px;
}
input:focus {
  outline: none;
}
.friend-drawer {
  padding: 10px 15px;
  display: flex;
  vertical-align: baseline;
  background: #fff;
  transition: 0.3s ease;
}
.friend-drawer--grey {
  background: #eee;
}
.friend-drawer .text {
  margin-left: 12px;
  width: 70%;
}
.friend-drawer .text h6 {
  margin-top: 6px;
  margin-bottom: 0;
}
.friend-drawer .text p {
  margin: 0;
}
.friend-drawer .time {
  color: grey;
}
.friend-drawer--onhover:hover {
  background: seagreen;
  cursor: pointer;
}
.friend-drawer--onhover:hover p, .friend-drawer--onhover:hover h6, .friend-drawer--onhover:hover .time {
  color: #fff !important;
}
hr {
  margin: 5px auto;
  width: 60%;
}
.chat-bubble {
  padding: 10px 14px;
  background: #eee;
  margin: 10px 30px;
  border-radius: 9px;
  position: relative;
  animation: fadeIn 1s ease-in;
}
.chat-bubble:after {
  content: '';
  position: absolute;
  top: 50%;
  width: 0;
  height: 0;
  border: 20px solid transparent;
  border-bottom: 0;
  margin-top: -10px;
}
.chat-bubble--left:after {
  left: 0;
  border-right-color: #eee;
  border-left: 0;
  margin-left: -20px;
}
.chat-bubble--right:after {
  right: 0;
  border-left-color: seagreen;
  border-right: 0;
  margin-right: -20px;
}
@keyframes fadeIn {
  0% {
    opacity: 0;
}
  100% {
    opacity: 1;
}
}
.offset-md-9 .chat-bubble {
  background: seagreen;
  color: #fff;
}
.chat-box-tray {
  background: #eee;
  display: flex;
  align-items: baseline;
  padding: 10px 15px;
  align-items: center;
  margin-top: 19px;
  bottom: 0;
}
.chat-box-tray input {
  margin: 0 10px;
  padding: 6px 2px;
}
.chat-box-tray i {
  color: grey;
  font-size: 30px;
  vertical-align: middle;
}
.chat-box-tray i:last-of-type {
  margin-left: 25px;
}
</style>