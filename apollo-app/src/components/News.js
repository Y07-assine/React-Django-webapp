import React from 'react'


const News =({news})=>{
    return(
        <div>
            <div className="content__news">
                <a href="#">
                    <h2 className="text__news font-rale">{news.title}</h2>

                </a>
                
                
            </div>
            <div className="image__news">
                <h5 className="author">
                    By {news.author_name} /
                    <span className="date">{news.date}</span>
                    <span className="source">Source:{news.source}</span>
                </h5>
                <img src={news.image} alt="big news" height={300}/>
            </div>
            
        </div>
    )
}

export default News