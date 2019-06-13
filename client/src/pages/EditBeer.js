import React, { Component } from 'react'
import axios from "axios"
import "./Beers.css"
import "./Profile.css"
// import Beer from "../components/Beer";


export default class EditBeer extends Component {
    constructor(props){
        super(props)
        let beer = props.location.state
        this.state = {
            name: beer.name,
            tagline: beer.tagline,
            type: beer.type,
            description: beer.description,
            id: beer.id,
            message: "",
            beer: {},
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
            }, ()=> {
                var history = this.props.history
                setTimeout(()=> {
                    history.push("/profile")
                }, 1000)
            })             
        })
        .catch((response)=> {
            this.setState({
                message:  response.data
            })
        })
    }

    toggleSubmitForm = () =>{
        this.setState({show: this.state.show});
    }

    render() {
       
        return (
            <> 
            <div className="flex-container">
                  
                  
                        <form ref={this.formRef} onSubmit={this.submit} id="theForm">
                        <button style={{marginBottom: "20px"}}onClick={this.toggleSubmitForm}>Close this window</button>
                            <input onChange={this.handleChange}type="text" name="name" value={this.state.name} />
                            <input onChange={this.handleChange}type="text" name="tagline" value={this.state.tagline} />
                            <input onChange={this.handleChange} type="text" name="type" value={this.state.type}  />
                            <input onChange={this.handleChange} type="file" name="beer-pic" />
                            <input type="text" hidden value={this.state.id} name="id"/>
                            <textarea onChange={this.handleChange} name="description"  value={this.state.description} >  </textarea>
                            <button type="submit">Submit</button>
                        </form> 
                    {this.state.message? <h1>{this.state.message}</h1>: ""}
                </div>
                {/* <div className="flex-container">
                    <button onClick={this.toggleSubmitForm}>Edit your beer</button>
                    {this.state.show && 
                        <form ref={this.formRef} onSubmit={this.submit} id="theForm">
                            <input onChange={this.handleChange}type="text" name="name" value={this.state.name} />
                            <input onChange={this.handleChange}type="text" name="tagline" value={this.state.tagline} />
                            <input onChange={this.handleChange} type="text" name="type" value={this.state.type}  />
                            <input onChange={this.handleChange} type="file" name="beer-pic" />
                            <input type="text" hidden value={this.state.id} name="id"/>
                            <textarea onChange={this.handleChange} name="description"  value={this.state.description} >  </textarea>
                            <button type="submit">Submit</button>
                        </form> 
                    }
                    {this.state.message? <h1>{this.state.message}</h1>: ""}
                </div> */}
                {/* <EditBeer/> */}
                {/* {beers.map(beer =>{ 
                    return <Beer userId={this.props.user._id} {...beer}> {beer.name}</Beer>})} */}
            </>
        )
    }
}