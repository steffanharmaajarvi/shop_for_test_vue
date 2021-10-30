export const state = () => ({
  course: 20
})

export const mutations = {
  SET_COURSE(state, course) {
    state.course = course
  },
}

export const actions = {
  recalculate(context) {
    context.commit('SET_COURSE', Math.floor(Math.random() * (80 - 20 + 1) + 20).toFixed(0))
  },
}

