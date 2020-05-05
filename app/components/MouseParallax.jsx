import React from 'react';
import { useSpring, animated } from 'react-spring'

const calc = (x, y) => [x - window.innerWidth / 2, y - window.innerHeight / 2]
const trans1 = (x, y) => `translate3d(${x / 50}px,${y / 50}px,0)`
const trans2 = (x, y) => `translate3d(${x / 30}px,${y / 30}px,0)`
const trans3 = (x, y) => `translate3d(${x / 10}px,${y / 10}px,0)`

export default function MouseParallax(imageProps) {
    const [props, set] = useSpring(() => ({ xy: [0, 0], config: { mass: 10, tension: 550, friction: 140 } }))


    let styleBg = {};
    let styleMg = {};
    let styleFg = {};


    if(imageProps.backgroundSrc){
        styleBg = {
            left: imageProps.backgroundPos.left,
            right: imageProps.backgroundPos.right,
            top:imageProps.backgroundPos.top,
            width: imageProps.backgroundSize.width,
            height: 'auto'
        };
    }

    if(imageProps.middlegroundSrc) {
        styleMg = {
            left: imageProps.middlegroundPos.left,
            right: imageProps.middlegroundPos.right,
            top: imageProps.middlegroundPos.top,
            width: imageProps.middlegroundSize.width,
            height: 'auto'
        };
    }

    if(imageProps.foregroundSrc){
        styleFg = {
            left: imageProps.foregroundPos.left,
            right: imageProps.foregroundPos.right,
            top:imageProps.foregroundPos.top,
            width: imageProps.foregroundSize.width,
            height: 'auto'
        };
    }

    return (
        <div className="mouse-parallax-container" onMouseMove={({ clientX: x, clientY: y }) => set({ xy: calc(x, y) })}>
            {imageProps.backgroundSrc &&
                <animated.div className="mouse-parallax-image background-image" style={{transform: props.xy.interpolate(trans1)}}>
                    <div className={"mouse-parallax-bg"} style={styleBg}>
                        <img src={imageProps.backgroundSrc} alt=""/>
                    </div>
                </animated.div>
            }

            {imageProps.middlegroundSrc &&
                <animated.div className="mouse-parallax-image middleground-image" style={{transform: props.xy.interpolate(trans2)}}>
                    <div className={"mouse-parallax-mg"} style={styleMg}>
                        <img src={imageProps.middlegroundSrc} alt=""/>
                    </div>
                </animated.div>
            }

            {imageProps.foregroundSrc &&
                <animated.div className="mouse-parallax-image foreground-image" style={{transform: props.xy.interpolate(trans3)}}>
                    <div className={"mouse-parallax-fg"} style={styleFg}>
                        <img src={imageProps.foregroundSrc} alt=""/>
                    </div>
                </animated.div>
            }
        </div>
    )
}
