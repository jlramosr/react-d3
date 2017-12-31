import React, { Component } from 'react'
import { scaleLinear, scaleSqrt } from 'd3-scale'
import { max } from 'd3-array'
import { select } from 'd3-selection'
import Circle from './Circle'

class Chart extends Component {
  xScale = scaleLinear().domain([250,100000]).range([0,600])

  yScale = scaleLinear().domain([15,90]).range([250,0])

  zScale = scaleSqrt().domain([52070, 1380000000]).range([10, 50])

  render = () => {
    const { data } = this.props
    return (
      <svg style={{background:'#f4f4f4'}} ref={node => this.node = node} width={500} height={500}>
        {data.map(item => {
          const { x, y, z, color } = item
          return <Circle x={this.xScale(x)} y={this.yScale(y)} z={this.zScale(z)} color={color} />
        })}
      </svg>
    )
  }
}

export default Chart

    /*select(node).append('circle').attr('r', r(138000000)).attr('fill','red').attr('cx', x(250)).attr('cy', y(0));
    select(node).append('circle').attr('r', r(138000000)).attr('fill','blue').attr('cx', x(17833)).attr('cy', y(7));
    select(node).append('circle').attr('r', r(980000011)).attr('fill','green').attr('cx', x(14833)).attr('cy', y(54));*/

    /*select(node)
      .selectAll('rect')
      .data(this.props.data)
      .enter()
      .append('rect')

    select(node)
      .selectAll('rect')
      .data(this.props.data)
      .exit()
      .remove()

    select(node)
      .selectAll('rect')
      .data(this.props.data)
      .style('fill', '#fe9922')
      .attr('x', (d,i) => i * 25)
      .attr('y', d => this.props.size[1] - yScale(d))
      .attr('height', d => yScale(d))
      .attr('width', 25)*/