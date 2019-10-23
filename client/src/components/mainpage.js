import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router'
import "../stylesheet/App.css";
import "../stylesheet/connectDot.css"
import { BannerChart } from './BannerChart'
import { Icon } from 'react-icons-kit'
import {instagram} from 'react-icons-kit/fa/instagram'
import {facebookSquare} from 'react-icons-kit/fa/facebookSquare'
import {githubSquare} from 'react-icons-kit/fa/githubSquare'
import {database} from 'react-icons-kit/fa/database'
import {server} from 'react-icons-kit/fa/server'
import {eur} from 'react-icons-kit/fa/eur'
import {chevronLeft} from 'react-icons-kit/fa/chevronLeft'
import {chevronRight} from 'react-icons-kit/fa/chevronRight'
import sal from 'sal.js'
import $ from "jquery";

export class MainPage extends Component {
    constructor() {
        super();
        this.state={
            viewport: 0,
        }
        this.changeViewport = this.changeViewport.bind(this);
    }
    componentDidMount() {
        sal();
        const data = this.refs.data;
        const currency = this.refs.currency;
        
        const max_data = 96;
        const max_curr = 20;

        const info = this.refs.info;
        const switch_panel = this.refs.pageswitcher;
        const switcher1 = this.refs.switcher1;
        const switcher2 = this.refs.switcher2;
        const switcher3 = this.refs.switcher3;
        const iOSNav = $(".iOS-navigator");

        var iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
        var isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
        var isEdge = window.navigator.userAgent.indexOf("Edge") > -1;
        var global_width = window.innerWidth;
        var counter_data = 0;
        var counter_curr = 0;

        function increment_value() {
            if (document.body.scrollTop > 40) {
                setInterval(function() {
                    if(data.innerHTML != 199) {
                        data.innerHTML = counter_data++;
                    }
                },200)
                setInterval(function() {
                    if(currency.innerHTML != "20+") {
                        currency.innerHTML = counter_curr++ +"+";
                    }
                },200)
            }
        }

        window.onscroll = function() {increment_value()};
        $(document).ready(function () {
            $(".iOS-navigator div:first-child").click(function (){
                if(info.scrollLeft - global_width >= 0) {
                    info.scrollLeft -= global_width;
                }
            });
            $(".iOS-navigator div:last-child").click(function (){
                if(info.scrollLeft + global_width <= 3*global_width) {
                    info.scrollLeft += global_width;
                }
            });
        });

        $(window).on('resize', function(){
            global_width = window.innerWidth;
            console.log(global_width);
            if($(this).width() > 500){
                info.scrollLeft = 0;
                switch_panel.style.display = "none";
                iOSNav.css("display","none");
            } else {
                if(iOS || isFirefox || isEdge) {
                    iOSNav.css("display","grid");
                }
                switch_panel.style.display = "grid";
            }
        });
        // $(window).on("load", function () {
            iOSNav.css("display","none");
            if(iOS || isFirefox || isEdge) {
                if($(window).width() < 500) {
                    iOSNav.css("display","grid");
                    info.style.cssText = "overflow: hidden";
                   
                }
            }
            if($(window).width() > 500){
                info.scrollLeft = 0;
                switch_panel.style.display = "none";
            } else {
                switch_panel.style.display = "grid";
            }
            info.onscroll = function() {

                if(info.scrollLeft < 300) {
                    switcher1.classList.add("switch-active");
                    switcher2.classList.remove("switch-active");
                    switcher3.classList.remove("switch-active");
                } else if(info.scrollLeft > 300 && info.scrollLeft < 600) {
                    switcher1.classList.remove("switch-active");
                    switcher2.classList.add("switch-active");
                    switcher3.classList.remove("switch-active");
                } else {
                    switcher1.classList.remove("switch-active");
                    switcher2.classList.remove("switch-active");
                    switcher3.classList.add("switch-active");
                }
            }
        // });
            //----------------- CARD SKEW, uncomment to turn on ------------------//
            // const card = document.querySelectorAll('.skewC');
            // card.forEach(item => {
            //     var se = item.querySelector('.developer-card');
            //     item.addEventListener('mousemove', event => {

            //         let w = item.offsetWidth;
            //         let h = item.offsetHeight;
            //         let posX = window.scrollX + item.getBoundingClientRect().left;
            //         let posY = window.scrollY + item.getBoundingClientRect().top;
            //         var mouseX = event.clientX - posX - w + 150;
            //         var mouseY = event.clientY - h;
            //         var steve = 0.005;
            //         console.log(`posX: ${posX}\nposY: ${posY}\nw:${w}\nh:${h}\nclientY: ${event.clientY}\nclientX: ${event.clientX}\nmouseX: ${mouseX}\nmouseY: ${mouseY}`);
            //         console.log(event.clientX + "*" + event.clientY);
            //         console.log(posX + "x" + posY);
            //         console.log("current:" + (-event.clientX + posX) + ":" + (-event.clientY + posY));
            //         if((mouseX <= 0) && (mouseY <= 0)) {
            //             let cX = -((mouseX)) * steve;
            //             let cY = -((mouseY)) * steve;
            //             se.style.cssText += `transform: skew(${cX}deg, ${cY}deg)`;
            //             console.log(`trans: ${cX} ${cY}`);
            //         } else if ((mouseX >= 0) && (mouseY<= 0)) {
            //             let cX = -((mouseX)) * steve;
            //             let cY = ((mouseY)) * steve;
            //             se.style.cssText += `transform: skew(${cX}deg, ${cY}deg)`;
            //             console.log(`trans: ${cX} ${cY}`);

            //         } else if ((mouseX <= 0) && (mouseY >= 0)) {
            //             let cX = ((mouseX)) * steve;
            //             let cY = -((mouseY)) * steve;
            //             se.style.cssText += `transform: skew(${cX}deg, ${cY}deg)`;
            //             console.log(`trans: ${cX} ${cY}`);

            //         } else if ((mouseX >= 0) && (mouseY >= 0)) {
            //             let cX = ((mouseX)) * steve;
            //             let cY = ((mouseY)) * steve;
            //             se.style.cssText += `transform: skew(${cX}deg, ${cY}deg)`;
            //             console.log(`trans: ${cX} ${cY}`);

            //         }
            //     });
            //     item.addEventListener('mouseout', () => {
            //         se.style.cssText = `transform: skew(0deg, 0deg)`;
            //     });
            // })
    }
    changeViewport(event) {
        let value = event.target.id;
        this.setState({
            viewport: value
        })
    }
    render () {
        return (
            <div className="mainpage">
                <div className="long-band">
                    <div className="aws" data-sal="slide-left"
                    data-sal-duration="800"></div>
                    <div className="gg-cloud" data-sal="slide-up"
                    data-sal-duration="800"></div>
                    <div className="react" data-sal="slide-right"
                    data-sal-duration="800"></div>
                </div>
                <div className="container intro-badge" data-sal="slide-up" data-sal-duration="300">
                        <div className="c3dHover">
                        <div className="c3d-layer"></div>
                        <div className="c3d-layer"></div>
                        <div className="c3d-layer"></div>
                        <div className="c3d-layer"></div>
                        </div>
                    <div className="intro" ref="intro" data-sal="slide-up" data-sal-duration="300"
                    data-sal-delay="300">
                        <h1>Intro</h1>
                        <p> Lorem ipsum dolor sit, amet consectetur adipisicing elit. Error amet magni quas corporis, totam sequi odio, repellat id vero doloribus exercitationem sit vel placeat dicta inventore doloremque eos, libero quia. </p>
                    </div>
                </div>
                <div className="switch-wrap">
                    <div className="container-fluid stat-info" ref="info">
                            <ul className="stat-item" data-sal="slide-left"
 data-sal-duration="800">
                                <div className="ul-logo"><Icon icon={database} size={60}></Icon></div>
                                <li ref="data">0</li>
                                <li>data points</li>
                                <li>generated per day</li>
                            </ul>
                            <ul className="stat-item">
                                <div className="ul-logo"><Icon icon={server} size={60}></Icon></div>
                                <li>24/7</li>
                                <li>hours</li>
                                <li>up time</li>
                            </ul>
                        
                            <ul className="stat-item" data-sal="slide-right"
data-sal-duration="800">
                                <div className="ul-logo"><Icon icon={eur} size={60}></Icon></div>
                                <li ref="currency">0+</li>
                                <li>different currencies</li>
                                <li>supported</li>
                            </ul>

                        <BannerChart/>
                    </div>
                    <div className="iOS-navigator">
                        <Icon icon={chevronLeft} size={30}></Icon>
                        <Icon icon={chevronRight} size={30}></Icon>
                    </div>
                    <div className="page-switcher" ref="pageswitcher">
                            <span className="switcher switch-active" ref="switcher1"></span>
                            <span className="switcher" ref="switcher2"></span>
                            <span className="switcher" ref="switcher3"></span>
                    </div>

                 
                </div>
                <div className="info">
                </div>
                <div className="techwrap">
                    {
                        (this.state.viewport==0) ?
                            <div className="techcard" data-sal="slide-up">    
                                <div className="container first">
                                    <div className="info-left">
                                        <h1>Serverless computing</h1>
                                        <p>
                                            Exercitation in laboris velit fugiat deserunt adipisicing cupidatat mollit mollit culpa aliquip veniam occaecat. Laboris labore in occaecat adipisicing cillum cupidatat non aliqua dolor cupidatat sunt. Aliquip in culpa ad do reprehenderit occaecat aute do aute anim dolore qui.
                                        </p>
                                        <button className="btn find-out"> Find out more </button>
                                    </div>
                                    
                                    <div className="img-right">
                                    </div>
                                </div>
                            </div> 
                            : (this.state.viewport==1) ?
                            <div className="techcard">    
                            <div className="container second">
                                <div className="info-left">
                                    <h1>Cloud computing</h1>
                                    <p>
                                        Mollit sunt amet dolore sit mollit magna eiusmod dolore esse. Sint aliquip sint officia occaecat commodo tempor nisi laborum eiusmod est incididunt incididunt. Proident et laborum excepteur dolor esse pariatur laborum anim.
                                    </p>
                                    <button className="btn find-out"> Find out more </button>
                                </div>
                                
                                <div className="img-right">
                                </div>
                            </div>
                    </div> : <div className="techcard">    
                            <div className="container third">
                                <div className="info-left">
                                    <h1>Google cloud bucket</h1>
                                    <p>
                                        Sint sunt consequat qui enim do in in est aliqua elit. Sit Lorem reprehenderit eiusmod adipisicing duis amet ipsum sint sint consectetur id id officia. Sit occaecat sit est officia in fugiat voluptate dolor cupidatat nulla dolor et. 
                                    </p>
                                    <button className="btn find-out"> Find out more </button>
                                </div>
                                
                                <div className="img-right">
                                </div>
                            </div>
                    </div>
                    
                    }
                    <div className="techwrap-sellector">
                            <span id="0" className={(this.state.viewport == 0) ? "switcher switch-active" : "switcher"} onClick={this.changeViewport}></span>
                            <span id="1" className={(this.state.viewport == 1) ? "switcher switch-active" : "switcher"} onClick={this.changeViewport}></span>
                            <span id="2" className={(this.state.viewport == 2) ? "switcher switch-active" : "switcher"} onClick={this.changeViewport}></span>
                    </div>
                    
                </div>
                <div className="container developer">
                    <div className="skewC">
                        <div className="developer-card">
                            <div className="background"></div>
                            <div className="module">
                                <div className="avatar"></div>
                                <div className="name">Thang Pham</div>
                                <div className="role"> Front-end Developer </div>
                                <div className="location"> Hanoi | Vietnam  </div>
                                <hr />
                            </div>
                            <div className="description">
                                Aute magna nisi ipsum nostrud ex reprehenderit.
                            </div>
                            <div className="social-media">
                                <Icon size={30} icon={instagram}> </Icon>
                                <Icon size={30} icon={facebookSquare}> </Icon>
                                <Icon size={30} icon={githubSquare}> </Icon>
                            </div>
                            <div className="contact-info">
                                <input type="button" className="btn connect-btn" value = "CONNECT"/>
                                <input type="button" className="btn contact-btn" value = "CONTACT"/>

                            </div>
                        </div>
                    
                    </div>
                    <div className="skewC">
                        <div className="developer-card">
                            <div className="background"></div>
                            <div className="module">
                                <div className="avatar"></div>
                                <div className="name">Jia Jun Yong</div>
                                <div className="role"> Back-end Developer </div>
                                <div className="location"> Malaysia  </div>
                                <hr />
                            </div>
                            <div className="description">
                                Eiusmod enim mollit do cillum nostrud labore.
                            </div>
                            <div className="social-media">
                                <Icon size={30} icon={instagram}> </Icon>
                                <Icon size={30} icon={facebookSquare}> </Icon>
                                <Icon size={30} icon={githubSquare}> </Icon>

                            </div>
                            <div className="contact-info">
                                <input type="button" className="btn connect-btn" value = "CONNECT"/>
                                <input type="button" className="btn contact-btn" value = "CONTACT"/>

                            </div>
                        </div>
                    </div>
                    <div className="skewC">
                        <div className="developer-card">
                            <div className="background"></div>
                            <div className="module">
                                <div className="avatar"></div>
                                <div className="name">Wei Wei</div>
                                <div className="role"> Back-end Developer </div>
                                <div className="location"> China </div>
                                <hr />
                            </div>
                            <div className="description">
                                Aliquip ipsum adipisicing mollit et adipisicing labore.
                            </div>
                            <div className="social-media">
                                <Icon size={30} icon={instagram}> </Icon>
                                <Icon size={30} icon={facebookSquare}> </Icon>
                                <Icon size={30} icon={githubSquare}> </Icon>


                            </div>
                            <div className="contact-info">
                                <input type="button" className="btn connect-btn" value = "CONNECT"/>
                                <input type="button" className="btn contact-btn" value = "CONTACT"/>
                            </div>
                        </div>
                    </div>
                </div>

               
            </div>
        )
    }
    
}