import React from 'react'

const count = document.body.scrollHeight/50
class Stars extends React.Component {
  state = {
    length: window.innerWidth,
    height: document.body.scrollHeight
  }
  componentDidMount () {
    this.randomAssign()
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.length !== prevState.length) {
      this.randomAssign()
    }
  }

  randomAssign = () => {
    let i
    var star = document.getElementsByClassName('star').length
    var length = this.state.length
    console.log('star', star)
    console.log('length', length)
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
    for (let i = 0; i < count; i++) {
      starArr.push(<div className='star'>*</div>)
    }
    return starArr
  }

  render () {
    console.log('height', document.body.scrollHeight)
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