import React from "react";
import axios from "axios";
import { Link } from 'react-router-dom';
import "./Beer.css";

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
        .then(()=> {
            this.setState({deleteMessage: "Beer is deleted"})
        })
        .catch(() => this.setState({deleteMessage: "Something went wrong"}))
    }
    
    render() {
        return (
            <div className="grid-container">
             
                <div className="card"> 
               
                    <img className="pic" src={`http://localhodst:3001/uploads/${this.props.pic}`} alt="Beer picture"/>
                        
                            <h1>{this.props.children}</h1>
                            <p className="type">{this.props.type}</p>
                            <p className="tagline">{this.props.tagline}</p>
                            <p className="description">{this.props.description}</p>
                            {this.props.userId === this.props.creator && 
                                <>
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
                                    <p><button onClick={this.deleteHandler}  placeholder="delete">Delete Beer</button></p>
                                </>
                            }
                            {this.state.deleteMessage && <p>{this.state.deleteMessage}</p>}
                        </div>             
                </div>
                
           
        )
    }

}

