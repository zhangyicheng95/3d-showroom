
import { useCallback, useEffect, useRef, useState } from 'react';
import ItemBody from '../ItemBody';
import ConicalBarCharts from '../ConicalBarCharts';
import ScrollTable from '@/components/ScrollTable';
import options from '@/constants/commonOptions';

const headerColor = {
    0: options.color[0],
    1: options.color[1],
    2: options.color[2],
    3: options.color[3],
    4: options.color[4],
    5: options.color[5],
};

const Item2: React.FC<any> = (props: any) => {
    let { data } = props;
    const domRef = useRef<any>(null);

    return (
        <ItemBody title={'实时订单'}>
            <div className="flex-box-column regional-traffic-past-box" ref={domRef}>
                <div className="regional-traffic-past-box-top">
                    <ScrollTable
                        key={'regional-traffic-past-box'}
                        data={data?.rank1}
                        header={[
                            { label: '资源名称', value: 'name', width: '50%', color: headerColor[0] },
                            { label: '订单价格', value: 'value', addFront: '¥', width: '29%', color: headerColor[0] },
                            { label: '来源渠道', value: 'source', width: '21%', color: headerColor[0] }
                        ]}
                        speed={0.6}
                    />
                </div>
                <div className="regional-traffic-past-box-bottom">
                    <ScrollTable
                        key={'real-time-route-orders-box'}
                        data={data?.rank2}
                        header={[
                            { label: '线路名称', value: 'name', width: '75%', color: headerColor[2] },
                            { label: '订单价格', value: 'value', addFront: '¥', width: '25%', color: headerColor[2] },
                        ]}
                        speed={0.6}
                    />
                </div>
            </div>
        </ItemBody>
    );
};

export default Item2;
