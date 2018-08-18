import React, {Component} from 'react'
import '../Style/Tooltip.css'
import Emojify from 'react-emojione';
import {emoji} from '../config'

export default class Tooltip extends Component {
  getCode(code){
    console.log(code);
  }
  render(){
    console.log(emoji.length);
    return(
      <div className='custom-dropdown'>
        <div className='custom-dropdown-wrapper'>
          <Emojify style={{height: 22, width: 22}}>
            {
              emoji.map((x, i)=>
              <span key={i} onClick={()=> this.getCode(x)} className='custom-dropdown-content'>{x}</span>
              )
            }
          </Emojify>
        </div>
      </div>
    )
  }
}
