let initialState = []

export default function liked(state = initialState, action){
  switch (action.type) {

    case 'loadlikesuccess':
    return action.liked.liked

    default:
    return state
  }
}
