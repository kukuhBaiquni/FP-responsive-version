import React, {Component} from 'react'
import '../Style/WriteComment.css'
import {SERVER_URL} from '../config'
import Emojify from 'react-emojione';
import {emoji} from '../config'
import {Animated} from "react-animated-css"
import '../Style/Tooltip.css'

export default class WriteComment extends Component {
  constructor(props){
    super(props)
    this.state = {
      showEmoji: false,
      textInput: ''
    }
  }

  showEmoji(){
    this.setState(function(prevState){
      return {showEmoji: !prevState.showEmoji}
    })
  }

  getCode(code){
    this.setState({
      textInput: this.state.textInput += code
    })
  }

  textInput(e){
    this.setState({
      textInput: e.target.value
    })
  }

  submitComment(){
    let userid = this.props.user[0].userid
    let username = this.props.user[0].namadepan.concat(' ' + this.props.user[0].namabelakang)
    let userfoto = this.props.user[0].fotoprofil
    let content = this.state.textInput
    let resepid = this.props.data.resepid
    this.props.actions.submitComment(userid, username, userfoto, content, resepid)
    this.setState({textInput: ''})
  }

  render(){
    let path = SERVER_URL + 'images/'
    let userPicture = this.props.user.map(x => <img key={x.userid} className='wc-user-img' src={path + x.fotoprofil} alt='user'/>)
    return(
      <div className='wc-container'>
        <div className='wc-total-comment'>
          <p className='wc-tc-count'>Tulis Komentar</p>
          <div title='Tambahkan emoji' onClick={this.showEmoji.bind(this)} className='wc-dropdown'>
            <Emojify style={{width: 22, height: 22}}>
              <span>:grinning:</span>&nbsp;
                <span className='glyphicon glyphicon-triangle-bottom'></span>&nbsp;
                </Emojify>
                {
                  this.state.showEmoji &&
                  <div className='custom-dropdown'>
                    <div className='custom-dropdown-wrapper'>
                      <Emojify style={{height: 22, width: 22}}>
                        {
                          emoji.map((x, i)=>
                          <span key={i} onClick={()=> this.getCode(x)} className='custom-dropdown-content'>{x}</span>
                        )
                      }
                    </Emojify>
                  </div>
                </div>
              }
            </div>
          </div>
          <div className='wc-row-imgform'>
            <div className='wc-user-img-holder'>
              {userPicture}
            </div>
            <div className='wc-write-holder'>
              <textarea value={this.state.textInput} onChange={this.textInput.bind(this)} className='wc-write-area' placeholder='Tulis komentar'/>
            </div>
            <div className='wc-submit-row'>
              <div onClick={this.submitComment.bind(this)} className='wc-submit'>Kirim</div>
            </div>
          </div>
        </div>
      )
    }
  }
