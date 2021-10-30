export const state = () => ({
  list: {}
})

export const mutations = {
  SET_LIST(state, list) {
    state.list = list
  }
}

export const actions = {
  async fetch(context) {
    let data_response = await fetch('data.json')
    let data_json = await data_response.json()
    let data = data_json.Value.Goods

    let names_response = await fetch('names.json')
    let names = await names_response.json()

    let res = {}
    let id = 1
    for ( let key in data) {
      let item = {}

      item.group = names[data[key].G].G
      item.title = names[data[key].G].B[data[key].T].N
      item.count = data[key].P
      item.price = data[key].C
      item.id = id
      if ( !res[item.group] ) res[item.group] = []
      res[item.group].push(item)
      id++
    }

    context.commit('SET_LIST', res)
  }
}

