
import { useCallback, useEffect, useState } from 'react';
import ItemBody from '../ItemBody';
import RankCharts from '@/components/RankCharts';
import ScrollBox from '@/components/ScrollBox';

const Item8: React.FC<any> = (props: any) => {
    let { data } = props;

    return (
        <ItemBody title={'酒店 Hotel'}>
            <div className="flex-box hotel-data-box">
                <ScrollBox
                    data={[
                        <div className='flex-box hotel-data-box-item-page'>
                            <div className="hotel-data-box-item-page-item">
                                <RankCharts
                                    title="全国酒店热搜榜 1 - 5"
                                    data={data?.hotel1?.slice(0, 5)}
                                    onlyFont={true}
                                />
                            </div>
                            <div className="hotel-data-box-item-page-item">
                                <RankCharts
                                    title="全国酒店热搜榜 6 - 10"
                                    data={data?.hotel1?.slice(5, 10)}
                                    startNum={5}
                                    onlyFont={true}
                                    colorList={[]}
                                />
                            </div>
                        </div>,
                        <div className='flex-box hotel-data-box-item-page'>
                            <div className="hotel-data-box-item-page-item">
                                <RankCharts
                                    title="热门度假酒店好评榜"
                                    data={data?.hotel2}
                                    onlyFont={true}
                                />
                            </div>
                            <div className="hotel-data-box-item-page-item">
                                <RankCharts
                                    title="热门温泉酒店人气榜"
                                    data={data?.hotel3}
                                    onlyFont={true}
                                />
                            </div>
                        </div>,
                        <div className='flex-box hotel-data-box-item-page'>
                            <div className="hotel-data-box-item-page-item">
                                <RankCharts
                                    title="热门周边游酒店收藏榜"
                                    data={data?.hotel4}
                                    onlyFont={true}
                                />
                            </div>
                            <div className="hotel-data-box-item-page-item">
                                <RankCharts
                                    title="自营酒店热销榜"
                                    data={data?.hotel5}
                                    onlyFont={true}
                                />
                            </div>
                        </div>
                    ]}
                    direction={"row"}
                    time={10000}
                />

                {/* <div className="flex-box-column hotel-data-box-left">
                    <div className="hotel-data-box-left-item">
                        <RankCharts
                            title="全国酒店热搜榜"
                            data={data?.hotel1}
                            pageSize={4}
                            onlyFont={true}
                        />
                    </div>
                    <div className="hotel-data-box-left-item">
                        <RankCharts
                            title="热门度假酒店好评榜"
                            data={data?.hotel2}
                            pageSize={4}
                            onlyFont={true}
                        />
                    </div>
                </div>
                <div className="flex-box-column hotel-data-box-right">
                    <div className="hotel-data-box-right-item">
                        <RankCharts
                            title="热门温泉酒店人气榜"
                            data={data?.hotel3}
                            pageSize={3}
                            onlyFont={true}
                        />
                    </div>
                    <div className="hotel-data-box-right-item">
                        <RankCharts
                            title="热门周边游酒店收藏榜"
                            data={data?.hotel4}
                            pageSize={3}
                            onlyFont={true}
                        />
                    </div>
                    <div className="hotel-data-box-right-item">
                        <RankCharts
                            title="自营酒店热销榜"
                            data={data?.hotel5}
                            pageSize={3}
                            onlyFont={true}
                        />
                    </div>
                </div> */}
            </div>
        </ItemBody>
    );
};

export default Item8;
