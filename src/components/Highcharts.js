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
                minSize: 70,
                shadow: false,
                maxSize: '200%',
                draggable: {
                    shadow: false
                },
                states: {
                    hover: {
                        shadow: false,
                        halo: {
                            size: 0
                        }
                    }
                },
                marker: {
                    fillColor: 'rgba(0, 0, 0, 0)',
                    lineColor: 'rgba(0, 0, 0, 0)'
                },
                dataLabels: {
                    backgroundColor: undefined,
                    // borderColor: "#FFFF",
                    // borderRadius:5,
                    // borderWidth:2,
                    enabled: true,
                    useHTML: true,
                    align: 'center',
                    verticalAlign: 'middle',
                    formatter: function () {
                        const dataChange = this.point.y > 0 ? '+' : '-';
                        const percentage = this.point.y + '%'
                        const classNameLabel = this.point.y > 0  ? 'bubbleLabelGreen' : 'bubbleLabelRed';
                        const bubbleStyle = this.point.y > 0 ? 'bubbleGreen' : 'bubbleRed';
                        const options = this.point.options

                        const bubbleName =  this.point.name.substring(0, this.point.name.indexOf('-'));
                        const bubbleNameDisplay = bubbleName;
                        const bubbleSize = this.point.marker.radius;
                        const heightDiv = bubbleSize * 2 + 'px';
                        const widthDiv = bubbleSize * 2 + 'px';
                        const imgSize = bubbleSize + 'px';

                        const url = ` https://media.elrond.com/tokens/asset/${options.name}/logo.svg`;
                        return `<div class="wrapperDataLabels ${bubbleStyle}" style="height: ${heightDiv}; width: ${widthDiv};">` +
                            `<img  class="imgClass" height=${imgSize}  width=${imgSize} src=${url} alt=""/>` +
                            `<div class="tokenName">${bubbleNameDisplay}</div>` +
                            `<div class="${classNameLabel}">${percentage}</div>` +
                            '<div>'
                    },
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
