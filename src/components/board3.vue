<template>
  <div class="canvas-wrapper" ref="canvasWrapper">
    <div class="draw-area">
      <canvas id="canvas" ref="canvas" :width="width" :height="height"></canvas>
      <canvas id="cursor" ref="cursor" :width="width" :height="height"></canvas>
    </div>
    <ul class="tools">
      <li id="tool-pencil" :class="{ active: selectedToolIdx === 0 }" @click="changeTool('black')">
       <img src="@/assets/edit.svg"/>
      </li>
      <li id="tool-eraser" :class="{ active: selectedToolIdx === 1 }" @click="changeTool('#F9F9F9')">
       <img src="@/assets/eraser.svg"/>
      </li>
      <li id="tool-color-palette" @click="showColorPalette()">

      </li>
    </ul>
  </div>
</template>

<script>
const socket = io.connect('http://localhost:3000')

export default {
  name: 'board3',
  props: {
    brushSize: {
      type: Number,
      default: 12
    },
    width: {
      type: Number,
      default: 640
    },
    height: {
      type: Number,
      default: 480
    },
    outputName: {
      type: String,
      default: 'canvas'
    }
  },
  data () {
    return {
      canvasContext: null,
      cursorContext: null,
      drawing: false,
      lastX: 0,
      lastY: 0,
      current: {
        color: 'black'
      },
      tools: [
        {
          name: 'Pencil',
          color: '#000000'
        },
        {
          name: 'Eraser'
        }
      ],
      selectedToolIdx: 0
    }
  },
  mounted () {
    this.setCanvas()
    this.bindEvents()
    socket.on('drawing', this.onDrawingEvent)
  },
  methods: {
    setCanvas () {
      this.$refs.canvasWrapper.style.gridTemplateColumns = `${this.width}px 30px`
      this.$refs.canvasWrapper.style.width = `${this.width + 30}px`
      this.$refs.canvasWrapper.style.height = `${this.height}px`
      this.canvasContext = this.$refs.canvas.getContext('2d')
      this.canvasContext.lineJoin = 'round'
      this.canvasContext.lineCap = 'round'
      this.canvasContext.lineWidth = this.brushSize
      //   this.canvasContext.strokeStyle = this.tools[this.selectedToolIdx].color;
      this.cursorContext = this.$refs.cursor.getContext('2d')
    },
    bindEvents () {
      this.$refs.canvas.addEventListener('mousedown', this.onMouseDown, false)
      this.$refs.canvas.addEventListener('mousemove', this.throttle(this.onMouseMove, 10), false)
      this.$refs.canvas.addEventListener('mouseup', this.onMouseUp, false)
      this.$refs.canvas.addEventListener('mouseout', this.onMouseUp, false)
    },
    drawLine (x0, y0, x1, y1, color, emit) {
      let num = 0
      if (color === '#F9F9F9') {
        num = 15
      } else {
        num = 3
      }
      this.canvasContext.beginPath()
      this.canvasContext.moveTo(x0, y0)
      this.canvasContext.lineTo(x1, y1)
      this.canvasContext.strokeStyle = color
      this.canvasContext.lineWidth = num
      this.canvasContext.stroke()
      this.canvasContext.closePath()

      if (!emit) { return }
      var w = this.$refs.canvasWrapper.style.width = this.width + 30
      var h = this.$refs.canvasWrapper.style.height = this.height
      socket.emit('drawing', {
        x0: x0 / w,
        y0: y0 / h,
        x1: x1 / w,
        y1: y1 / h,
        color: color
      })
    },
    onMouseDown (e) {
      this.drawing = true
      this.current.x = e.clientX || e.touches[0].clientX
      this.current.y = e.clientY || e.touches[0].clientY
    },
    onMouseUp (e) {
      if (!this.drawing) { return }
      this.drawing = false
      this.drawLine(this.current.x, this.current.y, e.clientX || e.touches[0].clientX, e.clientY || e.touches[0].clientY, this.current.color, true)
    },
    onMouseMove (e) {
      if (!this.drawing) { return }
      this.drawLine(this.current.x, this.current.y, e.clientX || e.touches[0].clientX, e.clientY || e.touches[0].clientY, this.current.color, true)
      this.current.x = e.clientX || e.touches[0].clientX
      this.current.y = e.clientY || e.touches[0].clientY
    },
    throttle (callback, delay) {
      var previousCall = new Date().getTime()
      return function () {
        var time = new Date().getTime()

        if ((time - previousCall) >= delay) {
          previousCall = time
          callback.apply(null, arguments)
        }
      }
    },
    changeTool (tool) {
      this.current.color = tool
    },
    onDrawingEvent (data) {
      var w = this.$refs.canvasWrapper.style.height = this.height
      var h = this.$refs.canvasWrapper.style.height = this.height
      this.drawLine(data.x0 * w, data.y0 * h, data.x1 * w, data.y1 * h, data.color)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.canvas-wrapper {
  display: grid;
  position: relative;
}
#canvas {
  background-color: #f9f9f9;
  z-index: 0;
}
#cursor {
  z-index: 1;
  pointer-events: none;
}
.active {
  background-color: #dea878 !important;
}
.tools {
  margin: 0;
  padding: 0;
}
.tools li{
  padding: 4px;
  background-color: #c8c8c8;
  border-left: 1px solid #abaaaa;
}
.tools li:not(:last-child) {
  border-bottom: 1px solid #abaaaa;
}
.draw-area canvas {
  position: absolute;
  left: 0;
  top: 0;
  border: 2px solid #c8c8c8;
  border-radius: 10px 0 10px 10px;
}
</style>
