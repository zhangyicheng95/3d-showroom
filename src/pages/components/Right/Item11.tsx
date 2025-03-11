
import RandomTextWall from '@/components/RandomTextWall';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import ItemBody from '../ItemBody';

const Item11: React.FC<any> = (props: any) => {
    let { data } = props;

    return (
        <ItemBody title={'热词'}>
            <div className="flex-box-column hot-word-box">
                <div className="hot-word-box-top">
                    <RandomTextWall data={data?.map((i: any) => i.name)} animate={true} />
                </div>
                <div className="flex-box hot-word-box-bottom">
                    <div className="flex-box-center hot-word-box-bottom-item">
                        <div className="hot-word-box-bottom-item-name">
                            TOP5热问服务量
                        </div>
                        <div className="hot-word-box-bottom-item-number">
                            {2233}
                        </div>
                    </div>
                    <div className="flex-box-center hot-word-box-bottom-item">
                        <div className="hot-word-box-bottom-item-name">
                            TOP5热问服务占比
                        </div>
                        <div className="hot-word-box-bottom-item-number">
                            {675}
                        </div>
                    </div>
                </div>
            </div>
        </ItemBody>
    );
};

export default Item11;
