import React, { Fragment, useEffect, useRef } from 'react';
import * as echarts from 'echarts';
import { lineColorList } from '@/constants';
import options from '@/constants/commonOptions';
import { AnyMapping } from 'three';

interface Props {
  data: any;
  hiddenAxis?: boolean;
  hiddenY?: boolean;
}

const LineCharts: React.FC<Props> = (props: any) => {
  let { data = [], hiddenAxis = false, hiddenY = false } = props;
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
            dataIndex: index == 0 ? data?.[0]?.value?.length : index - 1,
          });
          myChartRef.current.dispatchAction({
            type: "highlight",
            seriesIndex: 0,
            dataIndex: index,
          });
          index++;
          if (index > data?.[0]?.value?.length) {
            index = 0;
          }
        }, 2000);
      };
      const option = {
        ...options,
        legend: { show: false },
        grid: {
          ...options.grid,
          top: '15%',
          ...!!hiddenAxis ? {
            left: '-14%',
            right: '2%',
            bottom: '-13%'
          } : hiddenY ? {
            left: '-8%',
            right: '3%',
            bottom: '2%'
          } : {
            left: '0%',
            right: '2%',
            bottom: '2%'
          }
        },
        tooltip: {
          ...options.tooltip,
        },
        xAxis: {
          show: !hiddenAxis,
          type: "category",
          boundaryGap: false,
          axisLabel: {
            show: true,
            textStyle: {
              color: "#eee",
              fontSize: '1.4rem'
            },
          },
          data: data?.[0]?.value?.map((item: any, index: number) => {
            const { name, value } = item;
            return name;
          })
        },
        yAxis: {
          ...options.yAxis,
          show: !(hiddenY || hiddenAxis),
          name: '人次',
          nameTextStyle: {
            color: '#eee',
            fontSize: '1.2rem',
          },
          splitLine: {
            show: false,
          },
          type: "value",
        },
        series: data?.map((item: any, index: number) => {
          const { name, value } = item;
          return {
            name: name,
            type: "line",
            smooth: true,
            symbol: "circle",
            symbolSize: 5,
            showSymbol: false,
            lineStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: lineColorList[index][0]
                }, {
                  offset: 0.8,
                  color: lineColorList[index][1]
                }], false),
                shadowColor: lineColorList[index][0],
                shadowBlur: 10,
                shadowOffsetY: 10,
                width: 2,
              },
            },
            areaStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: lineColorList[index][0]
                }, {
                  offset: 0.8,
                  color: lineColorList[index][1]
                }], false),
                shadowColor: 'rgba(0, 0, 0, 0.1)',
              },
            },
            itemStyle: {
              normal: {
                color: lineColorList[index][0],
                borderColor: "rgba(221, 220, 107, .1)",
                borderWidth: 12,
              },
            },
            data: value,
          }
        })
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

export default LineCharts;
