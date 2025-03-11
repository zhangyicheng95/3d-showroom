import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';
import options from '@/constants/commonOptions';
import { lineColorList } from '@/constants';

interface Props {
  data: any;
}

const RankBarCharts: React.FC<Props> = (props: any) => {
  let { data = [] } = props;
  const domRef = useRef<any>();
  const myChartRef = useRef<any>();
  const timerRef = useRef<any>();

  useEffect(() => {
    if (!data?.length) return;
    setTimeout(() => {
      if (!myChartRef.current) {
        myChartRef.current = echarts.init(domRef.current);
      };
      const category = data?.sort((a: any, b: any) => a?.value - b?.value);
      let total = 0;
      data.forEach((item: any) => {
        if (item.value > total) {
          total = item.value;
        };
      });
      var datas = [];
      data.forEach((item: any) => {
        datas.push(item.value);
      });
      const option = {
        ...options,
        xAxis: {
          max: total,
          splitLine: {
            show: false
          },
          axisLine: {
            show: false
          },
          axisLabel: {
            show: false
          },
          axisTick: {
            show: false
          }
        },
        grid: {
          left: '20%',
          top: '3%', // 设置条形图的边距
          right: '5%',
          bottom: '10%'
        },
        tooltip: {
          ...options.tooltip,
        },
        yAxis: [{
          type: "category",
          inverse: false,
          data: category,
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            show: false
          }
        }],
        series: [{
          // 内
          type: "bar",
          barWidth: 18,
          legendHoverLink: false,
          silent: true,
          itemStyle: {
            normal: {
              color: function (params: any) {
                return {
                  type: "linear",
                  x: 0,
                  y: 0,
                  x2: 1,
                  y2: 0,
                  colorStops: [
                    {
                      offset: 0,
                      color: lineColorList[params.dataIndex % lineColorList?.length][0] // 0% 处的颜色
                    },
                    {
                      offset: 1,
                      color: lineColorList[params.dataIndex % lineColorList?.length][1] // 100% 处的颜色
                    }
                  ]
                }
              },
            }
          },
          label: {
            normal: {
              show: true,
              position: "left",
              formatter: "{b}",
              textStyle: {
                color: "#fff",
                fontSize: '1rem'
              }
            }
          },
          data: category,
          z: 1,
          animationEasing: "elasticOut"
        },
        {
          // 分隔
          type: "pictorialBar",
          itemStyle: {
            normal: {
              color: "#061348"
            }
          },
          symbolRepeat: "fixed",
          symbolMargin: 6,
          symbol: "rect",
          symbolClip: true,
          symbolSize: [1, 21],
          symbolPosition: "start",
          symbolOffset: [1, -1],
          symbolBoundingData: total,
          data: category,
          z: 2,
          animationEasing: "elasticOut"
        },
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

export default RankBarCharts;
