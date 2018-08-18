import React, {Component} from 'react';
import '../Style/SideBarPagination.css'

export default class SideBarPagination extends Component {

  render(){
    var pages = [];
    for (var i = 0; i < this.props.summary.pages; i++) {
      pages.push(i + 1)
    }
    return(
      <div className='sbp-container'>
        <div className='sbp-page-select-wrapper'>
          <div className='sbp-page-select-area'>
            <p className='sbp-choose-page'><span style={{fontSize: '15px'}} className='glyphicon glyphicon-book'></span> Pilih Halaman</p>
          </div>
          <div className='sbp-custom-pagination'>
            {
              pages.map((x, i)=> <Bullet summary={this.props.summary} status={this.props.status} actions={this.props.actions} target={this.props.summary.currentPage} key={i} index={i} />)
            }
          </div>
        </div>
      </div>
    )
  }
}

class Bullet extends Component {

  getPage(x){
    if (this.props.status.searchMode) {
      let query = this.props.summary.query;
      let mode = this.props.summary.mode;
      let offset = x
      this.props.actions.searching(query, mode, offset)
    }else{
      this.props.actions.loadResep(x)
    }
  }

  render(){
    return(
      <div onClick={()=>this.getPage(this.props.index)} className={Number(this.props.target) === this.props.index ? 'sbp-page-list active' : 'sbp-page-list'}>{this.props.index + 1}</div>
    )
  }
}
