<template>
  <div class="game-modal-backdrop">
    <div class="game-modal" role="dialog">
      <h1>Game Over</h1>
      <div>
        <b-button pill class="btn btn-danger" @click="initGame">Restart</b-button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'Modal',
  methods: {
    ...mapActions(['initGame'])
  }
}
</script>

<style lang="scss" scoped>
.game-modal {
  position: absolute;
  height: 400px;
  width: 800px;
  border: 1px solid gainsboro;
  border-radius: 8px;
  top: 50%;
  left: 50%;
  margin-top: -200px;
  margin-left: -400px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  background: gainsboro;
}

.game-modal-backdrop {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  content: '';
}
</style>
