let initialState = []

export default function favorite(state = initialState, action){
  switch (action.type) {

    case 'loadfavoritesucess':
    return action.favorite.favorite

    default:
    return state
  }
}
