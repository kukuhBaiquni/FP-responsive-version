import React, {Component} from 'react';
import {SERVER_URL, localFormat} from '../config'
import TimeAgo from 'react-timeago'
import '../Style/SideBarStatus.css'

export default class SideBarStatus extends Component {
  constructor(props){
    super(props)
    this.state = {
      minimize: false
    }
  }

  minimizing(){
    this.setState(function(prevState){
      return {minimize: !prevState.minimize}
    })
  }

  render(){
    let path = SERVER_URL + 'images/'
    let userfoto = this.props.user.map((x, i) => <img key={i} className='sbs-user-img' src={path + x.fotoprofil} alt='user'/>)
    let username = this.props.user.map((x, i) => <p key={i} className='sbs-user-name'>{x.namadepan + ' ' + x.namabelakang}</p>)
    return(
      <div className={this.state.minimize ? 'sbs-container minimize' : 'sbs-container'}>
        <div className='sbs-content-holder'>
          <div className='sbs-user-img-holder'>
            {userfoto}
          </div>
          <div className='sbs-newt'>
            <div className='sbs-corner-top'>
              {username}
              <div onClick={this.minimizing.bind(this)} className='sbs-minimize-window'>
                {
                  this.state.minimize
                  ? <span id='sbs-minimize-icon' className='glyphicon glyphicon-chevron-down'></span>
                  : <span id='sbs-minimize-icon' className='glyphicon glyphicon-chevron-up'></span>
                }
              </div>
            </div>
            <p className='sbs-status'>online</p>
          </div>
        </div>
        <div className='sbs-message-holder'>
          <p className='sbs-message'><span style={{fontSize: '15px'}} className='glyphicon glyphicon-pencil'></span> Status Saya</p>
        </div>
        <p className='sbs-message-content'>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. </p>
        <div className='sbs-info-message'>
          <p className='sbs-timestamp'>· terakhir di update 15 menit yang lalu ·</p>
          <p className='sbs-timestamp-update'>Update</p>
        </div>
      </div>
    )
  }
}
