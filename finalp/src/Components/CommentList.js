import {SERVER_URL} from '../config'
import React, {Component} from 'react'
import {Animated} from "react-animated-css"

export default class CommentList extends Component {
  constructor(props){
    super(props)
    this.state = {
      limit: 5,
      hasMore: true,
      handler: 100
    }
  }

  loadMore(){
    if (this.props.comment.length > 5) {
      this.setState({
        limit: this.state.limit + 5,
        handler: this.props.comment.length
      })
      if (this.state.limit > this.state.handler) {
        this.setState({
          hasMore: false
        })
      }
    }else{
      this.setState({
        hasMore: false
      })
    }
  }

  render(){
    let path = SERVER_URL + 'images/'
    let comment = this.props.comment.map(function(x, i){
      return(
        <div key={i}>
          <Animated animationIn="fadeIn" isVisible={true}>
            <div className='commentwrap'>
              <div className='commentholder'>
                {x.content}
              </div>
              <div className='commentplace'>
              </div>
              <img className='fotocommentlist' src={path + x.userfoto} alt='User'/>
              <div className='namacomment'>{x.username}</div>
              <div className='timecomment'><span className='glyphicon glyphicon-time'></span></div>
              <div className='timeact'>{x.created}</div>
            </div>
            <div className='spacercomment'></div>
          </Animated>
        </div>
      )
    }).reverse()
    let limit = this.state.limit
    let dataPartials = comment.slice(0, limit)
    return(
      <div>
        {dataPartials}
        {
          this.state.hasMore
          ?
          this.props.comment.length > 5
          ?
          <div onClick={this.loadMore.bind(this)} className='loadmore'>Muat lebih banyak</div>
          : ''
          : ''
        }
        <div className='spacercomment'></div>
      </div>
    )
  }
}
