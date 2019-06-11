import React, { Component } from 'react'
import axios from "axios"
import "./Login.css"
import "./Profile.css"

export default class EditBeer extends Component {
    constructor(props){
        super(props)
        this.state = {
            name: "",
            tagline: "",
            type: "",
            description: "",
            pic: "",
            message: "",
            beer: {}
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
            url: `${process.env.REACT_APP_BACK_END_BASE_URL}beers/edit`,
            data: formData,
            method: "post",
            withCredentials: true
        })
        .then((response)=> {
            this.setState({
                message: "Beer updated to brewery",
                name: "",
                tagline: "",
                description: "",
                pic: "",
                type: ""
            })
        })
        .catch((user)=> {
            debugger
        })
    }
    componentDidMount() {
        axios({
            url: `${process.env.REACT_APP_BACK_END_BASE_URL}beers/edit${this.props.location.search}`,
            method: "get",
            withCredentials: true
        })
        .then((response) => {
            this.setState({beer: response})
        })
        .catch(err => console.log(err))
    }
    render() {
        return (

            <> 
            <div className="flex-container">
                <h3>Edit your beer</h3>
                <form ref={this.formRef} /*new*/ onSubmit={this.submit} id="theForm">
                    <input onChange={this.handleChange}type="text" name="name" value={this.state.name} placeholder="Beer name"/>
                    <input onChange={this.handleChange}type="text" name="tagline" value={this.state.tagline} placeholder="Beer tagline"/>
                    <input onChange={this.handleChange} type="text" name="type" value={this.state.type}  placeholder="Beer type"/>
                    <input onChange={this.handleChange} type="file" name="beer-pic" />
                    <textarea onChange={this.handleChange} name="description"  placeholder="Beer description" value={this.state.description} >  </textarea>
                    
                    {/* <input onChange={this.handleChange}type="file" name="pic" value={this.state.pic} /> */}
                    <button type="submit">Submit</button>
                </form>
                {this.state.message? <h1>{this.state.message}</h1>: ""}
            </div>
            </>
        )
    }
}