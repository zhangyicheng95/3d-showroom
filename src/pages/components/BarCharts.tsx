import React, { Fragment, useEffect, useRef } from 'react';
import * as echarts from 'echarts';
import options from '@/constants/commonOptions';
import { colorList, lineColorList } from '@/constants';

interface Props {
  data: any;
  grid?: any;
  title?: string;
  hiddenY?: boolean;
}
const symbolSize = [25, 18];
const BarCharts: React.FC<Props> = (props: any) => {
  let { data = [], title, grid, hiddenY = false } = props;
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
        legend: { show: false },
        title: {
          ...options.title,
          show: !!title,
          text: title,
        },
        grid: {
          ...options.grid,
          top: '0%',
          left: '0%',
          right: '0%',
          bottom: '4%',
          ...hiddenY ? {
            right: '-10%',
            left: '-5%'

          } : {},
          ...!!grid ? grid : {}
        },
        tooltip: {
          ...options.tooltip,
          textStyle: {
            // fontFamily: 'Arial',  // 你可以指定字体
            // fontWeight: 'bold',  // 字体粗细
            color: '#fff'  // 字体颜色
          },
          confine: true,  // 确保 tooltip 不会超出图表的边界
          extraCssText: `
          background: linear-gradient(135deg, #1E90FF 0%, #87CEFA 100%);
          font-size: 1rem;  // 修改此值来设置字体大小，例如14px
          line-height: 0.4rem;
          padding: 0.4rem;
          border-radius: 0.8rem;
          box-shadow: 0 0.4rem 0.8rem rgba(0, 0, 0, 0.3);
      `
        },
        yAxis: [
          {
            ...options.yAxis,
            show: !hiddenY,
            type: "value",
            name: "万人次",
            nameLocation: 'end',
            nameTextStyle: {
              color: '#eee',
              fontSize: '1.2rem',
            },
            splitLine: {
              show: false
            },
            axisTick: {
              show: true
            },
          },
          {
            ...options.yAxis,
            type: "value",
            show: false,
            nameTextStyle: {
              color: "#ebf8ac"
            },
            position: "right",
            splitLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            axisLine: {
              show: false
            },
          },
          {
            type: "value",
            gridIndex: 0,
            show: false,
            // min: 50,
            // max: 100,
            splitNumber: 8,
            splitLine: {
              show: false
            },
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              show: false
            },
            splitArea: {
              show: true,
              areaStyle: {
                color: ["rgba(250,250,250,0.0)", "rgba(250,250,250,0.05)"]
              }
            }
          }
        ],
        xAxis: {
          data: xData,
          axisTick: {
            show: false,
          },
          axisLine: {
            show: false,
          },
          axisLabel: {
            show: true,
            textStyle: {
              color: "#eee",
              fontSize: '1.4rem'
            },
          },
        },
        series: [
          {
            name: "旅客人数1",
            type: "line",
            tooltip: { show: false },
            yAxisIndex: 1, //使用的 y 轴的 index，在单个图表实例中存在多个 y轴的时候有用
            smooth: true, //平滑曲线显示
            showAllSymbol: true, //显示所有图形。
            symbol: "circle", //标记的图形为实心圆
            symbolSize: 10, //标记的大小
            itemStyle: {
              //折线拐点标志的样式
              color: "#058cff"
            },
            lineStyle: {
              color: "#058cff"
            },
            areaStyle: {
              color: "rgba(5,140,255, 0.2)"
            },
            data: yData
          },
          {
            name: "旅客人数(万人)",
            type: "bar",
            showBackground: true,
            barWidth: '30%',
            itemStyle: {
              color: function (params: any) {
                return new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: lineColorList[params.dataIndex % lineColorList?.length][0] },
                  { offset: 1, color: lineColorList[params.dataIndex % lineColorList?.length][1] },
                ])
              },
              borderRadius: [50, 50, 0, 0] //（顺时针左上，右上，右下，左下）
            },
            emphasis: {
              itemStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: '#2378f7' },
                  { offset: 0.7, color: '#2378f7' },
                  { offset: 1, color: '#83bff6' }
                ])
              }
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

export default BarCharts;
