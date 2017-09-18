import { Component } from 'react'
import Head from 'next/head'

const iPhone = process.browser && window.navigator.platform === 'iPhone'

const ClockHand = ({ pathString, ...props }) =>
  <svg {...props} version='1.1' xmlns='http://www.w3.org/2000/svg' viewBox='0, 0, 120, 103.924'>
    <g>
      <path d={pathString} />
    </g>
  </svg>

const Hour = ({ rotation }) =>
  <div>
    <style>{`
      .clock svg.hour {
        transform: rotate(${rotation}deg);
      }
      .clock svg.hour path {
        fill: #000;
      }
    `}</style>
    <ClockHand className='hour' pathString='M7.125,97.753 L33.563,51.962 L60,6.17 L86.438,51.962 L112.876,97.753 L60,97.753 z' />
  </div>

const Minute = ({ rotation }) =>
  <div>
    <style>{`
     .clock svg.minute {
        transform: rotate(${rotation}deg);
        ${!iPhone && `
        filter: drop-shadow( 0px 0px 12px #888 );
        -webkit-filter: drop-shadow( 0px 0px 12px #888 );
        `}
      }
      .clock svg.minute path {
        fill: #fff;
      }
    `}</style>
    <ClockHand className='minute' pathString='M60,6.17 L86.438,51.962 L112.876,97.753 L7.125,97.753 L33.563,51.962 L60,6.17 z M56.532,24.039 L17.7,91.299 L95.365,91.299 L56.532,24.039 z' />
  </div>

const Clock = ({ hourRotation, minuteRotation }) =>
  <div className='clock'>
    <style>{`
      .clock svg {
        transform-origin: 50% ${97 * 2 / 3}%;
        position: absolute;
        top: 50%;
        left: 50%;
        margin-left: -${300 / 2}px;
        margin-top: -${300 / (1 + 2 / 3)}px;
        width: ${300}px;
        height: ${260}px;
      }
      @media (min-width: 768px) {
        .clock svg {
          margin-left: -${300 * 2 / 2}px;
          margin-top: -${300 * 2 / (1 + 2 / 3)}px;
          width: ${300 * 2}px;
          height: ${260 * 2}px;
        }
      }
    `}</style>
    <Hour rotation={hourRotation} />
    <Minute rotation={minuteRotation} />
  </div>

export default class extends Component {

  state = {
    now: new Date('1970-01-01T00:00:00Z')
  }

  componentDidMount () {
    this.interval = setInterval(this.updateTime, 1000)
    this.updateTime()
  }

  componentWillUnmount () {
    clearInterval(this.interval)
  }

  render () {
    const { now } = this.state
    const minutes = now.getMinutes() + now.getSeconds() / 60 + now.getMilliseconds() / 1000 / 60
    const minuteRotation = minutes * 6
    const hourRotation = (now.getHours() + minutes / 60) * 30

    return (
      <div>
        <style>{`
          body {
            margin: 0px;
            background: ${iPhone ? '#ddd' : '#fff'};
          }
        `}</style>
        <Head>
          <title>Next Time</title>
          <meta name='apple-mobile-web-app-capable' content='yes' />
          <link rel='apple-touch-icon' href='/static/icon.png' />
        </Head>
        <Clock iPhone={iPhone} hourRotation={hourRotation} minuteRotation={minuteRotation} />
      </div>
    )
  }

  updateTime = () => {
    this.setState({
      now: new Date()
    })
  }
}
