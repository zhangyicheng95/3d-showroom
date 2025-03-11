import React, { Fragment, useEffect, useRef } from 'react';
import * as echarts from 'echarts';
import { colorList, lineColorList } from '@/constants';
import options from '@/constants/commonOptions';

interface Props {
  data: any;
  grid?: any;
  title?: string;
}

const SnailBarCharts: React.FC<Props> = (props: any) => {
  let { data = [], title, grid } = props;
  const domRef = useRef<any>();
  const myChartRef = useRef<any>();
  const timerRef = useRef<any>();

  useEffect(() => {
    setTimeout(() => {
      if (!myChartRef.current) {
        myChartRef.current = echarts.init(domRef.current);
      };
      let min = Math.min(...data.map((item: any) => item.value));
      const option = {
        legend: {
          show: false
        },
        color: colorList,
        title: {
          ...options.title,
          show: !!title,
          text: title,
        },
        tooltip: {
          ...options.tooltip,
        },
        gird: {
          ...!!grid ? grid : {}
        },
        series: data?.map((item: any, index: number) => {
          const { name, value } = item;
          return {
            name: name,
            type: 'pie',
            clockWise: true, //顺时针
            radius: [`${90 - index * 20}%`, `${100 - index * 20}%`],
            label: {
              show: true,
              position: 'inside',
              fontSize: '0.8rem',
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            hoverAnimation: false,
            data: [
              {
                value: value,
                name: name
              },
              {
                value: min,
                name: 'hide',
                itemStyle: {
                  normal: {
                    color: "rgba(144,144,144,.1)",//未完成的圆环的颜色
                    borderWidth: 0,
                    label: {
                      show: false
                    },
                    labelLine: {
                      show: false
                    }
                  },
                  emphasis: {
                    show: false
                  }
                },
                label: {
                  show: false,
                }
              }
            ]
          }
        })
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

export default SnailBarCharts;
