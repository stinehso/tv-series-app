import React, { Component } from 'react';
import Table from './Table'
import fileDownload from 'js-file-download';
import './App.css';
import 'tachyons'


export class App extends Component {
  constructor() {
    super();
    this.state = {
      shows: [{}],
      headers: ['Name', 'Network', 'Genres', 'Episode count', 'Released episodes count'],
      reportType: 'Summary',
      genresList: [],
      filter: [],
    }
  }

  componentDidMount() {
    this.getReportTable('Summary');
  }

  getReportTable = (type) => {
    const fetchInfo = (target) => {
      fetch(target)
        .then(res => res.json())
        .then(res => {
          this.setState({ shows: res.table });
          this.setState({ headers: res.headers });
          this.setState({ reportType: type})
          this.setState({ filteredShows: res.table });
        })
        .catch(e => console.log(e))
    }

    switch(type) {
      case 'Summary':
        fetchInfo('http://localhost:3000/summary');
        break;
      case 'Next week':
        fetchInfo('http://localhost:3000/nextWeek');
        break;
      case 'Top 10':
        fetchInfo('http://localhost:3000/top10');
        break;
      case 'Top networks':
        fetchInfo('http://localhost:3000/topNetworks');
        break;
      case 'Best episode':
        fetchInfo('http://localhost:3000/bestEpisode');
        break;
      case 'Recommended show':
        fetchInfo('http://localhost:3000/recommended');
        break;
      default:
        console.log('Invalid report');
    }
  }

  handleDownload = () => {
    const fetchFile = (target) => {
      fetch(target)
        .then(res => fileDownload(res, 'report.txt'))
        .catch(e => console.log(e))
    }
    
    switch(this.state.reportType) {
      case 'Summary':
        fetchFile('http://localhost:3000/summary/download');
        break;
      case 'Next week':
        fetchFile('http://localhost:3000/nextWeek/download');
        break;
      case 'Top 10':
        fetchFile('http://localhost:3000/top10/download');
        break;
      case 'Top networks':
        fetchFile('http://localhost:3000/topNetworks/download');
        break;
      case 'Best episode':
        fetchFile('http://localhost:3000/bestEpisode/download');
        break;
      case 'Recommended show':
        fetchFile('http://localhost:3000/recommended/download');
        break;
      default:
        console.log('Invalid report');
    }
  }



  sortBy = (key) => (a, b) => {
    let result;
    try {
      result = a[key].localeCompare(b[key])
    } catch (error) {
      result = a[key]-b[key]
    }
    return result
  }
  
  handleHeaderClick = (heading) => {
    const allShowsCopy = this.state.shows
    allShowsCopy.sort(this.sortBy(heading))
    this.setState({ shows: allShowsCopy })
  }



  findGenres = () => {
    const genres = this.state.shows.map((show) => {
      if (show.genres) {
        return show.genres.split(', ')
      }
      return null
    })
    let unique = [...new Set(genres.flat())]; 
    unique = unique.filter(genre => genre != null)
    return unique
  }

  genreFilter = (show) => {
    for (const genre of this.state.filter) {
      if (show.genres.split(', ').includes(genre)) {
        return true        
      }
    }
    return false
  }

  handleGenreChange = (genre) => { 
    let filterCopy = this.state.filter;
    if (this.state.filter.includes(genre)) {
      filterCopy = filterCopy.filter((val, i, arr) => val !== genre)
      console.log(filterCopy, genre);
      this.setState ({ filter: filterCopy })
    } else {
      filterCopy.push(genre)
      this.setState ({ filter: filterCopy })
    } 
  }


  render() {
    const reportTypes = ['Summary', 'Next week', 'Top 10', 'Top networks', 'Best episode', 'Recommended show'];
    let genresList = this.state.genresList;
    genresList = this.findGenres();
    let filteredGenresShows = this.state.shows.filter(this.genreFilter);

    return (
      <div className="App">
          <header className="App-header tc ph4">
            <h1 className='f3 f2-m f1-l fw2 white-90 mv3'>The TV series hub</h1>
          </header>
          <div className='content-main mh6'>
              <div className='reports flex justify-center items-baseline'>
                <label htmlFor="report-type" className='avenir ph2'>Velg rapport: </label>
                <select name="report-type" id="report-type" 
                  className='br2 h2 f6 bg-near-white dark-gray br1'
                  onChange={e => this.getReportTable(e.target.value)}>
                  {
                    reportTypes.map((report, i) => {
                      return (<option key={i} value={report} className='avenir f2'>{report}</option>)
                    })
                  }
                </select>
                <button className='f6 link dim ba ph3 pv2 mb2 dib mid-gray ma3 br2'
                  onClick={this.handleDownload}>Last ned</button>
              </div>
              <h5 className='fw6'>Filtre</h5>
              {
                genresList !== undefined ?
                genresList.map(genre => {
                  return (
                    <label className='avenir ph1'>
                    <input
                      name={genre}
                      type="checkbox"
                      checked={this.state.filter[genre]}
                      onChange={e => this.handleGenreChange(genre)} />
                    {genre}
                  </label>
                  )
                })
                : <React.Fragment></React.Fragment>
              }
              {
                filteredGenresShows.length > 0  ?
                <Table headers={this.state.headers} shows={filteredGenresShows} sortBy={this.handleHeaderClick} />
                : <Table headers={this.state.headers} shows={this.state.shows} sortBy={this.handleHeaderClick} />
              }
          </div>
      </div>
    )
  }
}

export default App;
