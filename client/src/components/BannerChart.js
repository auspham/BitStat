import React, { Component, PropTypes } from 'react';
import {Bar, Line, Pie} from 'react-chartjs-2'
import "../stylesheet/banner-chart.css"
export class BannerChart extends Component{
    constructor(props) {
        super(props);
        this.state = {
            charData: {
                labels: ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
                datasets: [
                    {
                        label: "",
                        data: [73, 89, 97, 84, 68, 70, 66, 88, 86, 70, 62, 50, 43, 37, 21, 12, 25, 47, 55, 53, 42, 60, 59, 79, 85, 76, 91, 95, 99, 84, 100, 121, 90, 88, 69, 71, 62, 79, 64, 53, 47, 32, 42, 51, 53, 54, 57, 69, 56, 60],
                        fill: false,
                        borderColor: "rgba(255,255,255,0.1)",
                        backgroundColor: "rgba(0, 0, 0,0.2)",
                        pointBackgroundColor: "rgb(255,255,255)",

                        fill: 'origin',
                        borderWidth: 3,
                        pointStyle: 'rectRot',
                        lineTension: '0.4',
                        pointRadius: 5

                    }
                ]
            },
            options: {
                maintainAspectRatio: false,
                legend: {
                    onClick: null,
                    display: false
                },
                scales: {
                    xAxes: [{
                        gridLines: {
                            display: false
                        }
                    }],
                    yAxes: [{
                        
                        ticks: {
                            display: false,
                            beginAtZero: true,
                        },
                        gridLines: {
                            display: false,
                            drawBorder: false
                        }
                    }]
                },
    
            }
        }
    }

    render() {
        return (
            <div className="banner-chart">
                <Line
                    data={this.state.charData}
                    options={this.state.options}
                />
            </div>
        )
       
    }
}