<template>
    <div>
		<transition name="fade">
        <form @submit.prevent="submitUsername" v-if="!storeUsername">
            <div class="form-group">
                <input type="text" class="form-control username-input" placeholder="Enter username" v-model="username">
            </div>
            <div class="text-center py-3">
              <button type="submit" class="learn-more">Ready to Play!</button>
            </div>
        </form>

		<div v-else>
			<h3>Welcome to TebakGambar, {{ storeUsername }}!</h3>
			<div class="options mt-5 pt-3 text-center">
				<h3>You can join a room</h3>
				<p class="my-4">OR</p>
				<button class="learn-more" data-toggle="modal" data-target="#exampleModal">
					Create a Room
				</button>
			</div>

			<!-- Modal -->
			<div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
				<div class="modal-dialog modal-dialog-centered" role="document">
					<div class="modal-content">
					<div class="modal-header">
						<h5 class="modal-title" id="exampleModalCenterTitle">Create a room</h5>
						<button type="button" class="close" data-dismiss="modal" aria-label="Close">
						<span aria-hidden="true">&times;</span>
						</button>
					</div>
					<div class="modal-body">
						<form>
							<div class="form-group">
								<label>Room name: </label>
								<input type="text" class="form-control" required v-model="roomName">
							</div>
							<div class="form-group">
								<label>Password: </label><br>
								<small class="text-muted">If no password is provided, room can be accessed by anyone.</small>
								<input type="text" class="form-control" v-model="roomPassword">
							</div>
						</form>
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
						<button type="button" class="btn btn-primary" data-dismiss="modal" @click.prevent="createRoom">Create</button>
					</div>

					</div>
				</div>
			</div>
		</div>
		</transition>

    </div>
</template>

<script>
import { mapState } from 'vuex'
import socket from '@/config/socket.js'

export default {
  name: 'nameForm',
  data () {
    return {
      username: null,
      roomName: null,
      roomPassword: null
    }
  },
  methods: {
    submitUsername () {
      localStorage.setItem('username', this.username)
      this.$store.commit('SET_USERNAME', this.username)
    },
    createRoom () {
      let room = {
        name: this.roomName,
        password: this.password
      }
      socket.emit('createRoom', room, this.username)
      socket.on('connectToNewRoom', (data) => {
        this.$store.commit('SET_ROOM', data)
        this.$router.push('/lobby')
      })
    }
  },
  computed: {
    ...mapState({
      storeUsername: 'username'
    })
  }
}
</script>

<style scoped>
.options {
	width: 70%;
}

.fade-enter-active {
    transition: opacity .5s
}

.fade-enter {
    opacity: 0
}

.username-input {
    border-radius: 20px;
    background-color: #fff0f0;
    outline: none;
    padding: 1.5rem;
}

.username-input:focus {
  outline: none;
  background-color: #fff0f0;
}

button {
	 position: relative;
	 display: inline-block;
	 cursor: pointer;
	 outline: none;
	 border: 0;
	 vertical-align: middle;
	 text-decoration: none;
	 font-size: inherit;
	 font-family: inherit;
}
 button.learn-more {
	 font-weight: 600;
	 color: #382b22;
	 text-transform: uppercase;
	 padding: 0.50em 2em;
	 background: #fff0f0;
	 border: 2px solid #b18597;
	 border-radius: 0.75em;
     outline: none;
	 transform-style: preserve-3d;
	 transition: transform 150ms cubic-bezier(0, 0, 0.58, 1), background 150ms cubic-bezier(0, 0, 0.58, 1);
}

 button.learn-more::before {
	 position: absolute;
	 content: '';
	 width: 100%;
	 height: 100%;
	 top: 0;
	 left: 0;
	 right: 0;
	 bottom: 0;
	 background: #f9c4d2;
	 border-radius: inherit;
	 box-shadow: 0 0 0 2px #b18597, 0 0.625em 0 0 #ffe3e2;
	 transform: translate3d(0, 0.75em, -1em);
	 transition: transform 150ms cubic-bezier(0, 0, 0.58, 1), box-shadow 150ms cubic-bezier(0, 0, 0.58, 1);
}
 button.learn-more:hover {
	 background: #ffe9e9;
	 transform: translate(0, 0.25em);
}
 button.learn-more:hover::before {
	 box-shadow: 0 0 0 2px #b18597, 0 0.5em 0 0 #ffe3e2;
	 transform: translate3d(0, 0.5em, -1em);
}
 button.learn-more:active {
	 background: #ffe9e9;
	 transform: translate(0em, 0.75em);
}
 button.learn-more:active::before {
	 box-shadow: 0 0 0 2px #b18597, 0 0 #ffe3e2;
	 transform: translate3d(0, 0, -1em);
}

</style>
