import React, {Component} from 'react'
import {Animated} from "react-animated-css"
import ActualContent from './ActualContent'

export default class DataContent extends Component {
  constructor(props){
    super(props)

    this.state = {
      handler: 10,
      limit: 5,
      hasMore: true
    }
  }

  loadMore(page){
    if(page > 15){
      this.setState({
        limit: this.state.limit + 3,
        handler: this.props.data.length
      })
    }
    if (this.state.limit > this.state.handler) {
      this.setState({
        hasMore: false
      })
    }
  }

  render(){
    var token = localStorage.getItem('token')
    var data = this.props.data
    var limit = this.state.limit
    var initialData = data.slice(0, limit)
    var userid = this.props.user.map(x => x.userid)
    var dataItem = initialData.map(function(x){
      return(
        <div key={x.resepid}>
          {
            token
            ?
            x.likedby.includes(userid[0])
            ?
            <Animated animationInDelay={200} animationIn="flipInX" isVisible={true}>
              <abbr title='Anda menyukai kiriman ini'><div className='likemark'><span className='glyphicon glyphicon-heart'></span></div></abbr>
            </Animated>
            : ''
            : ''
          }
          <ActualContent data={x}/>
        </div>
      )
    })
    return(
      <div className='dudukan'>
      
      </div>
    )
  }
}
