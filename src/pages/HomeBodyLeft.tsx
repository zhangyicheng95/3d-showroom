
import { useCallback, useEffect, useState } from 'react';
import Item1 from './components/Left/Item1';
import Item2 from './components/Left/Item2';
import Item3 from './components/Left/Item3';
import Item4 from './components/Left/Item4';
import Item5 from './components/Left/Item5';
import Item6 from './components/Left/Item6';
import Item7 from './components/Left/Item7';
import Item8 from './components/Left/Item8';
import Item9 from './components/Left/Item9';
import Item10 from './components/Left/Item10';
import Item11 from './components/Left/Item11';
import Item12 from './components/Left/Item12';

const HomeBodyLeft: React.FC<any> = (props: any) => {
    const { data } = props;

    return (
        <div className="flex-box home-body-left">
            <div className="flex-box-column home-body-left-column">
                <Item1 data={data?.left1} />
                <Item2 data={data?.left2} />
                <Item3 data={data?.left3} />
                <Item4 data={data?.left4} />
            </div>
            <div className="flex-box-column home-body-left-column">
                <Item5 data={data?.left5} />
                <Item6 data={data?.left6} />
                <Item7 data={data?.left7} />
                <Item8 data={data?.left8} />
            </div>
            <div className="flex-box-column home-body-left-column">
                <Item9 data={data?.left9} />
                <Item10 data={data?.left10} />
                <Item11 data={data?.left11} />
                <Item12 data={data?.left12} />
            </div>
        </div>
    );
};

export default HomeBodyLeft;
