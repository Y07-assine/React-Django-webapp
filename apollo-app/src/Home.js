import React,{ Component} from 'react';
import './App.css';
import Header from './components/Header'
import ListNews from './components/ListNews'
import YoutubeListClip from './components/YoutubeListClip'
import Quote from './components/Quote'
import Playlist from './components/api/SpotifyAPI/Playlist'
import Album from './components/api/SpotifyAPI/Album'



class Home extends Component {
    
render(){
    
    return (
      
      <>
        
        <ListNews />
        <Quote />
        <YoutubeListClip />
        <Playlist />
        <Album />
      </>
    );
  }
}

export default Home;