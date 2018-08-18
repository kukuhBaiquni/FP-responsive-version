import React, {Component} from 'react'
import Dropzone from 'react-dropzone'
import {validation} from '../config'
import '../Style/MainForm.css'
import {emoji} from '../config'
import Emojify from 'react-emojione';

let resepTitle = '';
let kategori = '-';
let thumbnail = '';
let listbahan = [];
let liststep = [];
let gallery = [];
let kesan = '';
let checker = 0;
let checker2 = 0;

export default class ResepForm extends Component {
  constructor(props){
    super(props)

    this.state = {
      hide: false,
      showEmoji: false,
      deleteIndex: '-',
      stepIndex: '-',
      stepHandler: '',
      resepTitle: '',
      kategori: '',
      thumbnail: '',
      listbahan: [],
      liststep: [],
      gallery: [],
      kesan: '',
    }
    this.hapusFoto = this.hapusFoto.bind(this)
  }

  resepTitleHandler(e){
    resepTitle = e.target.value
    this.setState({resepTitle: e.target.value})
  }

  kategoriSelect(e){
    kategori = e.target.value
    this.setState({
      kategori : kategori
    })
  }

  uploadFoto (files){
    thumbnail = files[0]
    this.setState({
      hide: true,
      thumbnail: files[0]
    })
  }

  addGallery(files){
    files.map(function(x){
      return gallery.push(x)
    })
    this.setState({gallery: gallery})
  }

  hapusFoto(i){
    gallery.splice(i, 1)
    this.setState({gallery: gallery})
  }

  tambahBahan (e){
    e.preventDefault()
    listbahan.push(this.input.value)
    this.setState({listbahan: listbahan})
    this.input.value = ''
  }

  deleteIndex(e){
    this.setState({
      deleteIndex: e.target.value
    })
    checker = e.target.value
  }

  deleteExecution(){
    if (this.state.deleteIndex !== '-') {
      let index = this.state.deleteIndex -1
      listbahan.splice(index, 1)
      if (listbahan.length === 0) {
        this.setState({
          deleteIndex: '-'
        })
        checker = '-'
      }
      this.forceUpdate()
    }
  }

  selectit(e){
    e.target.select()
  }

  stepChangeHandler(e){
    this.setState({
      stepHandler: e.target.value
    })
  }

  tambahLangkah(){
    if (this.state.stepHandler) {
      let step = this.state.stepHandler
      liststep.push(step)
      this.setState({
        stepHandler: '',
        liststep: liststep
      })
    }
  }

  stepIndex(e){
    this.setState({
      stepIndex: e.target.value
    })
    checker2 = e.target.value
  }

  stepDeleteExecution(){
    if (this.state.stepIndex !== '-') {
      let index = this.state.stepIndex - 1
      liststep.splice(index, 1)
      if (liststep.length === 0) {
        this.setState({
          stepIndex: '-'
        })
        checker2 = '-'
      }
      this.forceUpdate()
    }
  }

  kesanHandler(e){
    kesan = e.target.value
    this.setState({kesan: e.target.value})
  }

  submitForm(){
    let {user} = this.props;
    let fotopenulis = user.map(x => x.fotoprofil)
    let bundler = {
      nama: resepTitle,
      kategori: kategori,
      foto: thumbnail,
      bahan: listbahan,
      langkah: liststep,
      gallery: gallery,
      penulis: localStorage.getItem('token'),
      kesan: this.state.kesan,
      fotopenulis: fotopenulis[0]
    }
    let isValid = validation(resepTitle, kategori, thumbnail, listbahan, liststep)
    if (isValid === 'Form Valid') {
      this.props.action.turnOffResepAlertFailed()
      this.props.action.turnOffResepAlertSuccess()
      this.props.action.turnOnProcessing()
      this.props.action.tambahResep(bundler)
      // this.setState({
      //   kategori: '',
      //   hide: false,
      //   resepTitle: '',
      //   thumbnail: '',
      //   listbahan: [],
      //   liststep: [],
      //   gallery: [],
      //   kesan: '',
      // })
      // resepTitle = '';
      // kategori = '-';
      // thumbnail = '';
      // listbahan = [];
      // liststep = [];
      // gallery = [];
      // kesan = '';
    }else{
      this.props.action.turnOffResepAlertSuccess()
      this.props.action.turnOnResepAlertFailed()
    }
  }

  showEmoji(){
    this.setState(function(prevState){
      return {showEmoji: !prevState.showEmoji}
    })
  }

  getCode(code){
    kesan += code
    this.setState({
      kesan: kesan
    })
  }

  render(){
    let hide = this.state.hide
    return(
      <div className='resep-form-main'>
        <div className='main-header'><b>Resep Form</b></div>
        <div className='row-1-title'>
          <p className='main-title'>Judul Resep *</p>
          <input maxLength='50' onChange={this.resepTitleHandler.bind(this)} value={this.state.resepTitle} className='title-input'/>
        </div>
        <div className='main-kategori'>
          <p className='kategori-title'>Kategori *</p>
          <select value={this.state.kategori} className='kategori-select' onChange={this.kategoriSelect.bind(this)}>
            <option value='-'> Pilih Kategori </option>
            <option value='Sarapan'> Sarapan </option>
            <option value='Makan Siang'> Makan Siang </option>
            <option value='Makan Malam'> Makan Malam </option>
            <option value='Cemilan'> Cemilan </option>
            <option value='Prasmanan'> Prasmanan </option>
            <option value='Menu Sahur'> Menu Sahur </option>
            <option value='Menu Buka'> Menu Buka </option>
            <option value='Katering'> Katering </option>
            <option value='Kue Lebaran'> Kue Lebaran </option>
            <option value='Bingkisan'>Bingkisan </option>
          </select>
        </div>
        <div className='row-2-thumbnail'>
          <p className='main-thumbnail'>Foto Sampul *</p>
          <section>
            <Dropzone className='drop-area' onDrop={this.uploadFoto.bind(this)} accept="image/*" multiple={ false }>
              <p style={this.state.hide ? {display: 'none'} : {display: 'block'}} className='drop-instruction'>Klik untuk upload foto <span className='glyphicon glyphicon-camera'></span></p>
              {
                this.state.thumbnail !== '' &&
                <img src={thumbnail.preview} alt='preview' className='thumbnail-preview' />
              }
            </Dropzone>
          </section>
          {
            this.state.thumbnail !== '' &&
            <i className='drop-note'>* Klik foto untuk mengganti</i>
          }
        </div>
        <div className='step-drop-header'>
          <p className='step-drop-header-title'>Tambahkan foto yang berkaitan dengan resep anda</p>
        </div>
        <section className='step-drop-section'>
          <Dropzone onDrop={this.addGallery.bind(this)} className='step-drop-area' accept="image/*" multiple={true}>
            <div className='add-gallery'><span className='glyphicon glyphicon-plus'></span></div>
          </Dropzone>
          {
            this.state.gallery.map((x, i) =>
            <div key={i} className='gallery-holder'>
              <abbr title='Klik untuk hapus foto'><img onClick={()=> this.hapusFoto(i)} style={gallery.length !== 0 ? {display: 'block'} : {display: 'none'}} src={x.preview} alt='gallery' className='step-image-preview' /></abbr>
            </div>
          )
        }
      </section>
      <div className='row-3-bahan'>
        <p className='main-bahan'>Bahan-bahan *</p>
        <form onSubmit={this.tambahBahan.bind(this)}>
          <input maxLength='34' placeholder='Tambah Bahan...' ref={input => this.input = input} className='bahan-input'/>
          <div className='space-between'></div>
          <div onClick={this.tambahBahan.bind(this)} className='fake-button'>Tambah</div>
        </form>
        <p className='bahan-instruction'>Tekan 'Enter' untuk menambah</p>
      </div>
      <div className='submited-bahan'>
        {
          this.state.listbahan.length !== 0 &&
          <div className='submited-bahan-title'>Daftar Bahan :</div>
        }
        {
          this.state.listbahan.map(function(x, i){
            return(<BahanList key={i} index={i} bahan={x} />)
          })
        }
      </div>
      {
        this.state.listbahan.length !== 0 &&
        <div className='eliminator-main'>
          <div className='eliminator-holder'>
            <p className='eliminator-title'>Hapus Bahan</p>
            <select defaultValue='-' onChange={this.deleteIndex.bind(this)} className='bahan-eliminator'>
              <option value='-'>-</option>
              {
                this.state.listbahan.map(function(x, i){
                  return (<option key={i} value={i + 1}>{i + 1}</option>)
                })
              }
            </select>
            <div className='eliminator-fake-button' onClick={this.deleteExecution.bind(this)}>
              <span className='glyphicon glyphicon-trash'></span>
            </div>
          </div>
        </div>
      }
      <div className='row-4-step'>
        <div className='step-title'>
          <p>Langkah-langkah *</p>
        </div>
        <div className='step-textarea'>
          <textarea placeholder='Tambah langkah..' value={this.state.stepHandler} onChange={this.stepChangeHandler.bind(this)} maxLength='125' className='step-input' />
          <div onClick={this.tambahLangkah.bind(this)} className='submit-step'>Tambah</div>
        </div>
      </div>
      <div className='submited-step'>
        {
          this.state.liststep.length !== 0 &&
          <div>
            <p className='submited-step-title'>Proses pembuatan :</p>
          </div>
        }
        {
          this.state.liststep.map(function(x, i){
            return(<StepList key={i} index={i} step={x} />)
          })
        }
      </div>
      {
        this.state.liststep.length !== 0 &&
        <div className='delete-step'>
          <div className='delete-step-holder'>
            <p className='delete-step-title'>Hapus Langkah</p>
            <select onChange={this.stepIndex.bind(this)} defaultValue='-' className='delete-step-options'>
              <option value='-'>-</option>
              {
                this.state.liststep.map(function(x, i){
                  return(<option key={i} value={i + 1}>{i + 1}</option>)
                })
              }
            </select>
            <div onClick={this.stepDeleteExecution.bind(this)} className='delete-step-exe'>
              <span className='glyphicon glyphicon-trash'></span>
            </div>
          </div>
        </div>
      }
      <div className='rf-kesan-form'>
        <div className='rf-kesan-title'>
          <p>Kesan</p>
        </div>
        <div className='rf-textarea-emoji'>
          <textarea value={this.state.kesan} onChange={this.kesanHandler.bind(this)} placeholder='Kesan terhadap resep ini..' rows='1' maxLength='1500' className='rf-kesan-input' />
          <div className='rf-divider'></div>
          <div title='Tambahkan emoji' onClick={this.showEmoji.bind(this)} className='rf-dropdown'>
            <Emojify style={{width: 22, height: 22}}>
              <span>:grinning:</span>&nbsp;
                <span className='glyphicon glyphicon-triangle-bottom'></span>&nbsp;
                </Emojify>
                {
                  this.state.showEmoji &&
                  <div className='custom-dropdown-rf'>
                    <div className='custom-dropdown-rf-wrapper'>
                      <Emojify style={{height: 22, width: 22}}>
                        {
                          emoji.map((x, i)=>
                          <span key={i} onClick={()=> this.getCode(x)} className='custom-dropdown-rf-content'>{x}</span>
                        )
                      }
                    </Emojify>
                  </div>
                </div>
              }
            </div>
          </div>
        </div>
        <div className='final-button'>
          <div onClick={this.submitForm.bind(this)} className='final-title'><b>Bagikan</b></div>
        </div>
        <p style={{fontSize: '14px'}}>(*) informasi dibutuhkan</p>
      </div>
    )
  }
}

class BahanList extends Component {
  constructor(props){
    super(props)

    this.state = {
      editing : false,
      nothing: false,
    }
  }

  editing(){
    this.setState({
      editing: true
    })
  }

  finishEdit(e){
    e.preventDefault()
    listbahan[this.props.index] = this.input.value
    this.setState({
      editing: false
    })
  }

  render(){
    if (this.state.editing) {
      return(
        <div>
          <form onSubmit={this.finishEdit.bind(this)}>
            <input maxLength='34' autoFocus autoComplete='off' ref={input => this.input = input} defaultValue={listbahan[this.props.index]} className='input-edit' />
          </form>
          <div className='ignored-space'></div>
          <div className='space-between'></div>
        </div>
      )
    }else{
      return(
        <div>
          <div className='submited-list' style={this.props.index === checker - 1 ? {backgroundColor: 'red'} : {backgroundColor: 'white'}}>
            <div onClick={this.editing.bind(this)} className='target-data'>
              {this.props.index + 1}. {listbahan[this.props.index]}
            </div>
          </div>
          <div className='space-between'></div>
        </div>
      )
    }
  }
}

class StepList extends Component {
  constructor(props){
    super(props)

    this.state = {
      editing: false
    }
  }

  editing(){
    this.setState({
      editing: true
    })
  }

  finishEdit(){
    liststep[this.props.index] = this.input.value
    this.setState({
      editing: false
    })
    this.forceUpdate()
  }

  render(){
    if (this.state.editing) {
      return(
        <div className='step-editing'>
          <textarea ref={input => this.input = input} autoFocus defaultValue={liststep[this.props.index]} maxLength='125' className='step-input' />
          <div onClick={this.finishEdit.bind(this)} className='step-editing-button'>Ubah</div>
          <div className='space-between'></div>
        </div>
      )
    }else{
      return(
        <div className='submited-step-list'>
          <div className='step-indicator-count'>Langkah {this.props.index + 1}</div>
          <div className='space-between'></div>
          <p style={this.props.index === checker2 - 1 ? {backgroundColor: 'red'} : {backgroundColor: 'white'}} onClick={this.editing.bind(this)} className='step-content'>{liststep[this.props.index]}</p>
        </div>
      )
    }
  }
}
