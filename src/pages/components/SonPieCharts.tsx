import React, { Fragment, useEffect, useRef } from 'react';
import * as echarts from 'echarts';
import { lineColorList } from '@/constants';
import options from '@/constants/commonOptions';

interface Props {
  data: any;
}

const SonPieCharts: React.FC<Props> = (props: any) => {
  let { data = [] } = props;
  const domRef = useRef<any>();
  const myChartRef = useRef<any>();
  const timerRef = useRef<any>();

  data = [
    {
      name: 'Grandpa',
      children: [
        {
          name: 'Uncle Leo',
          value: 15,
          children: [
            {
              name: 'Cousin Jack',
              value: 2
            },
            {
              name: 'Cousin Mary',
              value: 5,
            },
            {
              name: 'Cousin Ben',
              value: 4
            }
          ]
        },
        {
          name: 'Father',
          value: 10,
          children: [
            {
              name: 'Me',
              value: 5
            },
            {
              name: 'Brother Peter',
              value: 1
            }
          ]
        }
      ]
    },
    {
      name: 'Nancy',
      children: [
        {
          name: 'Uncle Nike',
          children: [
            {
              name: 'Cousin Betty',
              value: 1
            },
            {
              name: 'Cousin Jenny',
              value: 2
            }
          ]
        }
      ]
    }
  ];

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
        series: {
          type: 'sunburst',
          data: data,
          radius: ['20%', '90%'],
          itemStyle: {
            borderRadius: 7,
            borderWidth: 2
          },
          label: {
            show: true
          }
        },
      };
      myChartRef.current.setOption(option);
      window.addEventListener("resize", myChartRef.current.resize);
      // setTimeout(function () {
      //   fun();
      // }, 500);
    }, 500);

    return () => {
      !!timerRef.current && clearTimeout(timerRef.current);
    }
  }, [data]);

  return (
    <div ref={domRef} style={{ height: '100%', width: '100%' }} />
  );
};

export default SonPieCharts;
