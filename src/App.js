import React, { Component } from 'react'
import logo from './logo.svg'
import Chart from './Chart'
import './App.css'

class App extends Component {
  state = {
    data: [
      {x:250, y:0, z:1380000000, color:'red'},
      {x:17833, y:7, z:138000000, color:'green'},
      {x:14833, y:54, z:980000011, color:'blue'}
    ]
  }

  render() {
    const { data } = this.state

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to D3 Tests</h1>
        </header>
        <div style={{marginTop:45}}>
          <Chart data={data} size={[500,500]} />
        </div>
      </div>
    )
  }
}

export default App;
