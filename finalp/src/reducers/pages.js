let initialState = []

export default function pages(state = initialState, action){
  switch (action.type) {

    case 'NORMAL_PAGINATION':
    return action.pages.summary

    case 'SEARCH_RESULT_PAGINATION':
    return action.pages.summary

    default:
    return state
  }
}
