import React from 'react';
import './App.css';
import Navigation from './Navigation/Navigation';
import Signin from './Signin/Signin';
import Logo from './Logo/Logo';
import ImageLinkForm from './ImageLinkForm/ImageLinkForm'
import Rank from './Rank/Rank';
import FaceRecoGnition from './FaceRecognition/FaceRecoGnition';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';
import Register from './Register/Register';
import Home from './Home';

const app = new Clarifai.App({
 apiKey: 'f5ad6ab9da7c4fec99febc9c34b384b8'
});




const particlesOptions = {
  particles: {
    number: {
      value: 150,
      density: {
        enable: true,
        value_area: 800
      }
    }
  }
}

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      input:'',
      imgUrl:'',
      box: {},
      route:'load',
      issignedin:false,
      email:'',
      data:
      {},
      rname:'',
      rentries:''
    };
    
  }
  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }

  displayFaceBox = (box) => {
    this.setState({box: box});
  }
    oninputchange=(e)=>
    {
     this.setState({input:e.target.value})
    }
  onsubmit=()=>
  {
   this.setState({imgUrl:this.state.input});
    app.models
    .predict(
    Clarifai.FACE_DETECT_MODEL,
        this.state.input
    )
    .then(response => {
      if (response) {
        fetch('https://morning-everglades-40719.herokuapp.com/insert', {
          method: 'put',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            email: this.state.email,
            r:this.state.rentries
          })
        })
        .then(response => response.json())
        .then(data=>{
            this.setState({rname:data[0].name})
            this.setState({rentries:data[0].rank})
            
        })
      }
      this.displayFaceBox(this.calculateFaceLocation(response))
    })
   
.catch(err => console.log(err));


}

  onroutechange=(route,bool,rank,name,email)=>
  {
    this.setState({rname:name});
    this.setState({rentries:rank});
    this.setState({route:route});
    this.setState({email:email});
    this.setState({issignedin:bool});
  }
  loaduser=(data)=>
  {
    this.setState({profile:{
      id:data.id,
      name:data.name,
      email:data.email,
      entries:data.entries,
      joined:data.joined
    }})
  }

  render()
  {
    console.log(this.state.rentries)
    return (
      <div className="App">
        <Particles className='particles'
        params={particlesOptions}/>   
       <Navigation issignedin={this.state.issignedin}  onRoutchange={this.onroutechange}/>
       {
       this.state.route==='load'?
     <div>
          <Home/>
        </div>
       :
       (
       this.state.route==='home'?
         <div>
         <Logo/>
         <Rank
          name={this.state.rname} entries={this.state.rentries}/>
         <ImageLinkForm onInputChange={this.oninputchange} onsubmit={this.onsubmit}/>
         <FaceRecoGnition box={this.state.box} imageUrl={this.state.imgUrl} />
         </div>
         :
         (
           this.state.route==='signin'?
           <Signin onRoutchange={this.onroutechange}/>:
  
           <Register loaduser={this.loaduser} onRoutchange={this.onroutechange}/>
         )
  
       )
     }
         </div>
       
      )
          
    
    }
    }

export default App;
