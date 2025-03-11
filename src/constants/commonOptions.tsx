const options = {
  animation: true,
  // color: [
  //   '#37a2da',
  //   '#96bfff',
  //   // '#32c5e9',
  //   '#67e0e3',
  //   '#9fe6b8',
  //   '#fc8452',
  //   '#ffdb5c',
  //   '#fb7293',
  //   '#e062ae',
  //   '#e690d1',
  //   '#e7bcf3',
  //   '#9d96f5',
  //   '#8378ea',
  //   '#FF00FF',
  //   '#FFA07A',
  //   '#FAFAD2',
  // ],
  color: [
    "rgb(255, 99, 132)",
    "rgb(54, 162, 235)",
    "rgb(255, 206, 86)",
    "rgb(75, 192, 192)",
    "rgb(153, 102, 255)",
    "rgb(255, 159, 64)",
    "rgb(199, 199, 199)",
    "rgb(255, 127, 80)",
    "rgb(135, 206, 250)",
    "rgb(255, 69, 0)",
    "rgb(34, 139, 34)",
    "rgb(210, 105, 30)",
    "rgb(147, 112, 219)",
    "rgb(60, 179, 113)",
    "rgb(30, 144, 255)",
    "rgb(255, 105, 180)",
    "rgb(106, 90, 205)",
    "rgb(255, 228, 181)",
    "rgb(123, 104, 238)",
    "rgb(72, 61, 139)"
  ],
  title: {
    show: false,
    text: '',
    left: 'center',
    textStyle: {
      color: '#fff',
      fontSize: '1.6rem'
    },
  },
  tooltip: {
    trigger: 'axis',
    backgroundColor: 'rgba(0,0,0,0)', // 使背景透明以便看到背景图
    textStyle: {
      // fontFamily: 'Arial',  // 你可以指定字体
      // fontWeight: 'bold',  // 字体粗细
      color: '#fff'  // 字体颜色
    },
    confine: true,  // 确保 tooltip 不会超出图表的边界
    extraCssText: `
    background: linear-gradient(135deg, #1E90FF 0%, #87CEFA 100%);
    font-size: 1.2rem;  // 修改此值来设置字体大小，例如14px
    line-height: 0.4rem;
    padding: 0.8rem;
    border-radius: 0.8rem;
    box-shadow: 0 0.4rem 0.8rem rgba(0, 0, 0, 0.3);
`
    // extraCssText 用来设置额外的 CSS 样式，比如背景图
  },
  legend: {
    top: '5%',
    left: '5%',
    right: '5%',
    bottom: '5%',
    itemWidth: 16,
    itemHeight: 5,
    textStyle: {
      color: '#eee',
      fontSize: 10,
      // fontFamily:'serif',
    },
  },
  grid: {
    left: '3%',
    right: '2%',
    bottom: '2%',
    containLabel: true,
  },
  yAxis: {
    type: "value",
    axisTick: {
      show: false,
    },
    axisLine: {
      show: false,
      lineStyle: {
        color: "#ccc",
      },
    },
    splitLine: {
      show: true,
      lineStyle: {
        color: '#666',
        type: 'dashed',
      },
    },
    splitNumber: 2,
    axisLabel: {
      textStyle: {
        color: "#ccc",
        fontWeight: "normal",
        fontSize: "1.4rem",
      },
    },
  },
  xAxis: {
    type: 'value',
    scale: true,
    axisLine: {
      show: true,
      lineStyle: {
        color: '#666',
      },
      // symbol: ['none', 'arrow'],
    },
    nameTextStyle: {
      color: '#eee',
    },
    splitLine: {
      lineStyle: {
        color: '#666',
        type: 'dashed',
      },
    },
    axisLabel: {
      show: true,
      showMinLabel: true,
      showMaxLabel: true,
      // rotate: 45,
      fontSize: '1.4rem',
      // interval:99,
      color: '#eee',
      fontFamily: 'Helvetica',
      formatter: function (val: any) {
        return parseInt(val);
      },
    },
  },
};

export default options;
