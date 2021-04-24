
import React,{ Component} from 'react';
import './App.css';
import { BrowserRouter as Router , Switch , Route , useParams ,location} from "react-router-dom";
import Home from './Home';
import AlbumDetails from './components/api/SpotifyAPI/AlbumDetails';
import Header from './components/Header';
import Footer from './components/Footer';
import ArtistDescription from './components/api/SpotifyAPI/ArtistDescription';




class App extends Component {
    
render(){
    
    return (
      
      <Router>
        <Header />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route  path="/album/:id" component={AlbumDetails} />
          <Route  path="/artist/:id" render={(props)=> <ArtistDescription {...props} key={Math.random()} />}/>
        </Switch>
        <Footer />
      </Router>
    );
  }
}

export default App;
