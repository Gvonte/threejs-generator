// Gvo类
const { Scene, PerspectiveCamera, WebGLRenderer, Color, AmbientLight } = require('./lib/three.module');
const { OrbitControls } = require('./lib/OrbitControls');
const Stats = require('./lib/stats.module');

class Gvo {
  constructor(selector, ThreeOption, lightOption) {
    this.initThree(selector, ThreeOption); // 默认自动初始化scene、camera、renderer
    this.initLight(lightOption); // 默认自动初始化AmbientLight
    this.customInit(); // 用户自定义初始化
    this.initControls(); // 默认自动初始化OrbitControls
    this.initStats(); // 默认自动初始化Stats
  }
  // 在这里编写您的初始化
  customInit() {
    this.scene.background = new Color("rgb(99, 99, 99)");
    this.camera.position.set(5, 10, 50);
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }
  // 初始化三大件：场景、相机、渲染器
  initThree(selector, { cameraOption, rendererOption } = {}) {
    this.scene = new Scene();
    if (cameraOption && Array.isArray(cameraOption)) {
      this.camera = new PerspectiveCamera(...cameraOption);
    } else {
      this.camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    }
    this.renderer = new WebGLRenderer(rendererOption);
    document.querySelector(selector).appendChild(this.renderer.domElement);
  }
  // 初始化灯光
  initLight(lightOption = 0xffffff) {
    this.ambientLight = new AmbientLight(lightOption); // 自然光，每个几何体的每个面都有光
    this.scene.add(this.ambientLight);
  }
  // 初始化控制器
  initControls() {
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
  }
  // 添加fps
  initStats() {
    this.stats = new Stats();
    document.body.appendChild(this.stats.dom);
  }
}

module.exports = Gvo;
