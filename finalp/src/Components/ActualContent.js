import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {SERVER_URL} from '../config'
import moment from 'moment'
import '../Style/ActualContent.css'

export default class ActualContent extends Component {
  constructor(props){
    super(props)

    this.state = {
      position: '30px'
    }
  }
  render(){
    let path = SERVER_URL + 'images/'
    let preview = path + this.props.data.foto

    var spacer = {
      height: '42px'
    }

    var identity = {
      height: this.state.position,
      width: '200px',
      fontFamily: 'sans-serif',
      fontSize: '14px',
      lineHeight: '5px',
    }
    return(
      <div className='data-item'>
        <h1>LooL</h1>
      </div>
    )
  }
}
