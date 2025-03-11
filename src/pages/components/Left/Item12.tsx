
import { useCallback, useEffect, useState } from 'react';
import ItemBody from '../ItemBody';
import bg from '@/assets/internationalLayout/bg.svg';

const Item12: React.FC<any> = (props: any) => {
    let { data } = props;

    return (
        <ItemBody title={'全球视野 国际布局'}>
            <div className="international-layout-box">
                <img src={bg} alt="" className='imgPosition' style={{ opacity: 0.9 }} />
                <div className="international-layout-box-title">
                    在国际市场建立分支机构
                </div>
                <div className="international-layout-box-title-sub">
                    2025年全面进入全球旅游市场资源
                </div>
                {
                    (data || [])?.map((item: any, index: number) => {
                        const { continent, country, description } = item;
                        return <div
                            className="flex-box-column international-layout-box-item-card"
                            key={`international-layout-box-item-card-${index}`}
                            style={
                                index === 0 ?
                                    {
                                        top: '6.4rem',
                                        left: '5%'
                                    }
                                    :
                                    index === 1 ?
                                        {
                                            top: '10.4rem',
                                            left: 'calc(5% + 8.8rem)'
                                        }
                                        :
                                        index === 2 ?
                                            {
                                                top: '8rem',
                                                left: '21.6rem'
                                            }
                                            :
                                            index === 3 ?
                                                {
                                                    top: '5.6rem',
                                                    right: '5%'
                                                }
                                                : {}
                            }
                        >
                            <div className="international-layout-box-item-card-continent">{continent}</div>
                            <div className="international-layout-box-item-card-country">{country}</div>
                            <div className="international-layout-box-item-card-description">({description})</div>
                        </div>
                    })
                }
            </div>
        </ItemBody>
    );
};

export default Item12;
