<template>
  <div class="container my-5">
    <div class="row">
      <div class="col-9">
        <NameForm />
      </div>
      <div class="col-3">
        <RoomList />
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import RoomList from '@/components/RoomList.vue'
import NameForm from '@/components/NameForm.vue'

export default {
  name: 'home',
  components: {
    RoomList,
    NameForm
  }
}
</script>
