import React, { Fragment, useEffect, useRef } from 'react';
import * as echarts from 'echarts';
import { lineColorList } from '@/constants';
import options from '@/constants/commonOptions';

interface Props {
  data: any;
  labelSize?: any;
  radiuSize?: any;
  center?: any;
  grid?: any;
  title?: string;
}

const PieCharts: React.FC<Props> = (props: any) => {
  let { data = [], labelSize = '1.8rem', radiuSize = [55, 80], center = ['50%', '50%'], title, grid } = props;
  const domRef = useRef<any>();
  const myChartRef = useRef<any>();
  const timerRef = useRef<any>();

  useEffect(() => {
    setTimeout(() => {
      if (!myChartRef.current) {
        myChartRef.current = echarts.init(domRef.current);
      };
      let index = 0;
      function fun() {
        !!timerRef.current && clearTimeout(timerRef.current);
        timerRef.current = setInterval(function () {
          myChartRef.current.dispatchAction({
            type: "hideTip",
            seriesIndex: 0,
            dataIndex: index,
          });
          // 显示提示框
          myChartRef.current.dispatchAction({
            type: "showTip",
            seriesIndex: 0,
            dataIndex: index,
          });
          // 取消高亮指定的数据图形
          myChartRef.current.dispatchAction({
            type: "downplay",
            seriesIndex: 0,
            dataIndex: index == 0 ? data?.length : index - 1,
          });
          myChartRef.current.dispatchAction({
            type: "highlight",
            seriesIndex: 0,
            dataIndex: index,
          });
          index++;
          if (index > data?.length) {
            index = 0;
          }
        }, 2000);
      };
      const option = {
        color: options.color,
        tooltip: {
          ...options.tooltip,
        },
        title: {
          ...options.title,
          show: !!title,
          text: title,
          top: '0%',
        },
        grid: {
          ...!!grid ? grid : {}
        },
        series: [
          {
            type: "pie",
            radius: [`${radiuSize[0]}%`, `${radiuSize[1]}%`],
            center: center,
            padAngle: 4, // 每一段之间的间距
            minAngle: 5, // 设置最小角度
            itemStyle: {
              borderRadius: [0, 0, 4, 4],
              normal: {
                //外环发光
                // borderWidth: 0.5,
                // shadowBlur: 20,
                // borderColor: '#4bf3f9',
                // shadowColor: '#9bfeff',
                // color: function (params: any) {
                //   return {
                //     colorStops: [
                //       {
                //         offset: 0,
                //         color: lineColorList[params.dataIndex][1], // 0% 处的颜色
                //       },
                //       {
                //         offset: 0.5,
                //         color: lineColorList[params.dataIndex][0], // 0% 处的颜色
                //       },
                //       {
                //         offset: 1,
                //         color: lineColorList[params.dataIndex][0], // 100% 处的颜色
                //       }
                //     ]
                //   }
                // },
              }
            },
            data: data,
            label: {
              position: 'center', // 标签显示在扇区内部
              formatter: '{b}\n{c}',
              alignTo: 'edge', // 对齐策略，可选 'center'、'edge' 等
              bleedMargin: 5, // 溢出边缘的距离
              fontSize: 0, // 鼠标移入时标签的字体大小
            },
            // 高亮状态下的标签设置与普通标签设置分离
            emphasis: {
              scale: true,
              scaleSize: 6,
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              },
              label: {
                show: true,
                fontSize: labelSize,
                fontWeight: 'bold',
                formatter: '{b}\n{d}%',
                color: '#eee'
              }
            }
          },
          {
            type: "pie",
            radius: [`${radiuSize[0] - 10}%`, `${radiuSize[0]}%`],
            center: center,
            padAngle: 4, // 每一段之间的间距
            minAngle: 5, // 设置最小角度
            data: data,
            itemStyle: {
              opacity: 0.5,
              borderRadius: [4, 4, 0, 0],
            },
            label: {
              show: false
            },
            // 高亮状态下的标签设置与普通标签设置分离
            emphasis: {
              scale: true,
              scaleSize: 15,
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              },
            }
          },
        ],
      };
      myChartRef.current.setOption(option);
      window.addEventListener("resize", myChartRef.current.resize);
      setTimeout(function () {
        fun();
      }, 500);
    }, 500);

    return () => {
      !!timerRef.current && clearTimeout(timerRef.current);
    }
  }, [data]);

  return (
    <div ref={domRef} style={{ height: '100%', width: '100%' }} />
  );
};

export default PieCharts;
