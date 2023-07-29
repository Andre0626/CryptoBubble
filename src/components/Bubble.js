import React, { useEffect, useState } from 'react';
import S from './bubble.module.css';

const Bubble = () => {
    const bubbles = 50;
    const gap = 10; // gap between bubbles
    const minSize = 30; // Minimum size of the bubble
    const maxSize = 100; // Maximum size of the bubble

    const getRandomSize = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    const getRandomPosition = (bubbleSize) => {
        const xRange = window.innerWidth - bubbleSize - gap * 2;
        const yRange = window.innerHeight - bubbleSize - gap * 2;

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
        <div className={'Wrapper'}>
            {positions.map((position, i) => (
                <div
                    key={i}
                    style={{
                        top: `${position.y}px`,
                        left: `${position.x}px`,
                        width: `${position.size}px`,
                        height: `${position.size}px`,
                        position: 'absolute',
                    }}
                    className={`${S.bubble} ${getClassName(i)}`}
                >
                    {i}
                </div>
            ))}
        </div>
    );
};

export default Bubble;
