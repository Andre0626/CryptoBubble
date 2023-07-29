import React, { useEffect, useState, useRef } from 'react';
import S from './bubble.module.css';

// Helper function to get random position for the bubble
const getRandomPosition = (bubbleSize, wrapperWidth, wrapperHeight, gap) => {
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

// Function to determine bubble size based on price change
const getSize = (token) => {
    const absPriceChange = Math.abs(parseFloat(token.price_change_percentage));
    const size = Math.max(30, absPriceChange * 5); // Modify this as needed
    return size;
};

// Function to check if two bubbles are colliding
const isColliding = (a, b, bubbleSize) => {
    return Math.hypot(a.x - b.x, a.y - b.y) < bubbleSize;
};

const Bubble = ({ tokens }) => {
    const wrapper = useRef(null);
    const gap = 10; // gap between bubbles

    const [positions, setPositions] = useState(Array(tokens.length));
    const [placed, setPlaced] = useState(Array(tokens.length).fill(false));

    useEffect(() => {
        const placeBubble = (bubbleIndex) => {
            const wrapperWidth = wrapper.current.clientWidth;
            const wrapperHeight = wrapper.current.clientHeight;

            const bubbleSize = getSize(tokens[bubbleIndex]);

            let position;
            let colliding;
            do {
                position = getRandomPosition(bubbleSize, wrapperWidth, wrapperHeight, gap);
                colliding = positions.some((pos, i) => placed[i] && isColliding(pos, position, bubbleSize));
            } while (colliding);

            setPositions(prevPositions => {
                const updatedPositions = [...prevPositions];
                updatedPositions[bubbleIndex] = position;
                return updatedPositions;
            });

            setPlaced(prevPlaced => {
                const updatedPlaced = [...prevPlaced];
                updatedPlaced[bubbleIndex] = true;
                return updatedPlaced;
            });
        };

        for(let i = 0; i < tokens.length; i++) {
            placeBubble(i);
        }
    }, [tokens]);

    const getClassName = (priceChange) => {
        return priceChange > 0 ? S.bubbleGreen : S.bubbleRed;
    };

    const getTokenName = (token) => {
        const separator = token.indexOf('-');
        return token.slice(0, separator);
    };

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
            {positions.map((position, i) => {
                const absPriceChange = Math.abs(parseFloat(tokens[i].price_change_percentage));
                const shouldShowText = absPriceChange > 0.01;

                return (
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
                        <img
                            src={`https://media.elrond.com/tokens/asset/${tokens[i].token_id}/logo.svg`}
                            style={{ width: '70%', height: '70%' }}
                        />
                        {shouldShowText && (
                            <span
                                style={{ fontWeight: 'bold', marginBottom: '5px', fontSize: '14px', lineHeight: '1.2' }}
                            >
                                {getTokenName(tokens[i].token_id)}
                            </span>
                        )}
                        {shouldShowText && (
                            <span style={{ fontSize: '12px', lineHeight: '1.2' }}>
                                {parseFloat(tokens[i].price_change_percentage).toFixed(2)}%
                            </span>
                        )}
                    </div>
                );
            })}
        </div>
    );
};

export default Bubble;
