const Depth = 4;

export const mapConfig = {
  // 地图挤出厚度
  mapDepth: Depth,
  // 地图透明度
  mapTransparent: true,
  mapOpacity: 0.5,
  // 地图颜色
  mapColor: "#0066b9", // 地图原本颜色
  mapHoverColor: "#0092c3", // 地图hover颜色
  // 地图人数渐变
  mapColorGradient: ["#51ffff", "#2c82ff", "#286cff", "#35acff"],
  // 地图侧面渐变
  mapSideColor1: "#3F9FF3",
  mapSideColor2: "#266BF0",
  // 上面的line
  topLineColor: 0x41c0fb,
  topLineWidth: 3,
  topLineZIndex: Depth + 0.5,
  // label 2d高度
  label2dZIndex: Depth + 2,
  // spot
  spotZIndex: Depth + 0.2,
};
