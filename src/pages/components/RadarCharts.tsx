import React, { Fragment, useEffect, useRef } from 'react';
import * as echarts from 'echarts';
import options from '@/constants/commonOptions';
import { lineColorList } from '@/constants';

interface Props {
  data: any;
  grid?: any;
}

const RadarCharts: React.FC<Props> = (props: any) => {
  let { data = [], grid, } = props;
  const domRef = useRef<any>();
  const myChartRef = useRef<any>();
  const timerRef = useRef<any>();

  useEffect(() => {
    setTimeout(() => {
      if (!myChartRef.current) {
        myChartRef.current = echarts.init(domRef.current);
      };
      const option = {
        ...options,
        legend: { show: false },
        tooltip: {
          ...options.tooltip,
          trigger: 'axis'
        },
        grid: {
          ...options.grid,
          top: 0,
          left: 0,
          right: 0,
          // right: '50%'
          ...!!grid ? grid : {}
        },
        xAxis: { show: false },
        radar: [
          {
            indicator: data?.map((item: any) => ({ text: item?.name })),
            center: ['55%', '55%'],
            radius: '60%',
            startAngle: 90,
            splitNumber: 4,
            // shape: 'circle',
            name: {
              padding: -5,
              formatter: '{value}',
              textStyle: {
                fontSize: '1.4rem',
                color: 'rgba(255,255,255,.6)'
              }
            },
            splitArea: {
              areaStyle: {
                color: 'rgba(255,255,255,.1)'
              }
            },
            axisLine: {
              lineStyle: {
                color: 'rgba(255,255,255,.1)'
              }
            },
            splitLine: {
              lineStyle: {
                color: 'rgba(255,255,255,.1)'
              }
            }
          },
        ],
        series: [
          {
            name: '雷达图',
            type: 'radar',
            tooltip: {
              trigger: 'item'
            },
            data: [{
              name: '园区平均值',
              value: data?.map((item: any) => item?.value),
              lineStyle: {
                normal: {
                  color: '#03b48e',
                  opacity: .4,
                  width: 2,
                }
              },
              areaStyle: {
                normal: {
                  color: lineColorList[0][0],
                  opacity: .3
                }
              },
              symbolSize: 0,

            },
            {
              name: '当前园区',
              value: data?.map((item: any) => item?.value / 2),
              symbolSize: 0,
              lineStyle: {
                normal: {
                  color: '#3893e5',
                  opacity: .4,
                  width: 2,
                }
              },
              areaStyle: {
                normal: {
                  color: lineColorList[1][0],
                  opacity: .3
                }
              }
            }
            ]
          }
        ]
      };
      myChartRef.current.setOption(option);
      window.addEventListener("resize", myChartRef.current.resize);
    }, 500);

    return () => {
      !!timerRef.current && clearTimeout(timerRef.current);
    }
  }, [data]);

  return (
    <div ref={domRef} style={{ height: '100%', width: '100%' }} />
  );
};

export default RadarCharts;
