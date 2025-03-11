import React, { Fragment, useEffect, useRef } from 'react';
import * as echarts from 'echarts';
import options from '@/constants/commonOptions';

interface Props {
  data: any;
  barColor?: any;
  top?: any;
  bottom?: any;
}
const LightBarCharts: React.FC<Props> = (props: any) => {
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
      const xData = data?.map((i: any) => i.name);
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
        grid: {
          ...options.grid,
          top: '0%',
          left: '0%',
          right: '0%',
          bottom: '4%'
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
        yAxis: {
          splitLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          axisLine: {
            show: false,
          },
          axisLabel: {
            show: false,
          },
        },
        series: [
          {
            type: 'bar',
            data: data?.map((item: any) => item.value),
            barWidth: '20%',
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: 'rgba(0,244,255,1)' // 0% 处的颜色
                }, {
                  offset: 1,
                  color: 'rgba(0,77,167,1)' // 100% 处的颜色
                }], false),
                barBorderRadius: [30, 30, 30, 30],
                shadowColor: 'rgba(0,160,221,1)',
                shadowBlur: 4,
              }
            },
            label: {
              normal: {
                show: false,
                textStyle: {
                  color: "#eee",
                  fontSize: '1.4rem'
                },
                // width: 80,
                height: 24,
                lineHeight: 24,
                backgroundColor: 'rgba(0,160,221,0.1)',
                borderRadius: 200,
                position: ['-14', '-60'],
                distance: 1,
                formatter: '    {d|●} {a|{c}}    ',
                rich: {
                  d: {
                    color: '#3CDDCF',
                  },
                  a: {
                    color: '#eee',
                    align: 'center',
                  },
                  b: {
                    width: 1,
                    height: 30,
                    borderWidth: 1,
                    borderColor: '#234e6c',
                    align: 'left'
                  },
                }
              }
            }
          }
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

export default LightBarCharts;
