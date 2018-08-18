let initialState = []

export default function myresep(state = initialState, action){
  switch (action.type) {

    case 'RESEP_SAYA':
    return action.resep.data

    case 'RESEP_SAYA_KOSONG':
    return []

    case 'LOADMORE_SUCCESS':
    return [...state, ...action.resep.resep]

    default:
    return state
  }
}
