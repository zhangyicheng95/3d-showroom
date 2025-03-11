import React, { Fragment, useEffect, useRef } from 'react';
import * as echarts from 'echarts';
import options from '@/constants/commonOptions';
import { colorList, lineColorList } from '@/constants';

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
  top?: any;
  bottom?: any;
}

const center = ['50%', '43%'];
const InfoCenterCharts: React.FC<Props> = (props: any) => {
  let { data = [], top = '14%', bottom = '14%' } = props;
  const domRef = useRef<any>();
  const myChartRef = useRef<any>();
  const timerRef = useRef<any>();

  useEffect(() => {
    if (!myChartRef.current) {
      myChartRef.current = echarts.init(domRef.current);
    };

    let color = options.color;
    let erArr: any = data;
    let allArr: any = [...erArr],
      dataArr: any = [];
    // 点
    allArr.forEach((el: any, index: number) => {
      if (el.desc.type > 0) {
        el.symbolSize = 25;
        if (!!data?.[index]?.img) {
          el.symbol = `image://${data?.[index]?.img}`;
        };
        // el.symbol =
        //   'path://M544 552.325V800a32 32 0 0 1-32 32 31.375 31.375 0 0 1-32-32V552.325L256 423.037a32 32 0 0 1-11.525-43.512A31.363 31.363 0 0 1 288 368l224 128 222.075-128a31.363 31.363 0 0 1 43.525 11.525 31.988 31.988 0 0 1-11.525 43.513L544 551.038z m0 0,M64 256v512l448 256 448-256V256L512 0z m832 480L512 960 128 736V288L512 64l384 224z m0 0';
        el.itemStyle = {
          // color: 'rgba(0, 255, 255, 0.9', //color[el.desc.type],
        };
      }
      el.label = {
        normal: {
          show: true,
          position: 'bottom',
          distance: 8,
          color: 'rgba(0, 255, 255, 0.9', //color[el.desc.type],
          fontSize: '1rem'
        },
      };
    });

    // 圆形分区
    function CalutePointToSplitCircle(arr: any, option: any) {
      const newArray: any = [];
      const { length: arLen } = arr;
      let single_angle: any = (360 / arLen).toFixed(2);
      let UtilCalute = {
        calute_x: (ang: number, radius: number) => {
          // @ts-ignore
          return (Math.cos((ang * Math.PI) / 180).toFixed(2) * radius).toFixed(2);
        },
        calute_y: (ang: any, radius: any) => {
          // @ts-ignore
          return (Math.sin((ang * Math.PI) / 180).toFixed(2) * radius).toFixed(2);
        },
      };
      // 正东方向开始 逆时针方向
      arr.forEach((e: any, index: number) => {
        let itemDesc = e.desc;
        let ang =
          option.stratAngle +
          (itemDesc.angle && typeof itemDesc.angle === 'number' ? itemDesc.angle : single_angle * index);
        // 各节点中心点
        const x = UtilCalute.calute_x(ang, option.raduis);
        const y = UtilCalute.calute_y(ang, option.raduis);
        // 各节点连接到中心的线段的起点  减去节点的半径
        const x1 = UtilCalute.calute_x(ang, option.raduis - option.nodeRadius);
        const y1 = UtilCalute.calute_y(ang, option.raduis - option.nodeRadius);
        // 各节点连接到中心的线段的终点
        const x0 = UtilCalute.calute_x(ang, option.emptyCenterRadius);
        const y0 = UtilCalute.calute_y(ang, option.emptyCenterRadius);

        e.value = [x, y]; // 节点中心点
        e.lineData = [
          [x1, y1],
          [x0, y0],
        ];
        newArray.push(e);
      });
      return newArray;
    }

    // 线配置
    function linesConfig(arr: any) {
      let dataArr: any = [];

      function getFormatItem(item: any, start: any, end: any) {
        return [
          { coord: item.lineData[start] }, // 起点
          {
            coord: item.lineData[end],
            lineStyle: {
              // color: '#0BC6FE',
              curveness: item.desc.type === 3 ? 0.1 : 0,
            },
            effect: {
              color: color[item.desc.type],
            },
          }, // 终点
        ];
      }

      arr.forEach((el: any) => {
        switch (el.desc.type) {
          case 0:
            break;
          case 1:
            // 外到内
            dataArr.push(getFormatItem(el, 0, 1));
            break;
          case 2:
            // 内到外
            dataArr.push(getFormatItem(el, 1, 0));
            break;
          case 3:
            // 双向
            dataArr.push(getFormatItem(el, 0, 1));
            dataArr.push(getFormatItem(el, 1, 0));
            break;
        }
      });
      return dataArr;
    }

    // 点分布
    erArr = CalutePointToSplitCircle(erArr, {
      stratAngle: 0,
      raduis: 40,
      nodeRadius: 5,
      emptyCenterRadius: 10,
    });

    allArr = [...erArr];
    // 线坐标和配置
    dataArr = linesConfig(allArr);
    // 生成虚线 饼图数据
    function generateData(totalNum: any, bigvalue: any, smallvalue: any, color: any) {
      let dataArr = [];
      for (var i = 0; i < totalNum; i++) {
        if (i % 2 === 0) {
          dataArr.push({
            name: (i + 1).toString(),
            value: bigvalue,
            itemStyle: {
              normal: {
                color: color,
                borderWidth: 0,
              },
            },
          });
        } else {
          dataArr.push({
            name: (i + 1).toString(),
            value: smallvalue,
            itemStyle: {
              normal: {
                color: 'rgba(0,0,0,0)',
                borderWidth: 0,
              },
            },
          });
        }
      }
      return dataArr;
    }

    let dolitData = generateData(100, 25, 20, 'rgb(126,190,255)');
    let threeData = generateData(6, 40, 10, '#2dc0c9');

    function getOption(startAngle: any, radius: any) {
      let option = {
        title: {
          show: false,
          text: '自定义方向的数据流向动画',
          left: 'center',
          textStyle: {
            color: '#fff',
            fontFamily: 'iconfont1',
            fontSize: '1.6rem'
          },
        },
        xAxis: {
          show: false,
          type: 'value',
          max: 50,
          min: -51,
        },
        yAxis: {
          show: false,
          type: 'value',
          max: 50,
          min: -50,
        },
        grid: {
          top: '-5%',
          bottom: '4%',
          left: '0%',
          right: '0%',
        },
        graphic: {
          elements: [
            {
              type: 'text',
              z: 100,
              style: {
                text: '数据聚合中台',
                textAlign: 'center',
                fill: '#fff',
                fontSize: '1.4rem',
                fontWeight: 'bolder',
              },
              top: '40%',
              left: 'center',
            },
            // {
            //   type: 'image',
            //   z: 4,
            //   style: {
            //     image: 'https://th.bing.com/th/id/R.22ae499c7c99289ef333b02bf640b822?rik=MkOhaz4Fe4DSQg&riu=http%3a%2f%2fwww.fdbusiness.com%2fwp-content%2fuploads%2f2015%2f06%2fSternMaidJune2015-680x365_c.jpg&ehk=zuoZKfrcto%2f0INs9UHPLw9HILlz%2fzPB6GGfRKFQPiHk%3d&risl=&pid=ImgRaw&r=0',
            //     width: 170,
            //     height: 170,
            //   },
            //   left: 'center',
            //   top: 'center',
            // },
          ],
        },
        series: [
          {
            name: '节点',
            type: 'graph',
            silent: false,
            hoverAnimation: false, // 鼠标悬浮高亮
            cursor: 'default',
            coordinateSystem: 'cartesian2d',
            z: 3,
            lineStyle: {
              width: 2,
              color: 'source',
              type: 'dashed',
            },
            data: allArr,
          },
          {
            name: '线图',
            type: 'lines',
            hoverAnimation: false,
            silent: false,
            cursor: 'default',
            coordinateSystem: 'cartesian2d',
            polyline: false, // 多线段
            z: 1,
            lineStyle: {
              width: 3,
              type: 'dashed',
              curveness: 0,
            },
            effect: {
              show: true,
              period: 8, //箭头指向速度，值越小速度越快
              trailLength: 0, //特效尾迹长度[0,1]值越大，尾迹越长重
              symbol: 'arrow', //箭头图标
              symbolSize: 6,
            },
            emphasis: {
              lineStyle: {
                type: 'dashed',
              },
            },
            data: dataArr,
          },
          {
            name: '不动外圆',
            type: 'pie',
            zlevel: 4,
            silent: true,
            center: center,
            radius: ['55%', '53%'],
            label: {
              normal: {
                show: false,
              },
            },
            labelLine: {
              normal: {
                show: false,
              },
            },
            data: dolitData,
          },
          {
            type: 'pie',
            name: '旋转圆',
            zlevel: 4,
            silent: true,
            center: center,
            radius: ['40%', '37%'],
            hoverAnimation: false,
            startAngle: startAngle,
            data: threeData,
            label: {
              normal: {
                show: false,
              },
            },
            labelLine: {
              normal: {
                show: false,
              },
            },
          },
          {
            name: '缩放圆',
            type: 'pie',
            center: center,
            zlevel: 4,
            silent: true,
            radius: [radius + 2 + '%', radius + '%'],
            label: {
              normal: {
                show: false,
              },
            },
            labelLine: {
              normal: {
                show: false,
              },
            },
            data: dolitData,
          },
        ],
      };
      return option;
    }

    let startAngle = 50; // 初始旋转角度
    let [minradius, radius, maxradius] = [22, 20, 24]; // 最小、初始、最大 缩放尺寸
    let isBig = true; // 缩放动画 标识

    function draw() {
      startAngle = startAngle - 5;
      if (isBig) {
        radius = radius + 3;
        if (radius > maxradius) {
          isBig = false;
        }
      } else {
        radius = radius - 3;
        if (radius < minradius) {
          isBig = true;
        }
      }
      let option = getOption(startAngle, radius);
      myChartRef.current.setOption(option, true);
    }

    if (!!timerRef.current) {
      clearInterval(timerRef.current);
    };
    draw();
    timerRef.current = setInterval(draw, 200);
    window.addEventListener("resize", myChartRef.current.resize);

    return () => {
      !!timerRef.current && clearInterval(timerRef.current);
    }
  }, [data]);

  return (
    <div ref={domRef} style={{ height: '100%', width: '100%' }} />
  );
};

export default InfoCenterCharts;
