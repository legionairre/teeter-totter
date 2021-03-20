export default {
  initGame ({
    commit,
    state
  }) {
    if (!state.isPause) commit('togglePlayGame')
    if (state.modalOpen) commit('toggleModal')
    if (state.autoMode) commit('toggleAutoMode')
    commit('updateFallingIntervalGap', true)
    commit('clearAllShapeArrs')

    commit('generateShape')
    commit('generateShape')

    commit('generateShape', true)
  }
}
