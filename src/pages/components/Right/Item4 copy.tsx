
import { useCallback, useEffect, useRef, useState } from 'react';
import ItemBody from '../ItemBody';
import GroupBarCharts from '../GroupBarCharts';
import { Progress } from 'antd';

const Item4Base: React.FC<any> = (props: any) => {
    let { data } = props;
    const domRef = useRef<any>(null);

    return (
        <ItemBody title={'门票'}>
            <div className="flex-box-column passenger-volume-past-box" ref={domRef}>
                <div className="flex-box-column passenger-volume-past-box-top">
                    <div className="passenger-volume-past-box-top-item">
                        <div className="flex-box-justify-between">今日实时客流 <div>1456人</div></div>
                        <Progress percent={data?.progress1} steps={100} showInfo={false} className="progress1" />
                    </div>
                    <div className="passenger-volume-past-box-top-item">
                        <div className="flex-box-justify-between">昨日同期客流 <div>786人</div></div>
                        <Progress percent={data?.progress2} steps={100} showInfo={false} className="progress2" />
                    </div>
                </div>
                <div className="passenger-volume-past-box-bottom">
                    <GroupBarCharts data={data?.bar} />
                </div>
            </div>
        </ItemBody>
    );
};

export default Item4Base;
