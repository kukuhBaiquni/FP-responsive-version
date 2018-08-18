import request from 'superagent'
import moment from 'moment'
import {SERVER_URL} from '../../config'
const TARGET = SERVER_URL + 'api/finalp/likeandcomment/'

export function liking(userid, resepid){
  return dispatch => {
    return request
    .post(`${TARGET}submitlike`)
    .type('form')
    .send({userid: userid})
    .send({resepid: resepid})
    .end((err, res)=>{
      if (err) {
        console.error(err);
      }else{
        dispatch(likingSuccess())
      }
    })
  }
}

export function likingSuccess(){
  return {type: 'likingsuccess'}
}

export function favorite(userid, resepid){
  return dispatch => {
    return request
    .post(`${TARGET}submitfavorite`)
    .type('form')
    .send({userid: userid})
    .send({resepid: resepid})
    .end((err, res)=>{
      if (err) {
        console.error(err);
      }else{
        dispatch(favoriteSuccess())
      }
    })
  }
}

export function favoriteSuccess(){
  return {type: 'favoritesuccess'}
}

export function unliking(userid, resepid){
  return dispatch => {
    return request
    .post(`${TARGET}unliking`)
    .type('form')
    .send({userid: userid})
    .send({resepid: resepid})
    .end((err, res)=>{
      if (err) {
        console.error(err);
      }else{
        dispatch(likingSuccess())
      }
    })
  }
}

export function unfavorite(userid, resepid){
  return dispatch => {
    return request
    .post(`${TARGET}unfavorite`)
    .type('form')
    .send({userid: userid})
    .send({resepid: resepid})
    .end((err, res)=>{
      if (err) {
        console.error(err);
      }else{
        dispatch(favoriteSuccess())
      }
    })
  }
}

export function submitComment(userid, username, userfoto, content, resepid){
  let created = Date.now()
  return dispatch => {
    return request
    .post(`${TARGET}submitcomment`)
    .type('form')
    .send({userid: userid})
    .send({username: username})
    .send({userfoto: userfoto})
    .send({content: content})
    .send({resepid: resepid})
    .send({created: created})
    .end((err, res)=>{
      if (err) {
        console.error(err);
      }else{
        dispatch(loadComment(resepid))
      }
    })
  }
}

export function loadComment(resepid){
  return dispatch => {
    return request
    .get(`${TARGET}loadcomment/${resepid}`)
    .set('Accept', 'application/json')
    .end((err, res)=>{
      if (err) {
        console.error(err);
      }else{
        dispatch(loadCommentSuccess(res.body))
      }
    })
  }
}

export function loadCommentSuccess(comment){
  return {type: 'loadcommentsuccess', comment}
}

export function loadLiked(token){
  return dispatch => {
    return request
    .get(`${TARGET}liked/${token}`)
    .set('Accept', 'application/json')
    .end((err, res)=>{
      if (err) {
        console.error(err);
      }else{
        if (res.body.alert === 'Intruder') {
          dispatch(loadlikedfailed())
        }else{
          dispatch(loadlikesuccess(res.body))
        }
      }
    })
  }
}

export function loadFavorite(token){
  return dispatch => {
    return request
    .get(`${TARGET}favorited/${token}`)
    .set('Accept', 'application/json')
    .end((err, res)=>{
      if (err) {
        console.error(err);
      }else{
        if (res.body.alert === 'Intruder') {
          dispatch(loadfavoritefailed())
        }else{
          dispatch(loadfavoritesuccess(res.body))
        }
      }
    })
  }
}

export function loadfavoritefailed(){
  return {type: 'loadfavoritedfailed'}
}

export function loadfavoritesuccess(favorite){
  return {type: 'loadfavoritesuccess', favorite}
}

export function loadlikedfailed(){
  return {type: 'loadlikedfailed'}
}

export function loadlikesuccess(liked){
  return {type: 'loadlikesuccess', liked}
}
