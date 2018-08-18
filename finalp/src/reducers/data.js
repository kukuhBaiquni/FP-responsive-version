let initialState = []

export default function data(state = initialState, action){
  switch (action.type) {

    case 'tambahResepGagal':
      return state

    case 'tambahResepSukses':
    return state

    case 'likingsuccess':
    return state

    case 'favoritesuccess':
    return state

    case 'loadlikedfailed':
    return []

    case 'loadfavoritefailed':
    return []

    case 'loadResepSukses':
    let order = action.resep.resep
    return order

    case 'SEARCH_RESULT':
    return action.resep.resep

    default:
      return state
  }
}
