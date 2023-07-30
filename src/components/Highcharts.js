import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

require("highcharts/modules/exporting")(Highcharts);
require("highcharts/highcharts-more")(Highcharts);

const Chart = ({ dataChart }) => {

    const applyBoxShadowToBubbles = (chart) => {
        const bubbles = chart.series[0]?.points;
        if (bubbles) {
            bubbles.forEach(bubble => {
                const element = bubble.graphic && bubble.graphic.element;
                if (element) {
                    element.style.boxShadow = `
            0 -0.06em 0.1em hsl(120, 90%, 100%) inset,
            0 -0.15em 0.4em hsl(120, 90%, 45%) inset,
            0 0.05em 0.05em hsl(120, 90%, 45%) inset,
            0.05em 0 0.1em hsl(120, 90%, 100%) inset,
            -0.05em 0 0.1em hsl(120, 90%, 100%) inset,
            0 0.1em 0.4em hsl(120, 90%, 60%) inset
          `;
                }
            });
        }
    };

    const options = {
        chart: {
            type: 'packedbubble',
            height: '800px',
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
                minSize: 100,
                maxSize: '200%',
                dataLabels: {
                    backgroundColor: undefined,
                    enabled: true,
                    useHTML: true,
                    align: 'center',
                    verticalAlign: 'middle',
                    formatter: function () {
                        const name = this.point?.name?.split('-')[0]?.trim();
                        const dataChange = this.point.color === "rgb(149,58,59)" ? '+' : '-';
                        const percentage = dataChange + this.point.value + '%';
                        const options = this.point.options;
                        const radius = this.point.graphic.radius;
                        let fontSize = radius * 0.2;
                        if (fontSize < 10)
                            fontSize = 10;
                        const imgSize = radius * 0.7;
                        const defaultImageUrl = 'https://example.com/default-image.png';

                        const url = `https://media.elrond.com/tokens/asset/${options.name}/logo.svg`;
                        return `<div class="wrapperDataLabels" style="font-size:${fontSize}px;text-align:center">` +
                            `<img  class="imgClass" src=${url} alt="" style="width:${imgSize}px; height:${imgSize}px;" />` +
                            `<div style="margin:5px">${name}</div>` +
                            `<div style="font-size:${fontSize}px;">${percentage}</div>` +
                            '</div>'
                    },

                    style: {
                        fontSize: '10px',
                        boxShadow: '0 -0.06em 0.1em hsl(120,90%,100%) inset, 0 -0.15em 0.4em hsl(120,90%,45%) inset, 0 0.05em 0.05em hsl(120,90%,45%) inset, 0.05em 0 0.1em hsl(120,90%,100%) inset, -0.05em 0 0.1em hsl(120,90%,100%) inset, 0 0.1em 0.4em hsl(120,90%,60%) inset',
                    }
                },
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
        <div style={{ width: "100%" }}>
            <HighchartsReact width={'100%'} height={'200%'} highcharts={Highcharts} options={options} />
        </div>
    )

}

export default Chart;
