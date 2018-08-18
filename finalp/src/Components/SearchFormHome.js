import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {Animated} from "react-animated-css"

export default class SearchFormHome extends Component {
  constructor(props){
    super(props)

    this.state = {
      handleSearch: '',
      sortmode: false,
      alertmode: false,
      sorthandler: '',
    }
    this.sortType = this.sortType.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleSearch = this.handleSearch.bind(this)
    this.sortModeOn = this.sortModeOn.bind(this)
    this.sortModeOff = this.sortModeOff.bind(this)
    this.alertOn = this.alertOn.bind(this)
    this.alertOff = this.alertOff.bind(this)
  }

  alertOn(){
    this.setState({
      alertmode: true
    })
  }

  alertOff(){
    this.setState({
      alertmode: false
    })
  }

  sortModeOn(){
    this.setState({
      sortmode: true
    })
  }

  sortModeOff(){
    this.setState({
      sortmode: false
    })
  }

  handleSearch(e){
    this.setState({
      handleSearch: e.target.value
    })
  }

  handleSubmit(e){
    e.preventDefault()
    let query = this.state.handleSearch;
    this.props.actions.searchModeOn()
    this.props.actions.searching(query)
    this.setState({
      handleSearch: ''
    })
  }

  endSearch(){
    this.props.actions.searchModeOff()
    this.props.actions.loadResep()
  }

  menuSahur(){
    this.props.actions.menuSahur()
    this.props.actions.searchModeOn()
  }

  menuBuka(){
    this.props.actions.menuBuka()
    this.props.actions.searchModeOn()
  }

  sarapan(){
    this.props.actions.sarapan()
    this.props.actions.searchModeOn()
  }

  cemilan(){
    this.props.actions.cemilan()
    this.props.actions.searchModeOn()
  }

  makanSiang(){
    this.props.actions.makanSiang()
    this.props.actions.searchModeOn()
  }

  makanMalam(){
    this.props.actions.makanMalam()
    this.props.actions.searchModeOn()
  }

  katering(){
    this.props.actions.katering()
    this.props.actions.searchModeOn()
  }

  prasmanan(){
    this.props.actions.prasmanan()
    this.props.actions.searchModeOn()
  }

  kueLebaran(){
    this.props.actions.kueLebaran()
    this.props.actions.searchModeOn()
  }

  asc(){
    let sortType = this.state.sorthandler
    if (sortType.length !== 0) {
      window.scrollTo(0, window.scrollY - 0)
      this.props.actions.sortasc(sortType)
    }
  }

  desc(){
    let sortType = this.state.sorthandler
    if (sortType.length !== 0) {
      window.scrollTo(0, window.scrollY - 0)
      this.props.actions.sortdesc(sortType)
    }
  }

  sortType(e){
    this.setState({
      sorthandler: e
    })
  }

  nonmember(){
    window.alert('Anda harus login untuk menulis resep')
  }

  render(){
    const {data, utility} = this.props
    return(
      <div>
        {
          utility.searchmode &&
          <Animated animationIn="flipInX" animationOut='flipOutX' isVisible={utility.searchmode}>
            <div className='hasilpencarian'>Hasil Pencarian : {data.length === 0 ? 'Tidak ditemukan' : data.length + ' ditemukan'}</div>
            <abbr title='Reset'><div onClick={this.endSearch.bind(this)} className='resetmode'><span className='glyphicon glyphicon-remove'></span></div></abbr>
          </Animated>
        }
        {
          this.state.sortmode
          ?
          <div>
            <div className="abjad">
              <input onChange={()=> this.sortType('alfabet')} type="radio" name="optionsRadios" id="optionsRadios1" value="alfabet" />
              &nbsp;&nbsp;Urutkan berdasarkan alfabet
            </div>
            <div className="waktu">
              <input onChange={()=> this.sortType('date')} type="radio" name="optionsRadios" id="optionsRadios1" value="date" />
              &nbsp;&nbsp;Urutkan berdasarkan tanggal penulisan
            </div>
            <div className="suka">
              <input onChange={()=> this.sortType('like')}  type="radio" name="optionsRadios" id="optionsRadios1" value="like" />
              &nbsp;&nbsp;Urutkan berdasarkan jumlah suka
            </div>
            <div className="komentar">
              <input onChange={()=> this.sortType('comment')} type="radio" name="optionsRadios" id="optionsRadios1" value="comment" />
              &nbsp;&nbsp;Urutkan berdasarkan jumlah komentar
            </div>
            <abbr onClick={this.asc.bind(this)} title='Naik'><div className='asc'><span className='glyphicon glyphicon-arrow-up'></span></div></abbr>
            <abbr onClick={this.desc.bind(this)} title='Turun'><div className='desc'><span className='glyphicon glyphicon-arrow-down'></span></div></abbr>


            <div className='sortabjad'><span className='glyphicon glyphicon-sort-by-alphabet'></span></div>
            <div className='sorttime'><span className='glyphicon glyphicon-time'></span></div>
            <div className='sortlike'><span className='glyphicon glyphicon-heart'></span></div>
            <div className='sortcomment'><span className='glyphicon glyphicon-comment'></span></div>
            <abbr title='Tutup mode pengurutan'><div onClick={this.sortModeOff} className='sortclose'><span className='glyphicon glyphicon-chevron-up'></span></div></abbr>
          </div>
          :
          <abbr title='Buka mode pengurutan'><div onClick={this.sortModeOn} className='sortopen'><span className='glyphicon glyphicon-chevron-down'></span></div></abbr>
        }
        {
          this.state.alertmode &&

          <Animated animationIn="fadeInDown" isVisible={true}>
            <div className='alertsearch'>Huruf kapital mempengaruhi hasil pencarian</div>
          </Animated>

        }
        {
          this.props.user.length === 1
          ?
          <Link to='/tulisresep' className='tulisresepbutton'>Tulis Resep <span className='glyphicon glyphicon-edit'></span></Link>
          :
          <div onClick={this.nonmember.bind(this)} className='tulisresepbutton'>Tulis Resep <span className='glyphicon glyphicon-edit'></span></div>
        }
        <form onSubmit={this.handleSubmit} className='formcari'>
          <div className="col-lg-6">
            <div className="input-group">
              <input onBlur={this.alertOff} onFocus={this.alertOn} value={this.state.handleSearch} onChange={this.handleSearch} id='forml' type="text" className="form-control" placeholder="Cari Resep" />
              <span className="input-group-btn">
              </span>
            </div>
          </div>
        </form>

        <div className='signkategori'><span className='glyphicon glyphicon-info-sign'></span></div>
        <abbr title='reset pencarian sebelum melakukan pencarian baru'>
          <p className='kategorirow'>Cari berdasarkan Kategori :</p>
        </abbr>
        <ul className='braket'>
          <p onClick={this.menuSahur.bind(this)} className='kategorilist1'>Menu Sahur</p>
          <p onClick={this.menuBuka.bind(this)} className='kategorilist2'>Menu Buka</p>
          <p onClick={this.sarapan.bind(this)} className='kategorilist3'>Sarapan</p>
          <p onClick={this.cemilan.bind(this)} className='kategorilist4'>Cemilan</p>
          <p onClick={this.makanSiang.bind(this)} className='kategorilist5'>Makan Siang</p>
          <p onClick={this.makanMalam.bind(this)} className='kategorilist6'>Makan Malam</p>
          <p onClick={this.katering.bind(this)} className='kategorilist7'>Katering</p>
          <p onClick={this.prasmanan.bind(this)} className='kategorilist8'>Prasmanan</p>
          <p onClick={this.kueLebaran.bind(this)} className='kategorilist9'>Kue Lebaran</p>
        </ul>
      </div>
    )
  }
}
