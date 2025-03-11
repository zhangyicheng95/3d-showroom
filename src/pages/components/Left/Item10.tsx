
import RankCharts from '@/components/RankCharts';
import { Fragment, useCallback, useEffect, useRef, useState } from 'react';
import ItemBody from '../ItemBody';

const Item10:  React.FC<any> = (props: any) => {
    let { data } = props;

    return (
        <ItemBody title={'资源洞察 战略布局'}>
            <div className="proportion-national-rank-box">
                <RankCharts data={data} pageSize={5} />
            </div>
        </ItemBody>
    );
};

export default Item10;
