import React, {Component} from 'react'
import Navbar from './Navbar'
import Dropzone from 'react-dropzone'
import BahanPartials from './BahanPartials'
import {Link} from 'react-router-dom';
import {Animated} from "react-animated-css"

var thumbnailfoto = ''
var namaresep = 'Nama Resep'
var kategori = 'Pilih Kategori'

export default class TulisResepForm extends Component {
  constructor(props){
    super(props)

    this.state = {
      editjudul: false,
      namaresep: namaresep,
      nothing: false,
      foto: thumbnailfoto,
      editkategori: false,
      modal: false,
      files: []
    }
    this.pseudo1 = this.pseudo1.bind(this)
  }

  componentDidMount(){
    this.props.actions.alertresepformOff()
    window.scrollTo(0, 0)
  }

  handleNamaResep(e){
    this.setState({
      namaresep: e.target.value
    })
  }

  namaResepSubmit(e){
    e.preventDefault()
    this.setState({
      editjudul: false
    })
    if (/^ *$/.test(this.state.namaresep)) {
      namaresep = 'Nama Resep'
      this.setState({
        namaresep: 'Nama Resep'
      })
    }else{
      namaresep = this.state.namaresep
    }
  }

  openJudul(){
    this.props.actions.alertresepformOff()
    this.setState({
      editjudul: true
    })
  }

  dipilih(e){
    e.target.select()
  }

  uploadFoto2(files) {
    this.props.actions.alertresepformOff()
    this.setState({
      files: files,
      foto: files[0]
    })
    if (thumbnailfoto.length > 0) {
      thumbnailfoto = []
    }
    thumbnailfoto = files[0]
  }

  hapusThumbnailFoto(){
    let yon = window.confirm('apakah anda yakin ingin menghapus?')
    if (yon) {
      this.setState(function(prevState){
        return {nothing: !prevState.nothing}
      })
      thumbnailfoto = ''
    }
  }

  pseudo1(){
    this.setState({
      namaresep: 'Nama Resep'
    })
    thumbnailfoto = ''
    namaresep = 'Nama Resep'
    kategori = 'Pilih Kategori'
  }

  pilihKategori(e){
    this.setState({
      editkategori: false
    })
    kategori = e.target.value
  }

  clickKategori(){
    this.props.actions.alertresepformOff()
    this.setState({
      editkategori: true
    })
  }

  closemodal(){
    this.props.actions.closemodal()
  }

  render(){

    var customize = {
      wordWrap: 'break-word',
      width: '700px',
      marginLeft: '50px',
      textAlign: 'center',
      fontSize: '40px',
      fontFamily: 'enigmaticregular',
      color: 'white',
    }
    var visibility = {
      display: this.props.utility.modal ? 'block' : 'none'
    }
    return(
      <div>
        {
          this.props.utility.modal &&
          <div id="overlay">
            <Animated animationIn="bounceIn" animationOut='flipOutX' isVisible={this.props.utility.modal}>
              <div className='popup' style={visibility}>
                <div className='notice'>Resep anda berhasil dibagikan<br/>Anda dapat melihatnya di Beranda.</div>
                <Link onClick={this.closemodal.bind(this)} to='/' id='text' className='modalbutton'>Beranda &nbsp;<span className='glyphicon glyphicon-share-alt'></span></Link>
                <div onClick={this.closemodal.bind(this)} id='text' className='modalbutton2'>Tutup &nbsp;<span className='glyphicon glyphicon-remove'></span></div>
              </div>
            </Animated>
          </div>
        }
        <Animated animationIn="bounceInUp" isVisible={true}>
          <div className='thumbfoto'>
            <section className='rectangle'>
              <Dropzone className='dropzone' onDrop={this.uploadFoto2.bind(this)} accept="image/*" multiple={ false }>
                {
                  thumbnailfoto.length === 0 &&
                  <div>
                    <span id='camera' className='glyphicon glyphicon-camera'></span>
                    <p className='klikupload'>Klik untuk upload foto</p>
                    <i className='advice'>"untuk hasil terbaik gunakan foto dengan posisi landscape"</i>
                  </div>
                }
                {
                  thumbnailfoto.length !== 0 &&
                  <abbr className='Ganti foto'><div className='gantifoto'>Ganti foto <span className='glyphicon glyphicon-camera'></span></div></abbr>
                }
              </Dropzone>
              {
                thumbnailfoto.length !== 0 &&
                <div className='buangfoto' onClick={this.hapusThumbnailFoto.bind(this)}>Hapus <span className='glyphicon glyphicon-trash'></span></div>
              }
            </section>
            <div className='imgpos'>
              {

                thumbnailfoto.length !== 0 &&
                <img src={this.state.foto.preview} alt="preview" className='thumbnailpreview'/>
              }
            </div>
          </div>

          <div className='penjalin'>
            <form onSubmit={this.namaResepSubmit.bind(this)} className='resepformholder'>
              <div className="form-group">
                {
                  this.state.editjudul
                  ?
                  <input maxLength='55' autoFocus onFocus={this.dipilih.bind(this)} autoComplete='off' style={{textAlign: 'center'}} onChange={this.handleNamaResep.bind(this)} defaultValue={namaresep} type="text" id='formwidth1' className="form-control" />
                  :
                  <Animated animationIn="flipInX" isVisible={true}>
                    <abbr title='Klik untuk mengubah nama resep'><div style={customize} onClick={this.openJudul.bind(this)}>{this.state.namaresep}</div></abbr>
                  </Animated>
                }
              </div>

              <p className='labelg'>Kategori :</p>
              {
                this.state.editkategori
                ?
                <select defaultValue={kategori} className="form-control selectform" onChange={this.pilihKategori.bind(this)}>
                  <option value='kosong'> Pilih Kategori </option>
                  <option value='Sarapan'> Sarapan </option>
                  <option value='Makan Siang'> Makan Siang </option>
                  <option value='Makan Malam'> Makan Malam </option>
                  <option value='Cemilan'> Cemilan </option>
                  <option value='Prasmanan'> Prasmanan </option>
                  <option value='Menu Sahur'> Menu Sahur </option>
                  <option value='Menu Buka'> Menu Buka </option>
                  <option value='Katering'> Katering </option>
                  <option value='Kue Lebaran'> Kue Lebaran </option>
                </select>
                :
                <Animated animationIn="fadeIn" isVisible={true}>
                  <p className='labelg kategori' onClick={this.clickKategori.bind(this)}><abbr title='klik untuk pilih kategori'>{kategori}</abbr></p>
                </Animated>
              }

            </form>
            <div className='selectspace'></div>
            <BahanPartials
              kategori={kategori}
              namaresep={namaresep}
              foto={thumbnailfoto}
              pseudo1={this.pseudo1}
              utility={this.props.utility}
              actions={this.props.actions}/>
          </div>
        </Animated>
        <Navbar actions={this.props.actions} utility={this.props.utility}/>
        <div style={{display: 'none', height: '1px', width: '1px'}} onClick={this.pseudo1}></div>
      </div>
    )
  }
}
