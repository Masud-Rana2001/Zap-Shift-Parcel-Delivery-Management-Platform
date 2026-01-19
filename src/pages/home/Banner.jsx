import React from 'react';
import ReactDOM from 'react-dom';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import bannerImg1 from '../../assets/banner/banner1.png'
import bannerImg2 from '../../assets/banner/banner2.png'
import bannerImg3 from '../../assets/banner/banner3.png'
import MyBtn1 from '../shared/buttons/MyBtn1';
import MyBtn2 from '../shared/buttons/MyBtn2';

const bannerImgs = [bannerImg1,bannerImg2,bannerImg3]

function Banner() {
  return (
    <>
    <Carousel
      autoPlay="true"
      infiniteLoop={true}
      showArrows={true}
      stopOnHover={true}
      >
        {
          bannerImgs.map(image => (
                <div className="bg-white relative">
        <img src={image} />
        <div className="absolute bottom-22 left-20 ">
            <MyBtn1 className="rounded-full mr-2 bg-primary" >Track Your Parcel</MyBtn1>
            <MyBtn2>Be A Rider</MyBtn2>
        </div>
        </div>
            
          ))
        }

                   
                
        </Carousel>
      </>
  )
}

export default Banner