import React,{ Component, useState } from 'react';
import axios from 'axios';
import {quoteURL} from '../constants'

class Quote extends Component{
    state ={
        loading: false,
        error: null,
        data: []
      };
      componentDidMount(){
        this.setState({loading:true});
        axios
          .get(quoteURL)
          .then(res =>{
            this.setState({data:res.data[0]});
          })
          .catch(err => {
            this.setState({error:err,loading:false});
          });
      }
    render(){
        const {data, error ,loading} = this.state;
        return(
            <section className="py-5 news">
                <div className="quote__section">
                    <div className="quote__section-content">
                        <p>"{data.quote} "</p>
                        <p className="quote__author">{data.author}, <span className="quote__author-status">{data.author_status}</span></p>
                    </div>
                    <span class="quote__section-label">QUOTE OF THE DAY</span>
                </div>
            </section>
        )
    }
}

export default Quote;