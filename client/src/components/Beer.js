import React from "react";
import axios from "axios";
import { Link } from 'react-router-dom';

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
            <div className="beer-card">
                <h1>{this.props.children}</h1>
                <p>{this.props.description}</p>
                <p>{this.props.tagline}</p>
                <p>{this.props.type}</p>
                <img className="pic" src={`http://localhost:3001/uploads/${this.props.pic}`} alt="Beer picture"/>
                {this.props.userId === this.props.creator && 
                    <>
                        <button placeholder="edit"><Link to={`beers/edit?id=${this.props._id}`}>Edit Beer</Link></button>
                        <button onClick={this.deleteHandler}  placeholder="delete">Delete Beer</button>
                    </>
                }
                {this.state.deleteMessage && <p>{this.state.deleteMessage}</p>}
    
            </div>
        )
    }

}

