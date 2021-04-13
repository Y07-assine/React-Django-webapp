
import React,{ Component, useState } from 'react';
import './App.css';
import Header from './components/Header'
import ListNews from './components/ListNews'
import YoutubeListClip from './components/YoutubeListClip'
import Quote from './components/Quote'



class App extends Component {
    
render(){
    
    return (
      
      <>
        <Header />
        <ListNews />
        <Quote />
        <YoutubeListClip />
        
      </>
    );
  }
}

export default App;
