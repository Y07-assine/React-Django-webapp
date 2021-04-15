import React,{ Component, useState } from 'react';
import axios from 'axios';
import {youtubeIdURL} from '../constants';
import YoutubeClip from '../components/api/Youtube';
import {CircularProgress} from '@material-ui/core'

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
            this.setState({data:res.data});
          })
          .catch(err => {
            this.setState({error:err,loading:false});
          });
      }
      render(){
        const {data, error ,loading} = this.state;
        return (
        <section className="py-5 news">
            <div className="lgfgYE clips">
                <span className="title">LAST CLIPS</span>
            </div> 
            <div className="row"> 
            {!loading && (
                <CircularProgress />
            )}
            {error && (
                <h1>{JSON.stringify({error})}</h1>
            )}
            {data.map((video)=>(
                <div className="col-sm-3 py-5">
                    <YoutubeClip key={video.id} videoId={video.videoID} />
                </div>
            ))}
            </div>
        </section>
        );
      }
}

export default YoutubeListClip