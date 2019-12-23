import React from 'react'

class Register extends React.Component{
    constructor(props)
    {
        super(props);
        this.state={
            email:'',
            password:'',
            name:'',
            lrank:'',
            lname:'',
            signinemail:''
        }
    }
    onEmailchange=(e)=>
    {
        this.setState({email:e.target.value});
    }
    
    onPasswordchange=(e)=>
    {
        this.setState({password:e.target.value});
    }

    onnamechange=(e)=>
    {
        this.setState({name:e.target.value});
    }

    onSubmit=(e)=>
    {
       e.preventDefault();
        fetch('https://morning-everglades-40719.herokuapp.com/register',{
            method:'post',
            headers:{'content-type':'application/Json'},
            body:JSON.stringify({
                email:this.state.email,
                pass:this.state.password,
                name:this.state.name
            })
        })
        .then(Response=>Response.json())
        .then(data=>{
            if(data!=='error')
            {
               this.setState({lrank:data[0].rank});
               this.setState({lname:data[0].name});
               this.setState({signinemail:data[0].email});
                this.props.onRoutchange('home',true,this.state.lrank,this.state.lname,this.state.signinemail);
                console.log(this.state.lname,this.state.lrank,this.state.signinemail)
            }
        }
        )
       
       
    }
    render()
    {
        return (
            <div>
                <article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
                <main className="pa4 black-80">
                        <form className="measure ">
                            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                            <legend className="f4 fw6 ph0 mh0">Register</legend>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
                                <input 
                                 onChange={this.onnamechange}
                                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="text" name="name"  id="name"/>
                            </div>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                                <input 
                                 onChange={this.onEmailchange}
                                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address"  id="email-address"/>
                            </div>
                            <div className="mv3">
                                <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                                <input 
                                 onChange={this.onPasswordchange}
                                className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password"  id="password"/>
                            </div>
                            </fieldset>
                            <div className="">
                            <input
                            onClick={this.onSubmit}
                            className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Register"/>
                            </div>
                            <br></br>
                        </form>
                    </main>

            </article>
            </div>
        )
    }
}

export default Register;
