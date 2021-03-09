import React, {useState, useEffect} from "react"
import { connectWithMetaMask } from '../../../redux/actions'
import { connect } from 'react-redux'
import { useTrail } from 'react-spring'

import content from '../../content.json';
import './style.scss';

const fast = { tension: 1200, friction: 40 }
const slow = { mass: 10, tension: 200, friction: 50 }
const trans = (x, y) => `translate3d(${x}px,${y}px,0) translate3d(-50%,-50%,0)`

const Hero = () => {
  const size = useWindowSize();
  const [trail, set] = useTrail(3, () => ({ xy: [600, 800], config: i => (i === 0 ? fast : slow) }))
  useEffect(()=>{
    if (size) {
      set({ xy: [size.width/2, size.height/2-100] })
    }
  }, [size])
  return (
    <div className='hero-component'>
      <div className='title-container' style={{ left: ((size.width/2)-350)<0?0:((size.width/2)-350) }}>
        <div className='title'>
          BearNBear
        </div>
        <div className='sub-title'>
          {content.introduction.slogan}
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = ({ blockchain, home }) => {
  return { account: blockchain.account, supply: home.supply }
}

export default connect(mapStateToProps, { connectWithMetaMask })(Hero)

function useWindowSize() {
  // Initialize state with undefined width/height so server and client renders match
  // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    // Handler to call on window resize
    function handleResize() {
      // Set window width/height to state
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Call handler right away so state gets updated with initial window size
    handleResize();

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []); // Empty array ensures that effect is only run on mount

  return windowSize;
}
