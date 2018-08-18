let initialState = {
  searchMode: false,
  alertResepSubmitSuccess: false,
  alertResepSubmitFailed: false,
  submitResepProcessing: false,
  searchProcessing: false,
  showSearchResult: false,
  modal: false,
  userlogin: false,
  logoutconfirmation: false
}

export default function status(state = initialState, action){
  switch (action.type) {

    case 'TURN_ON_SEARCH_MODE':
    initialState.searchMode = true
    return {...initialState}

    case 'TURN_OFF_SEARCH_MODE':
    initialState.searchMode = false
    return {...initialState}

    case 'TURN_ON_SUBMIT_RESEP_PROCESSING':
    initialState.submitResepProcessing = true
    return {...initialState}

    case 'TURN_OFF_SUBMIT_RESEP_PROCESSING':
    initialState.submitResepProcessing = false
    return {...initialState}

    case 'TURN_ON_ALERT_RESEP_SUBMIT_SUCCESS':
    initialState.alertResepSubmitSuccess = true
    return {...initialState}

    case 'TURN_OFF_ALERT_RESEP_SUBMIT_SUCCESS':
    initialState.alertResepSubmitSuccess = false
    return {...initialState}

    case 'TURN_ON_ALERT_RESEP_SUBMIT_FAILED':
    initialState.alertResepSubmitFailed = true
    return {...initialState}

    case 'TURN_OFF_ALERT_RESEP_SUBMIT_FAILED':
    initialState.alertResepSubmitFailed = false
    return {...initialState}

    case 'TURN_ON_SEARCH_PROCESSING':
    initialState.searchProcessing = true
    return {...initialState}

    case 'TURN_OFF_SEARCH_PROCESSING':
    initialState.searchProcessing = false
    return {...initialState}

    case 'TURN_ON_SEARCH_RESULT':
    initialState.showSearchResult = true
    return {...initialState}

    case 'TURN_OFF_SEARCH_RESULT':
    initialState.showSearchResult = false
    return {...initialState}

    case 'openmodal':
    initialState.modal = true
    return {...initialState}

    case 'closemodal':
    initialState.modal = false
    return {...initialState}

    case 'userlogin':
    initialState.userlogin = true
    return {...initialState}

    case 'userlogout':
    initialState.userlogin = false
    return {...initialState}

    case 'logoutconfirmationShow':
    initialState.logoutconfirmation = true
    return {...initialState}

    case 'logoutconfirmationHide':
    initialState.logoutconfirmation = false
    return {...initialState}

    default:
    return state
  }
}
