// 在这里编写全局变量，将挂载到Gvo类的属性上
const { TextureLoader } = require('../lib/three.module');

module.exports = (Gvo) => {
    Gvo.TextureLoader = new TextureLoader();
};