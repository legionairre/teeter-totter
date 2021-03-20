<template>
  <div class="shape" :class="shapeClass" :style="styles" ref="shape">
    <span class="shape-weight"> {{ shape.weight }} kg {{ shape.left / 10 }} </span>
  </div>
</template>

<script>
import { CIRCLE, TRIANGLE, SQUARE } from '@/constants'
export default {
  name: 'Shape',
  props: {
    shape: Object,
    onBoard: Boolean,
    isRandom: Boolean
  },
  data () {
    return {
      width: 10
    }
  },
  computed: {
    shapeClass () {
      const { type } = this.shape
      switch (type) {
        case SQUARE:
          return 'shape-square'
        case TRIANGLE:
          return 'shape-triangle'
        case CIRCLE:
          return 'shape-circle'
        default:
          return ''
      }
    },
    styles () {
      const { color, scale, type, left: shapeLeft } = this.shape
      const start = this.isRandom ? 50 : 0
      const left = (this.isRandom && shapeLeft > 25) ? `calc(${start + shapeLeft}% - ${this.width}px)` : `${start + shapeLeft}%`
      return {
        left,
        borderBottomColor: type === TRIANGLE ? color : undefined,
        backgroundColor: type !== TRIANGLE ? color : undefined,
        transform: this.onBoard ? `scale(${scale}) translateY(-100%)` : `scale(${scale})`
      }
    }
  },
  mounted () {
    this.width = this.$refs.shape.getBoundingClientRect().width
  }
}
</script>

<style lang="scss" scoped>
.shape {
  position: absolute;
  display: flex;
  justify-content: center;
  transform-origin: top;
  &-weight {
    font-size: 12px;
    color: #fff;
  }
  &-triangle {
    width: 0;
    height: 0;
    border-left: 1.8rem solid transparent;
    border-right: 1.8rem solid transparent;
    border-bottom: 2.4rem solid;
    &-weight {
      position: absolute;
      top: calc(100% + 1rem);
      width: 4.5rem;
      text-align: center;
    }
  }
  &-square, &-circle {
    width: 2.2rem;
    height: 2.2rem;
  }
  &-circle {
    border-radius: 50%;
  }
}
</style>
