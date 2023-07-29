import React, { useEffect, useState, useRef } from 'react';
import logo from '../logo.svg';
import S from './bubble.module.css';

const Bubble = () => {
    const wrapper = useRef(null);
    const bubbles = 100;
    const gap = 10; // gap between bubbles
    const minSize = 30; // Minimum size of the bubble
    const maxSize = 100; // Maximum size of the bubble

    useEffect(() => {
        // Accessing the height of the div after the component has rendered
        if (wrapper.current) {
            const height = wrapper.current.clientHeight;
            console.log('Height of the div:', height);
        }
    }, []);

    const getRandomSize = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    const getRandomPosition = (bubbleSize) => {
        const wrapperWidth = wrapper.current.clientWidth;
        const wrapperHeight = wrapper.current.clientHeight;
        const xRange = wrapperWidth - bubbleSize - gap * 2;
        const yRange = wrapperHeight - bubbleSize - gap * 2;

        const x = gap + Math.random() * xRange;
        const y = gap + Math.random() * yRange;

        return {
            x,
            y,
            size: bubbleSize,
        };
    };

    const isColliding = (a, b, bubbleSize) => {
        return Math.hypot(a.x - b.x, a.y - b.y) < bubbleSize + gap;
    };

    const [positions, setPositions] = useState([]);

    useEffect(() => {
        const generateBubblePositions = () => {
            const tempPositions = [];
            for (let i = 0; i < bubbles; i++) {
                let position;
                let colliding;
                let bubbleSize;

                do {
                    bubbleSize = getRandomSize(minSize, maxSize);
                    position = getRandomPosition(bubbleSize);
                    colliding = tempPositions.some((pos) => isColliding(pos, position, bubbleSize));
                } while (colliding);

                tempPositions.push(position);
            }

            setPositions(tempPositions);
        };

        // Call the function to generate positions when the component mounts
        generateBubblePositions();

        // Optionally, you can add an event listener to recalculate positions on window resize
        const handleResize = () => {
            generateBubblePositions();
        };
        window.addEventListener('resize', handleResize);

        // Clean up the event listener when the component unmounts
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const getClassName = (index) => {
        return index % 2 === 0 ? S.bubbleGreen : S.bubbleRed;
    };

    return (
        <div
            className={'Wrapper'}
            ref={wrapper}
            style={{ height: '500px', width: '100%', position: 'relative', overflow: 'hidden' }}
        >
            {positions.map((position, i) => (
                <div
                    key={i}
                    style={{
                        top: `${position.y}px`,
                        left: `${position.x}px`,
                        width: `${position.size}px`,
                        height: `${position.size}px`,
                        position: 'absolute',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                    className={`${S.bubble} ${getClassName(i)}`}
                >

                    <img
                        height={position.size * 0.6} // Adjust the image size relative to the bubble size
                        width={position.size * 0.6} // Adjust the image size relative to the bubble size
                        src={logo}
                        alt="logo"
                        style={{ objectFit: 'contain' }} // Make the image fit within the container
                    />

                </div>
            ))}
        </div>
    );
};

export default Bubble;
