import React,{ Component,useState } from 'react';
import logo from '../img/logo.png';

import Icon from './ui/icon'


function Header()  {

    const [click,setClick] = useState(false);
    const handleClick = () =>setClick(!click);
    const closeMenu = () =>setClick(false)
    const [searchbar,setSearchbar] = useState(false);
    const handleSearchbar = () =>setSearchbar(!searchbar);
    const closeSearchbar = () =>setSearchbar(false)

    return (
        <header className="header">
            <div className="navigation" style={{background:'linear-gradient(-90deg,#3D9262 20%,#3fb573 60%,#368A5A)'}}>
                <div className="container">
                    <nav className="nav ">
                        <div className="nav__hamburger " onClick={handleClick} >
                            <Icon name={'menu'} size={40}  />
                        </div>
                        <div className="search">
                            <a href="#" className="icon__item" onClick={handleSearchbar}>

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
                        <div className="home">
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
                            <a href="#" className="close__toggle" onClick={closeMenu}>
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
                    <form > 
                        <input className="search-input form-control form-control-sm mr-sm-2 mb-0" name="query" type="text" style={{fontSize: 20+"px"}} placeholder="Search Artist " />
                        <a href="#" className="close__toggle" onClick={closeSearchbar}>
                            <Icon name={'cross'} size={25} color={'darkgrey'} />
                        </a>
                    </form>
                    </div>
                </ul>
            </div>

        </header>
    );
  }


export default Header;