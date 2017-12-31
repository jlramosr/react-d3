import React, { Component } from 'react'
import { findDOMNode } from 'react-dom'
import PropTypes from 'prop-types'
import { scaleLinear, scaleSqrt } from 'd3-scale'
import { max, min } from 'd3-array'
import { select } from 'd3-selection'
import Circle from './Circle'
import Bar from './Bar'
import Typography from 'material-ui/Typography'
import Popover from 'material-ui/Popover'

class Chart extends Component {
  state = {
    xScale: null,
    yScale: null,
    zScale: null,
    anchorPopupEl: null,
    indexPopupEl: null,
    popupOpen: false
  }

  handlePopupOpen = index => {
    this.setState({ indexPopupEl: index, anchorPopupEl: findDOMNode(this.item[index]), popupOpen: true })
  }

  handlePopupClose = () => {
    this.setState({ indexPopupEl: null, anchorPopupEl: null, popupOpen: false })
  }

  getPopupStyle = () => ({

  })

  getSVGStyle = background => ({
      background
  })

  getMinMax = (axis, offset=0) => {
    return [min(this.props.data, (d,i) => (d[axis] || i+1) - offset), max(this.props.data, (d,i) => (d[axis] || i+1) + offset)]
  }

  createChart = () => {
    const { data, type, rangeX, rangeY, rangeZ, domainX, domainY, domainZ } = this.props
    const minMaxZ = this.getMinMax('z')
    this.setState({
      xScale:
        scaleLinear().domain(domainX || this.getMinMax('x',1)).range(rangeX),
      yScale:
        scaleLinear().domain(domainY || this.getMinMax('y',1)).range(type === 'circles' ? rangeY.slice(0).reverse() : rangeY),
      zScale:
        type === 'circles' ?
          scaleSqrt().domain(domainZ || minMaxZ).range(rangeZ) :
          scaleLinear().domain(domainZ || minMaxZ).range(rangeZ) 
    })
  }

  componentWillMount() {
    this.createChart()
  }
  
  render = () => {
    const { data, type, rangeX, rangeY, rangeZ, retinal, background } = this.props
    const { xScale, yScale, zScale } = this.state
    const styleItem = {
      '& :hover': {
        opacity: 0.3
      }
    }

    console.log(this.state.indexPopupEl, data[this.state.indexPopupEl])

    return (
      <React.Fragment>
        <svg style={this.getSVGStyle(background)} ref={node => this.node = node} width={500} height={500}>

          {data.map((item, index) => {
            const { x, y, z, color } = item
            const props = {
              key: index,
              x: xScale(x || index),
              y: yScale(y || index),
              z: retinal ? zScale(z) : rangeZ[1],
              color: color || '#420CE8',
              openInfo: () => this.handlePopupOpen(index),
              closeInfo: this.handlePopupClose,
              ref: node => {
                if (this.item) {
                  this.item[index] = node
                } else {
                  this.item = [node]
                }
              }
            }

            if (type === 'circles') {
              return <Circle {...props} />
            }

            return <Bar {...props} />

          })}
        </svg>

        <Popover
          open={this.state.popupOpen}
          anchorEl={this.state.anchorPopupEl}
          onClose={this.handlePopupClose}
          /*anchorReference={anchorReference}
          anchorPosition={{ top: positionTop, left: positionLeft }}
          anchorOrigin={{
            vertical: anchorOriginVertical,
            horizontal: anchorOriginHorizontal,
          }}
          transformOrigin={{
            vertical: transformOriginVertical,
            horizontal: transformOriginHorizontal,
          }}*/
        >
          <Typography type="title" id="modal-title">
            {this.state.indexPopupEl ? data[this.state.indexPopupEl].name || '' : ''}
          </Typography>
          <Typography type="subheading" id="simple-modal-description">
            Duis mollis
          </Typography>
        </Popover>
      </React.Fragment>  
    )
  }
}

Chart.propTypes = {
  data: PropTypes.array.isRequired,
  type: PropTypes.string.isRequired,
  rangeX: PropTypes.array,
  rangeY: PropTypes.array,
  rangeZ: PropTypes.array,
  retinal: PropTypes.bool,
  domainX: PropTypes.array,
  domainY: PropTypes.array,
  domainZ: PropTypes.array,
  background: PropTypes.string,
}

Chart.defaultProps = {
  data: [],
  type: 'bars',
  rangeX: [0,500],
  rangeY: [0,500],
  rangeZ: [5,50],
  retinal: false,
  background: '#d4d4d4'
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