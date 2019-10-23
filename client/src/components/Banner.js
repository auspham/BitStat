import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router'
import { Icon } from 'react-icons-kit'
import {sortDesc} from 'react-icons-kit/fa/sortDesc'
import {minus} from 'react-icons-kit/fa/minus'
import { BannerChart } from '../components/BannerChart'
import ReactDom from 'react-dom'
import { Connectdot } from '../components/Connectdot'
import $ from "jquery";

export class Banner extends Component{
    constructor(props)  {
        super(props);
        this.state = {
            value: '0',
            isLoaded:false,
            btc: '0',
            currency: 'AUD',
            symbol: '$',
            marketRate: [],
            previousRate: [],
            lower: 0, // 1 true, 2 false, 0 equal
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleCurrency = this.handleCurrency.bind(this);
    }
    handleChange(event) {

       (event.target.value == "" || event.target.value=="0")? 
       this.setState({
            value: '0', 
            btc: 0 / this.props.rate[this.state.currency]["last"],
            symbol: this.props.rate[this.state.currency]["symbol"],
            lower: ((this.props.rate[this.state.currency]["sell"] < this.state.previousRate[this.state.currency]) ? 1: (this.props.rate[this.state.currency]["sell"] > this.state.previousRate[this.state.currency]) ? 2 : 0)

        }, this.updateChange()) : 
        this.setState({
            value: event.target.value,
            btc: (event.target.value / this.props.rate[this.state.currency]["last"]).toFixed(4),
            symbol: this.props.rate[this.state.currency]["symbol"],
            lower: ((this.props.rate[this.state.currency]["sell"] < this.state.previousRate[this.state.currency]) ? 1: (this.props.rate[this.state.currency]["sell"] > this.state.previousRate[this.state.currency]) ? 2 : 0)
        }, this.updateChange())
 
    }

    handleCurrency(event) {
        this.setState({
            currency: event.target.name,
            btc: (this.state.value / this.props.rate[event.target.name]["last"]).toFixed(4),
            symbol: this.props.rate[event.target.name]["symbol"],
            lower: ((this.props.rate[this.state.currency]["sell"] < this.state.previousRate[this.state.currency]) ? 1: (this.props.rate[this.state.currency]["sell"] > this.state.previousRate[this.state.currency]) ? 2 : 0)
        }, this.updateChange())

    }

    componentWillMount() {
        fetch("https://asia-northeast1-s3688090-cc2018.cloudfunctions.net/cool-api?lastmins=yes")
        .then(res=>res.json())
        .then(result => this.setState({
            previousRate: result,
        }, () => {
            this.setState({
                lower: ((this.props.rate[this.state.currency]["sell"] < this.state.previousRate[this.state.currency]) ? 1: (this.props.rate[this.state.currency]["sell"] > this.state.previousRate[this.state.currency]) ? 2 : 0)
            })
            console.log("Current:" + this.props.rate[this.state.currency]["sell"]);
            console.log("Previous:" + this.state.previousRate[this.state.currency]);

        }))
        .catch(error => console.log("error" + error))
    }

    updateChange() {
        document.querySelector(".currency").innerHTML = this.props.rate[this.state.currency]["symbol"];
        console.log("Current:" + this.props.rate[this.state.currency]["sell"]);
        console.log("Previous:" + this.state.previousRate[this.state.currency]);
    }
    render () {
        $(function () {
            $(".dropdown-menu a").click(function (e) {
                e.preventDefault();
                var val = $(this).attr("name");
                $(".dropdown-toggle").html(val);
            })
        })    

        return(
            <div className = "banner">
                <div className="container-fluid head-fluid d-flex ">
                        <div className = "wrap-main">
                            <div className="wrapper flex-fill">
                                    <h1>Connect to the world easier</h1>
                                    <h5>Amet non ea exercitation adipisicing laboris reprehenderit nostrud est cillum sint est.</h5>
                            </div>

                            <div className="input-wrapper flex-fill">
                                <div className="input-gr">
                                    <span className="currency">{this.state.symbol}</span>
                                    <input type="text" onInput={this.handleChange}/>
                                    <button className="btn-currency dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">AUD</button>
                                    <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                        <a className="dropdown-item" name="USD" onClick={this.handleCurrency} href="#">USD</a>
                                        <a className="dropdown-item" name="AUD" onClick={this.handleCurrency} href="#">AUD</a>
                                        <a className="dropdown-item" name="EUR" onClick={this.handleCurrency} href="#">EUR</a>
                                        <a className="dropdown-item" name="JPY" onClick={this.handleCurrency} href="#">JPY</a>
                                        <a className="dropdown-item" name="KRW" onClick={this.handleCurrency} href="#">KRW</a>
                                        <a className="dropdown-item" name="NZD" onClick={this.handleCurrency} href="#">NZD</a>

                                    </div>                            
                                </div>
                                <div className="btcval">
                                    <div className="show-val">{this.state.btc} BTC </div>
                                    <span className="unit">
                                        {(this.state.lower == 1) ?<Icon icon={sortDesc} size={45} style={{color: "rgb(255,143,76)"}}/> : (this.state.lower == 2) ?<Icon icon={sortDesc} className="lowUp" size={45} style={{color: "rgb(51, 217, 178)"}}/> : <div style={{width: 45, height: 30}}> <Icon icon={minus} className="lowEqual" size={'100%'} style={{color: "rgb(209, 204, 192)", width: 45, height: 30}}/></div>}
                                    </span>
                                </div>
                                <div className="currency-select">
                                    <Link to={'/details/' + this.state.currency}><button className="btn-currency">View details</button></Link>
                                </div>
                                
                            </div>
                        </div>
                        <Connectdot/>
                </div>
            </div>
           
        )

    }
}
