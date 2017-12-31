import React, { Component } from 'react'

class Bar extends Component {
  render = () => {
    const { x, y, z, openInfo, closeInfo, color } = this.props
    return <rect onMouseEnter={openInfo} x={x} y={500 - y} width={z} height={y} fill={color} />
  }
}

export default Bar