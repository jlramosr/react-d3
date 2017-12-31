import React, { Component } from 'react'

class Circle extends Component {
  render = () => {
    const { x, y, z, color } = this.props
    return <circle cx={x} cy={y} r={z} fill={color} />
  }
}

export default Circle