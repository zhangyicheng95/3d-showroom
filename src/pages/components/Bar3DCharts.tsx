import React, { Fragment, useEffect, useRef } from 'react';
import * as echarts from 'echarts';
import options from '@/constants/commonOptions';
import { lineColorList } from '@/constants';

interface Props {
  data: any;
  top?: any;
  bottom?: any;
}
const symbolSize = [20, 11];
const Bar3DCharts: React.FC<Props> = (props: any) => {
  let { data = [], top = '14%', bottom = '14%' } = props;
  const domRef = useRef<any>();
  const myChartRef = useRef<any>();
  const timerRef = useRef<any>();

  useEffect(() => {
    setTimeout(() => {
      if (!myChartRef.current) {
        myChartRef.current = echarts.init(domRef.current);
      };
      const xData = data?.map((i: any) => i.name);
      const yData = data?.map((i: any) => i.value);
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
        ...options,
        grid: {
          ...options.grid,
          top: '15%',
          left: '-12%',
          right: 0,
        },
        yAxis: {
          ...options.yAxis,
          show: false,
          splitLine: {
            show: false,
          },
        },
        xAxis: {
          data: xData,
          axisTick: { show: false },
          axisLine: { show: false },
          axisLabel: {
            show: true,
            interval: 1,
            color: "#eee",
            fontSize: '1.4rem'
          },
        },
        series: [
          {
            name: "",
            type: "pictorialBar",
            symbolSize: symbolSize,
            symbolOffset: [0.5, 10 - symbolSize[1]], // 上部椭圆
            symbolPosition: "end",
            z: 12,
            tooltip: {
              show: false
            },
            // color: "#D66BFD",
            itemStyle: {
              normal: {
                color: function (params: any) {
                  return lineColorList[params.dataIndex % lineColorList?.length][0]
                },
              }
            },
            data: yData,
          },
          {
            type: "bar",
            silent: true,
            barWidth: symbolSize[0],
            barGap: "10%", // Make series be overlap
            barCateGoryGap: "10%",
            label: {
              normal: {
                show: true,
                position: "top",
                fontSize: '1rem',
                fontWeight: "bold",
                color: "#eee",
              },
            },
            itemStyle: {
              normal: {
                color: function (params: any) {
                  return new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                    { offset: 0, color: '#3E3CB5' },
                    { offset: 1, color: lineColorList[params.dataIndex % lineColorList?.length][0] },
                  ])
                },
                // color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                //   {
                //     offset: 0,
                //     color: '#3E3CB5'
                //   }, {
                //     offset: 1,
                //     color: '#D66BFD'
                //   }
                // ]),
                opacity: 0.8,
              },
            },
            data: yData,
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

export default Bar3DCharts;
