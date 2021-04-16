import React, { Component } from 'react'
import axios from 'axios';
import {Credentials} from './Credentials'
import {albumURL} from '../../../constants'
import Carousel from 'react-elastic-carousel'


class Album extends Component{

    state ={
        token:'',
        error:null,
        albumimage:'',
        data: [],
        breakPoints:[
            {width:1 , itemsToShow:1},
            {width:550, itemsToShow:2},
            {width:780, itemsToShow:4},
            {width:1200, itemsToShow:5}
        ]
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
        return(
            <section className="news">
                <Carousel breakPoints={breakPoints}>
                    {data.map((album)=>(
                        <div className="item">
                            <a href='#'><img src={album.images[0].url} /></a>
                            <div class="text-center">
                                <h3 class="album-title">{album.name}</h3>
                                <h4 class="album-title">{album.artists[0].name}</h4>
                            </div>
                        </div>
                        ))}
                </Carousel>
                    

            </section>
        )
    }
}
export default Album;