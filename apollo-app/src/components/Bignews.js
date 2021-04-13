import React from 'react'


const Bignews =({title,source,author,date,image})=>{
    return(
        <section className="py-5 news">
            <div className="container">
                <div className="row ">
                    <div className="col-sm-4">
                        <div className="lgfgYE">
                            <span className="title">News</span>
                        </div>
                        <a href="#"><h2 className="text__news font-rale">{title}</h2></a>
                        <h5 className="source">{source}</h5>
                        <h5 className="author">By {author} /<span className="date">{date}</span></h5>
                    </div>
                    <div className="col-sm-8 item-news">
                        <img src={image} alt="big news" height={300}/>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Bignews