import React,{ Component} from 'react';
import axios from 'axios';
import {Credentials} from './Credentials'

class SpotifyAPI extends Component{

    state ={
        token:'',
        error:null,
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
            axios('https://api.spotify.com/v1/playlists/37i9dQZF1DWYtEjm4ihp5w/tracks?offset=0&limit=5&market=US',{
              method:'GET',
              headers:{
                'Content-Type':'application/json',
                  'Authorization':'Bearer ' + res.data.access_token
                }
          })
          .then(playlistresponse =>{
              console.log(playlistresponse.data)
              this.setState({data:playlistresponse.data.items})
          });
          })
          .catch(err => {
            this.setState({error:err});
          });

          
          
      }
    render(){
        const {data, error ,loading} = this.state;
        return(
            <section className="py-5 news">
               <div className="classement__item row">
               <table class="table">
                <thead>
                    <tr>
                    <th scope="col">#</th>
                    <th scope="col">TITLE</th>
                    <th scope="col">ARTISTE</th>
                    <th scope="col">ALBUM</th>
                    </tr>
                </thead>
                <tbody>
                {data.map((item)=>(
                    <tr>
                    <td><img src={item.track.album.images[0].url} className="image_item" /></td>
                    <td> {item.track.name}</td>
                    <td>{item.track.artists.map((artist)=>(
                        <span>{artist.name}</span>
                    ))}
                    </td>
                    <td>{item.track.album.name}</td>
                    </tr>
                ))}
                
                </tbody>
                </table>
               </div>
            </section>
        )
    }
}

export default SpotifyAPI;