import React, { Component } from 'react'
import axios from 'axios';
import {Credentials} from './Credentials';
import 'slick-carousel/slick/slick.css';
import "slick-carousel/slick/slick-theme.css";
import {CircularProgress} from '@material-ui/core';
import Header from '../../Header';

class ArtistDescription extends Component{

    constructor(props){
        super(props);
        this.state={
            token:'',
            error:null,
            artistID : props.match.params.id,
            followers:'',
            top_tracks:[],
            data:[]
        }
    }

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
            this.setState({token:res.data.access_token});
                    axios(`https://api.spotify.com/v1/artists/${this.state.artistID}`,{
                    method:'GET',
                    headers:{
                        'Content-Type':'application/json',
                        'Authorization':'Bearer ' + this.state.token
                    }
                    })
                    .then(response =>{
                        this.setState({data: response.data});
                        this.setState({followers:response.data.followers.total})
                    });
                    axios(`https://api.spotify.com/v1/artists/${this.state.artistID}/albums`,{
                    method:'GET',
                    headers:{
                        'Content-Type':'application/json',
                        'Authorization':'Bearer ' + this.state.token
                    }
                    })
                    .then(res =>{
                        this.setState({top_tracks: res.data.items});

                    });
                })

          .catch(err => {
            this.setState({error:err});
          });

          
          
        }

    render(){
        const {data,token,error,followers,top_tracks} = this.state;
        const sectionStyle = {
            background: "linear-gradient(white, black)",
            background : "#000 url("+(this.state.data.images ? this.state.data.images[2].url : null) + ")" +"no-repeat center center/cover"
        };
        return(
            <>
            <Header />
            <section className="artist__details" style={ sectionStyle } >
                <div className="container">
                <div className="row header_with_cover_artist">
                { !data && (
                <CircularProgress disableShrink />
                )}
                    <div className=" artist__description">
                        <img src={data.images ? data.images[0].url : null}  />
                    </div>
                    <div className=" item-news artist__infos">
                        <h3 class="artist-title">
                            <span className="artist__status">{data.type}</span>
                            <span className="artist__name">{data.name}</span>
                            <span><span className="followers">{followers}</span> Followers</span>
                        </h3>
                    </div>
                </div>
            </div>
            </section>
            <section className="artist__projects">
                <div className="row top__projects">
                <h3 class="tracklist border">Popular {data.name} Projects</h3>
                    <div className="grid-container">
                        {top_tracks.map((project)=>(
                            <div>
                            <img src={project.images[0].url} className="image__project" />
                            <div class="text-center">
                                <h3 class="album-title">
                                    <span className="album__name">{project.name}</span>
                                    <span className="project__format">{project.album_type}</span>
                                    <span className="album__date">{project.release_date}</span>
                                </h3>
                            </div>
                            </div>
                        ))}
                        
                    </div>

                </div>
            </section>

            </>
        )
    }
}
export default ArtistDescription;