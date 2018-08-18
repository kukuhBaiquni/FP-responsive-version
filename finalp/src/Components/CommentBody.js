import React, {Component} from 'react'
import '../Style/CommentBody.css'
import Emojify from 'react-emojione';
import {Animated} from "react-animated-css"
import TimeAgo from 'react-timeago'
import {SERVER_URL, localFormat} from '../config'
import moment from 'moment'

export default class CommentBody extends Component {

  render(){
    let path = SERVER_URL + 'images/'
    let commentList = this.props.comment.map((x, i)=>
    <Animated key={i} animationIn="fadeIn" isVisible={true}>
      <div className='cb-content-holder'>
        <div className='cb-content'>
          <div className='cb-img-holder'>
            <img src={path + x.userfoto} className='cb-img' alt='user'/>
          </div>
          <div className='cb-user-name-timestamp-wrapper'>
            <div className='cb-user-name-timestamp'>
              <p className='cb-user-name'>{x.username}</p>
              <p className='cb-timestamp'>· <TimeAgo live={false} date={x.created} formatter={localFormat} /></p>
            </div>
            <div className='cb-comment-section'>
              <Emojify style={{height: 20, width: 20}}>
                <p className='cb-comment-content'>{x.content}</p>
              </Emojify>
            </div>
            <div className='cb-further-interaction'>
              <p className='cb-interaction-list'>Balas</p>
              <p>·</p>
              <p className='cb-interaction-list'>Suka</p>
            </div>
          </div>
        </div>

      </div>
    </Animated>
  ).reverse()
  return(
    <div className='cb-container'>
      <div className='cb-comment-holder'>
        <p className='cb-comment-title'>{this.props.comment.length} Komentar</p>
      </div>
      {commentList}
    </div>
  )
}
}
