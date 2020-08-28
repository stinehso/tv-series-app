import React, { Component } from 'react';
import Table from './Table'
import './App.css';
import 'tachyons'


export class App extends Component {
  constructor() {
    super();
    this.state = {
      shows: [{}],
      headers: []
    }
  }

  componentDidMount() {
    this.getReportTable('Summary')
  }

  getReportTable = (type) => {
    const fetchInfo = (target) => {
      fetch(target)
        .then(res => res.json())
        .then(res => {
          this.setState({ shows: res.table });
          this.setState({ headers: res.headers });
        })
        .catch(e => console.log(e))
    }

    switch(type) {
      case 'Summary':
        fetchInfo('http://localhost:3000/summary')
        break;
      case 'Next week':
        fetchInfo('http://localhost:3000/nextWeek')
        break;
      case 'Top 10':
        console.log('yee');
        break;
      case 'Top networks':
        console.log('yee');
        break;
      case 'Best episode':
        console.log('yee');
        break;
      case 'Recommended show':
        console.log('yee');
        break;
      default:
        // code block
    }
  }

  render() {
    const reportTypes = ['Summary', 'Next week', 'Top 10', 'Top networks', 'Best episode', 'Recommended show']
    const headers = ['A', 'B', 'C']
    let shows = [{
      name: '1',
      b: '2',
      c: 'noe langt'
    }]
    const showProps = ['a', 'b', 'c']

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
                  //w-100 db h2 f6 bg-near-white ba b--sliver gray
                  {
                    reportTypes.map((report, i) => {
                      return (<option key={i} value={report} className='avenir f2'>{report}</option>)
                    })
                  }
                </select>
                <button className='f6 link dim ba ph3 pv2 mb2 dib mid-gray ma3 br2'>Last ned</button>
              </div>
              <Table headers={this.state.headers} shows={this.state.shows} showProps={showProps} />
              <p>Hei {this.state.shows.name}</p>
          </div>
      </div>
    )
  }
}

export default App;
