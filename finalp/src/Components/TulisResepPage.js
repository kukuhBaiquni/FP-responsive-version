import React, {Component} from 'react'
import TulisResepForm from './TulisResepForm'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as AppActions from './actions'

class TulisResepPage extends Component {
  componentDidMount(){
    let token = localStorage.getItem('token')
    this.props.actions.loadUser(token)
  }
  render(){
    return(
      <div>
        <TulisResepForm user={this.props.user} utility={this.props.utility} actions={this.props.actions} />
      </div>
    )
  }
}

function mapStateToProps(state){
  return{
    data: state.data,
    utility: state.utility,
    user: state.user
  }
}

function mapDispatchToProps(dispatch){
  return{
    actions: bindActionCreators(AppActions, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TulisResepPage)
