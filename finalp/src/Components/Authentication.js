import React, {Component} from 'react'
import {Redirect} from 'react-router'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as AppActions from './actions'
import createHistory from "history/createBrowserHistory"
const history = createHistory()

class Authentication extends Component {
  constructor(props) {
  super(props);
  this.state = {redirect: false};
}

componentDidMount() {
  let token = localStorage.getItem('token')
  if(token){
    history.push('/profile')
    this.setState({
      redirect: true
    })
  }else{
    history.push('/profile')
    this.timerID = setInterval(
      () => this.tick(),
      500
    )
  }
}

componentWillUnmount() {
  clearInterval(this.timerID);
}

tick() {
  let token = localStorage.getItem('token')
  if(token){
    this.setState({redirect: true})
  }
}

  render(){
    if (this.state.redirect) {
      return <Redirect to='/profile' />
    }else{
      return(
        <div>
        </div>
      )
    }
  }
}


function mapStateToProps(state){
  return{
    status: state.status
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
)(Authentication)
