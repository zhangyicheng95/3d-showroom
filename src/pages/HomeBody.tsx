import React, { useMemo, useEffect, useRef, useState } from 'react';
// @ts-ignore
import { Decoration6 } from '@jiaminghi/data-view-react'
import * as _ from 'lodash-es';
import HomeBodyLeft from './HomeBodyLeft';
import HomeBodyRight from './HomeBodyRight';
import { Statistic } from 'antd';
import ItemCenter from './components/ItemCenter';
import China3Dmap from '@/components/China3Dmap';
import { hotWord, left12, left3, left4, left6, left7, left9, centerMapLines, nationalDistributors, nationalSuppliers, nearlyHalfRegionalTraffic, right1, right10, right3, right5, right7, right9, ticket, holiday, right2, hotel } from './Home/mock';
import { getAllHomeData, getMapTravelData, getTotalData } from '@/services/api';
import { transformData } from '@/utils/utils';
import { prvinceFormatToString } from '@/constants';

const HomeBody: React.FC<any> = () => {
    const timer = useRef<any>(null);
    // 地图hover哪个省，展示相应的数据
    const [currentCity, setCurrentCity] = useState({ adcode: 610000, name: '陕西省' });
    const [data, setData] = useState({
        left1: {
            left: ['', '资源', '地接社', '批发商', '办事处', '其他平台', '分销渠道'],
            right: ['', '资源', '平台', '渠道']
        },
        left2: [
            {
                name: '旅行顾问',
                subName: '对销售业绩负责',
            },
            {
                name: '平台运营',
                subName: '询/占/确，订单流转',
            },
            {
                name: '采购管理',
                subName: '出入库，库存管理',
            },
            {
                name: '供应商',
                subName: '产/供/销之间关系品类',
            }
        ],
        left3: left3,
        left4: left4,
        left5: {},
        left6: left6,
        left7: left7,
        left8: {

        },
        left9: left9,
        left10: nationalSuppliers,
        left11: nationalDistributors,
        left12: left12,
        right1: right1,
        right2: right2,
        right3: right3,
        right4: ticket,
        right5: right5,
        right6: nearlyHalfRegionalTraffic,
        right7: right7,
        right8: hotel,
        right9: right9,
        right10: right10,
        right11: hotWord,
        right12: holiday,
    });
    const [centerData, setCenterData] = useState<any>({
        610000: [
            {
                name: '景区',
                value: 520,
            },
            {
                name: '旅行社',
                value: 5008,
            },
            {
                name: '酒店',
                value: 357,
            },
            {
                name: '渠道',
                value: 2344,
            },
            {
                name: '今日客流量',
                value: 62700,
            },
            {
                name: '本月客流量',
                value: 1507960,
            }
        ]
    });
    const [flyData, setFlyData] = useState<any>([]);
    const [tottalNum, setTotalNum] = useState(2134037927);
    // left，right卡片数据
    useEffect(() => {
        getAllHomeData().then((res: any) => {
            if (!!res && !!Object?.keys?.(res)?.length && !!res?.nationalChannelSalesNetwork) {
                const {
                    nationalChannelSalesNetwork, nationalRegionResourceRanking, nationalChannelSalesRatio,
                    currentYearTransactionData, realTimeOrders, themeFeatures, ticket, halfYearTransactionData,
                    recentHalfYearRegionTraffic, passengerData, hotel, annualTop, resourceRanking, hotWords, holiday,
                    mapLines
                } = res;
                setData((prev: any) => {
                    return {
                        ...prev,
                        // left1:,
                        // left2:,
                        // left3:,
                        left4: nationalChannelSalesNetwork,
                        // left5:,
                        // left6:,
                        // left7:,
                        // left8:,
                        // left9:,
                        ...!!nationalRegionResourceRanking?.length ? { left10: nationalRegionResourceRanking } : {},
                        ...!!nationalChannelSalesRatio?.length ? { left11: nationalChannelSalesRatio } : {},
                        // left12:,
                        ...!!currentYearTransactionData?.value ? { right1: currentYearTransactionData } : {},
                        ...!!realTimeOrders?.realTimeResourceOrder?.length ?
                            {
                                right2: {
                                    rank1: realTimeOrders?.realTimeResourceOrder,
                                    rank2: realTimeOrders?.realTimeRouteOrders
                                }
                            } : {},
                        ...!!Object.keys(themeFeatures)?.length ? {
                            right3: themeFeatures
                        } : {},
                        ...!!Object.keys(ticket)?.length ? {
                            right4: ticket
                        } : {},
                        ...!!halfYearTransactionData?.GMV?.length ?
                            {
                                right5: {
                                    bar: {
                                        xAxisData: (halfYearTransactionData?.GMV || [])?.map((item: any) => item?.name),
                                        data: [
                                            {
                                                title: 'GMV',
                                                number: (halfYearTransactionData?.GMV || [])?.map((item: any) => item?.value)
                                            },
                                            {
                                                title: '收入',
                                                number: (halfYearTransactionData?.revenue || [])?.map((item: any) => item?.value)
                                            },
                                        ]
                                    },
                                    statistics: halfYearTransactionData.statistics
                                }
                            } : {},
                        ...!!recentHalfYearRegionTraffic?.peripheralTourism?.length ? {
                            right6: [
                                {
                                    name: '周边游',
                                    value: recentHalfYearRegionTraffic?.peripheralTourism
                                },
                                {
                                    name: '国内游',
                                    value: recentHalfYearRegionTraffic?.domesticTourism
                                },
                                {
                                    name: '出境游',
                                    value: recentHalfYearRegionTraffic?.outboundTourism
                                }
                            ]
                        } : {},
                        ...!!passengerData?.passengerAgeRatio?.length ? {
                            right7: {
                                passengerAgeRatio: passengerData?.passengerAgeRatio,
                                passengerGenderRatio: passengerData?.passengerGenderRatio,
                                passengerUnitPriceRatio: passengerData?.passengerUnitPriceRatio,
                                recentHalfYearPassengerNumber: passengerData?.recentHalfYearPassengerNumber
                            }
                        } : {},
                        ...!!Object.keys(hotel)?.length ?
                            { right8: hotel } : {},
                        ...!!annualTop.popularDeparturePlaces?.length ? {
                            right9: {
                                out: annualTop.popularDeparturePlaces,
                                in: annualTop.popularDestinationPlaces
                            }
                        } : {},
                        ...!!resourceRanking?.table1?.length ?
                            { right10: resourceRanking } : {},
                        ...!!hotWords?.length ? {
                            right11: hotWords
                        } : {},
                        ...!!Object.keys(holiday)?.length ?
                            { right12: holiday } : {},
                    }
                });
                if (!!mapLines && !!mapLines?.length) {
                    let flyLine: any = transformData(mapLines, 'toName', 'fromName');
                    setFlyData(flyLine);
                } else {
                    setFlyData(centerMapLines);
                };
            } else {
                setFlyData(centerMapLines);
            }
        }).catch((res) => {
            setFlyData(centerMapLines);
        })
    }, []);
    // 中间底部，获取每个省份旅游数据
    useEffect(() => {
        getMapTravelData().then((res: any) => {
            if (!!res && !!res?.mapData) {
                const { mapData } = res;
                setCenterData(Object.keys(mapData)?.reduce((pre: any, cen: any) => {
                    return {
                        ...pre,
                        [prvinceFormatToString[_.toLower(cen)]]: mapData[cen]
                    }
                }, {}));
            }
        });
    }, []);
    // 中间累计交易额
    useEffect(() => {
        if (!!timer.current) {
            clearInterval(timer.current);
        };
        const fun = () => {
            getTotalData().then((res: any) => {
                if (!!res && !!res?.totalVolume) {
                    const { totalVolume, currentYearTransactionData, halfYearTransactionData } = res;
                    setTotalNum(totalVolume);
                    // setTotalNum((prev: any) => prev += Math.random() * 5000);
                    setData((prev: any) => {
                        return {
                            ...prev,
                            ...!!currentYearTransactionData?.value ? { right1: currentYearTransactionData } : {},
                            ...!!halfYearTransactionData?.GMV?.length ?
                                {
                                    right5: {
                                        bar: {
                                            xAxisData: (halfYearTransactionData?.GMV || [])?.map((item: any) => item?.name),
                                            data: [
                                                {
                                                    title: 'GMV',
                                                    number: (halfYearTransactionData?.GMV || [])?.map((item: any) => item?.value)
                                                },
                                                {
                                                    title: '收入',
                                                    number: (halfYearTransactionData?.revenue || [])?.map((item: any) => item?.value)
                                                },
                                            ]
                                        },
                                        statistics: halfYearTransactionData.statistics
                                    }
                                } : {},
                        }
                    });
                } else {
                    setTotalNum((prev: any) => prev + Math.floor(Math.random() * 5000));
                };
            });
        };
        fun();
        timer.current = setInterval(() => {
            fun();
        }, 10000);

        return () => {
            !!timer.current && clearInterval(timer.current);
        }
    }, []);

    return (
        <div className="flex-box home-body">
            {
                useMemo(() => {
                    return <HomeBodyLeft data={data} />
                }, [data])
            }
            <div className="home-body-center">
                <div className="home-body-center-number">
                    <div className="home-body-center-number-title">
                        平台累计交易额（GMV）
                    </div>
                    {
                        useMemo(() => {
                            return <Statistic className='fontColor' groupSeparator={', '} value={tottalNum} />
                        }, [tottalNum])
                    }
                </div>
                <div className="home-body-center-content">
                    {
                        useMemo(() => {
                            return <China3Dmap
                                onChange={(code: { adcode: number; name: string }) => { setCurrentCity(code) }}
                                flyData={flyData}
                            />
                        }, [flyData])
                    }
                </div>
                <div className="flex-box-column home-body-center-footer">
                    <div className="flex-box-justify-end home-body-center-footer-header">
                        <Decoration6 className="home-body-center-footer-header-icon" />
                    </div>
                    <div className="home-body-center-footer-content">
                        {
                            useMemo(() => {
                                return <ItemCenter data={centerData[currentCity?.adcode]} name={currentCity?.name} />
                            }, [centerData, currentCity])
                        }
                    </div>
                    <div className="flex-box-justify-end home-body-center-footer-header home-body-center-footer-header-2">
                        <Decoration6 className="home-body-center-footer-header-icon" />
                    </div>
                </div>
            </div>
            {
                useMemo(() => {
                    return <HomeBodyRight data={data} />
                }, [data])
            }
        </div>
    );
};

export default HomeBody;
