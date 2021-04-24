import React,{ Component} from 'react';
import logo from '../img/logo.png';
import fbIcon from '../icon/icons8-facebook-24.png';
import instaIcon from '../icon/icons8-instagram-26.png';
import twitterIcon from '../icon/icons8-twitter-24.png';




class Footer extends Component {
    
render(){
    
    return (
        <footer class="footer">
        <div class="contianer">
            <div class="footer__top">
                <div class="footer-top__box">
                    <img src={logo} className="logo" />
                    <div className="socialMedia">
                        <span>
                        <a href="#"><img src={fbIcon}/></a>
                        <a href="#"><img src={instaIcon}/></a>
                        <a href="#"><img src={twitterIcon}/></a> 
                        </span> 
                    </div>
                    
                </div>
                <div class="footer-top__box">
                    <h3>About Apollo Music</h3>
                    <p>Apollo for Music is Is Dedicated To Bringing The News Of Moroccan Rap To A Wide Audience Without Bias Or A benefit Agenda.</p>
                    <span>Contact Us: apollomusic@gmail.com</span>
                </div>
            
        </div>
        </div>
    </footer>
      
    
    );
  }
}

export default Footer;