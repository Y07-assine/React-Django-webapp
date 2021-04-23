import React,{ Component} from 'react';
import logo from '../img/logo.png';
import {artistURL} from '../constants';
import Icon from './ui/icon';
import axios from 'axios';
import {Credentials} from './api/SpotifyAPI/Credentials';
import { Link,history,Redirect } from 'react-router-dom';

class Header extends Component {
    constructor(props){
        super(props);
        this.state={
            click:false,
            searchbar:false,
            display:false,
            options:[],
            search:""
        };
        this.handleClick=this.handleClick.bind(this);
        this.handleSearchbar=this.handleSearchbar.bind(this);
        this.closeMenu=this.closeMenu.bind(this);
        this.closeSearchbar=this.closeSearchbar.bind(this);
        this.setDisplay=this.setDisplay.bind(this);
    }

    handleClick(){
        this.setState({click:!this.state.click});
    }
    closeMenu(){
        this.setState({click:false});
    }
    handleSearchbar(){
        this.setState({searchbar:!this.state.searchbar});
        console.log(this.state.searchbar);
    }
    closeSearchbar(){
        this.setState({searchbar:false});
        this.setState({display:false});
    }
    setDisplay(){
        this.setState({display:!this.state.display});
    }
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
            this.setState({token:res.data.access_token});
            axios
            .get(artistURL)
            .then(artistres =>{
                artistres.data.map((id)=>{
                    axios(`https://api.spotify.com/v1/artists/${id.spotifyID}`,{
                    method:'GET',
                    headers:{
                        'Content-Type':'application/json',
                        'Authorization':'Bearer ' + this.state.token
                    }
                    })
                    .then(response =>{
                        
                        this.setState({options: this.state.options.concat(response.data)})
                        console.log(this.state.options);
                    });
                })
                
                
            })
          
          })
          .catch(err => {
            this.setState({error:err});
          });

          console.log(this.state.options);
          
        }
        navMenu(){
            if(window.outerWidth >600 ){
                document.getElementsByClassName("nav__item").append
            }
        }

render(){
    const {click,searchbar,display,options,search} = this.state;
    const setArtist= artist =>{
        this.setState({search:artist});
        this.setState({display:false});
    let matches = options.filter((option)=>{
        const regex = new RegExp(`^${search}`,'gi');
        return option.name.match(regex);
    });
    if(search.length === 0){
        matches=[];
    }
    }
    return (
        
        <header className="header">
            <div className="navigation" style={{background:'linear-gradient(-90deg,#3D9262 20%,#3fb573 60%,#368A5A)'}}>
                <div className="container">
                    <nav className="nav ">
                        <div className="nav__hamburger " onClick={this.handleClick} >
                            <Icon name={'menu'} size={40}  />
                        </div>
                        <div className="search">
                            <a href="#" className="icon__item" onClick={this.handleSearchbar}>

                                <Icon name={'search'} size={30} />
                            </a>
                        </div>
                        <div className="nav__logo">
                            <a href="/"  > 
                                <img src={logo} alt='apollo for music' />
                            </a>
                        </div>
                        <div className="connexion">
                            <a href="#" className="icon__item">
                                <Icon name={'user'} size={30}  />
                            </a>
                        </div>
                        <div className="home-nav">
                            <a href="/" className="icon__item">
                                <Icon name={'home'} size={30}  />
                            </a>
                        </div>
                    </nav> 
                </div>
                <nav id="nav__down" className="nav navbar">
                    <div className={click ? 'nav-menu-show open' :'nav-menu-show'}>
                        <div className="menu__top">
                            <a href="/" className="home">
                                <Icon name={'home'} size={30} color={'white'} />
                            </a>
                            <a href="#" className="close__toggle" onClick={this.closeMenu}>
                                <Icon name={'cross'} size={25} color={'white'} />
                            </a>
                        </div>
                        <ul className="nav__list">
                            <li className="nav__item">
                                <a href="#" className="nav__link scroll-link">FEATURED</a>
                            </li>
                            {window.outerWidth <600 ? <hr/>: null}
                            <li className="nav__item">
                                <a href="#" className="nav__link scroll-link">NEWS</a>
                            </li>
                            <li className="nav__item">
                                <a href="#" className="nav__link scroll-link">VIDEOS</a>
                            </li>
                            <li className="nav__item">
                                <a href="#" className="nav__link scroll-link">SUPPORT</a>
                            </li>

                        </ul>
                    </div>
                   
                </nav>
            </div>
            <div className={searchbar ? 'nav__menu open' :'nav__menu'}>
                <ul className="search-input navbar-nav m-auto  ">
                    <div className="form-group has-search">
                    <form className="form__input" autocomplete="off"> 
                        <input className="search-input form-control form-control-sm mr-sm-2 mb-0" onChange={event =>this.setState({search:event.target.value,display:!display})} name="query" type="text" style={{fontSize: 20+"px"}} placeholder="Search Artist " />
                        <a href="#" className="close__SearchBar" onClick={this.closeSearchbar}>
                            <Icon name={'cross'} size={25} color={'darkgrey'} />
                        </a>
                    </form>
                    </div>
                </ul>
                {display &&(
                    <div className="autoContainer">
                        <h5 className="search__result">SEARCH RESULTS</h5>
                        <hr />
                         {options.filter((option)=>{
                            const regex = new RegExp(`^${search}`,'gi');
                            return option.name.match(regex);
                        }).map((artist)=>{
                            return(
                                <div className="result">
                                    <Link to={`/artist/${this.state.artistID ? this.state.artistID : artist.id}`}>
                                        <img src={artist.images[0].url} alt={artist.name}/>
                                    </Link>
                                        <span>{artist.name}</span>
                                    
                                </div>
                            )
                        })}
                    </div>
                )}
                
            </div>

        </header>
    );
}
}
export default Header;