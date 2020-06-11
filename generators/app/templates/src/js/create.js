// 在这里编写一些创建物体的create方法，并挂载到Gvo类的方法上，例如：创建某个几何体
const { Group, SphereBufferGeometry, MeshBasicMaterial, Mesh, Font, TextBufferGeometry, RepeatWrapping } = require('../lib/three.module');
const { TTFLoader } = require('../lib/TTFLoader');

module.exports = (Gvo) => {
  // 对传入的conf初始化
  function initConfig(mesh, conf) {
    if (conf) {
      const { position, rotation, scale, repeat } = conf;
      if (position) {
        const { x, y, z } = position;
        typeof x !== 'undefined' ? (mesh.position.x = x) : null;
        typeof y !== 'undefined' ? (mesh.position.y = y) : null;
        typeof z !== 'undefined' ? (mesh.position.z = z) : null;
      }
      if (rotation) {
        const { x, y, z } = rotation;
        typeof x !== 'undefined' ? (mesh.rotation.x = x) : null;
        typeof y !== 'undefined' ? (mesh.rotation.y = y) : null;
        typeof z !== 'undefined' ? (mesh.rotation.z = z) : null;
      }
      if (scale) {
        const { x, y, z } = scale;
        typeof x !== 'undefined' ? (mesh.scale.x = x) : null;
        typeof y !== 'undefined' ? (mesh.scale.y = y) : null;
        typeof z !== 'undefined' ? (mesh.scale.z = z) : null;
      }
      if (repeat) {
        const { x, y } = repeat;
        if (typeof x !== 'undefined') {
          // 设置x方向的重复数
          mesh.wrapS = RepeatWrapping;
          mesh.repeat.x = x;
        }
        if (typeof y !== 'undefined') {
          // 设置y方向的重复数
          mesh.wrapT = RepeatWrapping;
          mesh.repeat.y = y;
        }
      }
    }
  }
  // 创建一个分组group
  function createGroup(...arr) {
    const group = new Group();
    arr.forEach((item) => group.add(item));
    return group;
  }
  // 创建一个地球（球体）
  function createEarth(conf) {
    const geometry = new SphereBufferGeometry(5, 64, 64);
    // 这里注意路径的填写：打包后是 main.js 和 assets 文件夹在同一目录下，所以引用时要用 './' 
    // 如果用 '../' 也可以的原因是，ThreeJS内部加载路径时用了类似寻址的方法
    const texture = Gvo.TextureLoader.load("./assets/img/earth.png");
    const material = new MeshBasicMaterial({ map: texture });
    const mesh = new Mesh(geometry, material);
    initConfig(mesh, conf);
    return mesh;
  }
  // 创建立体3D文字
  function createText(text, color, conf) {
    return new Promise((res) => {
      new TTFLoader().load("./assets/font/MicrosoftYaHei-Bold.ttf", function (data) {
        const font = new Font(data);
        const geometry = new TextBufferGeometry(text, {
          font,
          size: 3,
          height: 1,
          curveSegments: 64,
        });
        geometry.center();
        const material = new MeshBasicMaterial({ color });
        const mesh = new Mesh(geometry, material);
        initConfig(mesh, conf);
        res(mesh);
      });
    });
  }
  // 创建一个克隆体
  function createClone(mesh, conf) {
    const newMesh = mesh.clone();
    initConfig(newMesh, conf);
    return newMesh;
  }

  Gvo.prototype.createGroup = createGroup;
  Gvo.prototype.createEarth = createEarth;
  Gvo.prototype.createText = createText;
  Gvo.prototype.createClone = createClone;
}
