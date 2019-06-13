import React, { Component } from 'react'
import axios from "axios"
import "./Login.css"
import "./Profile.css"
import CreateBeer from "./CreateBeer"
import Beer from "../components/Beer";

export default class Profile extends Component {
    constructor(props){
        super(props)
        this.state = {
            username: props.user.username,
            profilePic: "",
            password: "password",
            show:false
        }
        this.formRef = React.createRef(); // new
        this.handleChange = this.handleChange.bind(this);
        this.submit = this.submit.bind(this);

    }
    handleChange(e){
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    submit(e) {
        e.preventDefault();
        let form = this.formRef.current // document.getElementById("theForm")
        let formData = new FormData(form) // new

        axios({
            url: `${process.env.REACT_APP_BACK_END_BASE_URL}users/update`,
            data: formData,
            method: "post",
            headers: {'Content-Type': 'multipart/form-data' }, //new
            withCredentials: true
        })
        .then((response)=> {
            this.props.updateUser(response.data.user);
        })
        .catch((user)=> {
            debugger
        })
    }
    toggleSubmitForm = () =>{
        this.setState({show: !this.state.show});
    }

    render() {
        
        const beers = this.props.user.beersCreated ? this.props.user.beersCreated : [];
        return (

            <>
            <div className="user-greeting"> <p>Welcome {this.props.user.username}</p>
            </div>

            <div className="flex-container">

            { this.props.user.profilePic? 
                        <img id="profile-pic" src={`${process.env.REACT_APP_BACK_END_BASE_URL}${this.props.user.profilePic}`} alt="User"/>
                        :
                        <h5>Please upload your profile picture</h5>
                }
            <button onClick={this.toggleSubmitForm}>Edit your profile</button>
            {this.state.show &&               
                    <form ref={this.formRef} /*new*/ onSubmit={this.submit} id="theForm">
                        <input onChange={this.handleChange}type="text" name="username" value={this.state.username}/>
                        <input onChange={this.handleChange}type="password" name="password" value={this.state.password} />
                        <input onChange={this.handleChange}type="file" name="profilePic" value={this.state.profilePic} />
                        <button type="submit">Submit</button>
                    </form>                   
              }
                 
            </div>
            <div className="Beer-list"></div>
            <CreateBeer/>
            {beers.map(beer =>{ 
                return <Beer userId={this.props.user._id} {...beer}> {beer.name}</Beer>})}

            </>

        )
    }
}
