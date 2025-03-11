
import { useCallback, useEffect, useState } from 'react';
import ItemBody from '../ItemBody';
import icon from '@/assets/naturalResources/icon.gif';
import iconBg from '@/assets/naturalResources/icon-bg.png';

const Item3: React.FC<any> = (props: any) => {
    let { data } = props;

    return (
        <ItemBody title={'近半区域流量'}>
            <div className="flex-box-center natural-resources-box">
                <div className="flex-box natural-resources-box-top">
                    <div className='flex-box-center natural-resources-box-top-icon'>
                        <img src={icon} alt="" />
                    </div>
                    {
                        (data?.top || [])?.map((item: any, index: number) => {
                            const { title, number } = item;
                            return <div
                                className="natural-resources-box-top-item"
                                key={`natural-resources-box-top-item-${index}`}
                            >
                                <div className="natural-resources-box-top-item-title">{title}</div>
                                <div className="natural-resources-box-top-item-number">{number}</div>
                            </div>
                        })
                    }
                </div>
                <div className="flex-box-justify-around natural-resources-box-bottom">
                    <div className="flex-box-justify-around natural-resources-box-bottom-top">
                        {
                            (data?.bottom || [])?.map((item: any, index: number) => {
                                const { title, percent, content, number } = item;
                                return <div
                                    className="flex-box-center natural-resources-box-bottom-item"
                                    key={`natural-resources-box-bottom-item-${index}`}
                                >
                                    <img src={iconBg} alt="" className='imgPosition' />
                                    <div className="natural-resources-box-bottom-item-percent">{percent}</div>
                                    <div className="natural-resources-box-bottom-item-title">{title}</div>
                                </div>
                            })
                        }
                    </div>
                    <div className="flex-box-justify-around natural-resources-box-bottom-bottom">
                        {
                            (data?.bottom || [])?.map((item: any, index: number) => {
                                const { title, percent, content, number } = item;
                                return <div
                                    className="flex-box-center natural-resources-box-bottom-item"
                                    key={`natural-resources-box-bottom-item2-${index}`}
                                >
                                    <div className="natural-resources-box-bottom-item-content">{content}</div>
                                    <div className="natural-resources-box-bottom-item-number">{number}</div>
                                </div>
                            })
                        }
                    </div>
                </div>
            </div>
        </ItemBody>
    );
};

export default Item3;
