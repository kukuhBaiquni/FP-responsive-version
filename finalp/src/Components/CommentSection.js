import React, {Component} from 'react'
import {SERVER_URL} from '../config'
import {Animated} from "react-animated-css"

export default class CommentSection extends Component {
  constructor(props){
    super(props)
    this.state = {
      alertcomment: false
    }
  }

  alertprepare(){
    this.setState({
      alertcomment: false
    })
  }

  pseudoSubmit(){
    let userid = this.props.user[0].userid
    let username = this.props.user[0].namadepan.concat(' ' + this.props.user[0].namabelakang)
    let userfoto = this.props.user[0].fotoprofil
    let content = this.input.value
    let resepid = this.props.data.resepid
    this.setState({
      alertcomment: true
    })
    this.props.actions.submitComment(userid, username, userfoto, content, resepid)
    this.input.value = ''
  }

  render(){
    let path = SERVER_URL + 'images/'
    return(
      <div>
        {
          this.props.user.length === 1
          ?
          <div>
            <div className='spacercomment'></div>
            <div className='commentmain'>

              <div className='tuliskomen'>Tulis komentar&nbsp;<span className='glyphicon glyphicon-comment'></span></div>
              {
                this.props.user.map((x, i) => {
                  return (<img key={i} className='fotouser' src={path + x.fotoprofil} alt={x.userid}/>)
                })
              }
              {
                this.state.alertcomment
                ?
                <Animated animationIn="flipInX" isVisible={true}>
                  <div className='flash'>Komentar berhasil dikirim&nbsp;<span className='glyphicon glyphicon-thumbs-up'></span></div>
                </Animated>
                : ''
              }
              <textarea onFocus={this.alertprepare.bind(this)} ref={input => this.input = input} maxLength='350' className='custominput' placeholder='Tulis komentar'/>
              <abbr title='Kirim komentar'><div onClick={this.pseudoSubmit.bind(this)} className='kirim'>Kirim</div></abbr>
            </div>
          </div>
          : ''
        }
      </div>
    )
  }
}
