import React, {Component} from 'react'

export default class Interaction extends Component {
  constructor(props){
    super(props)

    this.state = {
      redirect: false,
      liked: false,
      favorited: false,
      likedAnimation: true,
      favoritedAnimation: true
    }
  }

  componentDidMount(){
    if (this.props.user.length === 1) {
      if (this.props.resepdetails.likedby.includes(this.props.user[0].userid)) {
        this.setState({
          liked: true
        })
      }
      if (this.props.resepdetails.favoriteby.includes(this.props.user[0].userid)) {
        this.setState({
          favorited: true
        })
      }
    }
  }

  liking(){
    if (this.props.user.length === 1) {
      let userid = this.props.user[0].userid
      let resepid = this.props.resepdetails.resepid
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

  unliking(){
    let userid = this.props.user[0].userid
    let resepid = this.props.resepdetails.resepid
    this.props.actions.unliking(userid, resepid)
    this.setState({
      liked: false,
      likedAnimation: false
    })
  }

  favoriting(){
    if (this.props.user.length === 1) {
      let userid = this.props.user[0].userid
      let resepid = this.props.resepdetails.resepid
      this.props.actions.favorite(userid, resepid)
      this.setState({
        favorited: true,
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

  unfavorite(){
    let userid = this.props.user[0].userid
    let resepid = this.props.resepdetails.resepid
    this.props.actions.unfavorite(userid, resepid)
    this.setState({
      favorited: false,
      favoritedAnimation: false
    })
  }

  render(){
    return(
      <div className='rd-first-interaction'>
        {
          this.state.liked
          ?
          <div onClick={this.unliking.bind(this)} className='rd-like-active'>
            <p><span id='rd-like-icon-active' className='glyphicon glyphicon-heart'></span> Disukai</p>
          </div>
          :
          <div onClick={this.liking.bind(this)} className='rd-like'>
            <p className='rd-like-title'>Suka</p>
          </div>
        }

        <div className='rd-separator'></div>

        {
          this.state.favorited
          ?
          <div onClick={this.unfavorite.bind(this)} className='rd-favorite-active' style={!this.state.favorited ? {display: 'none'} : {display: 'block'}}>
            <p><span id='rd-favorite-icon-active' className='glyphicon glyphicon-star'></span>Disimpan</p>
          </div>
          :
          <div onClick={this.favoriting.bind(this)} className='rd-favorite' style={this.state.favorited ? {display: 'none'} : {display: 'block'}}>
            <p className='rd-favorite-title'>Simpan</p>
          </div>
        }
      </div>
    )
  }
}
