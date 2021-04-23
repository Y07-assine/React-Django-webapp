import React, { Component } from 'react'
import axios from 'axios';
import {Credentials} from './Credentials';
import 'slick-carousel/slick/slick.css';
import "slick-carousel/slick/slick-theme.css";
import {CircularProgress} from '@material-ui/core';

class ArtistDescription extends Component{

    constructor(props){
        super(props);
        this.state={
            token:'',
            error:null,
            artistID : props.match.params.id,
            followers:'',
            data:[]
        }
    }

      componentDidMount(){
          console.log(this.state.albumID);
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
                })

          .catch(err => {
            this.setState({error:err});
          });

          
          
        }

    render(){
        const {data,token,error,followers} = this.state;
        const sectionStyle = {
            background: "linear-gradient(white, black)",
            background : "#000 url("+(this.state.data.images ? this.state.data.images[2].url : null) + ")" +"no-repeat center center/cover"
        };
        return(
            <>
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
            <section className="artist__infos">
                
            </section>

            </>
        )
    }
}
export default ArtistDescription;