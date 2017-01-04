import React, { Component, PropTypes } from 'react';
import ReactTHREE, { Renderer, Scene, Mesh, Object3D, PerspectiveCamera, PointCloud } from 'react-three';
import * as THREE from 'three'
import lodash from 'lodash';
window['THREE'] = THREE;
require('../lib/OrbitControls');

const HEIGHT = window.innerHeight;
const WIDTH = window.innerWidth;
var uint8 = new Uint8Array(1024);
var uint8v2 = new Uint8Array(1024);
let fftArray = [];
let ampArray = [];

const createPointsPosition = (positions) => {
    let pointPositionArray = [];
    let logLen = parseInt(Math.sqrt(positions.length));
    let pX = 0;
    let pY = 0;
    let pZ = 0;
    let mainRay = HEIGHT / 4;
    let minRay = 1;
    for (var i = 0; i < logLen; i++) {
        for (var j = 0; j < logLen; j++) {
            var pos = (i * logLen) + j;
            var a = j / logLen * Math.PI;
            var b = i / logLen * Math.PI;
            pX = Math.sin(2 * a) * (mainRay + positions[pos]) * Math.sin(b);
            pY = Math.cos(b) * (mainRay + positions[pos]);
            pZ = Math.cos(2 * a) * (mainRay + positions[pos]) * Math.sin(b);

            let pointRay = minRay + positions[pos] / 1024;
            if (positions[pos] == 0) {
                pointRay = 0;
            }
            // Store values into sphereArray
            pointPositionArray.push({
                'pX': pX,
                'pY': pY,
                'pZ': pZ,
                'pointRay': pointRay
            });
        }
    }
    return pointPositionArray;
}

const CreateRingsColor = (colors) => {
    let ringColorArray = [];
    let ringHue = 0;
    let ringSaturation = 0;
    let ringLightness = 0;
    for (var i = 0; i < colors.length; i++) {
        if (colors[i]>=1){
          ringHue = 360 / colors[i];
        }
        else{
          ringHue = 0;
        }

        if (colors[i]>=50){
          ringSaturation = 100 - colors[i] ;
          ringLightness = 100 - colors[i] ;
        }
        else if (colors[i]==0){
          ringSaturation = 0 ;
          ringLightness = 0 ;

        }
        else{
          ringSaturation = 50 + colors[i] ;
          ringLightness = 50 - colors[i] ;
        }

        ringColorArray.push({
          'ringHue':ringHue,
          'ringSaturation':ringSaturation,
          'ringLightness':ringLightness
        });
    }
    console.log('colors',ringColorArray.ringHue);
    return ringColorArray;
}

const createDots = (pointPositionArray, ringColorArray)=> {
        // DIFERRENCE BTW .map AND lodash.times();
        // const a = [1, 2, 3];
        // const b = a.map((n)=> n * 2); //[2, 4, 6]
        // const c = lodash.times(a.length, (i) => a[i] * 2);

        const rings = pointPositionArray.length / 2048;
        const dotCount = pointPositionArray.length;
        // define dots
        const materials = lodash.times(rings, n => new THREE.PointsMaterial({
           size: 1,
           color: new THREE.Color(`hsl(${ringColorArray[n].ringHue}, ${ringColorArray[n].ringSaturation}%, ${ringColorArray[n].ringLightness}%)`)
         }));


        // create some random points
        const geometries = lodash.times(rings, (n) => {
          const oneGeometry = new THREE.Geometry();
          for(let i = 0; i < rings; i++){ // dots in one ring
            const pointPosition = pointPositionArray[i + 2048 * n];

            const x = pointPosition.pX;
            const y = pointPosition.pY;
            const z = pointPosition.pZ;

            oneGeometry.vertices.push(new THREE.Vector3(x, y, z));
          }
            return oneGeometry;
        });

        const dots = lodash.times(rings, n => ({
            material: materials[n],
            geometry: geometries[n],
        }));
        return dots;
}

export default class ThreeTest extends Component {
    constructor() {
        super();
        this.renderFrame = this.renderFrame.bind(this);

        // define sound
        const listener = new THREE.AudioListener();
        //camera.add( listener );

        // create a global audio source
        const sound = new THREE.Audio(listener);
        const audioLoader = new THREE.AudioLoader();
        let playStarted = false;
        let dots = [];

        //Load a sound and set it as the Audio object's buffer
        audioLoader.load(require('!file!../assets/agathe.mp3'), function(buffer) {
            sound.setBuffer(buffer);
            sound.setLoop(false);
            sound.setVolume(0.5);
            sound.play();
            playStarted = true;
        });

        //Create an AudioAnalyser, passing in the sound and desired fftSize and stop when sound is not playing
        var analyser = new THREE.AudioAnalyser(sound, 2048);

        const clearFlag = setInterval(() => {
            if (!sound.isPlaying && playStarted) {
                console.log('not playing');
                clearInterval(clearFlag);
                console.log('w', ampArray.length);
                this.renderFrame();
                console.log('setted');
            } else {
                analyser.analyser.getByteFrequencyData(uint8);
                fftArray = fftArray.concat(...uint8);

                // get amplityde
                analyser.analyser.getByteTimeDomainData(uint8v2);
                const max = lodash.max(uint8v2)-128;
                ampArray.push(max);
            }
        }, 1000 / 60);

        this.state = {
            width: WIDTH,
            height: HEIGHT,
            // camera
            cameraprops: {
                fov: 75,
                aspect: WIDTH / HEIGHT, //aspectratio
                near: 1,
                far: 5000,
                position: new THREE.Vector3(0, 0, 1200),
                lookat: new THREE.Vector3(0, 0, 0)
            },
            dots,
        }
    }

    renderFrame(){
      const len = ampArray.length;
      let count = 0;
      const cancelFlag = setInterval(()=> {
        console.log(count);
        if(count >= len){
          clearInterval(cancelFlag);
        }
        let pointPositionArray = createPointsPosition(fftArray.slice(0, fftArray.length/len * count));
        let ringColorArray = CreateRingsColor(ampArray.slice(0, count))
        let dots = createDots(pointPositionArray,ringColorArray);
        this.setState({dots: dots});
        count = count + 23;
      }, 1000 / 12)

    }

    render() {
            const { width, height, cameraprops, dots } = this.state;
    return (
      <Renderer width={width} height={height}>
        <Scene width={width} height={height} camera="maincamera" orbitControls={THREE.OrbitControls}>
          <PerspectiveCamera name="maincamera" {...cameraprops} />
          {
            dots.map(({material, geometry})=> ( <PointCloud geometry={geometry} material={material}/> ))
          }
        </Scene>
      </Renderer>
    );
      }
  }
