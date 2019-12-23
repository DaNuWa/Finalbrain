import React from 'react'

class Signin extends React.Component{
    constructor(props)
    {
        super(props);
        this.state={
            signinemail:'',
            signinpassword:'',
            rank:'',
            name:''
        }
    }
    onEmailchange=(e)=>
    {
        this.setState({signinemail:e.target.value});
    }
    
    onPasswordchange=(e)=>
    {
        this.setState({signinpassword:e.target.value});
    }
    onSubmit=(e)=>
    {
        e.preventDefault();
        fetch('https://morning-everglades-40719.herokuapp.com/signin',{
            method:'post',
            headers:{'content-type':'application/Json'},
            body:JSON.stringify({
                email:this.state.signinemail,
                pass:this.state.signinpassword
            })
        })
        .then(Response=>Response.json())
        .then(data=>{
            console.log('hi data is ',data)
            if(data!=='error')
            {
                console.log(data);
                this.setState({rank:data[0].rank})
                this.setState({name:data[0].name})
                this.props.onRoutchange('home',true,this.state.rank,this.state.name,this.state.signinemail)
                
                
            }
        })
       
    }
    render()
    {
        const {onRoutchange}=this.props;
        return (
            <article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
                <main className="pa4 black-80">
                        <form className="measure ">
                            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                            <legend className="f4 fw6 ph0 mh0">Sign In</legend>
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
                            className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Sign in"/>
                            </div>
                            <br></br>
                            <input
                            onClick={()=>onRoutchange('register',false)}
                            className=" ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Register"/>
                        </form>
                    </main>

            </article>
        )
  }
}

export default Signin;
