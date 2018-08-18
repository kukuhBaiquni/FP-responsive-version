import React, {Component} from 'react'
import Navbar from './Navbar'
import SearchFormHome from './SearchFormHome'
import SearchFormNavbar from './SearchFormNavbar'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as AppActions from './actions'
import DataContent from './DataContent'
import '../Style/HomePage.css'
import ActualContent from './ActualContent'
import MenuSide from './MenuSide'
import {SERVER_URL, localFormat} from '../config'
import Collapsible from 'react-collapsible';
import ResepForm from './ResepForm'
import {Animated} from "react-animated-css"
import Tooltip from './Tooltip'
import Pagination from "react-js-pagination";
import {Redirect} from 'react-router'
import {Link} from 'react-router-dom'
import TimeAgo from 'react-timeago'
import SideBarStatus from './SideBarStatus'
import SideBarPagination from './SideBarPagination'
import SideBarSearch from './SideBarSearch'

class HomePage extends Component {
  constructor(props){
    super(props)

    this.state = {
      redirect: false
    }
    this.turnOffAlert = this.turnOffAlert.bind(this)
  }

  componentDidMount() {
    let token = localStorage.getItem('token')
    window.scrollTo(0, 0)
    if (token) {
      this.props.actions.loadUser(token)
    }
    this.props.actions.loadResep(0)
    this.props.actions.turnOffResepAlertSuccess()
    this.props.actions.turnOffResepAlertFailed()
    this.props.actions.turnOffSearchMode()
    this.props.actions.turnOffSearchResult()
    this.props.actions.turnOffSearchProcessing()
  }

  turnOffAlert(z){
    if (z === 's') {
      this.props.actions.turnOffResepAlertSuccess()
    }else{
      this.props.actions.turnOffResepAlertFailed()
    }
  }

  render(){
    if (this.state.redirect) {
      return (<Redirect to='/register&login' />)
    }else{
      let path = SERVER_URL + 'images/'
      let closeAccordion1 = (<div className='main-tab'><b>Tulis Resep</b><span className='glyphicon glyphicon-minus' id='accordion-close-icon-1'></span> </div>)
      let openAccordion1 = (<div className='main-tab'><b>Tulis Resep</b><span className='glyphicon glyphicon-plus' id='accordion-open-icon-1'></span> </div>)
      const {data, actions, user, status, location} = this.props
      return(
        <div>
          <Navbar status={status} user={user} actions={actions} location={location.pathname}/>
          <div className='home-body'>
            <div className='side-bar-main'>
              <SideBarStatus user={this.props.user} />
              <div className='sbt-side-divider'></div>
              <SideBarSearch status={this.props.status} summary={this.props.pages} actions={this.props.actions} />
              <div className='sbt-side-divider'></div>
              <SideBarPagination status={this.props.status} summary={this.props.pages} actions={this.props.actions}/>
            </div>

            <div className='content-spacer'>
            </div>
            <div className='form-holder'>
              <Collapsible trigger={openAccordion1} triggerTagName='div' triggerWhenOpen={closeAccordion1} transitionTime={600} transitionClosedTime={600}>
                <div className='main-tab'>
                  <ResepForm action={actions} user={user} status={status}/>
                </div>
              </Collapsible>
            </div>
            <div className='status-box'>
              {
                this.props.status.submitResepProcessing &&
                <div className='status-box-loading'>
                  <div className='loader'></div>
                  <p className='loading-indicator'>Mengirim resep ...</p>
                </div>
              }
              {
                this.props.status.alertResepSubmitSuccess &&
                <div className='status-box-success' onClick={()=>this.turnOffAlert('s')}>
                  <p className='status-box-success-title'>Resep anda berhasil dibagikan</p>
                </div>
              }
              {
                this.props.status.alertResepSubmitFailed &&
                <div className='status-box-failed' onClick={()=>this.turnOffAlert('f')}>
                  <p className='status-box-failed-title'>Informasi yang anda berikan kurang lengkap, silahkan periksa kembali form</p>
                </div>
              }
            </div>
            <div className='data-footer'></div>
            {
              this.props.data.map((x, i)=>
              <div key={i}>
                <div className='data-holder'>
                  <div className='box-content'>
                    <div className='user-data'>
                      <div className='hp-img-name-wrapper'>
                        <div className='fp-holder'>
                          <img className='user-fp' src={path + x.fotopenulis} alt='user'/>
                        </div>
                        <div className='hp-nested-wrapper'>
                          <p className='hp-user-name'>{x.namapenulis}</p>
                          <p className='hp-data-created'>
                            <TimeAgo title='Tanggal penulisan' date={x.created} formatter={localFormat} />
                          </p>
                        </div>
                        <Link to={'/resep/' + x.resepid} className='hp-detail'>
                          <p className='hp-go-to'>Lihat detail <span id='hp-tr-corner-icon' className='glyphicon glyphicon-new-window'></span></p>
                        </Link>
                      </div>
                    </div>
                    <div className='hp-image-title-wrapper'>
                      <div className='hp-img-area'>
                        <img className='hp-recipe-img' src={path + x.foto} alt='thumbnail' />
                      </div>
                      <div className='resep-data'>
                        <div className='resep-name'>{x.namaresep}</div>
                        <div className='resep-kategori'><span style={{fontSize: '12px'}} className='glyphicon glyphicon-tag'></span> {x.kategori}</div>
                        <div className='resep-kategori'><span style={{fontSize: '12px'}} className='glyphicon glyphicon-heart'></span> {x.like}</div>
                        <div className='resep-kategori'><span style={{fontSize: '12px'}} className='glyphicon glyphicon-star'></span> {x.favorite}</div>
                        <div className='resep-kategori'><span style={{fontSize: '12px'}} className='glyphicon glyphicon-comment'></span> {x.comment}</div>
                      </div>
                    </div>

                  </div>
                </div>
                <div className='data-footer'></div>
              </div>
            )
          }
          <div className='hp-new'></div>
        </div>
      </div>
    )
  }
}
}

function mapStateToProps(state){
  return{
    data: state.data,
    status: state.status,
    user: state.user,
    pages: state.pages,
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
)(HomePage)
