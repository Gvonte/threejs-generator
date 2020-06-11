// 在这里编写您的第二个分组（如果有的话）
module.exports = (gvonte) => {
    const { earth } = gvonte.groupCommon;
    const earth1 = gvonte.createClone(earth);
    const group2 = gvonte.createGroup(earth1);
    group2.position.x = -30;
    const group2Animate = function () {
        earth1.rotation.y += Math.PI / 96;
    };
    gvonte.group2 = group2;
    gvonte.group2Animate = group2Animate;
    return { group2, group2Animate }
}