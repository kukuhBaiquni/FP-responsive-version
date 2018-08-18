import React, {Component} from 'react';
import '../Style/MyResep.css'
import TimeAgo from 'react-timeago'
import {SERVER_URL, localFormat} from '../config'

export default class MyFavorite extends Component{

  componentDidMount(){
    let token = localStorage.getItem('token')
    if (token) {
      this.props.actions.loadFavorite(token)
    }
  }

  render(){
    let path = SERVER_URL + 'images/'
    return(
      <div className='myresep-container'>
        <div className='myresep-header'>
          <div className='header-content'>
            <p className='title-header'>Favorit Saya</p>
          </div>
        </div>
        {
          this.props.favorite.length === 0
          ?
          <div className='mr-data-empty'>
            <p className='mr-data-empty-title'>Anda tidak mempunyai resep favorit</p>
          </div>
          :
          this.props.favorite.map((x, i) =>
          <div key={i} className='myresep-holder'>
            <div className='myresep-box'>
              <div className='resep-picture-holder'>
                <img className='resep-picture' src={path + x.foto} alt='resep-picture' />
              </div>
              <div className='myresep-data'>
                <div className='myresep-name'>
                  <p className='myresep-name-title'>{x.namaresep}</p>
                  <p className='mr-created'><span className='glyphicon glyphicon-time'></span> <TimeAgo live={false} date={x.created} formatter={localFormat} /></p>
                  <p className='mr-kategori'><span className='glyphicon glyphicon-tag'></span> {x.kategori}</p>
                  <div className='mr-box-1'>
                    <div className='mr-interaction-list'><span className='glyphicon glyphicon-heart'></span> {x.like}</div>
                    <div className='mr-interaction-list'><span className='glyphicon glyphicon-star'></span> {x.favorite}</div>
                    <div className='mr-interaction-list'><span className='glyphicon glyphicon-comment'></span> {x.comment}</div>
                  </div>
                  <div className='mr-spacer'>
                    <div className='mr-to-detail'>
                      <p className='mr-detail-title'>Lihat Detail</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      }
    </div>
    )
  }
}
