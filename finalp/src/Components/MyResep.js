import React, {Component} from 'react';
import '../Style/MyResep.css'
import TimeAgo from 'react-timeago'
import {SERVER_URL, localFormat} from '../config'

export default class MyResep extends Component{

  componentDidMount(){
    let token = localStorage.getItem('token')
    if (token) {
      this.props.actions.myRecipe(token)
    }
  }

  render(){
    let path = SERVER_URL + 'images/'
    return(
      <div className='myresep-container'>
        <div className='myresep-header'>
          <div className='header-content'>
            <p className='title-header'>Resep Saya</p>
            <p className='header-content-title'>Urutkan</p>
            <select className='sort-by'>
              <option>Paling baru</option>
              <option>Paling lama</option>
              <option>Jumlah suka</option>
              <option>Jumlah komentar</option>
            </select>
          </div>
        </div>
        {
          this.props.myresep.length === 0
          ?
          <div className='mr-data-empty'>
            <p className='mr-data-empty-title'>Anda belum menulis resep</p>
          </div>
          :
          this.props.myresep.map((x, i) =>
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
