import React from 'react'


class Stars extends React.Component {
  state = {
    length: window.innerWidth,
    height: 0,
    count: 0
  }
  componentDidMount () {

    this.setState({ height: document.body.scrollHeight}, () => {
      this.setState({ count: this.state.height/50 }, () => {
        this.randomAssign()
      })
    })
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.length !== prevState.length) {
      this.randomAssign()
      if (this.state.height !== document.body.scrollHeight) {
        this.setState({ height: document.body.scrollHeight, count: document.body.scrollHeight/50 })
      }
    }
  }

  randomAssign = () => {
    let i
    var star = document.getElementsByClassName('star').length
    var length = this.state.length
    // we use for loop to assign unique random values for the x position and animation speed
    for (i = 0; i < star; i++) {
      let x = Math.floor(Math.random() * (length))
      let y = Math.floor(Math.random() * 10)
      document.getElementsByClassName('star')[i].style.transform = 'translateX(' + x + 'px)'
      document.getElementsByClassName('star')[i].style.animationDuration = y + 's'
    }
  }

  renderStarCount = () => {
    const starArr = []
      for (let i = 0; i < this.state.count; i++) {
        starArr.push(<div className='star'>*</div>)
      }
      return starArr
  }

  render () {
    return (
      <>
        <div className='stars-group left'>
          {this.renderStarCount()}
        </div>
      </>
    )
  }
}

export default Stars