import React from 'react'

const Hour = props =>
  <svg className='hour' version='1.1' xmlns='http://www.w3.org/2000/svg' x='0' y='0' width='100' height='86.6' viewBox='0, 0, 100, 86.6'>
    <filter id='blur-filter' x='-2' y='-2' width='200' height='200'>
      <feGaussianBlur in='SourceGraphic' stdDeviation='2' />
    </filter>
    <g>
      <path d='M-0,86.603 L25,43.302 L50,0 L75,43.301 L100,86.603 L50,86.603 z' fill='#000000' />
    </g>
  </svg>

const Minute = props =>
  <svg className='minute' version='1.1' xmlns='http://www.w3.org/2000/svg' x='0' y='0' width='100' height='86.6' viewBox='0, 0, 100, 86.6'>
    <filter id='blur-filter' x='-2' y='-2' width='200' height='200'>
      <feGaussianBlur in='SourceGraphic' stdDeviation='2' />
    </filter>
    <g>
      <path d='M50,0 L75,43.301 L100,86.603 L-0,86.603 L25,43.302 L50,0 z M46.721,16.897 L9.999,80.5 L83.442,80.5 L46.721,16.897 z' fill='#ffffff' />
    </g>
  </svg>

export default class extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      now: new Date()
    }
  }

  componentDidMount () {
    this.setState({
      now: new Date()
    })
    setInterval(() => {
      this.setState({
        now: new Date()
      })
    }, 1000 * 60)
  }

  render () {
    const { now } = this.state
    const startMinuteRotation = now.getMinutes() * 6
    const startHourRotation = now.getHours() * 30
    const smallScale = 3
    const largeScale = 6

    return (
      <div>
        <style>{`
        body {
          margin: 0px;
          background: #fff;
        }
        svg {
          transform-origin: 50% ${100 * 2 / 3}%;
          position: absolute;
          top: 50%;
          left: 50%;
          margin-left: -${100 * smallScale / 2}px;
          margin-top: -${100 * smallScale / (1 + 2 / 3)}px;
          width: ${100 * smallScale}px;
          height: ${86.6 * smallScale}px;
        }
        @media (min-width: 768px) {
          svg {
            margin-left: -${100 * largeScale / 2}px;
            margin-top: -${100 * largeScale / (1 + 2 / 3)}px;
            width: ${100 * largeScale}px;
            height: ${86.6 * largeScale}px;
          }
        }
        svg.hour {
          animation-name: rotateHours;
          transform: rotate(${startHourRotation}deg);
          animation-duration: 60s;
        }
        @keyframes rotateHours {
          100% {
            transform: rotate(${startHourRotation + 30 / 60}deg);
          }
        }
        svg.minute, svg.blur {
          animation-name: rotateMinutes;
          transform: rotate(${startMinuteRotation}deg);
          animation-duration: 60s;
          filter: drop-shadow( 0px 0px 12px #888 );
        }
        @keyframes rotateMinutes {
          100% {
            transform: rotate(${startMinuteRotation + 6}deg);
          }
        }
      `}</style>
        <Hour />
        <Minute />
      </div>
    )
  }
}
