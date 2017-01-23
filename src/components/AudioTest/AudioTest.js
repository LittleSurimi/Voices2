import React, { Component, PropTypes } from 'react';
import lodash from 'lodash';
import * as THREE from 'three';
window['THREE'] = THREE;

import ReactTHREE, { Renderer, Scene, Mesh, Object3D, PerspectiveCamera, PointCloud, Line } from 'react-three';

const HEIGHT = window.innerHeight;
const WIDTH = window.innerWidth;
const bytes = 32;
let frequencyDomain = [];
let frameFrequency = [];


const createShape = (position) =>{
  const material = new THREE.Color(0x444444);
  const geometry =  new THREE.Geometry();
  const height = position;
    geometry.vertices.push(
      new THREE.Vector3( -100, 0, 0 ),
      new THREE.Vector3( 0, -height, 0 ),
      new THREE.Vector3( 100, 0, 0 )
    );

  return geometry;
  console.log(geometry);

}

export default class AudioTest extends Component {
  constructor(){
    super();

    //Create an AudioListener and add it to the camera
    const listener = new THREE.AudioListener();

    // create a global audio source
    const sound = new THREE.Audio(listener);
    const audioLoader = new THREE.AudioLoader();
    let playState = 0; // 0 before playing, 1 playing, 2 has played
    let geometry = [];


    //Load a sound and set it as the Audio object's buffer
    audioLoader.load(require('!file!../../assets/agathe.mp3'), function(buffer) {
        sound.setBuffer(buffer);
        sound.setLoop(false);
        sound.setVolume(0.1);
        sound.play();
    });


    //Create an AudioAnalyser, passing in the sound and desired fftSize and stop when sound is not playing
    var analyser = new THREE.AudioAnalyser(sound, bytes);



    function analyseSound(){
        if(playState < 2){ // Is playing or has not started Yet
          // get the frequency for that frame
          // returns an array.
          // Array.length can be define here : THREE.AudioAnalyser(sound, array.length) --> const bytes
          var freq = analyser.getFrequencyData(analyser);
          var avgFreq = analyser.getAverageFrequency(analyser);


          // Request animation for that frame ;
          window.requestAnimationFrame(analyseSound);
          // merge all the array returned by the frequency analyser
          frequencyDomain = frequencyDomain.concat(...freq);
          frameFrequency.push(avgFreq);


          if(playState == 0 && sound.isPlaying) playState++; // has not started Yet
          else if(playState == 1 && !sound.isPlaying) { // has played
              playState++;
              console.log(frameFrequency);
          }
        }
    }
    window.requestAnimationFrame(analyseSound);
    createShape(100);

    this.state = {
          width: WIDTH,
          height: HEIGHT,
          background : 0xf2f2f2,
          material: new THREE.LineBasicMaterial({color: 0xff0000}),
          geometry: geometry,
          // camera
          cameraprops: {
              fov: 75,
              aspect: WIDTH / HEIGHT, //aspectratio
              near: 1,
              far: 5000,
              position: new THREE.Vector3(0, 0, 1200),
              lookat: new THREE.Vector3(0, 0, 0)
          }
      }
  }

  render() {
    const { width, height, cameraprops, background, geometry, material } = this.state;
    return (
      <Renderer width={width} height={height} background={background} >
        <Scene camera="maincamera" >
          <PerspectiveCamera name="maincamera" {...cameraprops} />
          <Line geometry={geometry} material={material}/>
        </Scene>
      </Renderer>
    );
  }
}
