export const state = () => ({
  list: []
})

export const mutations = {
  SET_LIST(state, list) {
    state.list = list
  }, 
  ADD_ITEM(state, item) {
    state.list.push(item)
  },
  REMOVE_ITEM(state, id) {
    let res = []
    state.list.forEach((item) => {
      if ( item.id != id ) res.push(item)
    })
    state.list = res


  }
}

export const actions = {
  addItem(context, item) {
    context.commit('ADD_ITEM', item)
  },
  removeItem(context, id) {
    context.commit('REMOVE_ITEM', id)
  }
}

