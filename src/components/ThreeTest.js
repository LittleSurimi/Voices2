import React, {Component, PropTypes} from 'react';
import ReactTHREE, {Renderer, Scene, Mesh, Object3D, PerspectiveCamera, PointCloud} from 'react-three';
import * as THREE from 'three'
import lodash from 'lodash';
window['THREE'] = THREE;
require('../lib/OrbitControls');

const HEIGHT = 600;
const WIDTH = 800;

export default class ThreeTest extends Component {
  constructor() {
    super();

    // define dots
    const materials = lodash.times(5, n => new THREE.PointsMaterial({
      size: n,
      color: new THREE.Color(Math.random(), Math.random(), Math.random())
    }));

    // create some random points
    const geometries = lodash.times(5, () => {
      const oneGeometry = new THREE.Geometry();
      let x, y, z;
      lodash.times(50000, function (n) {
        x = (Math.random() * 800) - 400;
        y = (Math.random() * 800) - 400;
        z = (Math.random() * 800) - 400;

        oneGeometry.vertices.push(new THREE.Vector3(x, y, z));
      });
      return oneGeometry;
    });

    const dots = lodash.times(5, n => ({
      material: materials[n],
      geometry: geometries[n],
    }));
    console.log(dots);

    this.state = {
      width: WIDTH,
      height: HEIGHT,
      // camera
      cameraprops: {
        fov: 75,
        aspect: WIDTH / HEIGHT, //aspectratio
        near: 1,
        far: 5000,
        position: new THREE.Vector3(0, 0, 600),
        lookat: new THREE.Vector3(0, 0, 0)
      },
      dots,
    }
  }

  render() {
    const {width, height, cameraprops, dots} = this.state;
    return (
      <Renderer background={0x202020} width={width} height={height}>
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

