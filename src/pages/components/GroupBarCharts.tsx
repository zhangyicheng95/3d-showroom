import React, { Fragment, useEffect, useRef } from 'react';
import * as echarts from 'echarts';
import options from '@/constants/commonOptions';
import { lineColorList } from '@/constants';

interface Props {
  data: any;
  grid?: any;
  axisLabelSize?: any;
  colorList?: any;
  title?: string;
}

const GroupBarCharts: React.FC<Props> = (props: any) => {
  let { data = {}, grid, axisLabelSize, colorList, title } = props;
  const domRef = useRef<any>();
  const myChartRef = useRef<any>();
  const timerRef = useRef<any>();
  colorList = !!colorList ? colorList : lineColorList;

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
            dataIndex: index == 0 ? data?.xAxisData?.length : index - 1,
          });
          myChartRef.current.dispatchAction({
            type: "highlight",
            seriesIndex: 0,
            dataIndex: index,
          });
          index++;
          if (index > data?.xAxisData?.length) {
            index = 0;
          }
        }, 2000);
      };
      const option = {
        ...options,
        legend: {
          show: false
        },
        title: {
          show: !!title,
          text: title,
          left: 'center',
          top: '8%',
          textStyle: {
            color: '#eee',
            fontSize: '1.4rem'
          }
        },
        grid: {
          ...options.grid,
          top: '3%',
          left: '-10%',
          right: '3%',
          ...grid,
        },
        tooltip: {
          ...options.tooltip,
        },
        yAxis: {
          ...options.yAxis,
          show: false,
          splitLine: {
            show: false,
          },
        },
        xAxis: {
          ...options.xAxis,
          type: "category",
          axisTick: {
            show: false,
          },
          axisLine: {
            show: false,
            lineStyle: {
              color: "#363e83",
            },
          },
          axisLabel: {
            show: true,
            showMinLabel: true,
            showMaxLabel: true,
            interval: 0,
            // rotate: 45,
            color: '#eee',
            fontSize: axisLabelSize || "1.4rem",
          },
          data: data?.xAxisData,
        },
        series: (data?.data)?.map((item: any, index: number) => {
          const { title, number } = item;
          return {
            name: title,
            type: "bar",
            itemStyle: {
              normal: {
                show: true,
                color: function (params: any) {
                  return new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    { offset: 0, color: colorList[params.seriesIndex % colorList?.length][0] },
                    { offset: 1, color: colorList[params.seriesIndex % colorList?.length][1] },
                  ])
                },
                borderWidth: 0,
              },
            },
            zlevel: 2,
            barWidth: `${100 / (data?.data?.xAxisData?.length + 2)}%`,
            data: number,
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

export default GroupBarCharts;
