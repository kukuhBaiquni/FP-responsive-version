import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as AppActions from './actions'
import '../Style/ResepDetail.css'
import {SERVER_URL, localFormat} from '../config'
import Collapsible from 'react-collapsible';
import WriteComment from './WriteComment'
import CommentBody from './CommentBody'
import Navbar from './Navbar'
import {Redirect} from 'react-router'
import {Animated} from "react-animated-css"
import TimeAgo from 'react-timeago'
import Interaction from './Interaction'
import FacebookLogin from 'react-facebook-login';
import Emojify from 'react-emojione'

class ResepDetail extends Component{

  componentDidMount(){
    window.scrollTo(0, 0)
    let token = localStorage.getItem('token')
    if (token) {
      this.props.actions.loadUser(token)
    }
    var parseId = this.props.location.pathname.replace('/resep/', '').trim()
    this.props.actions.resepDetail(parseId)
    this.props.actions.loadComment(parseId)
  }

  componentWillUnmount(){
    this.props.actions.resepDetailEmpty()
  }

  render(){
    let path = SERVER_URL + 'images/'
    var image = this.props.resepdetails.map(x =>
      <img className='rd-main-img' key={x.resepid} alt={x.resepid} src={path + x.foto} />
    )

    var title = this.props.resepdetails.map(x =>
      <p key={x.resepid} className='rd-main-title'>{x.namaresep}</p>
    )

    var penulis = this.props.resepdetails.map(x =>
      <p key={x.resepid} className='rd-author-name'>{x.namapenulis}</p>
    )

    var userImg = this.props.resepdetails.map(x =>
      <img key={x.resepid} src={path + x.fotopenulis} className='rd-author-img' alt='author'/>
    )

    var kategori = this.props.resepdetails.map(x =>
      <p key={x.resepid} className='rd-kategori'><span style={{fontSize: '14px'}} className='glyphicon glyphicon-tag'></span> {x.kategori}</p>
    )

    var like = this.props.resepdetails.map(x =>
      <p key={x.resepid} className='rd-like-stats-data'> {x.like} Suka</p>
    )

    var favorite = this.props.resepdetails.map(x =>
      <p key={x.resepid} className='rd-favorite-stats-data'> {x.favorite} Disimpan</p>
    )

    var created = this.props.resepdetails.map(x =>
      <p key={x.resepid} className='rd-launched'><span style={{fontSize: '14px'}} className='glyphicon glyphicon-time'></span> <TimeAgo live={false} date={x.created} formatter={localFormat} /></p>
    )

    var kesan = this.props.resepdetails.map(x => <p key={x.resepid} className='rd-data-content'>{x.kesan}</p>)
    let statistikOpen = (<div className='main-tab'><b>Statistik Resep</b><span className='glyphicon glyphicon-plus' id='accordion-open-icon-1'></span> </div>)
    let statistikClose = (<div className='main-tab'><b>Statistik Resep</b><span className='glyphicon glyphicon-minus' id='accordion-close-icon-1'></span> </div>)
    return(
      <div>
        <Navbar actions={this.props.actions} utility={this.props.utility} />
        <div className='rd-body'>
          <div className='rd-content-spacer'></div>
          <div className='rd-container'>
            <div className='rd-img-holder'>
              {image}
              <div className='rd-title-holder'>
                {title}
              </div>
              <div className='rd-author'>
                <div className='rd-author-img-holder'>
                  {userImg}
                </div>
                {penulis}
              </div>
              <div className='rd-kategori-n-launched'>
                {created}
                {kategori}
              </div>
              {
                this.props.resepdetails.map((x, i) => <Interaction key={i} resepdetails={x} user={this.props.user} actions={this.props.actions}/>)
              }
              <div className='rd-data'>
                <div className='rd-data-header'>
                  <p className='rd-data-title'>Kesan-kesan</p>
                </div>
                <Emojify style={{height: 22, width: 22}}>
                  {kesan}
                </Emojify>
              </div>
              <div className='rd-data'>
                <div className='rd-data-header'>
                  <p className='rd-data-title'>Bahan-bahan</p>
                </div>
                {
                  this.props.resepdetails.map((x, i) => <BahanPartials key={i} resepdetails={x} />)
                }
              </div>
              <div className='rd-data'>
                <div className='rd-data-header'>
                  <p className='rd-data-title'>Langkah-langkah</p>
                </div>
                {
                  this.props.resepdetails.map((x, i) => <LangkahPartials key={i} resepdetails={x} />)
                }
              </div>
              <Collapsible trigger={statistikOpen} triggerTagName='div' triggerWhenOpen={statistikClose} transitionTime={400} transitionClosedTime={400}>
                <div className='rd-statistic'>
                  <div className='rd-like-stats'>
                    <p><span id='rd-like-stats-icon' className='glyphicon glyphicon-heart'></span></p>
                    {like}
                  </div>
                  <div className='rd-favorite-stats'>
                    <p><span id='rd-favorite-stats-icon' className='glyphicon glyphicon-star'></span></p>
                    {favorite}
                  </div>
                  <div className='rd-comment-stats'>
                    <p><span id='rd-comment-stats-icon' className='glyphicon glyphicon-comment'></span></p>
                    <p className='rd-comment-stats-data'> {this.props.comment.length} Komentar</p>
                  </div>
                </div>
              </Collapsible>
            </div>
          </div>
          <div className='rd-divider'></div>
          <div className='rd-interaction'>
            <WriteComment data={this.props.resepdetails[0]} user={this.props.user} actions={this.props.actions} />
            <CommentBody comment={this.props.comment} actions={this.props.actions}/>
          </div>
        </div>
      </div>
    )
  }
}

class BahanPartials extends Component {
  render(){
    var listbahan = this.props.resepdetails.bahan.map((x, i) => {
      return (<p className='rd-data-content list' key={i}>{x}</p>)
    })
    return(
      <div>{listbahan}</div>
    )
  }
}

class LangkahPartials extends Component {
  render(){
    var listlangkah = this.props.resepdetails.langkah.map((x, i) => {
      return (<p className='rd-data-content list' key={i}>{i + 1}. {x}</p>)
    })
    return(
      <div>{listlangkah}</div>
    )
  }
}

function mapStateToProps(state){
  return{
    data: state.data,
    user: state.user,
    comment: state.comment,
    utility: state.utility,
    resepdetails: state.resepdetails
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
)(ResepDetail)
