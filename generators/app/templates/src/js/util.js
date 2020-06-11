// 在这里编写你的工具类方法
const { Vector2 } = require('../lib/three.module')

// 计算对应UV坐标
function computeUV(geometry) {
  geometry.computeBoundingBox(); // 计算外边界矩形，这样才能得到geometry的boundingBox属性值
  const max = geometry.boundingBox.max,
    min = geometry.boundingBox.min; // 获取最大、最小值
  const offset = new Vector2(0 - min.x, 0 - min.y); // 计算偏移量
  const range = new Vector2(max.x - min.x, max.y - min.y); // 计算范围
  const uvArr = geometry.getAttribute("uv");
  uvArr.array = uvArr.array.map((item, index) =>
    index % 2 ? item / range.y + offset.y : item / range.x + offset.x
  );
  geometry.setAttribute("uv", uvArr); // 将geometry的uv属性设置成我们刚刚计算出来的新uv值
  geometry.uvsNeedUpdate = true; // needUpdate必须为true才会更新
}
module.exports = { mergeImage, computeUV }
