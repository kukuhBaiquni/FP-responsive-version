import React, {Component} from 'react'
import {Redirect} from 'react-router'
import {Animated} from "react-animated-css"

export default class ResepDetailUtility extends Component {
  constructor(props){
    super(props)

    this.state = {
      redirect: false,
      liked: false,
      flash: true
    }
  }

  componentDidMount(){
    if (this.props.user.length === 1) {
      if (this.props.data.likedby.includes(this.props.user[0].userid)) {
        this.setState({
          liked: true
        })
      }
    }
  }

  unliking(){
    let userid = this.props.user[0].userid
    let resepid = this.props.data.resepid
    this.props.actions.unliking(userid, resepid)
    this.setState({
      liked: false,
      flash: false
    })
  }

  liking(){
    if (this.props.user.length === 1) {
      let userid = this.props.user[0].userid
      let resepid = this.props.data.resepid
      this.props.actions.liking(userid, resepid)
      this.setState({
        liked: true,
      })
    }else{
      let yon = window.confirm('Anda harus Login untuk menyukai kiriman \nLogin sekarang?')
      if (yon) {
        this.setState({
          redirect: true,
        })
      }
    }
  }

  render(){
    if (this.state.redirect) {
      return <Redirect to='/register&login' />
    }else{
      return(
        <div className='utility'>
          <Animated animationIn="flipInX" animationOut='flipOutX' isVisible={this.state.liked}>
            <abbr title='Batal suka'><div onClick={this.unliking.bind(this)} className='liked'>Disukai&nbsp;<span className='glyphicon glyphicon-thumbs-up'></span></div></abbr>
          </Animated>
          <Animated animationIn="flipInX" animationOut='flipOutX' isVisible={!this.state.liked}>
            <div onClick={this.liking.bind(this)} className='likebutton'>Suka&nbsp;<span className='glyphicon glyphicon-heart'></span></div>
          </Animated>
        </div>
      )
    }
  }
}
