import React, {Component} from 'react'
import Dropzone from 'react-dropzone'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as AppActions from './actions'
import './RegisterModal.css';
import {Animated} from "react-animated-css"

var listlangkah = []
var checker = 0
var langkahDetail = []
var lol = {
  order: 0,
  index: 0,
  images: '',
  langkah:'',
}
class LangkahPartials extends Component {
  constructor(props){
    super(props)

    this.state = {
      handleEditValue: '',
      langkahChangeHandler: '',
      langkahChangeHandlerEdit: '',
      editlangkah: false,
      nothing: false,
      positionhandler: '5px',
      buttonhandler: '4px',
      position: 'absolute',
      files: [],
          }
    this.deleteFotoLangkah = this.deleteFotoLangkah.bind(this)
    this.testid = this.testid.bind(this)
    this.langkaheditclick = this.langkaheditclick.bind(this)
    this.langkahdelete = this.langkahdelete.bind(this)
    this.readyForAction = this.readyForAction.bind(this)
  }

  langkahSubmit(e){
    e.preventDefault()
    function cidug(x){
      return x.charAt(0).toUpperCase() + x.slice(1)
    }
    listlangkah.push(cidug(this.state.langkahChangeHandler))
    lol.langkah = listlangkah[langkahDetail.length]
    langkahDetail.push(lol)
    langkahDetail[langkahDetail.length-1].order = langkahDetail.length

    this.setState({
      langkahChangeHandler: ''
    })
    lol = {
      order: 0,
      index: 0,
      images: '',
      langkah:''
    }
  }

  langkahEditSubmit(e){
    e.preventDefault()
    function cidug(x){
      return x.charAt(0).toUpperCase() + x.slice(1)
    }
    this.setState({
      editlangkah: false
    })
    listlangkah[checker] = cidug(this.state.langkahChangeHandlerEdit)
    langkahDetail[checker].langkah = listlangkah[checker]
  }

  langkahChangeHandler(e){
    this.setState({
      langkahChangeHandler: e.target.value
    })
  }

  langkahChangeHandlerEdit(e){
    this.setState({
      langkahChangeHandlerEdit: e.target.value
    })
  }

  langkaheditclick(i){
    checker = i
    this.setState({
      editlangkah: true,
      positionhandler: -((115*(listlangkah.length-i)))+'px',
      buttonhandler: -((115*(listlangkah.length-i)))+'px',
      handleEditValue: listlangkah[checker],
      langkahChangeHandlerEdit: listlangkah[checker],
    })
  }

  langkahdelete(i){
    let yon = window.confirm('apakah anda yakin ingin menghapus?')
    if (yon) {
      listlangkah.splice(i, 1)
      this.setState(function(prevState){
        return {nothing: !prevState.nothing}
      })
      langkahDetail.splice(i, 1)
    }
  }

  testid(i){
    checker = i
  }

  deleteFotoLangkah(i){
    let yon = window.confirm('apakah anda yakin ingin menghapus?')
    if (yon) {
      langkahDetail[i].images = ''
      this.setState(function(prevState){
        return {nothing: !prevState.nothing}
      })
      langkahDetail[checker].index = 0
    }
  }

  uploadFoto(files) {
    this.props.actions.alertresepformOff()
    this.setState({
      files: files,
      hover: false,
    })
    langkahDetail[checker].images = files[0]
    langkahDetail[checker].index = checker + 1
  }

  alertprepare(){
    this.props.actions.alertresepformOff()
  }

  readyForAction(e){
    e.preventDefault()
    let {nama, foto, bahan, kategori} = this.props
    if (nama !== 'Nama Resep' && foto !== '' && bahan.length !== 0 && kategori !== 'kosong' && langkahDetail.length !== 0) {
      var bundler = {
        nama: this.props.nama,
        foto: this.props.foto,
        bahan: this.props.bahan,
        kategori: this.props.kategori,
        penulis: localStorage.getItem('token'),
        langkah: langkahDetail
      }
      this.props.actions.tambahResep(bundler)
      this.props.actions.openmodal()
      this.props.pseudo2()
      this.props.pseudo1()
      langkahDetail = []
      listlangkah = []
    }else{
      this.props.actions.alertresepformOn()
    }
  }

  render(){
    var buttondewa = {
      marginTop: this.state.buttonhandler,
      opacity: '0.85',
      width: '40px',
      height: '112px',
      fontSize: '20px',
      fontFamily: 'enigmaticregular',
      color: 'white',
      lineHeight: '112px',
      textAlign: 'center',
      background: '#4d2e9b',
      marginLeft: '879px',
      border: '1px solid white',
      borderRadius: '5px',
      position: 'absolute',
    }

    var editor = {
      position: 'absolute',
      width: '475px',
      height: '115px',
      fontSize: '17px',
      marginLeft: '401px',
      fontFamily: 'sansation_lightlight',
      border: '1px solid white',
      borderRadius: '5px',
      marginTop: this.state.positionhandler
    }
    var list2 = listlangkah.map((f,i) =>
    <div key={i}>
      <div>
        <Animated animationIn="fadeIn" isVisible={true}>
          <div className='lala'>{listlangkah[i]}</div>
          <abbr title={'Langkah ' + (i+1) }><div className='gobot'>{i+1 + '.'}</div></abbr>
          {
            !this.state.editlangkah &&
            <div>
              <abbr title='Edit langkah'><div className='editlangkah' onClick={()=> this.langkaheditclick(i)}><span className='glyphicon glyphicon-pencil'></span></div></abbr>
              <abbr title='Hapus langkah'><div className='hapuslangkah' onClick={()=> this.langkahdelete(i)}><span className='glyphicon glyphicon-trash'></span></div></abbr>
            </div>
          }
          <section className='rectangle'>
            <Dropzone onClick={()=> this.testid(i)} className='dropzone' onDrop={this.uploadFoto.bind(this)} accept="image/*" multiple={ false }>
              <p className='poto'><span className='glyphicon glyphicon-camera'></span> Tambahkan foto</p>
              {
                langkahDetail[i].images.length !== 0 &&
                <Animated animationIn="fadeIn" isVisible={true}>
                  <abbr title='klik untuk ganti foto'><img src={langkahDetail[i].images.preview} alt="preview" className='previewimg'/></abbr>
                </Animated>
              }
            </Dropzone>
            {
              langkahDetail[i].images.length !== 0 &&
              <abbr className='kug' onClick={()=> this.deleteFotoLangkah(i)} title='hapus'><div className='sibal'><span className='glyphicon glyphicon-trash'></span></div></abbr>
            }
          </section>

        </Animated>
      </div>
    </div>
  )

  return(
    <div>
      <div className="form-group">
        <p className='labelg'>Proses Pembuatan</p>
        <div>
          <textarea onFocus={this.alertprepare.bind(this)} disabled={this.state.editlangkah} maxLength='125' onChange={this.langkahChangeHandler.bind(this)} placeholder='Tambah Langkah' autoComplete='off' value={this.state.langkahChangeHandler} id='formwidth3' className="form-control" />
          {
            !this.state.editlangkah &&
            <abbr title='Simpan langkah'><div onClick={this.langkahSubmit.bind(this)} className='simpanlangkah'><span className='glyphicon glyphicon-ok'></span></div></abbr>
          }
        </div>
        <div className='formdivider2'>
          <ul>
            {list2}
            {
              this.state.editlangkah &&
              <div>
                <textarea style={editor} defaultValue={listlangkah[checker]} maxLength='125' onChange={this.langkahChangeHandlerEdit.bind(this)} placeholder='Edit Langkah' autoFocus autoComplete='off' />
                <abbr style={buttondewa} title='Simpan'><div onClick={this.langkahEditSubmit.bind(this)} ><span className='glyphicon glyphicon-ok'></span></div></abbr>
              </div>
            }
          </ul>

        </div>
          {
            this.props.utility.alertresepstatus &&
            <Animated animationIn="flipInX" animationOut="flipOutX" isVisible={this.props.utility.alertresepstatus}>
              <div className='flash2'>Anda harus memberikan informasi yang lengkap!</div>
            </Animated>
          }
        <button onClick={this.readyForAction} className='bagikan'>Bagikan <span className='glyphicon glyphicon-share'></span></button>
      </div>
      <div className='surrat20'></div>
    </div>
  )
}
}

function mapStateToProps(state){
  return{
    data: state.data
  }
}

function mapDispatchToProps(dispatch){
  return{
    actions: bindActionCreators(AppActions, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LangkahPartials)
