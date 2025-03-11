
import React, { } from 'react';
import icon01 from '@/assets/travel/travel-1.jpg';
import icon02 from '@/assets/travel/travel-2.jpg';
import icon03 from '@/assets/travel/travel-3.jpg';
import icon04 from '@/assets/travel/travel-4.jpg';
import icon05 from '@/assets/travel/travel-5.jpg';
import icon06 from '@/assets/travel/travel-6.jpg';
import { Divider } from 'antd';

const format: any = {
    0: icon01,
    1: icon02,
    2: icon03,
    3: icon04,
    4: icon05,
    5: icon06
};

const ItemCenter: React.FC<any> = (props: any) => {
    let { data, name } = props;

    return (
        <div className="data-box">
            <div className="data-box-top">
                <Divider style={{ borderColor: '#7cb305' }}>{name}</Divider>
            </div>
            <div className="flex-box data-box-bottom">
                {
                    (data || [])?.map((item: any, index: number) => {
                        const { name, value } = item;
                        return <div className="flex-box-center data-box-bottom-item" key={`data-box-bottom-item-${index}`}>
                            <div className="flex-box-center data-box-bottom-item-icon">
                                <img src={format[index % data.length]} alt="" />
                            </div>
                            <div className="flex-box-column data-box-bottom-item-right">
                                <div className="data-box-bottom-item-right-name">{name}</div>
                                <div className="data-box-bottom-item-right-number">{value}</div>
                            </div>
                        </div>
                    })
                }
            </div>
        </div>
    );
};

export default ItemCenter;
