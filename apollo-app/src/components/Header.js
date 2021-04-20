import React,{ Component,useRef} from 'react';
import logo from '../img/logo.png';
import {artistURL} from '../constants';
import Icon from './ui/icon';
import axios from 'axios';

class Header extends Component {
    constructor(){
        super();
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
    }
    setDisplay(){
        this.setState({display:!this.state.display});
    }
    
    componentDidMount(){
        axios
        .get(artistURL)
        .then(artistres =>{
            console.log(artistres.data); 
            this.setState({options:artistres.data});
            console.log(this.state.options);
        });
    }
render(){
    const {click,searchbar,display,options,search} = this.state;
    const setArtist= artist =>{
        this.setState({search:artist});
        this.setState({display:false});
    const wrapperRef = useRef(null);
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
                        {options.filter(({name})=>name.includes(search.toUpperCase)).map((opt)=>{
                            return(
                                <div className="result">
                                    <span>{opt.name}</span>
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