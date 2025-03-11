
import { useCallback, useEffect, useState } from 'react';
import ItemBody from '../ItemBody';
import left2Icon1 from '@/assets/supply/icon1.svg';
import left2Icon2 from '@/assets/supply/icon2.svg';
import left2Icon3 from '@/assets/supply/icon3.svg';
import left2Icon4 from '@/assets/supply/icon4.svg';

const iconFormat = {
    0: left2Icon1,
    1: left2Icon2,
    2: left2Icon3,
    3: left2Icon4,
};

const Item2: React.FC<any> = (props: any) => {
    let { data } = props;
    return (
        <ItemBody title={'角色重塑 效率提升'}>
            <div className="flex-box supply-box">
                {
                    (data || [])?.map((item: any, index: number) => {
                        const { name, subName } = item;
                        return <div className="flex-box-center supply-box-item" key={`supply-box-item-${index}`}>
                            <div className="flex-box-center supply-box-item-icon">
                                <img src={iconFormat[index]} alt="" />
                            </div>
                            <div className="flex-box-column supply-box-item-right">
                                {name}
                                <div className="supply-box-item-right-number">{subName}</div>
                            </div>
                        </div>
                    })
                }
            </div>
        </ItemBody>
    );
};

export default Item2;
