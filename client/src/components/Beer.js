import React from "react";
import axios from "axios";
import { Link } from 'react-router-dom';
import "./Beer.css";
import history from "../history";


export default class Beer extends React.Component {
    constructor() {
        super()
        this.state = {
            deleteMessage: ""
        }
    }

    deleteHandler = () => {
         axios({
            url: `${process.env.REACT_APP_BACK_END_BASE_URL}beers/delete?id=${this.props._id}`,
            method: "get",
            withCredentials: true
        })
        .then((response)=> {
            this.setState({deleteMessage: "Beer is deleted"}) 
            debugger
            setTimeout( () => this.props.deleteBeer(this.props.index), 1000)
          
        })
        .catch(() => this.setState({deleteMessage: "Something went wrong"}))
    }
    
    render() {
        return (
            // <div className="grid-container">
              
            <div className="col-6"> 
                        <div className="card"> 
                            <div className="img-card-container">
                                <img className="pic" src={`${process.env.REACT_APP_BACK_END_BASE_URL}uploads/${this.props.pic}`} alt="Beer picture"/>
                            </div>
                         
                                
                            <h1 className="name">Name: {this.props.children}</h1>
                            <p className="type">Type: {this.props.type}</p>
                            <p className="tagline">Tagline: {this.props.tagline}</p>
                            <p className="description">Description: {this.props.description}</p>
                            {this.props.userId === this.props.creator && 
                                <>
                                    <div className="card-buttons">
                                        <Link to={{
                                                pathname: `/beers/edit`,
                                                    state: {
                                                    pic: this.props.pic,
                                                    name: this.props.name,
                                                    tagline: this.props.tagline,
                                                    type: this.props.type,
                                                    description: this.props.description,
                                                    id: this.props._id,                                       
                                                }
                                            }}>
                                            <p><button placeholder="edit">Edit Beer</button></p>
                                        </Link>
                                        <p className="card-btn-delete"><button onClick={this.deleteHandler}  placeholder="delete">Delete Beer</button></p>
                                    </div>
                                    
                                </>
                            }
                            <p style={{color: "black"}}>{this.state.deleteMessage}</p>
                        </div>   

</div>
                         
                
           
        )
    }

}

