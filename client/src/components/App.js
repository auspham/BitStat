import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router'
import { Banner } from './Banner';
import "../stylesheet/App.css";
import "../stylesheet/connectDot.css"
import { BannerChart } from './BannerChart'
import { Icon } from 'react-icons-kit'
import {rocket} from 'react-icons-kit/fa/rocket'
import {database} from 'react-icons-kit/fa/database'
import {server} from 'react-icons-kit/fa/server'
import {eur} from 'react-icons-kit/fa/eur'
import {chevronLeft} from 'react-icons-kit/fa/chevronLeft'
import {chevronRight} from 'react-icons-kit/fa/chevronRight'
import sal from 'sal.js'
import {MainPage} from './mainpage'
import { ViewDetails } from './ViewDetails';
export class App extends Component {
    constructor (props) {
        super(props);
        this.state = {
            marketRate: []
        }
    }
    componentWillMount() {
        fetch("https://blockchain.info/ticker")
        .then(res=>res.json())
        .then(result => this.setState({
            marketRate: result,
        }))
        .catch(error => console.log("error" + error))
    }
    render() {
        return(
            <div className="App">
                <Banner rate={this.state.marketRate}/>
                {(this.props.location.pathname === "/") ? 
                                <MainPage/>: <ViewDetails currency={this.props.params.currency}/>
                }
            </div>

        )
    }
}