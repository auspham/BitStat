import React from 'react'
import { render } from 'react-dom'
import {Route, Router, hashHistory, Link} from 'react-router'
import { App } from './components/App'
import { Whoops404 } from './components/Whoops404'
import 'jquery'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.js'
import './stylesheet/index.css'
import { Menu } from './components/Menu'
import { BannerChart } from './components/BannerChart'
import { Connectdot } from './components/Connectdot'
import { ViewDetails } from './components/ViewDetails';
import { Banner } from './components/Banner';
// Require the polyfill before requiring any other modules.
require('intersection-observer');
require('bootstrap')
render(
    <Router history={hashHistory} basename={process.env.PUBLIC_URL}>
        <Route path="*" component= { Menu }/> 
    </Router>,
    document.querySelector("header")
)
render(
    <Router history={hashHistory} basename={process.env.PUBLIC_URL}>
        <Route path="/test" component={ Connectdot }/>
        <Route path="/" component={ App }/> 
        <Route path="/details/:currency" component={App}/>
        <Route path="*" component={ Whoops404 }/>
    </Router>
    ,document.querySelector("#react-root")
)