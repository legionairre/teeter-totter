<template>
  <section class="header-container">
    <div class="header-content">
      <div class="teeter-totter-left-side">
        <div><strong>Total Weight: </strong>{{ leftSideTotalWeight }} KG</div>
        <div><strong>Incoming Shape Weight: </strong>{{ fallingShapes[0] && fallingShapes[0].weight }} KG</div>
      </div>
      <div class="header-buttons-container">
        <div>
          <b-button pill class="btn btn-success" @click="togglePlayGame">{{ isPause ? 'Play' : 'Pause' }}</b-button>
        </div>
        <div>
          <b-button pill class="btn btn-danger" @click="initGame">Restart</b-button>
        </div>
        <div>
          <b-button pill class="btn" :class="[autoMode ? 'btn-success' : 'btn-danger']" @click="toggleAutoMode">
            Auto Mode: {{ autoMode ? 'ON' : 'OFF' }}
          </b-button>
        </div>
      </div>
      <div class="teeter-totter-right-side">
        <div><strong>Total Weight: </strong>{{ rightSideTotalWeight }} KG</div>
      </div>
    </div>
    <div class="diff">
      <p><strong>Diff Moment: </strong>{{ getDiffMoment() }} kgm</p>
    </div>
  </section>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex'
import { SPACE_KEY } from '@/constants'

export default {
  name: 'Header',
  methods: {
    ...mapActions(['initGame']),
    ...mapMutations(['togglePlayGame', 'toggleModal', 'toggleAutoMode', 'setDiffMoment']),
    getTotalWeight (shapes = []) {
      let totalWeight = 0
      for (const val of shapes) {
        totalWeight += val.weight
      }
      return totalWeight
    },
    handleSpaceClick (event) {
      event.preventDefault()
      if (event.keyCode === SPACE_KEY && !this.modalOpen) {
        this.togglePlayGame()
      }
    },
    getDiffMoment () {
      let diffMoment = 0
      const leftItems = this.leftSideDroppedShapes
      const rightItems = this.rightSideShapes
      let totalMomentLeft = 0
      let totalMomentRight = 0
      for (const leftItem of leftItems) {
        totalMomentLeft += leftItem.weight * (50 - leftItem.left) / 10
      }
      for (const rightItem of rightItems) {
        totalMomentRight += rightItem.weight * rightItem.left / 10
      }
      diffMoment = totalMomentLeft - totalMomentRight
      this.setDiffMoment(diffMoment)
      if (diffMoment <= 20) {
        return diffMoment
      } else {
        this.toggleModal(true)
        return diffMoment
      }
    }
  },
  computed: {
    ...mapState([
      'leftSideDroppedShapes',
      'fallingShapes',
      'isPause',
      'modalOpen',
      'rightSideShapes',
      'autoMode',
      'diffMoment'
    ]),
    leftSideTotalWeight () {
      return this.getTotalWeight(this.leftSideDroppedShapes)
    },
    rightSideTotalWeight () {
      return this.getTotalWeight(this.rightSideShapes)
    }
  },
  mounted () {
    window.addEventListener('keydown', this.handleSpaceClick)
  },
  destroyed () {
    window.removeEventListener('keydown', this.handleSpaceClick)
  }
}
</script>

<style lang="scss" scoped>
.header-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.header-content {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;

  .teeter-totter-left-side {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: center;
    border: 1px solid lightcyan;
    padding: 10px;
    text-align: left;
    background: lightcyan;
    border-radius: 8px;
    box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.5);
  }

  .header-buttons-container {
    display: flex;
    flex-direction: row;

    div {
      margin: 10px;
    }
  }

  .teeter-totter-right-side {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: center;
    border: 1px solid lightcyan;
    padding: 10px;
    text-align: left;
    background: lightcyan;
    border-radius: 8px;
    box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.5);
  }
}

.btn {
  width: 150px;
}
</style>
