<template>
  <div class="container">
    <svg viewBox="0 0 960 300">
      <symbol id="s-text">
        <text text-anchor="middle" x="50%" y="80%">Tebak Gambar</text>
      </symbol>

      <g class = "g-ants">
        <use xlink:href="#s-text" class="text-copy"></use>
        <use xlink:href="#s-text" class="text-copy"></use>
        <use xlink:href="#s-text" class="text-copy"></use>
        <use xlink:href="#s-text" class="text-copy"></use>
        <use xlink:href="#s-text" class="text-copy"></use>
        <use xlink:href="#s-text" class="text-copy"></use>
      </g>
    </svg>
    <div class="row mt-3">
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

<style scoped>
svg {
    display: block;
    font: 7em 'Montserrat';
    width: 960px;
    height: 200px;
    margin: 0 auto;
}

.text-copy {
    fill: none;
    stroke: white;
    stroke-dasharray: 6% 29%;
    stroke-width: 5px;
    stroke-dashoffset: 0%;
    animation: stroke-offset 5.5s infinite linear;
}

.text-copy:nth-child(1){
	/* stroke: #4D163D; */
	stroke: #f67280;
	animation-delay: -1;
}

.text-copy:nth-child(2){
	stroke: #cf56a1;
	/* stroke: #840037; */
	animation-delay: -2s;
}

.text-copy:nth-child(3){
	stroke: #f67280;
	/* stroke: #BD0034; */
	animation-delay: -3s;
}

.text-copy:nth-child(4){
	stroke: #f67280;
	/* stroke: #BD0034; */
	animation-delay: -4s;
}

.text-copy:nth-child(5){
	/* stroke: #FDB731; */
	stroke: #c06c84;
	animation-delay: -5s;
}

.text-copy:nth-child(6){
	stroke: #e6b2c6;
	animation-delay: -6s;
}

@keyframes stroke-offset{
	100% {stroke-dashoffset: -35%;}
}
</style>
