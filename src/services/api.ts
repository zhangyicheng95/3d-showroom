import { parseParamsToUrl } from "@/utils/utils";
import { fetchGet, fetchPost, fetchPut, fetchDelete, upload, BASE_IP } from '@/utils/fetch';
import * as _ from 'lodash-es';

// 获取所有资源数据
export async function getAllHomeData() {
    return fetchGet(`${process.env.NODE_ENV === 'development' ? '/apiv1' : ''}/jkgl/dpjk/all.do`);
    //http://8.140.245.26:8081/apiv1
    // return new Promise((resolve, reject) => {
    //     resolve({
    //         "recentHalfYearRegionTraffic": { "outboundTourism": [{ "name": "8 月", "value": "700.0" }, { "name": "9 月", "value": "540.0" }, { "name": "10 月", "value": "1520.0" }, { "name": "11 月", "value": "2800.0" }, { "name": "12 月", "value": "2200.0" }, { "name": "1 月", "value": "338.7" }], "domesticTourism": [{ "name": "8 月", "value": "4900.0" }, { "name": "9 月", "value": "3240.0002" }, { "name": "10 月", "value": "5320.0" }, { "name": "11 月", "value": "16800.0" }, { "name": "12 月", "value": "15400.0" }, { "name": "1 月", "value": "2370.9" }], "peripheralTourism": [{ "name": "8 月", "value": "1400.0" }, { "name": "9 月", "value": "1620.0001" }, { "name": "10 月", "value": "760.0" }, { "name": "11 月", "value": "8400.0" }, { "name": "12 月", "value": "4400.0" }, { "name": "1 月", "value": "677.4" }] }, "hotWords": [{ "name": "秦始皇兵马俑", "value": "100" }, { "name": "陕西历史博物馆", "value": "95" }, { "name": "大唐不夜城", "value": "88" }, { "name": "华山", "value": "85" }, { "name": "大雁塔", "value": "82" }, { "name": "长安十二时辰", "value": "78" }, { "name": "回民街", "value": "75" }, { "name": "哈尔滨冰雪大世界", "value": "72" }, { "name": "阿勒泰", "value": "70" }, { "name": "自驾游", "value": "68" }, { "name": "特种兵旅行", "value": "66" }, { "name": "观演游", "value": "64" }, { "name": "古建游", "value": "62" }, { "name": "奔县游", "value": "61" }, { "name": "慢充游", "value": "60" }, { "name": "出境游", "value": "60" }, { "name": "免签过境游", "value": "60" }], "nationalRegionResourceRanking": [
    //             {
    //                 "order": 1,
    //                 "name": "晨生旅游",
    //                 "value": 19878.00,
    //                 "source": "陕西"
    //             },
    //             {
    //                 "order": 2,
    //                 "name": "文投资源",
    //                 "value": 18888.0,
    //                 "source": "陕西"
    //             },
    //             {
    //                 "order": 3,
    //                 "name": "渝涵上普",
    //                 "value": 17888.0,
    //                 "source": "重庆"
    //             },
    //             {
    //                 "order": 4,
    //                 "name": "陕中旅",
    //                 "value": 16888.0,
    //                 "source": "陕西"
    //             },
    //             {
    //                 "order": 5,
    //                 "name": "南海假期",
    //                 "value": 15888.0,
    //                 "source": "广东"
    //             },
    //             {
    //                 "order": 6,
    //                 "name": "上海巴士",
    //                 "value": 14888.0,
    //                 "source": "上海"
    //             },
    //             {
    //                 "order": 7,
    //                 "name": "国泰假期",
    //                 "value": 13888.0,
    //                 "source": "香港"
    //             },
    //             {
    //                 "order": 8,
    //                 "name": "上海侯鸽",
    //                 "value": 12888.0,
    //                 "source": "上海"
    //             },
    //             {
    //                 "order": 9,
    //                 "name": "薄荷假期",
    //                 "value": 11888.0,
    //                 "source": "上海"
    //             },
    //             {
    //                 "order": 10,
    //                 "name": "陕西海外总部",
    //                 "value": 10888.0,
    //                 "source": "其他"
    //             }
    //         ], "ticket": { "ticket1": [{ "name": "长安十二时辰主题街区", "value": 10 }, { "name": "红河谷森林公园", "value": 9 }, { "name": "《复活的军团》演出", "value": 8 }, { "name": "永济五老峰景区", "value": 7 }, { "name": "天汉楼", "value": 6 }, { "name": "《赳赳大秦》演出", "value": 5 }, { "name": "《长恨歌》演出", "value": 4 }, { "name": "朱雀国家森林公园", "value": 3 }, { "name": "红秀《延安延安》演出", "value": 2 }, { "name": "曲江海洋极地公园", "value": 1 }], "ticket2": [{ "name": "长安十二时辰主题街区" }, { "name": "红河谷森林公园" }, { "name": "《复活的军团》演出" }, { "name": "永济五老峰景区" }, { "name": "天汉楼" }, { "name": "《赳赳大秦》演出" }, { "name": "《长恨歌》演出" }, { "name": "朱雀国家森林公园" }, { "name": "红秀《延安延安》演出" }, { "name": "曲江海洋极地公园" }, { "name": "司马迁祠" }, { "name": "袁家村关中大观园" }, { "name": "青木川古镇" }, { "name": "太平森林公园" }, { "name": "吉象多多旅游年票" }, { "name": "秦始皇和他的地下王国" }, { "name": "青峰峡悦豪酒店套餐" }, { "name": "西江千户苗寨" }, { "name": "御龙湾温泉酒店套餐" }, { "name": "西影电影博物馆" }, { "name": "《黄河大合唱》演出" }, { "name": "西安城墙灯会" }, { "name": "中华郡圣温泉" }, { "name": "昆明池新春灯会" }, { "name": "太白山水温泉酒店套餐" }, { "name": "秦岭野生动物园" }, { "name": "少华山森林公园" }, { "name": "玉华宫滑雪场" }, { "name": "华夏文旅海洋公园" }, { "name": "大唐芙蓉园" }], "ticket3": [{ "name": "小程序", "value": 5204 }, { "name": "美团", "value": 1360 }, { "name": "分销商", "value": 1147 }, { "name": "携程", "value": 293 }, { "name": "文旅惠民平台", "value": 60 }, { "name": "飞猪", "value": 56 }, { "name": "高德地图", "value": 45 }, { "name": "去哪网", "value": 31 }, { "name": "同城", "value": 30 }, { "name": "小红书", "value": 26 }, { "name": "马蜂窝", "value": 22 }], "ticket4": [{ "name": "纷客旅行", "value": 65 }, { "name": "陕西璟源国旅", "value": 26 }, { "name": "龙游国旅", "value": 19 }, { "name": "陕西文之源国际旅行社有限公司", "value": 19 }, { "name": "恒大旅行", "value": 14 }, { "name": "陕西中旅新世纪国际旅行社有限公司", "value": 11 }, { "name": "西安招商国际旅行社有限责任公司", "value": 10 }, { "name": "西安招商国际旅行社有限责任公司辛家庙分公司", "value": 7 }, { "name": "陕西锦途国际旅行社有限公司", "value": 6 }, { "name": "陕西天美假日", "value": 5 }] }, "nationalChannelSalesNetwork": [{ "name": "覆盖省", "value": "28" }, { "name": "旅行社", "value": "110" }, { "name": "酒店渠道", "value": "190" }, { "name": "自然人代理", "value": "5000" }, { "name": "研学", "value": "3000" }, { "name": "物业", "value": "3000" }],
    //         "resourceRanking": {
    //             "table1": [{ "order": 1, "name": "青峰峡、黄柏塬自驾休闲套餐", "value": 15435 }, { "order": 2, "name": "丽江花马古城酒店", "value": 7500 }, { "order": 3, "name": "宁波贵阳往返套票", "value": 6100 }, { "order": 4, "name": "西宁常州往返套票", "value": 5800 }, { "order": 5, "name": "中合长城金联国际饭店", "value": 5000 }, { "order": 7, "name": "重庆常德三日往返套票", "value": 3200 }, { "order": 6, "name": "太原尔滨往返套票", "value": 45 }, { "order": 8, "name": "合肥珠海往返套票", "value": 3000 }, { "order": 9, "name": "呼和浩特长沙往返套票", "value": 2900 }, { "order": 10, "name": "《驼铃传奇》秀门票", "value": 1500 }],
    //             "table2": [{ "name": "长沙·韶山毛主席故居·黄龙洞·民俗风情表演·张家界森林公园·天门山·土司王府·芙蓉古镇·苗寨·凤凰古城·沱江泛舟深度6日游", "value": 8000, "order": 1 }, { "name": "纯玩湘西-长沙、张家界双飞六日游", "value": 7500, "order": 2 }, { "name": "西藏圣城探秘7日游", "value": 7000, "order": 3 }, { "name": "宁夏沙漠深度五天奇遇之旅", "value": 6500, "order": 4 }, { "name": "长安一梦西安古城双飞五日游", "value": 5600, "order": 5 }, { "name": "长安一梦-长安全景六日游", "value": 5500, "order": 6 }, { "name": "臻美无忧桂林双飞5日游", "value": 6000, "order": 7 }, { "name": "长安全景六日游", "value": 5000, "order": 8 }]
    //         },
    //         "holiday": { "holiday6": [{ "name": "湖北峡州国际旅行社有限公司", "value": 212 }, { "name": "四川新美好国际旅行社有限公司", "value": 187 }, { "name": "广西金天下旅业投资集团有限公司", "value": 164 }, { "name": "西安蜗牛假期国际旅行社有限公司", "value": 159 }, { "name": "重庆新旅程国际旅行社有限公司", "value": 126 }], "holiday5": [{ "name": "重庆保晟国际旅行社有限公司", "value": 212 }, { "name": "北京迈途国际旅行社有限公司", "value": 321 }, { "name": "厦门游拉拉国际旅行社有限公司", "value": 355 }, { "name": "四川省中国青年旅行社有限公司", "value": 378 }, { "name": "西安龙之旅秦风国际旅行社有限公司", "value": 465 }], "holiday4": [{ "name": "火车", "value": 35.8 }, { "name": "飞机", "value": 15 }, { "name": "汽车", "value": 6 }, { "name": "游轮", "value": 1.1 }, { "name": "自驾", "value": 42.2 }], "holiday3": [{ "name": "夕阳红", "value": 24 }, { "name": "亲子", "value": 22 }, { "name": "情侣", "value": 16 }, { "name": "朋友", "value": 32 }, { "name": "研学", "value": 5 }], "holiday2": [{ "name": "浙江" }, { "name": "江苏" }, { "name": "广东" }, { "name": "湖北" }, { "name": "重庆" }], "holiday1": 140 }, "currentYearTransactionData": { "list": [{ "name": "总收入(万元)", "value": "3305" }, { "name": "同比增长", "value": "13.6%" }, { "name": "环比增长", "value": "12.6%" }], "value": "33056509" }, "realTimeOrders": { "realTimeResourceOrder": [{ "name": "机加酒1", "source": "测试分部2", "value": "2.00" }, { "name": "机加酒1", "source": "测试分部2", "value": "2.00" }, { "name": "门票444", "source": "测试分部2", "value": "22.00" }, { "name": "门票555", "source": "测试分部2", "value": "34.00" }, { "name": "门票444", "source": "测试分部2", "value": "22.00" }, { "name": "门票333", "source": "测试分部2", "value": "3.00" }, { "name": "门票222", "source": "测试分部2", "value": "3.00" }, { "name": "华为水杯一打", "source": "测试分部2", "value": "2.00" }, { "name": "测试", "source": "测试分部2", "value": "2.00" }], "realTimeRouteOrders": [{ "name": "一线城市十日游@@@22", "source": "测试分部2", "value": "33.00" }, { "name": "一线城市十日游@@@22", "source": "测试分部2", "value": "6.00" }, { "name": "一线城市十日游@@@22", "source": "测试分部2", "value": "4.00" }, { "name": "一线城市十日游@@@22", "source": "测试分部2", "value": "2.00" }, { "name": "一线城市十日游@@@", "source": "测试分部2", "value": "30000.00" }, { "name": "一线城市十日游@@@", "source": "测试分部2", "value": "30000.00" }, { "name": "一线城市十日游@@@", "source": "测试分部2", "value": "40000.00" }, { "name": "广东广州、深圳、香港PPP三日游", "source": "测试分部2", "value": "4000.00" }, { "name": "广州一日游0.1", "source": "测试分部2", "value": "0.02" }, { "name": "广州一日游0.1", "source": "测试分部2", "value": "0.02" }, { "name": "广州一日游0.1", "source": "测试分部2", "value": "0.02" }, { "name": "广州一日游0.1", "source": "测试分部2", "value": "0.02" }, { "name": "广州一日游0.1", "source": "测试分部2", "value": "0.02" }, { "name": "广州一日游0.1", "source": "测试分部2", "value": "0.02" }, { "name": "广州一日游0.1", "source": "测试分部", "value": "0.02" }, { "name": "广州一日游0.1", "source": "测试分部2", "value": "0.02" }, { "name": "广州一日游0.1", "source": "测试分部", "value": "0.02" }, { "name": "广州一日游0.1", "source": "测试分部2", "value": "0.02" }, { "name": "广州一日游0.1", "source": "测试分部2", "value": "6.02" }, { "name": "广州一日游0.1", "source": "测试分部2", "value": "0.02" }] }, "themeFeatures": { "table5": [{ "number": 137, "name": "【贵州】山野有声6人小包团6日", "place": "贵阳起止", "type": "落地产品", "value": 72.34 }, { "number": 177, "name": "【云南】世外桃源普者黑6人小包团7日", "place": "昆明起止", "type": "落地产品", "value": 59.83 }, { "number": 129, "name": "【哈尔滨】邂逅童话雪世界·中国雪乡5日", "place": "哈尔滨起止", "type": "落地产品", "value": 87.46 }, { "number": 112, "name": "【四川】九寨黄龙毕棚沟8人小包团7日", "place": "成都起止", "type": "落地产品", "value": 47.94 }], "table4": [{ "number": 289, "name": "观天探地贵州亲子研学5日", "place": "贵州起止", "type": "亲子研学", "value": 187.27 }, { "number": 276, "name": "冰雪向往哈尔滨亲子研学6日", "place": "哈尔滨起止", "type": "亲子研学", "value": 206.44 }, { "number": 319, "name": "寻古都顶流西安亲子研学5日", "place": "西安起止", "type": "亲子研学", "value": 184.38 }, { "number": 174, "name": "四川熊猫火箭亲子研学6日", "place": "成都起止", "type": "亲子研学", "value": 121.45 }, { "number": 163, "name": "版纳南国秘境亲子研学5日", "place": "西双版纳起止", "type": "亲子研学", "value": 110.51 }], "table3": [{ "number": 72, "name": "【大美西沙】三亚-西沙-祥龙岛号", "place": "三亚起止", "type": "邮轮", "value": 113.76 }, { "number": 81, "name": "【大美西沙】三亚-西沙-南海之梦号", "place": "三亚起止", "type": "邮轮", "value": 119.88 }], "table2": [{ "number": 278, "name": "【传奇·伊春号】冬季雪韵北国专列6日", "place": "哈尔滨起止", "type": "专列", "value": 277.9 }, { "number": 219, "name": "【福鹿·雪国号】东北目的地专列8日", "place": "哈尔滨起止", "type": "专列", "value": 115.6 }, { "number": 497, "name": "【环秦岭】陕南年货专列3日", "place": "西安起止", "type": "专列", "value": 14.86 }, { "number": 83, "name": "【春季预售】全景臻云南目的地专列11日", "place": "昆明起止", "type": "专列", "value": 21.41 }, { "number": 92, "name": "【春游西藏预售】目的地进藏有氧空调专列11日", "place": "西宁起止", "type": "专列", "value": 35.7 }, { "number": 79, "name": "【一路繁花预售】江西湖北踏青专列6日", "place": "西安起止", "type": "专列", "value": 14.06 }, { "number": 46, "name": "【杏花绽放预售】极致温情南北疆专列11日", "place": "西安起止", "type": "专列", "value": 18.3 }], "table1": [{ "number": 278, "name": "海南文昌琼海万宁房车亲子4日", "place": "海口/三亚", "type": "房车", "value": 238.5 }, { "number": 88, "name": "海南旅居琼崖房车+海钓环游7日", "place": "海口起止", "type": "房车", "value": 263.12 }, { "number": 188, "name": "彩云之南云南环线房车6日", "place": "昆明起止", "type": "房车", "value": 129.34 }, { "number": 192, "name": "三门峡天鹅湖房车自驾2日", "place": "西安起止", "type": "房车", "value": 16.32 }, { "number": 2960, "name": "陕文旅房车旅享生活-房车单租赁", "place": "西安起止", "type": "房车", "value": 355.2 }], "table6": [{ "number": 109, "name": "【康养系列】遇见攀西双动6日", "place": "西安起止", "type": "康养旅居", "value": 21.58 }, { "number": 136, "name": "【康养旅居系列】阳光攀枝花双动8日", "place": "西安起止", "type": "康养旅居", "value": 40.52 }] }, "nationalChannelSalesRatio": [
    //             {
    //                 "order": 1,
    //                 "name": "乐游",
    //                 "value": 19888.0,
    //                 "source": "陕西"
    //             },
    //             {
    //                 "order": 2,
    //                 "name": "陕西全冕",
    //                 "value": 18888.0,
    //                 "source": "陕西"
    //             },
    //             {
    //                 "order": 3,
    //                 "name": "乐游",
    //                 "value": 17888.0,
    //                 "source": "重庆"
    //             },
    //             {
    //                 "order": 4,
    //                 "name": "西安绿地营业部",
    //                 "value": 16888.0,
    //                 "source": "陕西"
    //             },
    //             {
    //                 "order": 5,
    //                 "name": "乐游",
    //                 "value": 15888.0,
    //                 "source": "上海"
    //             },
    //             {
    //                 "order": 6,
    //                 "name": "上海湘宏",
    //                 "value": 14888.0,
    //                 "source": "上海"
    //             },
    //             {
    //                 "order": 7,
    //                 "name": "西藏阳光神龙旅行社有限公司",
    //                 "value": 13888.0,
    //                 "source": "西藏"
    //             },
    //             {
    //                 "order": 8,
    //                 "name": "重庆创享国际旅行社有限公司",
    //                 "value": 12888.0,
    //                 "source": "重庆"
    //             },
    //             {
    //                 "order": 9,
    //                 "name": "重庆千友国际旅行社有限公司",
    //                 "value": 11888.0,
    //                 "source": "重庆"
    //             },
    //             {
    //                 "order": 10,
    //                 "name": "苏州乐居",
    //                 "value": 10888.0,
    //                 "source": "江苏"
    //             }
    //         ], "mapLines": [{ "toName": "新疆", "fromName": "天津" }, { "toName": "西藏", "fromName": "天津" }, { "toName": "海南", "fromName": "天津" }, { "toName": "云南", "fromName": "天津" }, { "toName": "广东", "fromName": "山西" }, { "toName": "广西", "fromName": "山西" }, { "toName": "黑龙江", "fromName": "山西" }, { "toName": "湖南", "fromName": "山东" }, { "toName": "湖北", "fromName": "山东" }, { "toName": "海南", "fromName": "陕西" }, { "toName": "广西", "fromName": "陕西" }, { "toName": "西藏", "fromName": "陕西" }, { "toName": "内蒙古", "fromName": "陕西" }, { "toName": "湖南", "fromName": "陕西" }, { "toName": "新疆", "fromName": "陕西" }, { "toName": "甘肃", "fromName": "陕西" }, { "toName": "上海", "fromName": "陕西" }, { "toName": "四川", "fromName": "陕西" }, { "toName": "湖北", "fromName": "陕西" }, { "toName": "云南", "fromName": "陕西" }, { "toName": "海南", "fromName": "四川" }, { "toName": "福建", "fromName": "四川" }, { "toName": "广西", "fromName": "四川" }, { "toName": "云南", "fromName": "四川" }, { "toName": "湖南", "fromName": "四川" }, { "toName": "福建", "fromName": "重庆" }, { "toName": "广西", "fromName": "重庆" }, { "toName": "湖南", "fromName": "重庆" }, { "toName": "云南", "fromName": "重庆" }, { "toName": "黑龙江", "fromName": "湖北" }, { "toName": "广西", "fromName": "湖北" }, { "toName": "海南", "fromName": "湖北" }, { "toName": "甘肃", "fromName": "湖南" }, { "toName": "海南", "fromName": "湖南" }, { "toName": "新疆", "fromName": "湖南" }, { "toName": "黑龙江", "fromName": "湖南" }, { "toName": "湖北", "fromName": "湖南" }, { "toName": "海南", "fromName": "上海" }, { "toName": "内蒙古", "fromName": "上海" }, { "toName": "西藏", "fromName": "上海" }], "hotel": { "hotel2": [{ "name": "三亚亚特兰蒂斯酒店" }, { "name": "上海迪士尼乐园酒店" }, { "name": "广州长隆熊猫酒店" }, { "name": "三亚海棠湾仁恒皇冠假日酒店" }, { "name": "杭州开元森泊度假酒店" }], "hotel3": [{ "name": "长白山温泉皇冠假日酒店" }, { "name": "腾冲石头纪酒店" }, { "name": "安吉涵田度假村" }, { "name": "西安华清御汤酒店" }, { "name": "重庆融汇泉别院" }], "hotel1": [{ "name": "上海浦东香格里拉大酒店" }, { "name": "北京金茂万丽酒店" }, { "name": "成都太古里春熙美居酒店" }, { "name": "广州天河太古汇亚朵酒店" }, { "name": "深圳福田皇岗城际酒店" }, { "name": "重庆桔子水晶解放碑洪崖洞酒店" }, { "name": "西安W酒店" }, { "name": "南京维景国际大酒店" }, { "name": "杭州西湖武林pagoda君亭设计酒店" }, { "name": "长沙国金中心异国印象酒店" }], "hotel4": [{ "name": "乌镇乌村酒店" }, { "name": "莫干山缦田生态度假酒店" }, { "name": "西坡中卫度假民宿" }, { "name": "大理木夕大里酒店" }, { "name": "乐山千里走单骑度假酒店" }], "hotel5": [{ "name": "南昆山温德姆温泉酒店" }, { "name": "大同王府至尊酒店" }, { "name": "茂名国际大酒店" }, { "name": "喆啡酒店三亚政务中心店" }, { "name": "三亚艾德游艇酒店" }] }, "annualTop": {
    //             "popularDestinationPlaces": [
    //                 {
    //                     "name": "三亚市",
    //                     "value": 41000,
    //                     "order": 1
    //                 },
    //                 {
    //                     "name": "上海市",
    //                     "value": 37000,
    //                     "order": 2
    //                 },
    //                 {
    //                     "name": "桂林市",
    //                     "value": 31000,
    //                     "order": 3
    //                 },
    //                 {
    //                     "name": "西安市",
    //                     "value": 25000,
    //                     "order": 4
    //                 },
    //                 {
    //                     "name": "厦门市",
    //                     "value": 21000,
    //                     "order": 5
    //                 },
    //                 {
    //                     "name": "拉萨市",
    //                     "value": 18500,
    //                     "order": 6
    //                 },
    //                 {
    //                     "name": "嘉兴市",
    //                     "value": 16500,
    //                     "order": 7
    //                 },
    //                 {
    //                     "name": "贵阳市",
    //                     "value": 14500,
    //                     "order": 8
    //                 },
    //                 {
    //                     "name": "西双版纳傣族自治州",
    //                     "value": 12500,
    //                     "order": 9
    //                 },
    //                 {
    //                     "name": "兰州市",
    //                     "value": 10500,
    //                     "order": 10
    //                 }
    //             ], "popularDeparturePlaces": [
    //                 {
    //                     "order": 1,
    //                     "name": "西安市",
    //                     "value": 100
    //                 },
    //                 {
    //                     "order": 2,
    //                     "name": "嘉兴市",
    //                     "value": 95
    //                 },
    //                 {
    //                     "order": 3,
    //                     "name": "桂林市",
    //                     "value": 90
    //                 },
    //                 {
    //                     "order": 4,
    //                     "name": "厦门市",
    //                     "value": 85
    //                 },
    //                 {
    //                     "order": 5,
    //                     "name": "贵阳市",
    //                     "value": 80
    //                 },
    //                 {
    //                     "order": 6,
    //                     "name": "西双版纳傣族自治州",
    //                     "value": 75
    //                 },
    //                 {
    //                     "order": 7,
    //                     "name": "三亚市",
    //                     "value": 70
    //                 },
    //                 {
    //                     "order": 8,
    //                     "name": "兰州市",
    //                     "value": 65
    //                 },
    //                 {
    //                     "order": 9,
    //                     "name": "上海市",
    //                     "value": 60
    //                 },
    //                 {
    //                     "order": 10,
    //                     "name": "拉萨市",
    //                     "value": 55
    //                 }
    //             ]
    //         }, "passengerData": {
    //             "passengerUnitPriceRatio": [
    //                 {
    //                     "name": "<500",
    //                     "value": 30
    //                 },
    //                 {
    //                     "name": "500-1000",
    //                     "value": 25
    //                 },
    //                 {
    //                     "name": "1000-2000",
    //                     "value": 20
    //                 },
    //                 {
    //                     "name": "2000-5000",
    //                     "value": 15
    //                 },
    //                 {
    //                     "name": ">5000",
    //                     "value": 10
    //                 }
    //             ], "passengerGenderRatio": [
    //                 {
    //                     "name": "男",
    //                     "value": 41.6
    //                 },
    //                 {
    //                     "name": "女",
    //                     "value": 58.4
    //                 }
    //             ], "passengerAgeRatio": [
    //                 {
    //                     "name": "19以下",
    //                     "value": 40.1
    //                 },
    //                 {
    //                     "name": "19-30岁",
    //                     "value": 40.2
    //                 },
    //                 {
    //                     "name": "31-45岁",
    //                     "value": 35.3
    //                 },
    //                 {
    //                     "name": "46-55岁",
    //                     "value": 25
    //                 },
    //                 {
    //                     "name": "55岁以上",
    //                     "value": 25
    //                 }
    //             ], "recentHalfYearPassengerNumber": [{ "name": "8 月", "value": "46666" }, { "name": "9 月", "value": "36000" }, { "name": "10 月", "value": "50666" }, { "name": "11 月", "value": "186666" }, { "name": "12 月", "value": "146666" }, { "name": "1 月", "value": "22580" }]
    //         }, "halfYearTransactionData": { "GMV": [{ "name": "8 月", "value": "7000" }, { "name": "9 月", "value": "5400" }, { "name": "10 月", "value": "7600" }, { "name": "11 月", "value": "28000" }, { "name": "12 月", "value": "22000" }, { "name": "1 月", "value": "3387" }], "revenue": [{ "name": "8 月", "value": 7573 }, { "name": "9 月", "value": 5842 }, { "name": "10 月", "value": 8223 }, { "name": "11 月", "value": 30295 }, { "name": "12 月", "value": 23803 }, { "name": "1 月", "value": 3664 }], "statistics": [{ "name": "半年总交易额 (万元)", "value": 73387, "percent": "17.82" }, { "name": "总订单数", "value": 440498, "percent": "21.73" }, { "name": "月均交易额 (万元)", "value": 12231, "percent": "5.82" }, { "name": "月均订单数", "value": 73416, "percent": "6.22" }] }
    //     });
    // })
};
// 获取地图每个省份的旅客数据
export async function getMapTravelData() {
    // return fetchGet('http://api.wentouzhilv.com/jkgl/dpjk/all.do');
    return new Promise((resolve, reject) => {
        resolve({
            "totalVolume": 1848912105,
            "mapData": {
                "Shanghai": [
                    {
                        "name": "景区",
                        "value": 31
                    },
                    {
                        "name": "旅行社",
                        "value": 447
                    },
                    {
                        "name": "酒店",
                        "value": 1831
                    },
                    {
                        "name": "渠道",
                        "value": 24
                    },
                    {
                        "name": "今日客流量",
                        "value": 7382
                    },
                    {
                        "name": "本月客流量",
                        "value": 45871
                    }
                ],
                "Yunnan": [
                    {
                        "name": "景区",
                        "value": 36
                    },
                    {
                        "name": "旅行社",
                        "value": 642
                    },
                    {
                        "name": "酒店",
                        "value": 1258
                    },
                    {
                        "name": "渠道",
                        "value": 23
                    },
                    {
                        "name": "今日客流量",
                        "value": 6501
                    },
                    {
                        "name": "本月客流量",
                        "value": 40418
                    }
                ],
                "Inner Mongolia": [
                    {
                        "name": "景区",
                        "value": 34
                    },
                    {
                        "name": "旅行社",
                        "value": 196
                    },
                    {
                        "name": "酒店",
                        "value": 2619
                    },
                    {
                        "name": "渠道",
                        "value": 96
                    },
                    {
                        "name": "今日客流量",
                        "value": 9192
                    },
                    {
                        "name": "本月客流量",
                        "value": 27824
                    }
                ],
                "Beijing": [
                    {
                        "name": "景区",
                        "value": 27
                    },
                    {
                        "name": "旅行社",
                        "value": 719
                    },
                    {
                        "name": "酒店",
                        "value": 2123
                    },
                    {
                        "name": "渠道",
                        "value": 156
                    },
                    {
                        "name": "今日客流量",
                        "value": 7106
                    },
                    {
                        "name": "本月客流量",
                        "value": 7265
                    }
                ],
                "Taiwan": [
                    {
                        "name": "景区",
                        "value": 49
                    },
                    {
                        "name": "旅行社",
                        "value": 546
                    },
                    {
                        "name": "酒店",
                        "value": 1850
                    },
                    {
                        "name": "渠道",
                        "value": 174
                    },
                    {
                        "name": "今日客流量",
                        "value": 3624
                    },
                    {
                        "name": "本月客流量",
                        "value": 21435
                    }
                ],
                "Jilin": [
                    {
                        "name": "景区",
                        "value": 14
                    },
                    {
                        "name": "旅行社",
                        "value": 253
                    },
                    {
                        "name": "酒店",
                        "value": 1152
                    },
                    {
                        "name": "渠道",
                        "value": 24
                    },
                    {
                        "name": "今日客流量",
                        "value": 1573
                    },
                    {
                        "name": "本月客流量",
                        "value": 41830
                    }
                ],
                "Sichuan": [
                    {
                        "name": "景区",
                        "value": 36
                    },
                    {
                        "name": "旅行社",
                        "value": 540
                    },
                    {
                        "name": "酒店",
                        "value": 849
                    },
                    {
                        "name": "渠道",
                        "value": 61
                    },
                    {
                        "name": "今日客流量",
                        "value": 6819
                    },
                    {
                        "name": "本月客流量",
                        "value": 9464
                    }
                ],
                "Tianjin": [
                    {
                        "name": "景区",
                        "value": 45
                    },
                    {
                        "name": "旅行社",
                        "value": 773
                    },
                    {
                        "name": "酒店",
                        "value": 2597
                    },
                    {
                        "name": "渠道",
                        "value": 88
                    },
                    {
                        "name": "今日客流量",
                        "value": 4070
                    },
                    {
                        "name": "本月客流量",
                        "value": 39713
                    }
                ],
                "Ningxia": [
                    {
                        "name": "景区",
                        "value": 10
                    },
                    {
                        "name": "旅行社",
                        "value": 768
                    },
                    {
                        "name": "酒店",
                        "value": 1131
                    },
                    {
                        "name": "渠道",
                        "value": 174
                    },
                    {
                        "name": "今日客流量",
                        "value": 4811
                    },
                    {
                        "name": "本月客流量",
                        "value": 10147
                    }
                ],
                "Anhui": [
                    {
                        "name": "景区",
                        "value": 47
                    },
                    {
                        "name": "旅行社",
                        "value": 537
                    },
                    {
                        "name": "酒店",
                        "value": 1194
                    },
                    {
                        "name": "渠道",
                        "value": 42
                    },
                    {
                        "name": "今日客流量",
                        "value": 9162
                    },
                    {
                        "name": "本月客流量",
                        "value": 22897
                    }
                ],
                "Shandong": [
                    {
                        "name": "景区",
                        "value": 10
                    },
                    {
                        "name": "旅行社",
                        "value": 420
                    },
                    {
                        "name": "酒店",
                        "value": 2153
                    },
                    {
                        "name": "渠道",
                        "value": 114
                    },
                    {
                        "name": "今日客流量",
                        "value": 9364
                    },
                    {
                        "name": "本月客流量",
                        "value": 29280
                    }
                ],
                "Shanxi": [
                    {
                        "name": "景区",
                        "value": 44
                    },
                    {
                        "name": "旅行社",
                        "value": 98
                    },
                    {
                        "name": "酒店",
                        "value": 987
                    },
                    {
                        "name": "渠道",
                        "value": 192
                    },
                    {
                        "name": "今日客流量",
                        "value": 331
                    },
                    {
                        "name": "本月客流量",
                        "value": 25076
                    }
                ],
                "Guangdong": [
                    {
                        "name": "景区",
                        "value": 37
                    },
                    {
                        "name": "旅行社",
                        "value": 330
                    },
                    {
                        "name": "酒店",
                        "value": 1386
                    },
                    {
                        "name": "渠道",
                        "value": 71
                    },
                    {
                        "name": "今日客流量",
                        "value": 6168
                    },
                    {
                        "name": "本月客流量",
                        "value": 9689
                    }
                ],
                "Guangxi": [
                    {
                        "name": "景区",
                        "value": 35
                    },
                    {
                        "name": "旅行社",
                        "value": 646
                    },
                    {
                        "name": "酒店",
                        "value": 1046
                    },
                    {
                        "name": "渠道",
                        "value": 146
                    },
                    {
                        "name": "今日客流量",
                        "value": 2420
                    },
                    {
                        "name": "本月客流量",
                        "value": 2955
                    }
                ],
                "Xinjiang": [
                    {
                        "name": "景区",
                        "value": 43
                    },
                    {
                        "name": "旅行社",
                        "value": 761
                    },
                    {
                        "name": "酒店",
                        "value": 2348
                    },
                    {
                        "name": "渠道",
                        "value": 50
                    },
                    {
                        "name": "今日客流量",
                        "value": 8178
                    },
                    {
                        "name": "本月客流量",
                        "value": 44384
                    }
                ],
                "Jiangsu": [
                    {
                        "name": "景区",
                        "value": 43
                    },
                    {
                        "name": "旅行社",
                        "value": 235
                    },
                    {
                        "name": "酒店",
                        "value": 2351
                    },
                    {
                        "name": "渠道",
                        "value": 179
                    },
                    {
                        "name": "今日客流量",
                        "value": 6261
                    },
                    {
                        "name": "本月客流量",
                        "value": 14268
                    }
                ],
                "Jiangxi": [
                    {
                        "name": "景区",
                        "value": 35
                    },
                    {
                        "name": "旅行社",
                        "value": 733
                    },
                    {
                        "name": "酒店",
                        "value": 1887
                    },
                    {
                        "name": "渠道",
                        "value": 199
                    },
                    {
                        "name": "今日客流量",
                        "value": 872
                    },
                    {
                        "name": "本月客流量",
                        "value": 34007
                    }
                ],
                "Hebei": [
                    {
                        "name": "景区",
                        "value": 34
                    },
                    {
                        "name": "旅行社",
                        "value": 244
                    },
                    {
                        "name": "酒店",
                        "value": 2082
                    },
                    {
                        "name": "渠道",
                        "value": 176
                    },
                    {
                        "name": "今日客流量",
                        "value": 4488
                    },
                    {
                        "name": "本月客流量",
                        "value": 6085
                    }
                ],
                "Henan": [
                    {
                        "name": "景区",
                        "value": 41
                    },
                    {
                        "name": "旅行社",
                        "value": 757
                    },
                    {
                        "name": "酒店",
                        "value": 2906
                    },
                    {
                        "name": "渠道",
                        "value": 91
                    },
                    {
                        "name": "今日客流量",
                        "value": 1114
                    },
                    {
                        "name": "本月客流量",
                        "value": 22855
                    }
                ],
                "Zhejiang": [
                    {
                        "name": "景区",
                        "value": 23
                    },
                    {
                        "name": "旅行社",
                        "value": 692
                    },
                    {
                        "name": "酒店",
                        "value": 1710
                    },
                    {
                        "name": "渠道",
                        "value": 40
                    },
                    {
                        "name": "今日客流量",
                        "value": 2085
                    },
                    {
                        "name": "本月客流量",
                        "value": 45376
                    }
                ],
                "Hainan": [
                    {
                        "name": "景区",
                        "value": 16
                    },
                    {
                        "name": "旅行社",
                        "value": 259
                    },
                    {
                        "name": "酒店",
                        "value": 2496
                    },
                    {
                        "name": "渠道",
                        "value": 74
                    },
                    {
                        "name": "今日客流量",
                        "value": 3788
                    },
                    {
                        "name": "本月客流量",
                        "value": 41900
                    }
                ],
                "Hubei": [
                    {
                        "name": "景区",
                        "value": 22
                    },
                    {
                        "name": "旅行社",
                        "value": 132
                    },
                    {
                        "name": "酒店",
                        "value": 727
                    },
                    {
                        "name": "渠道",
                        "value": 65
                    },
                    {
                        "name": "今日客流量",
                        "value": 9872
                    },
                    {
                        "name": "本月客流量",
                        "value": 1660
                    }
                ],
                "Hunan": [
                    {
                        "name": "景区",
                        "value": 33
                    },
                    {
                        "name": "旅行社",
                        "value": 633
                    },
                    {
                        "name": "酒店",
                        "value": 542
                    },
                    {
                        "name": "渠道",
                        "value": 44
                    },
                    {
                        "name": "今日客流量",
                        "value": 4070
                    },
                    {
                        "name": "本月客流量",
                        "value": 45159
                    }
                ],
                "Macao": [
                    {
                        "name": "景区",
                        "value": 28
                    },
                    {
                        "name": "旅行社",
                        "value": 359
                    },
                    {
                        "name": "酒店",
                        "value": 2202
                    },
                    {
                        "name": "渠道",
                        "value": 158
                    },
                    {
                        "name": "今日客流量",
                        "value": 2462
                    },
                    {
                        "name": "本月客流量",
                        "value": 48411
                    }
                ],
                "Gansu": [
                    {
                        "name": "景区",
                        "value": 22
                    },
                    {
                        "name": "旅行社",
                        "value": 283
                    },
                    {
                        "name": "酒店",
                        "value": 761
                    },
                    {
                        "name": "渠道",
                        "value": 50
                    },
                    {
                        "name": "今日客流量",
                        "value": 7886
                    },
                    {
                        "name": "本月客流量",
                        "value": 30169
                    }
                ],
                "Fujian": [
                    {
                        "name": "景区",
                        "value": 15
                    },
                    {
                        "name": "旅行社",
                        "value": 256
                    },
                    {
                        "name": "酒店",
                        "value": 527
                    },
                    {
                        "name": "渠道",
                        "value": 176
                    },
                    {
                        "name": "今日客流量",
                        "value": 7755
                    },
                    {
                        "name": "本月客流量",
                        "value": 46345
                    }
                ],
                "Tibet": [
                    {
                        "name": "景区",
                        "value": 21
                    },
                    {
                        "name": "旅行社",
                        "value": 708
                    },
                    {
                        "name": "酒店",
                        "value": 2328
                    },
                    {
                        "name": "渠道",
                        "value": 164
                    },
                    {
                        "name": "今日客流量",
                        "value": 1424
                    },
                    {
                        "name": "本月客流量",
                        "value": 30894
                    }
                ],
                "Guizhou": [
                    {
                        "name": "景区",
                        "value": 35
                    },
                    {
                        "name": "旅行社",
                        "value": 402
                    },
                    {
                        "name": "酒店",
                        "value": 519
                    },
                    {
                        "name": "渠道",
                        "value": 198
                    },
                    {
                        "name": "今日客流量",
                        "value": 8254
                    },
                    {
                        "name": "本月客流量",
                        "value": 29834
                    }
                ],
                "Liaoning": [
                    {
                        "name": "景区",
                        "value": 33
                    },
                    {
                        "name": "旅行社",
                        "value": 594
                    },
                    {
                        "name": "酒店",
                        "value": 645
                    },
                    {
                        "name": "渠道",
                        "value": 168
                    },
                    {
                        "name": "今日客流量",
                        "value": 1045
                    },
                    {
                        "name": "本月客流量",
                        "value": 34388
                    }
                ],
                "Chongqing": [
                    {
                        "name": "景区",
                        "value": 11
                    },
                    {
                        "name": "旅行社",
                        "value": 276
                    },
                    {
                        "name": "酒店",
                        "value": 605
                    },
                    {
                        "name": "渠道",
                        "value": 107
                    },
                    {
                        "name": "今日客流量",
                        "value": 6357
                    },
                    {
                        "name": "本月客流量",
                        "value": 9697
                    }
                ],
                "Shaanxi": [
                    {
                        "name": "景区",
                        "value": 42
                    },
                    {
                        "name": "旅行社",
                        "value": 283
                    },
                    {
                        "name": "酒店",
                        "value": 1445
                    },
                    {
                        "name": "渠道",
                        "value": 103
                    },
                    {
                        "name": "今日客流量",
                        "value": 2106
                    },
                    {
                        "name": "本月客流量",
                        "value": 22761
                    }
                ],
                "Qinhai": [
                    {
                        "name": "景区",
                        "value": 17
                    },
                    {
                        "name": "旅行社",
                        "value": 699
                    },
                    {
                        "name": "酒店",
                        "value": 1487
                    },
                    {
                        "name": "渠道",
                        "value": 127
                    },
                    {
                        "name": "今日客流量",
                        "value": 8365
                    },
                    {
                        "name": "本月客流量",
                        "value": 25591
                    }
                ],
                "Hong Kong": [
                    {
                        "name": "景区",
                        "value": 28
                    },
                    {
                        "name": "旅行社",
                        "value": 134
                    },
                    {
                        "name": "酒店",
                        "value": 1034
                    },
                    {
                        "name": "渠道",
                        "value": 24
                    },
                    {
                        "name": "今日客流量",
                        "value": 9795
                    },
                    {
                        "name": "本月客流量",
                        "value": 10548
                    }
                ],
                "Heilongjiang": [
                    {
                        "name": "景区",
                        "value": 22
                    },
                    {
                        "name": "旅行社",
                        "value": 438
                    },
                    {
                        "name": "酒店",
                        "value": 1447
                    },
                    {
                        "name": "渠道",
                        "value": 168
                    },
                    {
                        "name": "今日客流量",
                        "value": 9989
                    },
                    {
                        "name": "本月客流量",
                        "value": 29584
                    }
                ]
            }
        });
    });
};
// 获取累计交易总额
export async function getTotalData() {
    return fetchGet(`${process.env.NODE_ENV === 'development' ? '/apiv1' : ''}/jkgl/dpjk/ljjyje.do`);
    //http://8.140.245.26:8081/apiv1
};


