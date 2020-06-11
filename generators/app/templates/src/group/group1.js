// 在这里编写您的第一个分组（如果有的话）
module.exports = async (gvonte) => {
    const { earth } = gvonte.groupCommon;
    const earth1 = gvonte.createClone(earth, { position: { z: -10 } });
    const text = await gvonte.createText("欢迎使用Gvonte脚手架", "rgb(210, 178, 124)", {
        position: { z: 10 },
    });
    const group1 = gvonte.createGroup(earth1, text);
    group1.position.x = 10;
    gvonte.group1 = group1;
    return { group1 }
};

