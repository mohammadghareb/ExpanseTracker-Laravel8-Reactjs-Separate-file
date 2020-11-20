import React from 'react';
function Carousel() {

    return (
        <div className="container">
            <div className='row ml-20'>
                <div className='col-12'>
                    <div id="demo" className="carousel slide" data-ride="carousel">

                        {/* <!-- Indicators --> */}
                        <ul className="carousel-indicators">
                            <li data-target="#demo" data-slide-to="0" className="active"></li>
                            <li data-target="#demo" data-slide-to="1"></li>
                            <li data-target="#demo" data-slide-to="2"></li>
                        </ul>

                        {/* <!-- The slideshow --> */}
                        <div className="carousel-inner">
                            <div className="carousel-item active">
                                <img width="100%" height="200" src="image/unnamed.png" alt="Expense-Reporting-Cheat-Sheet" />
                            </div>
                            <div className="carousel-item">
                                <img width="100%" height="200" src="./image/unnamed.png" alt="Expense Management Process" />
                            </div>
                            <div className="carousel-item">
                                <img width="100%" height="200" src="image/unnamed.png" alt="Tracking Expenses" />
                            </div>
                        </div>

                        {/* <!-- Left and right controls --> */}
                        <a className="carousel-control-prev" href="#demo" data-slide="prev">
                            <span className="carousel-control-prev-icon"></span>
                        </a>
                        <a className="carousel-control-next" href="#demo" data-slide="next">
                            <span className="carousel-control-next-icon"></span>
                        </a>
                    </div>
                </div>
            </div>
        </div>)
}


export default Carousel
