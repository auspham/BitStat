import React, { Component, PropTypes } from 'react';
import {Bar, Line, Pie, Radar} from 'react-chartjs-2';
import '../stylesheet/viewdetails.css';
import { Icon } from 'react-icons-kit'
import {refresh} from 'react-icons-kit/fa/refresh'
import { database } from 'react-icons-kit/fa/database';
import $ from "jquery";
var apilink = "REPLACE"

export class ViewDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            load1:true,
            load2:true,
            daily_data: [],
            hourly_data: [],
            weekly_data: [],
            currency: this.props.currency,
            dailyChart: {},
            hourlyChart: {},
            weeklyChart: {},
            marketRate: [],
            options: {},
            chartType: "Hourly Average",
            currentDay: 0,
            compare: "USD",
            data: [],
        }
        this.updateFetchHourly = this.updateFetchHourly.bind(this);
        this.updateFetchDaily = this.updateFetchDaily.bind(this);
        this.updateChartType = this.updateChartType.bind(this);

    }
  
    getChartData() {
        this.setState({
            
            dailyChart:{
                labels: Object.keys(this.state.daily_data[this.props.currency]).slice(0, Object.keys(this.state.daily_data[this.props.currency]).length -1),
                datasets:[
                  {
                    label: this.props.currency,
                    data: Object.values(this.state.daily_data[this.props.currency]).slice(0, Object.values(this.state.daily_data[this.props.currency]).length-1),
                    backgroundColor:[
                        'rgba(119, 139, 235,1.0)',
                        'rgba(129, 236, 236,1.0)',
                        'rgba(116, 185, 255,1.0)',
                        'rgba(249, 127, 81,1.0)',
                        'rgba(162, 155, 254,1.0)',
                        'rgba(0, 184, 148,1.0)',
                        'rgba(199, 236, 238,1.0)',  
                        'rgba(186, 220, 88,1.0)',
                        'rgba(255, 159, 64, 0.6)',
                        'rgba(255, 234, 167,1.0)',
                        'rgba(250, 177, 160,1.0)',
                        'rgba(253, 203, 110,1.0)',
                        'rgba(253, 121, 168,1.0)',
                        'rgba(120, 111, 166,1.0)',
                        'rgba(99, 205, 218,1.0)',
                        'rgba(247, 215, 148,1.0)',
                        'rgba(85, 239, 196,1.0)',
                        'rgba(89, 98, 117,1.0)',
                        'rgba(255, 118, 117,1.0)',
                        'rgba(9, 132, 227,1.0)',                                                                                                                                                                                         
                        'rgba(104, 109, 224,1.0)',
                        'rgba(126, 214, 223,1.0)',
                        'rgba(130, 88, 159,1.0)',
                        'rgba(254, 164, 127,1.0)'
                                                
                    ]
                  }
                ]
              },
              hourlyChart:{
                labels: Object.keys(this.state.hourly_data[this.props.currency]).slice(0, Object.keys(this.state.hourly_data[this.props.currency]).length -1),
                datasets:[
                  {
                    label: this.props.currency,
                    data: Object.values(this.state.hourly_data[this.props.currency]).slice(0, Object.values(this.state.hourly_data[this.props.currency]).length-1),
                    backgroundColor:[
                      'rgba(255, 99, 132, 0.6)'
                    ]
                  },
                ]
              },
              weeklyChart:{
                labels: Object.keys(this.state.weekly_data[this.props.currency]),
                datasets:[
                  {
                    label: this.props.currency,
                    data: Object.values(this.state.weekly_data[this.props.currency]),
                    backgroundColor:[
                      'rgba(255, 206, 86, 0.6)',
                      'rgba(75, 192, 192, 0.6)',
                      'rgba(153, 102, 255, 0.6)',
                      'rgba(255, 159, 64, 0.6)',
                      'rgba(255, 99, 132, 0.6)'
                    ]
                  }
                ]
              },
              options: {
                responsive: true,
                maintainAspectRatio: true,
                legend: {
                    onClick: null,
                    display: false
                },
                tooltips: {
                    enabled: true,
                    custom: function(tooltip) {
                        if (!tooltip) return;
                        // disable displaying the color box;
                        tooltip.displayColors = false;
                    },
                    callbacks: {
                        title: function(tooltipItems, data){
                            return "Time: " + tooltipItems[0].xLabel + " ~ " + ((parseInt(tooltipItems[0].xLabel.substring(0,2),10)+1 < 10) ? ("0"+ (parseInt(tooltipItems[0].xLabel.substring(0,2),10)+1)) :(parseInt(tooltipItems[0].xLabel.substring(0,2),10)+1)) +":00";
                        },
                        label: function(tooltipItems, data) {
                            console.log(this); 
                            return "1 BTC ~ " + tooltipItems.yLabel;
                        },
                    }
                },
            },
            options2: {
                maintainAspectRatio: true,
                responsive: true,
                legend: {
                    onClick: null,
                    display: false
                },
                tooltips: {
                    enabled: true,
                    custom: function(tooltip) {
                        if (!tooltip) return;
                        // disable displaying the color box;
                        tooltip.displayColors = false;
                    },
                    callbacks: {
                        title: function(tooltipItems, data){
                            return "Time: " + tooltipItems[0].xLabel;
                        },
                        label: function(tooltipItems, data) {
                            console.log(this); 
                            return "1 BTC ~ " + tooltipItems.yLabel;
                        },
                    }
                },
            }
        })
        console.log(this.state.daily_data);
    }
   
    componentWillReceiveProps() {
        this.getChartData();
    }

    componentDidMount() {
        fetch("https://www.blockchain.com/ticker")
        .then(res=>res.json())
        .then(result => this.setState({
            marketRate: result,
        }, () => { 
            console.log("hihihi")
            const data = this.state.marketRate;
            const table = document.querySelector(".displayTable .tbody");
            Object.keys(data).forEach(function(key) {
                table.innerHTML += "<div>" + key + "</div>"
                Object.keys(data[key]).forEach(function(k){
                    if(k == "buy") {
                        table.innerHTML += "<div>" + ((isNaN(data[key][k])) ? data[key][k] :  Math.round(data[key][k] *100)/100) + "</div>";
                    }
                    // console.log('Currency: ' + key + 'key: ' + k +', value:' + data[key][k]);
                })
                table.innerHTML += ""
            })
        }))
        .catch(error => {
            console.log("error");
            console.log(error);
        });
    }

    componentWillMount() {
        
        fetch(apilink + "?beforeday=0")
        .then(res=>res.json())
        .then(result => this.setState({
            load1: false,
            daily_data: result,
        }, () => { 
            console.log('get chart data');
            this.getChartData() 
        }))
        .catch(error => {
            console.log("error");
            console.log(error);
        });



        fetch(apilink + "?beforehour=0")
        .then(res=>res.json())
        .then(result => this.setState({
            load2: false,
            hourly_data: result,
        }, () => { 
            console.log('get chart data');
            this.getChartData() 
        }))
        .catch(error => {
            console.log("error");
            console.log(error);
        });


        fetch(apilink + "?weekly=0")
        .then(res=>res.json())
        .then(result => this.setState({
            load1: false,
            weekly_data: result,
        }, () => { 
            console.log('get chart data');
            this.getChartData() 
        }))
        .catch(error => {
            console.log("error");
            console.log(error);
        });
    }

    updateFetchHourly(event) {
        var value = event.target.value;
        this.setState({
            load2: true,
        })
        fetch(apilink + "?beforehour=" + value)
        .then(res => res.json())
        .then(result => {
            console.log("result");
            console.log(this);
            this.setState({
                load2: false,
                hourly_data: result,
        }, () => { 
            this.getChartData();
        })
        }
        )
        .catch(error => {
            console.log(error);
        });

        // alert(value);
    }

    updateFetchDaily(event) {
        var value = event.target.value;
        this.setState({
            load1: true,
        })
        fetch(apilink + "?beforeday=" + value)
        .then(res => res.json())
        .then(result => {
            console.log("result");
            console.log(this);
            this.setState({
                currentDay: value,
                daily_data: result,
                load1: false
        }, () => { 
            this.getChartData();
        })
        }
        )
        .catch(error => {
            console.log(error);
        });
        // alert(value);
    }

    updateChartType(event) {
        this.setState({
            chartType: event.target.value
        })
    }



    render() {
        $(".daySelection").click(function (){
            $(".daySelection").removeClass("daySelectionActive");
            $(this).addClass("daySelectionActive");
        });

        $(".rangechange").on("change mousemove touchmove", function(){
            $(".hour .title").html(($(this).val() == 0)?"Current hour:":($(this).val() < 2) ? "Previous " + $(this).val() + " hour:": "Previous " + $(this).val() + " hours:");
        })

        return (

            <div className="ViewDetails">
            <div className="container-fluid">
                
                <center><h1>{this.props.currency} Chart</h1></center>
                <div className="alert alert-danger" role="alert">
                Due to completion of the project as well as budget contraint, the back-end data processor had to be shut down. 
                As a result, the website is currently stimulating data that was available on 
                 <strong> 10/10/2018 23:59:59 GMT+10 (Australia, Melbourne, VIC)</strong>. <hr />Therefore archived data is presented and <strong>will not be aligned with the actual date</strong>. 
                 This includes the graphs and the trend indicator.
                 However, one can expect 100% data accuracy when using our currency exchange function or currency exchange table as data is fetched directly from <strong>blockchain.com's API</strong> as the webpage loads.
                </div>
                <div className="chartDes">
                    <div className="day"> 
                        {(this.state.load1) ? <div className="loading"><div className="lds-ring"><div></div><div></div><div></div><div></div></div></div> : ""} 
                        <div className="title">1 BTC equivalent:
                       
                        <select onChange={this.updateChartType}>
                            <option value="Hourly Average">Hourly Average</option>
                            <option value="Daily Average">Daily Average</option>
                        </select>
                        
                        </div>
                        {(this.state.chartType == "Hourly Average") ?
                        <Bar data={this.state.dailyChart} options={this.state.options}/> : <Line data={this.state.weeklyChart} options={this.state.options2}/>}
                        {(this.state.chartType == "Hourly Average") ? <div className="daySelect">
                            <b>Previous day: </b>
                            <button className={(this.state.currentDay == 0) ? "daySelection daySelectionActive" : "daySelection"} value="0" onClick={this.updateFetchDaily}>0</button>
                            <button className={(this.state.currentDay == 1) ? "daySelection daySelectionActive" : "daySelection"} value="1" onClick={this.updateFetchDaily}>1</button>
                            <button className={(this.state.currentDay == 2) ? "daySelection daySelectionActive" : "daySelection"} value="2" onClick={this.updateFetchDaily}>2</button>
                            <button className={(this.state.currentDay == 3) ? "daySelection daySelectionActive" : "daySelection"} value="3" onClick={this.updateFetchDaily}>3</button>
                            <button className={(this.state.currentDay == 4) ? "daySelection daySelectionActive" : "daySelection"} value="4" onClick={this.updateFetchDaily}>4</button>
                            <button className={(this.state.currentDay == 5) ? "daySelection daySelectionActive" : "daySelection"} value="5" onClick={this.updateFetchDaily}>5</button>
                            <button className={(this.state.currentDay == 6) ? "daySelection daySelectionActive" : "daySelection"} value="6" onClick={this.updateFetchDaily}>6</button>
                            <button className={(this.state.currentDay == 7) ? "daySelection daySelectionActive" : "daySelection"} value="7" onClick={this.updateFetchDaily}>7</button>
                        </div> : ""}
                    </div>

                </div>
                <div className="chartDes2">
                    <div className="hour">
                        {(this.state.load2) ? <div className="loading"><div className="lds-ring"><div></div><div></div><div></div><div></div></div></div> : ""}

                        <div className="title">Current hour:
                        
                        </div>
                        <Line data={this.state.hourlyChart} options={this.state.options2}/>
                        <input className="rangechange" type="range" min="0" step="1" defaultValue="0" max="48" onMouseUp={this.updateFetchHourly} onTouchEnd={this.updateFetchHourly}></input>
                    </div>
                    <div className="displayTable">
                        <div className="thead">
                            <div>Currency</div><div>Price</div>
                        </div>
                        <div className="tbody">
                        </div>
                    </div>
                    
                </div>
               
            </div>
            </div>
            
        )
    }

}