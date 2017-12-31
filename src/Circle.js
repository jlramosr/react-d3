import React, { Component } from 'react'

class Circle extends Component {
  render = () => {
    const { x, y, z, openInfo, closeInfo, color } = this.props
    return <circle onMouseEnter={openInfo} cx={x} cy={y} r={z} fill={color} />
  }
}

export default Circle