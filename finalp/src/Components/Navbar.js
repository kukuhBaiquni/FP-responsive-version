import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {Animated} from "react-animated-css"
import {Redirect} from 'react-router'
import '../Style/Navbar.css'

export default class Navbar extends Component {
  constructor(props){
    super(props)
    this.state = {
      isLogin: false,
      redirect: false,
      responsive: false,
    }
    this.takeMeOut = this.takeMeOut.bind(this)
  }

  componentDidMount(){
    let token = localStorage.getItem('token')
    if (token) {
      this.setState({
        isLogin: true
      })
    }
  }

  confirmation(){
    this.props.actions.logoutconfirmationShow()

  }

  closeconfirmation(){
    this.props.actions.logoutconfirmationHide()
  }

  takeMeOut(){
    this.props.actions.logoutconfirmationHide()
    this.props.actions.userlogout()
    this.setState({
      isLogin: false,
      redirect: true
    })
    localStorage.removeItem('token')
    this.props.actions.searchModeOff()
  }

  responsivemenu(){
    this.setState(function(prevState){
      return {responsive: !prevState.responsive}
    })
  }

  render(){
    if (this.state.redirect) {
      return <Redirect to='/register&login' />
    }else{
      return(
        <div className='navbar-bg'>
          <div className={this.state.responsive ? 'navbar-pro responsive' : 'navbar-pro'}>
            <div className='navbar-list brand'>Supermia</div>
            <div className='swap-brand'>
              Menu
            </div>
            <div  className={this.state.responsive ? 'navbar-list except responsive' : 'navbar-list except'}>
              &nbsp;
            </div>
            {
              this.state.isLogin
              ?
              <div onClick={this.confirmation.bind(this)} className={this.state.responsive ? 'navbar-list list responsive' : 'navbar-list list'}>
                Logout &nbsp;
                <span className='glyphicon glyphicon-log-out'></span>
              </div>
              :
              <Link to='/register&login' className={this.state.responsive ? 'navbar-list list responsive' : 'navbar-list list'}>
                Daftar & Login &nbsp;
                <span className='glyphicon glyphicon-user'></span>
              </Link>
            }
            {
              this.state.isLogin &&
              <Link to='/profile' className={this.state.responsive ? 'navbar-list list responsive' : 'navbar-list list'}>
                Profil &nbsp;
                <span className='glyphicon glyphicon-user'></span>
              </Link>
            }
            <Link to='/'  className={this.state.responsive ? 'navbar-list list responsive' : 'navbar-list list'}>
              Beranda &nbsp;
              <span className='glyphicon glyphicon-home'></span>
            </Link>
            <div className={this.state.responsive ? 'menu-responsive yes' : 'menu-responsive'} onClick={this.responsivemenu.bind(this)}>
              <span className='glyphicon glyphicon-menu-hamburger'></span>
            </div>
          </div>
        </div>
      )
    }
  }
}
