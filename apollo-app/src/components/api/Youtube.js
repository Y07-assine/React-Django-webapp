import React, { Component } from 'react'
import Youtube from 'react-youtube'

class YoutubeClip extends Component {
    videoOnReady(event){
        event.target.pauseVideo()
    }
    render(){
        const opts = {
            height: '200',
            width: '90%',
            playerVars: {
              // https://developers.google.com/youtube/player_parameters
              autoplay: -1,
            },
          };
          const {videoId} = this.props
          return <Youtube videoId={videoId} opts={opts} onReady={this.videoOnReady} />;
    }
}

export default YoutubeClip 