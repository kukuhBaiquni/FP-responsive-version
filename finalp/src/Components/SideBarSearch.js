import React, {Component} from 'react'
import '../Style/SideBarSearch.css'

export default class SideBarSearch extends Component {
  constructor(props){
    super(props)

    this.state = {
      kategoriMode : false,
      selected: '-',
      query: '',
    }
  }

  kategoriMode(){
    this.setState(function(prevState){
      return {kategoriMode: !prevState.kategoriMode}
    })
  }

  kategoriSelect(e){
    this.setState({selected: e.target.value})
  }

  queryHandler(e){
    this.setState({query: e.target.value})
  }

  search(){
    if (this.state.kategoriMode && this.state.selected !== '-') {
      let mode = 'kategori';
      let query = this.state.selected;
      let offset = 0;
      this.props.actions.searching(query, mode, offset)
      this.props.actions.turnOnSearchMode()
      this.props.actions.turnOnSearchProcessing()
      this.props.actions.turnOffSearchResult()
    }else{
      let mode = 'manual';
      let query = this.state.query;
      let offset = 0;
      if (query !== '' && query.length !== 0) {
        this.props.actions.searching(query, mode, offset)
        this.props.actions.turnOnSearchMode()
        this.props.actions.turnOnSearchProcessing()
        this.props.actions.turnOffSearchResult()
      }
    }
  }

  reset(){
    this.props.actions.loadResep(0)
    this.props.actions.turnOffSearchResult()
    this.props.actions.turnOffSearchMode()
    this.setState({query: ''})
  }

  render(){
    return(
      <div className='sb-search-container'>
        <div className='sb-search-content-wrapper'>
          <div className='sb-search-header'>
            <span onClick={this.kategoriMode.bind(this)} title='Ubah mode pencarian' className='glyphicon glyphicon-refresh' id='sb-search-custom-toggler'></span>
            <p className='sb-search-title'><span style={{paddingTop: '5px', fontSize: '17px'}} className='glyphicon glyphicon-search'></span> Cari Resep</p>
          </div>
          <div className='sb-search-pair'>
            {
              this.state.kategoriMode
              ?
              <select value={this.state.selected} className='sb-search-area' onChange={this.kategoriSelect.bind(this)}>
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
              :
              <input value={this.state.query} onChange={this.queryHandler.bind(this)} className='sb-search-area' type='text' placeholder='cari resep..' />
            }
            <div onClick={this.search.bind(this)} className='sb-search-executor'>
              <p className='sb-search-button'>Cari</p>
            </div>
          </div>
          {
            this.props.status.searchProcessing &&
            <div className='sb-search-info'>
              <div className='sb-loading-animation'></div>
              <p className='sb-search-status'>sedang mencari...</p>
            </div>
          }
          {
            this.props.status.showSearchResult &&
            <div className='sb-search-info'>
              <p className='sb-search-result'>Hasil pencarian <strong>{this.props.summary.totalResep}</strong> ditemukan</p>
              <p title='Reset pencarian' onClick={this.reset.bind(this)} className='sb-search-reset'>Reset</p>
            </div>
          }
        </div>
      </div>
    )
  }
}
