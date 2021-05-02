import React,{ Component, useState } from 'react';
import axios from 'axios';
import {youtubeIdURL} from '../constants';
import YoutubeClip from '../components/api/Youtube';
import { Loader } from 'semantic-ui-react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import "slick-carousel/slick/slick-theme.css";

class YoutubeListClip extends Component {
    state ={
      loading: false,
      error: null,
      data: []
    };
    componentDidMount(){
      this.setState({loading:true});
        axios
          .get(youtubeIdURL)
          .then(res =>{
            this.setState({data:res.data,loading:false});
          })
          .catch(err => {
            this.setState({error:err,loading:false});
          });
      }
      render(){
        const {data, error ,loading} = this.state;
        const settings = {
          dots: true,
          infinite: true,
          speed: 300,
          slidesToShow: 4,
          slidesToScroll: 4,
          responsive: [
              {
              breakpoint: 1024,
              settings: {
                  slidesToShow: 3,
                  slidesToScroll: 3,
                  infinite: true,
                  dots: true
              }
              },
              {
              breakpoint: 600,
              settings: {
                  slidesToShow: 3,
                  slidesToScroll: 3
              }
              },
              {
              breakpoint: 480,
              settings: {
                  slidesToShow: 2,
                  slidesToScroll: 2
              }
              }
              
          ]
      }
        return (
        <section className="py-5 news">
            <div className="lgfgYE clips">
                <span className="title">LAST CLIPS</span>
            </div> 
            { loading && (
                <Loader active inline='centered' />
            )}
            <div className="container youtubeClips">
            <Slider {...settings}>
            {data.map((video)=>(
                <div>
                    <YoutubeClip key={video.id} videoId={video.videoID} />
                </div>
            ))}
            </Slider>
            </div>
        </section>
        );
      }
}

export default YoutubeListClip