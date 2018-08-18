import React, {Component} from 'react'
import Navbar from './Navbar'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as AppActions from './actions'
import '../Style/MyProfile.css'
import {SERVER_URL, localFormat} from '../config'
import Dropzone from 'react-dropzone'
import {Animated} from "react-animated-css"
import TimeAgo from 'react-timeago'
import MyResep from './MyResep'
import MyFavorite from './MyFavorite'

class MyProfile extends Component {
  constructor(props){
    super(props)
    this.state = {
      photo: [],
      question: false,
      hiding: false,
      savedAlert: false,
      navStatus: 'resepsaya',
      currentStage: 0,
    }
  }

  componentDidMount(){
    window.scrollTo(0, 0)
    let token = localStorage.getItem('token')
    if (token) {
      this.props.actions.loadUser(token)
    }else{
      this.setState({
        redirect: true
      })
    }
  }

  uploadFoto(files){
    this.setState({
      photo: files[0],
      question: true,
      hiding: false,
      savedAlert: false
    })
  }

  saved(){
    this.setState({
      hiding: true,
      savedAlert: true
    })
    let self = localStorage.getItem('token')
    let photo = this.state.photo
    this.props.actions.uploadfp(photo, self)
  }

  abort(){
    this.setState({
      question: false
    })
  }

  closeSavedAlert(){
    this.setState({
      savedAlert: false
    })
  }

  switchNavigation(target){
    this.setState({
      navStatus: target
    })
  }

  loadmore(){
    this.setState({
      currentStage: this.state.currentStage += 1
    })
    let token = localStorage.getItem('token')
    let stage = this.state.currentStage
    this.props.actions.loadMoreResep(token, stage)
  }

  render(){
    console.log(this.props);
    var path = SERVER_URL + 'images/'
    var nama = this.props.user.map((x, i) => <p key={i} className='mp-user-name'>{x.namadepan + ' ' + x.namabelakang}</p>)
    var joined = this.props.user.map((x, i) => <TimeAgo key={i} live={false} date={x.joined} formatter={localFormat} />)
    return(
      <div>
        <Navbar />
        <div className='mp-body'>
          <div className='top-space'></div>
          <div className='profile-container'>
            <div className='mp-user-info'>
              <div className='mp-horizontal-rule'>
                {nama}
              </div>
              <div className='mp-img-holder'>
                {
                  this.state.question
                  ?
                  <img className='mp-user-img' src={this.state.photo.preview} />
                  :
                  this.props.user.map((x, i) => <img key={i} className='mp-user-img' src={path + x.fotoprofil} alt={x.userid}/>)
                }
              </div>
              <p className='mp-user-joined'><span className='fa fa-group'></span> Bergabung sejak 30 mei 2018</p>
              <div className='litle-navbar-holder'>
                <ul className='navbar'>
                  <li onClick={() => this.switchNavigation('resepsaya')} className='navlist'>
                    <p className={this.state.navStatus === 'resepsaya' ? 'list-item active' : 'list-item'}>Resep Saya</p>
                  </li>
                  <li onClick={() => this.switchNavigation('favoritesaya')} className='navlist'>
                    <p className={this.state.navStatus === 'favoritesaya' ? 'list-item active' : 'list-item'}>Favorit</p>
                  </li>
                  <li className='navlist'>
                    <p className='list-item'>Aktivitas</p>
                  </li>
                  <li className='navlist'>
                    <Dropzone onDrop={this.uploadFoto.bind(this)} className='list-item' accept="image/*" multiple={ false }>
                      <p className='drop-title'>Ganti foto</p>
                    </Dropzone>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className='content-section'>
            {
              this.state.question &&
              <div className='section-holder' style={this.state.hiding ? {display: 'none'} : {display: 'inline-flex'}}>
                <div className='special-question' onClick={this.saved.bind(this)}>
                  Simpan
                </div>
                <div className='the-answer' onClick={this.abort.bind(this)}>
                  Buang
                </div>
              </div>
            }
            {
              this.state.savedAlert &&
              <div onClick={this.closeSavedAlert.bind(this)} className='saved-alert-appear'>
                <p className='saved-alert-title'>Perubahan berhasil disimpan</p>
              </div>
            }
          </div>
          <div className='rolling-content'>
            {
              this.state.navStatus === 'resepsaya' &&
              <MyResep stage={this.state.currentStage} myresep={this.props.myresep} actions={this.props.actions} user={this.props.user} />
            }
            {
              this.state.navStatus === 'favoritesaya' &&
              <MyFavorite favorite={this.props.favorite} actions={this.props.actions} user={this.props.user} />
            }
          </div>
          <div className='mp-loadmore'>
            <div onClick={this.loadmore.bind(this)} className='mp-loadmore-button'>
              <p className='mp-loadmore-title'>Muat lebih banyak</p>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state){
  return{
    myresep: state.myresep,
    utility: state.utility,
    user: state.user,
    favorite: state.favorite,
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
)(MyProfile)
