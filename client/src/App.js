import React from 'react';
import {Route, Switch, Redirect} from "react-router-dom";
import './App.css';
import Home from "./pages/Home";
import About from "./pages/About";
import Beers from "./pages/Beers";
import Events from "./pages/Events";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import Nav from "./components/Nav";
import axios from 'axios';
import history from "./history";
import Footer from './components/Footer'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { faFacebook, faInstagram, faPinterest, faLinkedin, faYoutube } from '@fortawesome/free-brands-svg-icons'

library.add(faFacebook, faInstagram, faPinterest, faLinkedin, faYoutube)

class App extends React.Component {
  constructor(props){
    super(props)
    this.fetchUser = this.fetchUser.bind(this)
    this.logout = this.logout.bind(this)
  }
  state = {
    user: {},
    err: null
  }

  componentDidMount() {
      this.fetchUser()
  }

  fetchUser = ()=> {
    axios({
      url: `${process.env.REACT_APP_BACK_END_BASE_URL}users/get-user`,
      method: "post",
      withCredentials: true
    })
    .then((response)=> {
      this.setState({
        user: response.data
      }, ()=> {
        debugger;
        history.push("/profile") // new but not required
      })
    })
    .catch(err=> {
      this.setState({
        err: err
      })
    })
  }

  updateUser = (user) => {
    debugger
    this.setState({user});
  }

  logout() {
    axios({
      method: "post",
      withCredentials: true,
      url: `${process.env.REACT_APP_BACK_END_BASE_URL}users/logout`
    })
    .then((response)=> {
      debugger
      this.setState({
        user: {}
      },()=> {
        history.push("/")
      })
    })
    .catch((err)=> {
      this.setState({
        err
      })
    })
  }

  render () {
    return (
      <div className="App">
        <header className="App-header">
          <Nav user={this.state.user} logout={this.logout} />
          

          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/about" component={About} />
            <Route exact path="/" component={Beers} />
            <Route exact path="/" component={Events} />
            <Route exact path="/" component={Contact} />
            <Route exact path="/login" render={(props)=> <Login {...props} fetchUser={this.fetchUser} />} />
            <Route exact path="/sign-up" component={Signup} />
            <Route path="/profile" render={(props)=><Profile {...props} user={this.state.user} updateUser={this.updateUser} />} />
          </Switch>

        </header>
        <Footer/>
      </div>
      
    )
  }
}

export default App;
