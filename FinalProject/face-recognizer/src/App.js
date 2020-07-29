import React from 'react';
import Navigation from'./Components/Navigation/Navigation.js';
import Logo from './Components/Logo/Logo.js'
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm'
import './App.css';
import Rank from './Components/Rank/Rank.js'
import Particles from 'react-particles-js';
import {Component} from 'react';
import Clarifai from 'clarifai';
import FaceRecognition from './Components/FaceRecognition/FaceRecognition.js'

const app = new Clarifai.App({
  apiKey: 'cbe840c37fa54260afb79b8c942484d1'
});

const particlesOptions ={
  particles: {
    number:{
      value:30,
      density:{
        enable:true,
        value_area:800
      }
    }
    
    
  }
}

class App extends Component {

  constructor(){
    super();
    this.state ={
      input: '',
      imageUrl:''
    }
  }

  onInputChange=(event)=>{
    this.setState({input: event.target.value})
  }

  onButtonSubmit=()=>{
    this.setState({imageUrl:this.state.input})
    app.models.predict(Clarifai.FACE_DETECT_MODEL,
    this.state.input)
    .then(
    function(response){
      console.log(response.outputs[0].data.regions[0].region_info.bounding_box);
    },
    function(err){

    }
    );
  }

  render(){
  return (
    <div className="App">
       <Particles className='particles'
                params={particlesOptions}
       />
      <Navigation/>
      <Logo />
      <Rank />
      <ImageLinkForm onInputChange={this.onInputChange} 
      onButtonSubmit={this.onButtonSubmit}/>
      <FaceRecognition imageUrl={this.state.imageUrl}/>
    </div>
  );
  }
}

export default App;
