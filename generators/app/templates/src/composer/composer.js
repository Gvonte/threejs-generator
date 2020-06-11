// 在这里编写您的后期处理代码，例如：EffectComposer
const { Vector2 } = require('../lib/three.module');
const { EffectComposer } = require('../lib/EffectComposer');
const { RenderPass } = require('../lib/RenderPass');
const { UnrealBloomPass } = require('../lib/UnrealBloomPass');

// 后期处理，效果合成器
function createComposer(gvonte) {
  const bloomComposer = new EffectComposer(gvonte.renderer);
  const renderPass = new RenderPass(gvonte.scene, gvonte.camera);
  const bloomPass = createUnrealBloomPass();
  bloomComposer.addPass(renderPass);
  bloomComposer.addPass(bloomPass);
  return bloomComposer;
}
// UnrealBloomPass，辉光效果
function createUnrealBloomPass() {
  const bloomPass = new UnrealBloomPass(
    new Vector2(window.innerWidth, window.innerHeight),
    1.5,
    0.4,
    0.85
  );
  const params = {
    exposure: 1,
    bloomThreshold: 0.2,
    bloomStrength: 0.25, //5
    bloomRadius: 0,
  };
  bloomPass.threshold = params.bloomThreshold;
  bloomPass.strength = params.bloomStrength;
  bloomPass.radius = params.bloomRadius;
  return bloomPass;
}
module.exports = { createComposer };