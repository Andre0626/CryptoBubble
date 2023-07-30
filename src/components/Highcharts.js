import React, { useEffect, useRef, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

require("highcharts/modules/exporting")(Highcharts);
require("highcharts/highcharts-more")(Highcharts);

const Chart = ({ dataChart }) => {
    const chartRef = useRef(null);

    useEffect(() => {
        const resizeChart = () => {
            if (chartRef.current) {
                let height = Math.max(window.innerHeight, chartRef.current.chart.chartHeight);
                // If it's a mobile view (viewport width is less than 768px), add some extra space
                if (window.innerWidth < 768) {
                    height += 300; // Add as much space as you need
                }
                chartRef.current.chart.setSize(undefined, height, false);
            }
        };

        window.addEventListener('resize', resizeChart);
        resizeChart();  // Call it once to size chart initially

        // Clean up event listener on component unmount
        return () => {
            window.removeEventListener('resize', resizeChart);
        };
    }, []);


    const options = {
        chart: {
            type: 'packedbubble',
            margin: 0,
            styledMode: false,
            backgroundColor: '#282c34',
        },
        title: {
            text: 'MVX Bubblechart',
            style: {
                fontSize: '20px'
            }
        },
        credits: {
            enabled: false
        },
        legend: { enabled: false },
        exporting: { enabled: false },
        series: dataChart,
        plotOptions: {
            packedbubble: {
                minSize: 120,
                maxSize: '200%',
                dataLabels: {
                    backgroundColor: undefined,
                    enabled: true,
                    useHTML: true,
                    align: 'center',
                    verticalAlign: 'middle',
                    formatter: function () {
                        const radius = this.point.graphic.radius;
                        const imgSize = radius * 0.7;
                        const name = this.point?.name?.split('-')[0]?.trim();
                        const dataChange = this.point.color === "rgb(149,58,59)" ? '+' : '-';
                        const percentage = dataChange + this.point.value + '%';
                        const options = this.point.options;
                        let fontSize = radius * 0.2;
                        if (fontSize < 10)
                            fontSize = 10;
                        const defaultImageUrl = 'https://example.com/default-image.png';

                        const url = `https://media.elrond.com/tokens/asset/${options.name}/logo.svg`;
                        return `<div class="wrapperDataLabels" style="font-size:${fontSize}px;text-align:center">` +
                            `<img  class="imgClass" src=${url} alt="" style="width:${imgSize}px; height:${imgSize}px;" />` +
                            `<div style="margin:5px">${name}</div>` +
                            `<div style="font-size:${fontSize}px;">${percentage}</div>` +
                            '</div>'
                    }
                },
                color: {
                    radialGradient: { cx: 0.4, cy: 0.3, r: 0.7 },
                    stops: [
                        [0, 'rgba(255,255,255,0.5)'],
                        [1, 'rgba(0,0,0,0.5)']
                    ]
                },
                states: {
                    hover: {
                        enabled: false, // Disables the hover effect
                    },
                    inactive: {
                        opacity: 1
                    }
                }
            }
        },
        tooltip: {
            useHTML: true,
            outside: true,
            enabled: false,
            fontSize: '',
            shape: "square",
            style: {
                fontSize: '20px'
            },
            formatter: function () {
                return '<div>test</div>'
            }
        }
    };

    return (
        <div style={{ width: "100%", height: '100%', overflow: 'auto' }}>
            <HighchartsReact
                highcharts={Highcharts}
                options={options}
                containerProps={{ style: { height: 'auto' } }}
                ref={chartRef}
            />
        </div>
    )
}

export default Chart;
