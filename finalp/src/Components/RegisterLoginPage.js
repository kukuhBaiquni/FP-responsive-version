import React, {Component} from 'react'
import RegisterForm from './RegisterForm'
import LoginForm from './LoginForm'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as AppActions from './actions'
import {Redirect} from 'react-router'
import {Link} from 'react-router-dom'

class RegisterLoginPage extends Component {
  constructor(props){
    super(props)

    this.state = {
      toggler: true,
      redirect: false
    }
    this.onClick = this.onClick.bind(this)
  }

  componentDidMount(){
    let token = localStorage.getItem('token')
    this.props.actions.loadAllUser()
    if (token) {
      this.setState({
        redirect: true
      })
    }else{
      this.setState({
        redirect: false
      })
    }
  }

  onClick(){
    this.setState(function(prevState){
      return {toggler: !prevState.toggler}
    })
  }
  render(){
    if (this.state.redirect) {
      return <Redirect to='/' />
    }else{
      return(
        <div className='bg'>
          <div>
            <Link to='/' className='brand'>Supermia</Link>
            <Link to='/register&login' className='topnavlist2'>
              Daftar & Login <span className='glyphicon glyphicon-user'></span>
          </Link>
          <Link to='/' className='topnavlist1'>
            Beranda <span className='glyphicon glyphicon-home'></span>
          </Link>
            <nav className="navbar navbar-default" id='navb'></nav>
          </div>
        <button className='togglerreg' onClick={this.onClick}>Login &nbsp;<span className='glyphicon glyphicon-refresh'></span>&nbsp; Register</button>
        <RegisterForm mode={this.state.toggler} actions={this.props.actions} user={this.props.user}/>
        <LoginForm mode={!this.state.toggler} actions={this.props.actions} user={this.props.user}/>
        </div>
      )
    }
  }
}

function mapStateToProps(state){
  return{
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
)(RegisterLoginPage)
