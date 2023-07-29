import React, { useEffect, useState, useRef } from 'react';
import logo from '../logo.svg';
import S from './bubble.module.css';

const Bubble = () => {
    const wrapper = useRef(null);
    const bubbles = 50;
    const gap = 10; // gap between bubbles
    const minSize = 30; // Minimum size of the bubble
    const maxSize = 100; // Maximum size of the bubble
    const gridSize = 20; // Size of grid cells for positioning

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

    const [positions, setPositions] = useState([]);

    useEffect(() => {
        const generateBubblePositions = () => {
            const grid = new Array(Math.ceil(wrapper.current.clientWidth / gridSize))
                .fill(null)
                .map(() => new Array(Math.ceil(wrapper.current.clientHeight / gridSize)).fill(false));

            const tempPositions = [];
            for (let i = 0; i < bubbles; i++) {
                let position;
                let colliding;
                let bubbleSize;

                do {
                    bubbleSize = getRandomSize(minSize, maxSize);
                    position = getRandomPosition(bubbleSize);
                    colliding = isCollidingWithGrid(grid, position, bubbleSize);
                } while (colliding);

                markGridOccupied(grid, position, bubbleSize);
                tempPositions.push(position);
            }

            setPositions(tempPositions);
        };

        const isCollidingWithGrid = (grid, position, bubbleSize) => {
            const gridX = Math.floor(position.x / gridSize);
            const gridY = Math.floor(position.y / gridSize);
            const gridWidth = Math.ceil(bubbleSize / gridSize);
            const gridHeight = Math.ceil(bubbleSize / gridSize);

            for (let x = gridX; x < gridX + gridWidth; x++) {
                for (let y = gridY; y < gridY + gridHeight; y++) {
                    if (grid[x] && grid[x][y]) {
                        return true;
                    }
                }
            }

            return false;
        };

        const markGridOccupied = (grid, position, bubbleSize) => {
            const gridX = Math.floor(position.x / gridSize);
            const gridY = Math.floor(position.y / gridSize);
            const gridWidth = Math.ceil(bubbleSize / gridSize);
            const gridHeight = Math.ceil(bubbleSize / gridSize);

            for (let x = gridX; x < gridX + gridWidth; x++) {
                for (let y = gridY; y < gridY + gridHeight; y++) {
                    if (grid[x]) {
                        grid[x][y] = true;
                    }
                }
            }
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
            className={S.Wrapper} // Using the CSS module class name
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
                    }}
                    className={`${S.bubble} ${getClassName(i)}`} // Using the CSS module class name
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
