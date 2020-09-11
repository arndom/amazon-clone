import React from 'react';
import './Home.css';
import Product from './Product';


function Home() {


    return (
        <div className= 'home'>
            <div className = 'home_container'>
                <img 
                className = 'home_image'
                src = "https://images-eu.ssl-images-amazon.com/images/G/02/digital/video/merch2016/Hero/Covid19/Generic/GWBleedingHero_ENG_COVIDUPDATE__XSite_1500x600_PV_en-GB._CB428684220_.jpg"
                alt = ""
                />
                

                <div className = "home__row">
                    <Product
                        id = 'bddvs'
                        title = "stuff looks like good stuff"
                        price= {19.99}
                        image='https://images-na.ssl-images-amazon.com/images/I/51Zymoq7UnL._AC_SY400_.jpg'
                        rating ={5}
                    />

                    <Product
                        id = '12dj345'
                        title = "stuff looks like good stuff"
                        price= {19.99}
                        image='https://images-na.ssl-images-amazon.com/images/I/81ilNbqaGWL._AC_SL1500_.jpg'
                        rating ={5}
                    />

                </div>

                <div className = "home__row">
                    <Product
                        id = '12kj,345'
                        title = "stuff looks like good stuff"
                        price= {19.99}
                        image='https://m.media-amazon.com/images/I/61LtuGzXeaL._AC_UL320_.jpg'
                        rating ={5}
                    />
                    <Product
                        id = '12dd345'
                        title = "stuff looks like good stuff"
                        price= {19.99}
                        image='https://images-na.ssl-images-amazon.com/images/I/81JbokPAeiL._AC_SL1500_.jpg'
                        rating ={5}
                    />
                    <Product
                        id = '1234edrd5'
                        title = "stuff looks like good stuff"
                        price= {19.99}
                        image= "https://m.media-amazon.com/images/I/71K7Q4FpguL._AC_UL320_.jpg"
                        rating ={5}
                    />
                </div>

                <div className = "home__row">
                    <Product
                        id = '12345'
                        title = "stuff looks like good stuff"
                        price= {19.99}
                        image="https://images-na.ssl-images-amazon.com/images/I/514QDB7aEsL._AC_.jpg"
                        rating ={5}
                    />
                </div>
                

            </div>
            
        </div>
    )
}

export default Home

