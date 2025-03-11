
import { useCallback, useEffect, useState } from 'react';
import ItemBody from '../ItemBody';
import icon from '@/assets/naturalResources/icon.gif';
import iconBg from '@/assets/naturalResources/icon-bg.png';
import LineCharts from '../LineCharts';

const Item6: React.FC<any> = (props: any) => {
    let { data } = props;

    return (
        <ItemBody title={'近半年区域流量'}>
            <div className="flex-box-center nearly-half-regional-traffic-box">
                <LineCharts data={data} hiddenY={true} />
            </div>
        </ItemBody>
    );
};

export default Item6;
