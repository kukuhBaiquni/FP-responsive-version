import React, {Component} from 'react'
import {Redirect} from 'react-router'
import {Animated} from "react-animated-css"

export default class RegisterForm extends Component {
  constructor(props){
    super(props)

    this.state = {
      namadepan: '',
      namabelakang: '',
      email: '',
      password: '',
      ulangipassword: '',
      formInvalid: false,
      redirect: false,
      emailalreadyused: false,
      openalert: false,
      passwordnotmatch: false
    }
    this.onSubmit = this.onSubmit.bind(this)
  }

  componentDidMount(){
    let token = localStorage.getItem('token')
    if (token) {
      this.setState({
        redirect: true
      })
    }
  }

  handleNamaDepan(e){
    this.setState({
      namadepan: e.target.value
    })
  }

  handleNamaBelakang(e){
    this.setState({
      namabelakang: e.target.value
    })
  }

  handleEmail(e){
    this.setState({
      email: e.target.value,
    })
  }

  handlePassword(e){
    this.setState({
      password: e.target.value
    })
  }

  handleRetypePassword(e){
    this.setState({
      ulangipassword: e.target.value
    })
  }

  onSubmit(e){
    e.preventDefault();
    if (this.state.namadepan && this.state.namabelakang
      && this.state.email && this.state.password && this.state.ulangipassword) {

        var namadepan = this.state.namadepan.trim();
        var namabelakang = this.state.namabelakang.trim();
        var email = this.state.email.trim();
        var password = this.state.password.trim();

        let emailvalidation = []
        this.props.user.map(function(x){
          if (x.email === email) {
            emailvalidation.push(x)
          }
          return x
        })
        if (this.state.password === this.state.ulangipassword) {
          if (emailvalidation.length !== 0) {
            this.setState({
              emailalreadyused: true
            })
          }else{
            this.setState({
              namadepan: '',
              namabelakang: '',
              email: '',
              password: '',
              ulangipassword: '',
              redirect: true
            })
            this.props.actions.addUser(namadepan, namabelakang, email, password)
          }
        }else{
          this.setState({
            passwordnotmatch: true
          })
        }

      }else{
        this.setState({
          formInvalid:true,
          openalert: true
        })
      }
    }

    closealert(){
      this.setState({
        openalert: false
      })
    }

    close1(){
      this.setState({
        emailalreadyused: false
      })
    }

    close2(){
      this.setState({
        passwordnotmatch: false
      })
    }

    render(){
      if (this.state.redirect) {
        return <Redirect to='/authentication' />
      }else{
        return(
          <Animated animationInDelay={200} animationIn="bounceInDown" animationOut='bounceOutUp' isVisible={this.props.mode}>
            <div className='bgform'>
              {
                this.state.openalert &&
                <div id="overlay">
                  <Animated animationIn="bounceInDown" animationOut='flipOutX' isVisible={this.state.formInvalid}>
                  <div className='popup'>
                    <div className='notice2'>Data yang anda berikan kurang lengkap.<br/>Silahkan periksa kembali form registrasi anda!</div>
                    <div onClick={this.closealert.bind(this)} id='text' className='modalbutton3'>Mengerti</div>
                  </div>
                </Animated>
                </div>
              }
              <br/><br/>
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <label className='labelf'>Nama Depan</label>
                  <input type="text" className="form-control" placeholder="Nama Depan" value={this.state.namadepan} onChange={this.handleNamaDepan.bind(this)} />
                </div>
                <div className="form-group">
                  <label className='labelf'>Nama Belakang</label>
                  <input type="text" className="form-control" placeholder="Nama Belakang" value={this.state.namabelakang} onChange={this.handleNamaBelakang.bind(this)} />
                </div>
                <div className="form-group">
                  <label className='labelf'>Email</label>{this.state.emailalreadyused ?<span className='emailused'>Email sudah digunakan</span> : ''}
                  <input onFocus={this.close1.bind(this)} type="email" className="form-control" placeholder="Email" value={this.state.email} onChange={this.handleEmail.bind(this)} />
                </div>
                <div className="form-group">
                  <label className='labelf'>Password</label>
                  <input type="password" className="form-control" placeholder="Password" value={this.state.password} onChange={this.handlePassword.bind(this)} />
                </div>
                <div className="form-group">
                  <label className='labelf'>Ulangi Password</label>{this.state.passwordnotmatch ?<span className='passwordnotmatch'>Password tidak cocok</span> : ''}
                  <input onFocus={this.close2.bind(this)} type="password" className="form-control" placeholder="Ulangi Password" value={this.state.ulangipassword} onChange={this.handleRetypePassword.bind(this)} />
                </div>
                <button className='dft'>Daftar</button>
              </form>
            </div>
          </Animated>
        )
      }
    }
  }
