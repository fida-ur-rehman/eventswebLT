import React from 'react'
import Header from '../../Header/Header'
import Footer from '../../Footer/Footer'
import "./Developers.scss"

function Developers() {
    return (
        <div>
            <Header id={1} />
            <h1 className="h1">TechGeeks</h1>
            <div className="my-5 mx-5 row justify-content-between" style={{textAlign:"center"}}>
                <div className="shadow p-4 mx-2 my-5 col-xs-12 col-sm-12 col-md-3 col-lg-3 col-xl-3 dcard">
                    <h2>
                        Shaikh Sharjeel
                    </h2>
                    <p>MERN stack developer / React Native Developer</p>
                </div>

                <div className="shadow p-4 mx-2 my-5 col-xs-12 col-sm-12 col-md-3 col-lg-3 col-xl-3 dcard">
                    <h2>
                        Fida Khan
                    </h2>
                    <p>NodeJs developer</p>
                </div>

                <div className="shadow p-4 mx-2 my-5 col-xs-12 col-sm-12 col-md-3 col-lg-3 col-xl-3 dcard">
                    <h2>
                        Hassan Khan
                    </h2>
                    <p>Cloud Architect / React Native Developer</p>
                </div>

                <div className="shadow p-4 mx-2 my-5 col-xs-12 col-sm-12 col-md-3 col-lg-3 col-xl-3 dcard">
                    <h2>
                        Shaikh Sohel
                    </h2>
                    <p>Python / Django Developer / Data Scientist</p>
                </div>

                <div className="shadow p-4 mx-2 my-5 col-xs-12 col-sm-12 col-md-3 col-lg-3 col-xl-3 dcard">
                    <h2>
                        Abdurraheem
                    </h2>
                    <p>React Developer</p>
                </div>

                <div className="shadow p-4 mx-2 my-5 col-xs-12 col-sm-12 col-md-3 col-lg-3 col-xl-3 dcard">
                    <h2>
                        Abdurrazzak
                    </h2>
                    <p>Python / Django / Wordpress Developer</p>
                </div>
            </div>
            <Footer footer="fullfooter" />
        </div>
    )
}

export default Developers
