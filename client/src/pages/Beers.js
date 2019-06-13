import React from "react";
import axios from "axios";
import Beer from "../components/Beer";
import "../components/Beer.css";

export default class Beers extends React.Component {
    state = {}
    componentDidMount() {
        console.log(process.env.REACT_APP_BACK_END_BASE_URL)
        axios({
            url: `${process.env.REACT_APP_BACK_END_BASE_URL}beers/all`,
            method: "get",
            withCredentials: true
        })
        .then((response)=> {
            // put beeres in state
            let beers = response.data
            this.setState({beers: beers})
        }).catch(err => {

        })
    }

    deleteBeer = (index) => {
        const beers = [...this.state.beers];
        beers.splice(index,1);
        this.setState({beers});
    }

    render() {
        
        var allBeers = <h1>loading </h1>
        if(this.state.beers) {
            
            allBeers = this.state.beers.map((beer,i)=> 
                <Beer 
                 index={i}
                    deleteBeer={this.deleteBeer}
                    userId={this.props.user._id}
                    {...beer}
                        >
                    {beer.name}
                </Beer>
            ) 
        }
           return(
          
                <div className="beer-card-container">
                    <div className="row-card">
                        {allBeers}
                    </div>
                </div>
    
        )
          
    }
}
