import React, { Fragment, useEffect, useRef } from 'react';
import * as echarts from 'echarts';
import options from '@/constants/commonOptions';

interface Props {
  data: any;
  barColor?: any;
  top?: any;
  bottom?: any;
}
const BackgroundBarCharts: React.FC<Props> = (props: any) => {
  let {
    data = [],
  } = props;
  const domRef = useRef<any>();
  const myChartRef = useRef<any>();
  const timerRef = useRef<any>();

  useEffect(() => {
    setTimeout(() => {
      if (!myChartRef.current) {
        myChartRef.current = echarts.init(domRef.current);
      };
      var xData: any = [],
        yData: any = [];
      var min = 50;
      data.map(function (a: any, b: any) {
        xData.push(a.name);
        if (a.value === 0) {
          yData.push(a.value + min);
        } else {
          yData.push(a.value);
        }
      });
      const option = {
        backgroundColor: "#111c4e",
        color: ["#3398DB"],
        tooltip: {
          ...options.tooltip,
          trigger: "axis",
          axisPointer: {
            type: "line",
            lineStyle: {
              opacity: 0,
            },
          },
          formatter: function (prams: any) {
            if (prams[0].data === min) {
              return "合格率：0%";
            } else {
              return "合格率：" + prams[0].data + "%";
            }
          },
        },
        legend: {
          data: ["直接访问", "背景"],
          show: false,
        },
        grid: {
          ...options.grid,
        },
        xAxis: [
          {
            type: "category",
            gridIndex: 0,
            data: xData,
            axisTick: {
              alignWithLabel: true,
            },
            axisLine: {
              lineStyle: {
                color: "#0c3b71",
              },
            },
            axisLabel: {
              show: true,
              color: "rgb(170,170,170)",
              fontSize: 16,
            },
          },
        ],
        yAxis: [
          {
            type: "value",
            gridIndex: 0,
            splitLine: {
              show: false,
            },
            axisTick: {
              show: false,
            },
            min: min,
            max: 100,
            axisLine: {
              lineStyle: {
                color: "#0c3b71",
              },
            },
            axisLabel: {
              color: "rgb(170,170,170)",
              formatter: "{value} %",
            },
          },
          {
            type: "value",
            gridIndex: 0,
            min: min,
            max: 100,
            splitNumber: 12,
            splitLine: {
              show: false,
            },
            axisLine: {
              show: false,
            },
            axisTick: {
              show: false,
            },
            axisLabel: {
              show: false,
            },
            splitArea: {
              show: true,
              areaStyle: {
                color: ["rgba(250,250,250,0.0)", "rgba(250,250,250,0.05)"],
              },
            },
          },
        ],
        series: [
          {
            name: "合格率",
            type: "bar",
            barWidth: "30%",
            xAxisIndex: 0,
            yAxisIndex: 0,
            itemStyle: {
              normal: {
                barBorderRadius: 30,
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: "#00feff",
                  },
                  {
                    offset: 0.5,
                    color: "#027eff",
                  },
                  {
                    offset: 1,
                    color: "#0286ff",
                  },
                ]),
              },
            },
            data: yData,
            zlevel: 11,
          },
          {
            name: "背景",
            type: "bar",
            barWidth: "50%",
            xAxisIndex: 0,
            yAxisIndex: 1,
            barGap: "-135%",
            data: [100, 100, 100, 100, 100, 100, 100],
            itemStyle: {
              normal: {
                color: "rgba(255,255,255,0.1)",
              },
            },
            zlevel: 9,
          },
        ],
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

export default BackgroundBarCharts;
