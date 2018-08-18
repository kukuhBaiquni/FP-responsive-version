let initialState = []

export default function resepdetail(state = initialState, action){
  switch (action.type) {

    case 'resepDetailFailed':
    return state

    case 'resepDetailSuccess':
    return action.data.resep

    case 'RESEP_DETAIL_EMPTY':
    return []

    default:
    return state
  }
}
