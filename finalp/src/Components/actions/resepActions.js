import request from 'superagent'
import moment from 'moment'
import {SERVER_URL} from '../../config'
import {
  turnOffProcessing,
  turnOnResepAlertSuccess,
  turnOffSearchProcessing,
  turnOnSearchResult
} from './status_controller'
const TARGET = SERVER_URL + 'api/finalp/resep/'

export function resepDetail(resepid){
  return dispatch => {
    return request
    .get(`${TARGET}resepdetail/${resepid}`)
    .set('Accept', 'application/json')
    .end((err, res)=>{
      if (err) {
        dispatch(resepDetailFailed())
      }else{
        dispatch(resepDetailSuccess(res.body))
      }
    })
  }
}

export function resepDetailSuccess(data){
  return {type: 'resepDetailSuccess', data}
}

export function resepDetailFailed(){
  return {type: 'resepDetailFailed'}
}

export function myRecipe(token){
  return dispatch => {
    return request
    .get(`${TARGET}myrecipe/${token}`)
    .set('Accept', 'application/json')
    .end((err, res)=>{
      if (err) {
        console.error(err);
      }else{
        if (res.body.status === 'Someone trying to hack our system') {
          dispatch(loadResepSayaGagal())
        }else{
          dispatch(loadResepSayaBerhasil(res.body))
        }
      }
    })
  }
}

export function loadResepSayaGagal(){
  return {type: 'RESEP_SAYA_KOSONG'}
}

export function loadResepSayaBerhasil(resep){
  return {type: 'RESEP_SAYA', resep}
}

export function loadMoreResep(token ,stage){
  return dispatch => {
    return request
    .get(`${TARGET}loadmoreresep/${token}/${stage}`)
    .set('Accept', 'application/json')
    .end((err, res)=>{
      if (err) {
        console.error(err);
      }else{
        dispatch(loadMoreSuccess(res.body))
      }
    })
  }
}

export function loadMoreSuccess(resep){
  return {type: 'LOADMORE_SUCCESS', resep}
}

export function deleteResep(resepid){
  return dispatch => {
    return request
    .post(`${TARGET}myrecipe/${resepid}`)
    .type('form')
    .send({resepid: resepid})
    .end((err, res)=>{
      if (err) {
        console.error(err);
      }
    })
  }
}

export function deletefilter(resepid){
  return {type: 'deletefilter', resepid}
}

export function loadResep(offset){
  return dispatch => {
    return request
    .get(`${TARGET}allresep/${offset}`)
    .set('Accept', 'application/json')
    .end((err, res)=>{
      if (err) {
        console.log('lol');
      }else{
        dispatch(loadResepSukses(res.body))
        dispatch(totalPages(res.body))
      }
    })
  }
}

export function totalPages(pages){
  return {type: 'NORMAL_PAGINATION', pages}
}

export function loadResepSukses(resep){
  return {type: 'loadResepSukses', resep}
}

export function tambahResep(bundler){
  let resepid = Date.now()
  let counter = bundler.gallery.length
  return dispatch => {
    var resepData = new FormData()
    bundler.langkah.map(function(x){
      return resepData.append('langkah', x)
    })
    bundler.bahan.map(function(x){
      return resepData.append('bahan', x)
    })
    resepData.append('kategori', bundler.kategori)
    resepData.append('resepid', resepid)
    resepData.append('nama', bundler.nama)
    resepData.append('foto', bundler.foto)
    resepData.append('penulis', bundler.penulis)
    resepData.append('kesan', bundler.kesan)
    resepData.append('fotopenulis', bundler.fotopenulis)
    return request
    .post(`${TARGET}tambahresep`)
    .send(resepData)
    .end((err, res)=>{
      if (err) {
        dispatch(tambahResepGagal())
      }else{
        if (counter === 0) {
          dispatch(loadResep(0))
          dispatch(turnOffProcessing())
          dispatch(turnOnResepAlertSuccess())
        }else{
          dispatch(loopingGallery(res.body.resep.resepid ,bundler.gallery, counter))
        }
      }
    })
  }
}

export function tambahResepSukses(resep){
  return {type: 'tambahResepSukses', resep}
}

export function tambahResepGagal(){
  return {type: 'tambahResepGagal'}
}

export function loopingGallery(resepid ,images, counter){
  return dispatch => {
    images.map(function(x, i){
      const data = new FormData()
      data.append('file', x)
      return request
      .put(`${TARGET}gallery/${resepid}`)
      .send(data)
      .end((err, res)=>{
        if (err) {
          console.error(err);
        }else{
          counter -= 1
          if (counter === 0) {
            dispatch(loadResep(0))
            dispatch(turnOffProcessing())
            dispatch(turnOnResepAlertSuccess())
          }
        }
      })
    })
  }
}

export function searching(query, mode, offset){
  return dispatch => {
    let lfResep = new FormData()
    lfResep.append('query', query);
    lfResep.append('mode', mode);
    lfResep.append('offset', offset)
    return request
    .post(`${TARGET}searching`)
    .send(lfResep)
    .end((err, res)=>{
      if (err) {
        console.error(err);
      }else{
        dispatch(searchResult(res.body))
        dispatch(searchResultPagination(res.body))
        dispatch(turnOffSearchProcessing())
        dispatch(turnOnSearchResult())
      }
    })
  }
}

export function searchResultPagination(pages){
  return {type: 'SEARCH_RESULT_PAGINATION', pages}
}

export function searchResult(resep){
  return {type: 'SEARCH_RESULT', resep}
}

export function resepDetailEmpty(){
  return {type: 'RESEP_DETAIL_EMPTY'}
}
