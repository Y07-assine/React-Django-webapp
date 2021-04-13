import React, { Component } from 'react'
import News from './News'
import Bignews from './Bignews'
import {newsListURL} from '../constants'
import axios from 'axios';



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
            this.setState({lastdata:res.data[0]})
            this.setState({data:res.data});
          })
          .catch(err => {
            this.setState({error:err,loading:false});
          });
      }
    render(){
        const {data, error ,loading,lastdata} = this.state;
    return(
        <>
        <Bignews title={lastdata.title} source={lastdata.source} author={lastdata.author} date={lastdata.date} image={lastdata.image} />
        <section className="py-5 news">
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