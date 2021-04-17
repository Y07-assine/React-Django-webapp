import React, { Component } from 'react'
import axios from 'axios';
import {Credentials} from './Credentials'
import {albumURL} from '../../../constants'
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import "slick-carousel/slick/slick-theme.css";


class Album extends Component{

    

    state ={
        token:'',
        error:null,
        albumimage:'',
        data: []
      };
      componentDidMount(){
        const spotity = Credentials();
        this.setState({loading:true});
        axios('https://accounts.spotify.com/api/token',{
              headers:{
                  'Content-Type':'application/x-www-form-urlencoded',
                  'Authorization':'Basic ' + btoa(spotity.ClientId + ':' + spotity.ClientSecret)
              },
              data:'grant_type=client_credentials',
              method:'POST'
          })
          .then(res =>{
            console.log(res.data.access_token);
            this.setState({token:res.data.access_token});
            axios
            .get(albumURL)
            .then(albumres =>{
                console.log(albumres.data[0].spotifyID)
                albumres.data.map((id)=>{
                    axios(`https://api.spotify.com/v1/albums/${id.spotifyID}`,{
                    method:'GET',
                    headers:{
                        'Content-Type':'application/json',
                        'Authorization':'Bearer ' + this.state.token
                    }
                    })
                    .then(response =>{
                        console.log(response.data)
                        this.setState({data: this.state.data.concat(response.data)})
                        console.log(this.state.data)
                    });
                })
                
                
            })
          
          })
          .catch(err => {
            this.setState({error:err});
          });

          
          
        }

    render(){
        const {data,token,error,albumimage,breakPoints} = this.state;
        const settings = {
            dots: true,
            infinite: true,
            speed: 300,
            slidesToShow: 5,
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
        return(
            <section className="albums">
                <div className="lgfgYE album">
                    <span className="title">New arrivals</span>
                </div> 
                <Slider {...settings}>
                    {data.map((album)=>(
                            <div className="item__album">
                                <a href='#'><img src={album.images[0].url} className="image__album" /></a>
                                <div class="text-center">
                                    <h3 class="album-title">
                                        <span className="album__name">{album.name}</span>
                                        <span className="album__artist">{album.artists[0].name}</span>
                                        <span className="album__date">{album.release_date}</span>
                                    </h3>
                                </div>
                            </div>
                    ))}
                </Slider>
            </section>
        )
    }
}
export default Album;