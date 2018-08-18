import React, {Component} from 'react'

export default class SearchFormNavbar extends Component {
  constructor(props){
    super(props)

    this.state = {
      handleSearch: ''
    }
  }

  handleSearch(e){
    this.setState({
      handleSearch: e.target.value
    })
  }

  handleSubmit(e){
    e.preventDefault()
    let query = this.state.handleSearch;
    this.props.actions.searching(query)
    this.props.actions.searchModeOn()
    window.scrollTo(0, 0)
    this.setState({
      handleSearch: '',
    })
  }

  render(){
    return(
      <div>
        <form className='formcarikecil'  onSubmit={this.handleSubmit.bind(this)}>
          <div className="col-lg-6">
            <div className="input-group">
              <input value={this.state.handleSearch} onChange={this.handleSearch.bind(this)} id='forml2' type="text" className="form-control" placeholder="Cari Resep" />
              <button className="btn btn-default" id='tom2' type="submit">Cari</button>
            </div>
          </div>
        </form>
      </div>
    )
  }
}
