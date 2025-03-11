import React, { Fragment, useEffect, useRef, useState } from 'react';
import * as echarts from 'echarts';
import { message } from 'antd';
import * as _ from 'lodash-es';
import options from '@/constants/commonOptions';

interface Props {
  data: any;
  colorList?: any;
  radius?: any;
}

const PieNightingaleCharts: React.FC<Props> = (props: any) => {
  let { data = [], colorList, radius } = props;
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
        series: [
          {
            type: "pie",
            radius: radius || ["45%", "80%"],
            padAngle: 4, // 每一段之间的间距
            minAngle: 5, // 设置最小角度
            roseType: 'area',
            itemStyle: {
              borderRadius: [0, 0, 4, 4],
              ...!!colorList ? {
                normal: {
                  color: function (params: any) {
                    return colorList[params.dataIndex % colorList?.length]
                  }
                }
              } : {}
            },
            data: (data || [])?.map?.((item: any) => {
              const { name, value } = item;
              return {
                name,
                value,
              };
            }),
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
                fontSize: '1.8rem',
                fontWeight: 'bold',
                formatter: '{b}\n{c}',
                color: '#eee'
              }
            }
          },
          !!radius ? {} : {
            type: "pie",
            roseType: 'area',
            radius: ["35%", "45%"],
            padAngle: 4, // 每一段之间的间距
            minAngle: 5, // 设置最小角度
            data: (data || [])?.map?.((item: any) => {
              const { name, } = item;
              return {
                name,
                value: 1,
              };
            }),
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

export default PieNightingaleCharts;
