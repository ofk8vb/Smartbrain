import React from 'react';
import Navigation from'./Components/Navigation/Navigation.js';
import Logo from './Components/Logo/Logo.js'
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm'
import './App.css';
import Rank from './Components/Rank/Rank.js'
import Particles from 'react-particles-js';

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




function App() {
  return (
    <div className="App">
       <Particles className='particles'
                params={particlesOptions}
       />
      <Navigation/>
      <Logo />
      <Rank />
      <ImageLinkForm />
      {/* <FaceRecognition /> */}
    </div>
  );
}

export default App;
