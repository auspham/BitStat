import React, { Component, PropTypes } from 'react'
import '../stylesheet/menu.css'
import { Icon } from 'react-icons-kit'
import { bitcoin } from 'react-icons-kit/fa/bitcoin'
import { Link } from 'react-router'
import GithubCorner from 'react-github-corner';

export class Menu extends Component{
    render () {
        return(
            <div className="menu">
                <nav className="navbar fixed-top navbar-expand-lg navbar-dark">
                        <GithubCorner
                    href="https://github.com/rockmanvnx6/BitStat"
                    bannerColor="#706fd3"
                    octoColor="#fff"
                    size={80}
                    direction="right" 
                    className="github"
                    />
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>

                        <div className="brand d-inline-block">
                            <a href="#">
                                <Icon size={45} icon={bitcoin}/>
                                <span className="logo">itStat</span>
                                <div className="barchart-logo"></div>
                            </a>
                        </div>

                    
                       
                            <div className="collapse navbar-collapse text-left" id="navbarNavDropdown" style={{marginRight:"55px"}}>      
                                <ul className="navbar-nav ml-auto flex-nowrap">
                                    <li className="nav-item">
                                        <Link to="/test" className="nav-link">
                                            Test
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to="/contact" className="nav-link">
                                            Contact
                                        </Link>
                                    </li>
                                </ul>
                            </div>

                </nav>
            </div>
        )
    }
}