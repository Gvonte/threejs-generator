// 入口文件
const Gvo = require('./src/gvo'); // 引入 Gvo 这个类
require('./src/js/common')(Gvo); // 扩展 Gvo 类的属性
require('./src/js/create')(Gvo); // 扩展 Gvo 类的方法 

const groupCommonFn = require('./src/group/groupCommon'); // 分组间公用的部分
const group1Fn = require('./src/group/group1'); // 第一个分组
const group2Fn = require('./src/group/group2'); // 第二个分组

const { createComposer } = require('./src/composer/composer'); // 后期处理函数

const gvonte = new Gvo("#canvas-frame", {
    rendererOption: {
        alpha: true,
        antialias: true
    }
}); // 新建 Gvo 类的实例

groupCommonFn(gvonte); // 初始化分组间公用的部分
(async function () {
    const { group1 } = await group1Fn(gvonte); // 新建第一个分组
    const { group2, group2Animate } = group2Fn(gvonte); // 新建第二个分组
    gvonte.scene.add(group1);
    gvonte.scene.add(group2);

    // 后期处理
    const bloomComposer = createComposer(gvonte);

    function animate() {
        // 分组运动函数
        group2Animate();

        // fps监控
        gvonte.stats.update();

        // gvonte.renderer.render(gvonte.scene, gvonte.camera);
        bloomComposer.render();
        requestAnimationFrame(animate);
    }
    animate();
})();