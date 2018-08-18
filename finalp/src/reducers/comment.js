let initialState = []

export default function comment(state = initialState, action){
  switch (action.type) {

    case 'loadcommentsuccess':
    return action.comment.comment

    default:
    return state
  }
}
