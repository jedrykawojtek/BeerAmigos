import React from "react";
import axios from "axios";
import Beer from "../components/Beer";
import "./Beers.css";

export default class Beers extends React.Component {
    state = {}
    componentDidMount() {
        debugger
        axios({
            url: `${process.env.REACT_APP_BACK_END_BASE_URL}beers/all`,
            method: "get",
            withCredentials: true
        })
        .then((response)=> {
            // put beeres in state
            let beers = response.data
            this.setState({beers: beers})
        })
    }

    render() {
        var allBeers = <h1>loading </h1>
        debugger
        if(this.state.beers) {
            allBeers = this.state.beers.map((beer)=> {
                debugger
           return <Beer 
                    userId={this.props.user._id}
                    {...beer}
                        >
                    {beer.name}
                  </Beer>
        }) 
    }
           return(
            <div className="AllBeers">
                {allBeers}
            </div>
        )
          
    }
}
