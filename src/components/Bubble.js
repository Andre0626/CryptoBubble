import React, { useEffect, useState, useRef } from 'react';
import S from './bubble.module.css';

const Bubble = ({tokens}) => {
        const wrapper = useRef(null);
        const bubbles = tokens.length;
        const gap = 10; // gap between bubbles
        const minSize = 30; // Minimum size of the bubble
        const maxSize = 100; // Maximum size of the bubble

        useEffect(() => {
            // Accessing the height of the div after the component has rendered
            if (wrapper.current) {
                const height = wrapper.current.clientHeight;
            }
        }, []);

        const getRandomSize = (min, max) => {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        };

        const getRandomPosition = (bubbleSize, takenPositions, maxSize) => {
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
                let maxSize = minSize;

                const tempPositions = [];
                for (let i = 0; i < bubbles; i++) {
                    let position;
                    let colliding;
                    let bubbleSize;

                    do {
                        bubbleSize = getRandomSize(minSize, maxSize);
                        position = getRandomPosition(bubbleSize, tempPositions, maxSize);
                        colliding = tempPositions.some((pos) => isColliding(pos, position, bubbleSize));
                    } while (colliding);

                    tempPositions.push(position);
                    maxSize += gap; // Increment maxSize to allow larger bubbles in subsequent iterations
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
        }, [bubbles]);

        const getClassName = (priceChange) => {
            return priceChange > 0 ? S.bubbleGreen : S.bubbleRed;
        };

        const getTokenName = (token) => {
            const separator = token.indexOf('-')

            return token.slice(0, separator);
        }

        return (
            <div
                className={'Wrapper'}
                ref={wrapper}
                style={{
                    height: '500px',
                    width: '100%',
                    position: 'relative',
                    overflow: 'hidden',
                }}
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
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            textAlign: 'center', // Center the text
                        }}
                        className={`${S.bubble} ${getClassName(parseFloat(tokens[i].price_change_percentage))}`}
                    >
                        <img src={`https://media.elrond.com/tokens/asset/${tokens[i].token_id}/logo.svg`}
                             height={30}
                             width={30}
                        />
                        {
                            Math.abs(parseFloat(tokens[i].price_change_percentage)) > 0.01 && (
                                <span
                                    style={{fontWeight: 'bold', marginBottom: '5px', fontSize: '14px', lineHeight: '1.2'}}>
            {getTokenName(tokens[i].token_id)}
          </span>
                            )
                        }
                        {
                            Math.abs(parseFloat(tokens[i].price_change_percentage)) > 0.01 && (
                                <span style={{
                                    fontSize: '12px',
                                    lineHeight: '1.2'
                                }}>
                                {parseFloat(tokens[i].price_change_percentage).toFixed(2)}%
                            </span>
                            )
                        }
                    </div>
                ))}
            </div>
        );
    }
;

export default Bubble;
