import React, {Component} from 'react'
import {SERVER_URL} from '../config'
import {Link} from 'react-router-dom'
import {Animated} from "react-animated-css"

export default class ProfileContent extends Component {
  constructor(props){
    super(props)

    this.state = {
      hasmore: true,
      handler: 100,
      limit: 10
    }
  }

  loadmore(){
    if (this.props.data.length > 10) {
      this.setState({
        limit: this.state.limit + 10,
        handler: this.props.data.length
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
    let content = this.props.data.map((x, i) =>{
      return(
        <div key={i}>
          <Animated animationIn="flipInX" isVisible={true}>
            <div className='fillcontent'>
              <Link to={'/resep/' + this.props.data[i].resepid}>
                <abbr title='Lihat detail'>
                  <p style={{color: 'white'}}>{x.namaresep}</p>
                </abbr>
              </Link>
            </div>
            <abbr title='Hapus'><div onClick={()=> this.delete(i)} className='option2'><span className='glyphicon glyphicon-trash'></span></div></abbr>
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
          <p>Resep Saya</p>
          <p className='subhead'>Total Resep yang ditulis : {this.props.data.length}</p>
        </div>
        <hr/>
        {
          initial
        }
        {
          this.state.hasmore
          ?
          this.props.data.length > 10
          ?
          <div onClick={this.loadmore.bind(this)} className='loadmore2'>Muat lebih banyak</div>
          : ''
          : ''
        }
      </div>
    )
  }
}
