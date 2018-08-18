let initialState = []

export default function user(state = initialState, action){
  switch (action.type) {

    case 'loadUserSuccess':
    return action.user.user

    case 'uploadfpDone':
    return state

    case 'alluser':
    return action.users.user;

    case 'loaduserfailed':
    return []

    default:
    return state
  }
}
