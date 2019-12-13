<template>
<div>
  <div class="d-flex justify-content-between">
		<div>
			<drawBoard />
		</div>
		<div>
			<h3 v-if="gameRunning.currPlayer == username">The word you have to draw: {{word}}</h3>
				<div class="flexbox">
					<div class="chat-box ml-0">
						<div id="chat_box_body" class="chat-box-body overflow-auto">
							<div id="chat_messages" v-for="(chat, i) in chats" :key="i">
								<div v-if="username != chat.username">
								<div class="profile other-profile" >
									<span>{{chat.username}}</span>
								</div>
								<div class="message other-message">
									<span>{{chat.message}}</span>
								</div>
								</div>
								<div v-else>
								<div class="profile my-profile">
									{{chat.username}}
								</div>
								<div class="message my-message">
									{{chat.message}}
								</div>
								</div>
							</div>
						</div>

						<div class="chat-box-footer" v-if="gameRunning.currPlayer != username">
						<textarea id="chat_input" placeholder="Enter your answer here..." v-model="message"></textarea>
						<button id="send" @click.prevent="sendMessage">
							<svg style="width:24px;height:24px" viewBox="0 0 24 24">
							<path fill="#006ae3" d="M2,21L23,12L2,3V10L17,12L2,14V21Z" />
							</svg>
						</button>
					</div>
				</div>
			</div>
		</div>
  </div>
  <div class="p-4">
	  <h4>{{room.name}}</h4>
	  <h6>{{gameRunning.currPlayer}} is drawing...</h6>
	  <hr>
	  <h6>Current Scores:</h6>
	  <p v-for="(item, key, i) in gameRunning.scoreboard" :key="i">
		  {{key}} - {{item}}
	  </p>
  </div>
</div>

</template>

<script>
import { mapState } from 'vuex'
import socket from '@/config/socket.js'
import drawBoard from '@/components/board3.vue'
import Swal from 'sweetalert2'
// import chatBox from '@/components/ChatBox.vue'

export default {
  name: 'arena',
  data () {
    return {
      chats: [],
	  message: ''
    }
  },
  components: {
    // chatBox
    drawBoard
  },
  methods: {
    sendMessage: function () {
      if (this.message == this.word) {
        socket.emit('correctWord', {
          winner: this.username
        })
      } else {
        socket.emit('receiveMessage', {
          room: this.room,
          username: this.username,
          message: this.message
        })
      }
    },
    publishMessage: function () {
      socket.on('publishMessage', (data) => {
        this.chats.push(data)
        this.message = ''
      })
    },
    latestScore () {
      socket.on('latestGameScore', (word, gameObj) => {
        this.$store.commit('SET_GAME_WORD', word)
        this.$store.commit('SET_GAME_OBJECT', gameObj)
        Swal.fire(
          'Good job!',
          '',
          'success'
        )
      })
    },
    endGame () {
      socket.on('endGame', (gameObj) => {
        this.$store.commit('SET_GAME_OBJECT', gameObj)
        this.$router.push('/')
        Swal.fire(
          'We got a winner',
          '',
          'success'
        )
      })
    }
  },
  created () {
    console.log(this.username)
  },
  computed: {
    ...mapState(['room', 'username', 'word', 'gameRunning'])
  },
  mounted () {
    this.publishMessage()
    this.latestScore()
    this.endGame()
  }
}
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css?family=Raleway:400,400i,700");

 html, body, .flexbox {
	 width: 100%;
	 height: 100%;
}
 body {
	 color: #2f2f2f;
	 font-family: Raleway, sans-serif;
	 font-size: 16px;
}
 .flexbox {
	 display: flex;
	 justify-content: center;
	 align-items: center;
}
 .chat-box {
	 background-color: #fff;
	 margin: 20px;
	 width: 100%;
	 height: 400px;
	 max-height: calc(100% - 40px);
	 display: flex;
	 flex-direction: column;
	 border-radius: 13px;
	 box-shadow: 0 5px 8px rgba(0, 0, 0, 0.3);
}
 .chat-box > .chat-box-header {
	 width: 100%;
	 padding: 20px 15px;
	 border-bottom: solid 1px #cfcfcf;
	 box-sizing: border-box;
}
 .chat-box > .chat-box-body {
	 height: 100%;
	 display: flex;
	 overflow: auto;
	 display: flex;
	 flex-direction: column;
}
 .chat-box > .chat-box-body #chat_messages {
	 width: 100%;
	 padding: 0px 15px;
	 display: flex;
	 flex-direction: column;
	 box-sizing: border-box;
}
 .chat-box > .chat-box-body #chat_messages .message {
	 width: 80%;
	 padding: 20px 15px;
	 margin: 2px 0;
	 overflow: hidden;
	 border-radius: 13px;
	 transition: height 0.3s ease-in-out;
}
 .chat-box > .chat-box-body #chat_messages .message.hide {
	 height: 0;
}
 .chat-box > .chat-box-body #chat_messages .my-message {
	 color: #fff;
	 background-color: #006ae3;
	 align-self: flex-end;
}
 .chat-box > .chat-box-body #chat_messages .other-message {
	 background-color: #e2e2e2;
}
 .chat-box > .chat-box-body #chat_messages .profile {
	 margin: 2px 0;
	 overflow: hidden;
	 transition: height 0.3s ease-in-out;
}
 .chat-box > .chat-box-body #chat_messages .profile.hide {
	 height: 0;
}
 .chat-box > .chat-box-body #chat_messages .profile img {
	 display: inline-block;
	 margin: 0;
	 padding: 0;
	 vertical-align: middle;
	 border-radius: 50%;
}
 .chat-box > .chat-box-body #chat_messages .my-profile {
	 color: #afafaf;
	 align-self: flex-end;
}
 .chat-box > .chat-box-body #chat_messages .other-profile {
	 color: #afafaf;
}
 .chat-box #typing {
	 color: #afafaf;
	 width: 100%;
	 height: 0;
	 padding: 0 15px;
	 overflow: hidden;
	 box-sizing: border-box;
	 opacity: 0;
	 transition: 0.3s height ease-in-out, 0.3s opacity ease-in-out;
}
 .chat-box #typing.active {
	 height: 80px;
	 opacity: 1;
}
 .chat-box #typing span:not(.n) {
	 background-color: #afafaf;
	 width: 10px;
	 height: 10px;
	 margin-top: 20px;
	 display: inline-block;
	 border-radius: 50%;
}
 .chat-box #typing span:not(.n):nth-child(1) {
	 animation: typing 1.2s infinite;
}
 .chat-box #typing span:not(.n):nth-child(2) {
	 animation: typing 1.2s infinite 0.1s;
}
 .chat-box #typing span:not(.n):nth-child(3) {
	 animation: typing 1.2s infinite 0.2s;
}
 .chat-box > .chat-box-footer {
	 width: 100%;
	 padding: 20px 15px;
	 border-top: solid 1px #cfcfcf;
	 box-sizing: border-box;
	 display: flex;
}
 .chat-box > .chat-box-footer > #chat_input {
	 color: #2f2f2f;
	 font-family: Raleway, sans-serif;
	 font-size: 16px;
	 background-color: #d2d2d2;
	 width: 100%;
	 height: 40px;
	 max-height: 120px;
	 border: none;
	 padding: 10px 15px;
	 resize: none;
	 box-sizing: border-box;
	 border-radius: 13px;
	 transition: 0.3s background-color;
}
 .chat-box > .chat-box-footer > #chat_input:focus {
	 background-color: #efefef;
}
 .chat-box > .chat-box-footer > #send {
	 background: none;
	 border: none;
	 margin-left: 10px;
	 padding: 5px;
	 cursor: pointer;
	 border-radius: 50%;
}
 @media (min-width: 480px) {
	 .chat-box {
		 width: 480px;
	}
}
 @keyframes typing {
	 0% {
		 transform: translateY(0px);
	}
	 33.3333% {
		 transform: translateY(-5px);
	}
	 66.6667% {
		 transform: translateY(5px);
	}
	 100% {
		 transform: translateY(0px);
	}
}
 button::-moz-focus-inner {
	 border-style: none;
	 padding: 0;
}
 button {
	 outline: none;
}
 h3 > small {
	 color: #afafaf;
	 font-weight: normal;
}

</style>
