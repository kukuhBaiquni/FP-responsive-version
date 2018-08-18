import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {SERVER_URL} from '../config'
import {Animated} from "react-animated-css"

export default class LikedContent extends Component {
  constructor(props){
    super(props)

    this.state = {
      hasmore: true,
      handler: 100,
      limit: 10
    }
  }

  loadmore(){
    if (this.props.liked.length > 10) {
      this.setState({
        limit: this.state.limit + 10,
        handler: this.props.liked.length
      })
    }
    if (this.state.limit + 10 > this.state.handler) {
      this.setState({
        hasmore: false
      })
    }
  }

  delete(i){
    let desired = this.props.data[i].resepid
    let yon = window.confirm('Anda yakin ingin menghapus?')
    if (yon) {
      this.props.actions.deleteResep(desired)
      this.props.actions.deletefilter(desired)
    }
  }

  render(){
    var path = SERVER_URL + 'images/'
    let content = this.props.liked.map((x, i) =>{
      return(
        <div key={i}>

          <Animated animationIn="flipInX" isVisible={true}>


            <div className='fillcontent'>
              <Link to={'/resep/' + this.props.liked[i].resepid}>
                <abbr title='Lihat detail'>
                  <p style={{color: 'white', marginTop: '-10px', textDecoration: 'none'}}>{x.namaresep}</p>
                </abbr>
              </Link>
              <p style={{fontSize: '13px', marginTop: '-42px'}}>Penulis : {x.namapenulis}</p>
            </div>
            {
              x.penulis === this.props.user[0].userid
              ?
              <abbr title='Hapus'><div onClick={()=> this.delete(i)} className='option2'><span className='glyphicon glyphicon-trash'></span></div></abbr>
              :
              <abbr title='Disukai'><div className='option3'><span className='glyphicon glyphicon-heart'></span></div></abbr>
            }
            <div className='prolist'>
              <img className='litleimg' src={path + x.foto} alt='123' />
            </div>
          </Animated>
        </div>
      )
    })

    let initial = content.reverse().slice(0, this.state.limit)
    return(
      <div className='wadahpro'>
        <hr/>
        <div className='protitle'>
          <p>Resep yang disukai</p>
          <p className='subhead'>Total : {this.props.liked.length}</p>
        </div>
        <hr/>
        {
          initial
        }
        {
          this.props.liked.length > 10 &&
          <div onClick={this.loadmore.bind(this)} className='loadmore2'>Muat lebih banyak</div>
        }
      </div>
    )
  }
}
