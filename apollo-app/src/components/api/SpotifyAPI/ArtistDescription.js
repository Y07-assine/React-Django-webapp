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
                        this.setState({data: response.data})
                    });
                })

          .catch(err => {
            this.setState({error:err});
          });

          
          
        }

    render(){
        const {data,token,error} = this.state;
        const sectionStyle = {
            background: "linear-gradient(white, black)",
            background : "#000 url("+(this.state.data.images ? this.state.data.images[1].url : null) + ")" +"no-repeat center center/cover"
        };
        return(
            <>
            <section className="album__details" style={ sectionStyle } >
                <div className="container">
                <div className="row header_with_cover_art">
                { !data && (
                <CircularProgress disableShrink />
                )}
                    <div className="col-sm-4 album__description">
                        <img src={data.images ? data.images[0].url : null} />
                    </div>
                    <div className="col-sm-8 item-news album__description">
                        <h3 class="album-title">
                            <span className="album__format">{data.type}</span>
                            <span className="album__name">{data.name}</span>
                            <span className="album__artist">{data.artists ? data.artists[0].name : null}</span>
                            <span className="album__date">Released {data.release_date}</span>
                        </h3>
                    </div>
                </div>
            </div>
            </section>

            </>
        )
    }
}
export default ArtistDescription;