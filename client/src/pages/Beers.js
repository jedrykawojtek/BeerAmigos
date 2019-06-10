import React from "react";
import axios from "axios";

export default class Beers extends React.Component {

    componentDidMount() {
        axios({
            url: `${process.env.REACT_APP_BACK_END_BASE_URL}beers/all`,
            method: "get"
        })
        .then((beers)=> {
            // put beeres in state
        })
    }

    render() {
        var allBeers = <h1>loading</h1>
        if(this.state.beers) {
            
            allBeers = this.state.beers.map((beer)=> (
                <h1>{beer.name}</h1>
        <>         
                <Beer>{beer.name}</Beer>
                  
            ))
              
        }
        
        return(
            
                <div>
                    {allBeers}
                </div>
            </>   
        )
          
    }
}
