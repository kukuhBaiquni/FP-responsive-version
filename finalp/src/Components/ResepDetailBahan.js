import React, {Component} from 'react'
import {SERVER_URL} from '../config'
import ResepDetailUtility from './ResepDetailUtility'

export default class ResepDetailBahan extends Component {
  componentDidMount(){
    window.scrollTo(0, 0)
  }

  render(){
    var path = SERVER_URL + 'images/'
    var listbahan = this.props.data.bahan.map((x, i) => {
      return (<li style={{fontSize: '22px'}} key={i}>{x.listbahan}</li>)
    })
    return(
      <div className='bahansub'>
        <p className='subbahan'><strong>Bahan-bahan :</strong></p>
        <br />
        {listbahan}
        <br />
        <p className='subbahan'><strong>Langkah-langkah :</strong></p>
        <br />
        <div className='langkahlist'>
          {
            this.props.data.langkah.map((x, i) => {
              var anothershit = {
                wordWrap: 'break-word',
                width: x.images !== '' ? '500px' : '700px'
              }
              return(
                <div key={i}>
                  <div style={anothershit}>
                    <p className='zxc'>{i + 1}. {x.detail}</p>
                  </div>
                  {
                    x.images !== '' &&
                    <div className='pino'>
                      <img className='langkahfoto' src={path + x.images + '.jpg'} alt={this.props.data.resepid} />
                    </div>
                  }
                <div className='odd'></div>
              </div>
            )
          })
        }
      </div>
      <hr/>
      <ResepDetailUtility data={this.props.data} actions={this.props.actions} user={this.props.user} />
    </div>
  )
}
}
