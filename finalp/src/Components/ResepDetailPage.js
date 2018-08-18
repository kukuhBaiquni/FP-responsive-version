import React, {Component} from 'react'
import Navbar from './Navbar'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as AppActions from './actions'
import ResepDetailBahan from './ResepDetailBahan'
import CommentSection from './CommentSection'
import {SERVER_URL} from '../config'
import CommentList from './CommentList'
import {Animated} from "react-animated-css"

class ResepDetailPage extends Component {

  componentDidMount(){
    let token = localStorage.getItem('token')
    if (token) {
      this.props.actions.loadUser(token)
    }
    var parseId = this.props.location.pathname.replace('/resep/', '').trim()
    this.props.actions.resepDetail(parseId)
    this.props.actions.loadComment(parseId)
  }

  opencomment(){
    this.setState({
      commentexpanded: true
    })
  }

  render(){
    let path = SERVER_URL + 'images/'
    var image = this.props.data.map(x => {
      return (<img className='fotoresepdetail' key={x.resepid} alt={x.resepid} src={path + x.foto} />)
    })

    var title = this.props.data.map(x => {
      return (<span key={x.resepid}><strong>{x.namaresep}</strong></span>)
    })

    var penulis = this.props.data.map(x => {
      return (<p key={x.resepid}>{x.namapenulis}</p>)
    })

    var kategori = this.props.data.map(x => {
      return (<p style={{fontSize: '20px'}} key={x.resepid}>Kategori : <i>{x.kategori}</i></p>)
    })

    var pass = this.props.data.map(x => {
      return (<ResepDetailBahan key={x.resepid} data={x} actions={this.props.actions} user={this.props.user}/>)
    })
    return(
      <div>
        <Navbar actions={this.props.actions} utility={this.props.utility} />
        <Animated animationIn="fadeInUp" isVisible={true}>
          <div className='pdbg'>
            <div className='visiblebg'>
              {image}
            </div>
            <div className='resepdetailspacer'>
              {title}
              {kategori}
              <hr />

            </div>
            <div className='resepdetails'>
              <span>Penulis : </span>{penulis}
                <div className='anotherhr'></div>
                {pass}
              </div>
            </div>
            <CommentSection data={this.props.data[0]} user={this.props.user} actions={this.props.actions} />
            <div className='spacercomment'></div>
            <div className='commentinfo'>Total komentar : {this.props.comment.length}</div>
            <CommentList comment={this.props.comment} actions={this.props.actions} />
          </Animated>
          <div className='footer'></div>
        </div>
      )
    }
  }

  function mapStateToProps(state){
    return{
      data: state.data,
      user: state.user,
      comment: state.comment,
      utility: state.utility
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
  )(ResepDetailPage)
