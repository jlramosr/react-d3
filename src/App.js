import React, { Component } from 'react'
import logo from './logo.svg'
import Chart from './Chart'
import './App.css'

class App extends Component {
  state = {
    data1: [
      {name: 'Iberdrola', x:-10, y:7, z:13, color:'red'},
      {name: 'Acciona', x:11, y:73, z:130, color:'green'},
      {name: 'Gas Natural', x:12, y:80, z:2500, color:'blue'}
    ],
    data2: [
      {name: 'Iberdrola', y:50, z:2500, color: 'red'},
      {name: 'Acciona', y:14, z:1250},
      {name: 'Gas Natural', y:45, z:750}
    ],
    data3: [
      {y:50}, {y:14}, {y:45}, {y:50}, {y:14}, {y:45}, {y:50}, {y:27}, {y:45}, {y:95}, {y:15}, {y:45}, {y:50}, {y:14}, {y:1}
    ]
  }

  render() {
    const { data1, data2, data3 } = this.state

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to D3 Tests</h1>
        </header>
        <div style={{marginTop:45}}>
          <Chart
            data={data1}
            type="circles"
            domainX={[-20,20]}
            retinal
          />
          <Chart
            data={data3}
            rangeZ={[1,20]}
          />
          <Chart
            data={data2}
            retinal
            rangeZ={[1,50]}
          />
        </div>
      </div>
    )
  }
}

export default App;
