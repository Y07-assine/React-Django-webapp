import React, { Component } from 'react'
import News from './News'
import Bignews from './Bignews'
import {newsListURL} from '../constants'
import axios from 'axios';
import { Loader } from 'semantic-ui-react';



class ListNews extends Component{
    state ={
        loading: false,
        error: null,
        data: [],
        lastdata: []
      };
      componentDidMount(){
        this.setState({loading:true});
        axios
          .get(newsListURL)
          .then(res =>{
            this.setState({lastdata:res.data[0],data:res.data,loading:false});
          })
          .catch(err => {
            this.setState({error:err,loading:false});
          });
      }
    render(){
        const {data, error ,loading,lastdata} = this.state;
    return(
        <>
        { loading && (
                <Loader active inline='centered' />
        )}
        <Bignews title={lastdata.title} source={lastdata.source} author={lastdata.author_name} date={lastdata.date} image={lastdata.image} />
        <section className="py-5 news" id="news">
            <div className="row grid-container">
                {data.slice(1).map((news)=>(
                        <News key={news.id} news={news} />
                ))}
            </div>
        </section>
        </>
    )
}
}

export default ListNews