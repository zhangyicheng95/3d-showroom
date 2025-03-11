import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

/* 
*  @tips 
*  开启线图拖尾效果一卡一卡，因为圆的旋转和缩放使用的定时动画。解决方案：切图带拖尾效果。
*  数据中通过 desc 对象描述绘制信息
*    @type：线图轨迹。 0=》无，1=》外到内，2=》内到外，3 =》 双向
*    @angle：相对于初始方向的逆时针夹角。默认从正东方向开始沿逆时针方向均匀分布。
*  CalutePointToSplitCircle 计算外层节点分布位置
*    @stratAngle：初始节点相对于初始方向的逆时针夹角
*    @raduis：外层节点中心与中心点的距离
*    @nodeRadius：外层节点自己的半径
*    @emptyCenterRadius：中心点的半径
*/

interface Props {
  data: any;
}

const ThermalDistributionCharts: React.FC<Props> = (props: any) => {
  let { data = [] } = props;
  const domRef = useRef<any>();
  const myChartRef = useRef<any>();
  const timerRef = useRef<any>();

  useEffect(() => {
    setTimeout(() => {
      if (!myChartRef.current) {
        myChartRef.current = echarts.init(domRef.current);
      };
      let geoJson: any = {};
      var currentIndex = 0;
      var timeTitle = ['2015', '2016', '2017', '2018', '2019'];
      init(100000);
      function init(adcode: any) {
        fetch(`/geoJson/${adcode}.json`)
          .then((res) => {
            return res.text();
          })
          .then((res) => {
            geoJson = JSON.parse(res);
            getMapData();
          });
      };
      //获取数据    
      function getMapData() {
        let mapData: any = [],
          pointData: any = [],
          sum = 0;
        geoJson.features.forEach((item: any) => {
          if (!!item?.properties?.center) {
            let value = Math.random() * 3000;
            mapData.push({
              name: item.properties.name,
              value: value,
              cityCode: item.properties.adcode
            });
            pointData.push({
              name: item.properties.name,
              value: [item.properties.center[0], item.properties.center[1], value],
              cityCode: item.properties.adcode
            });
            sum += value;
          };
        });
        mapData = mapData.sort(function (a: any, b: any) {
          return b.value - a.value;
        });

        initEchartMap(mapData, sum, pointData)
      };
      //渲染echarts
      function initEchartMap(mapData: any, sum: any, pointData: any) {
        const xData: any = [],
          yData: any = [];
        let min: any = mapData[mapData.length - 1].value;
        let max: any = mapData[0].value;
        if (mapData.length === 1) {
          min = 0;
        }
        mapData.forEach((c: any) => {
          xData.unshift(c.name)
          yData.unshift(c.value)
        })
        //这里做个切换，全国的时候才显示南海诸岛  只有当注册的名字为china的时候才会显示南海诸岛
        echarts.registerMap('china', geoJson);
        const option = {
          baseOption: {
            tooltip: {
              show: false,
            },
            grid: {
              right: '0%',
              top: '10%',
              bottom: '0%',
              left: '0%'
            },
            geo: {
              map: 'china',
              zoom: 1.4,
              roam: true,
              left: '15%',
              right: '15%',
              top: '17%',
              bottom: '0%',
              tooltip: {
                show: false,
              },
              label: {
                normal: {
                  show: false,
                },
                emphasis: {
                  show: false,
                }
              },
              itemStyle: {
                normal: {
                  areaColor: '#24CFF4',
                  borderColor: '#53D9FF',
                  borderWidth: 1.3,
                  shadowBlur: 15,
                  shadowColor: 'rgb(58,115,192)',
                  shadowOffsetX: 7,
                  shadowOffsetY: 6,
                },
              },
            },
            xAxis: {
              type: 'value',
              scale: true,
              position: 'top',
              boundaryGap: false,
              splitLine: {
                show: false
              },
              axisLine: {
                show: false,
                lineStyle: {
                  color: '#455B77'
                }
              },
              axisTick: {
                show: false
              },
            },
            yAxis: {
              type: 'category',
              nameGap: 16,
              axisLine: {
                show: false,
                lineStyle: {
                  color: '#455B77'
                }
              },
              axisTick: {
                show: false,
              },
              data: xData
            },
            series: [
              {
                name: timeTitle[currentIndex] + '年销售额度',
                type: 'map',
                geoIndex: 0,
                map: 'china',
                roam: true,
                zoom: 1.5,
                tooltip: {
                  show: false,
                },
                label: {
                  normal: {
                    show: false,
                  },
                  emphasis: {
                    show: false,
                  }
                },
                data: mapData,

              },
              {
                name: '散点',
                type: 'effectScatter',
                coordinateSystem: 'geo',
                rippleEffect: {
                  brushType: 'fill'
                },
                itemStyle: {
                  normal: {
                    color: '#F4E925',
                    shadowBlur: 10,
                    shadowColor: '#333'
                  }
                },
                data: pointData,

                symbolSize: function (val: any) {
                  let value = val[2]
                  if (value == max) {
                    return 8
                  }
                  return 4
                },
                showEffectOn: 'render', //加载完毕显示特效
              },
            ]
          },
        };
        myChartRef.current.setOption(option);
        window.addEventListener("resize", myChartRef.current.resize);
      };
    }, 2000);

    return () => {
      !!timerRef.current && clearTimeout(timerRef.current);
    };
  }, []);

  return (
    <div ref={domRef} style={{ height: '100%', width: '100%' }} />
  );
};

export default ThermalDistributionCharts;
