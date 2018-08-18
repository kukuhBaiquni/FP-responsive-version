import request from 'superagent'
import moment from 'moment'
import {SERVER_URL} from '../../config'

const TARGET = SERVER_URL + 'api/finalp/users/'

export function addUser(namadepan, namabelakang, email, password){
  let userid = Date.now()
  return dispatch => {
    return request
    .post(`${TARGET}register`)
    .type('form')
    .send({userid : userid})
    .send({namadepan : namadepan})
    .send({namabelakang : namabelakang})
    .send({email : email})
    .send({password : password})
    .end((err, res)=>{
      if (err) {
        dispatch(addUserFailed())
      }else{
        let token = res.body.token;
        if (token) {
          localStorage.setItem('token', token)
          dispatch(loadUser(token))
        }
      }
    })
  }
}

export function addUserFailed(){
  return {type: 'addUserFailed'}
}

export function loadAllUser(){
  return dispatch => {
    return request
    .get(`${TARGET}alluser`)
    .set('Accept', 'application/json')
    .end((err, res)=>{
      if (err) {
        console.error(err);
      }else{
        dispatch(allUser(res.body))
      }
    })
  }
}

export function allUser(users){
  return {type: 'alluser', users}
}

export function loadUser(token){
  return dispatch => {
    return request
    .get(`${TARGET}${token}`)
    .set('Accept', 'application/json')
    .end((err, res)=>{
      if (err) {
        console.error(err);
      }else{
        if (res.body.status === 'Someone trying to hack our system') {
          dispatch(loadUserFailed())
        }else{
          dispatch(userlogin())
          dispatch(loadUserSuccess(res.body))
        }
      }
    })
  }
}

export function loadUserFailed(){
  return {type: 'loaduserfailed'}
}

export function userlogin(){
  return {type: 'userlogin'}
}

export function userlogout(){
  return {type: 'userlogout'}
}

export function loadUserSuccess(user){
  return {type: 'loadUserSuccess', user}
}

export function loginAttempt(email, password){
  return dispatch =>{
    return request
    .post(`${TARGET}login`)
    .type('form')
    .send({email: email})
    .send({password: password})
    .end((err, res)=>{
      if (err) {
        dispatch(loginAttemptFail())
      }else{
        let token = res.body.token
        if (token) {
          localStorage.setItem('token',res.body.token)
          dispatch(loadUser(res.body.token))
        }
      }
    })
  }
}

export function loginAttemptFail(){
  return {type: 'loginAttemptFail'}
}

export function uploadfp(fp, token){
  return dispatch => {
    const single = new FormData()
    single.append('file', fp)
    single.append('token', token)
    return request
    .post(`${TARGET}uploadfp`)
    .send(single)
    .end((err, res)=>{
      if (err) {
        console.error(err);
      }else{
        dispatch(uploadfpDone())
      }
    })
  }
}

function uploadfpDone(){
  return {type: 'uploadfpDone'}
}
