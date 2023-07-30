import React from 'react';
import { render } from 'react-dom';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

require("highcharts/modules/exporting")(Highcharts);
require("highcharts/highcharts-more")(Highcharts);

const Chart = ({dataChart}) => {

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
        legend: {enabled: false},
        exporting: {enabled: false},
        series: dataChart,
        plotOptions: {
            packedbubble: {
                minSize: 30,
                maxSize: '250%',
                dataLabels: {
                    backgroundColor:undefined,
                    // borderColor: "#FFFF",
                    // borderRadius:5,
                    // borderWidth:2,
                    enabled: true,
                    useHTML: true,
                    align: 'center',
                    verticalAlign: 'middle',
                    formatter: function () {
                        const dataChange = this.point.color === "rgb(149,58,59)" ? '+' : '-';
                        const percentage = this.point.y > 1 ? dataChange + this.point.y + '%': '';
                        const classNameLabel = this.point.y > 1 ? (this.point.color === "rgb(149,58,59)" ? 'bubbleLabelGreen' : 'bubbleLabelRed') : '';
                        const options = this.point.options
                        const heightDiv = (this.point.marker.height) + 'px';
                        const widthDiv = (this.point.marker.width) + 'px';

                        const url = ` https://media.elrond.com/tokens/asset/${options.name}/logo.svg`;
                        return `<div class="wrapperDataLabels">` +
                                // `<img  class="imgClass"  src=${url} alt=""/>`+
                                `<div class="${classNameLabel}">${percentage}</div>` +
                            '<div>'
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
        <div>
            <HighchartsReact width={'100%'} highcharts={Highcharts} options={options}/>
        </div>
    )

}

export default Chart;
