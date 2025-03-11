
import React, { useCallback, useEffect, useState } from 'react';
import Item1 from './components/Right/Item1';
import Item2 from './components/Right/Item2';
import Item3 from './components/Right/Item3';
import Item4 from './components/Right/Item4';
import Item5 from './components/Right/Item5';
import Item6 from './components/Right/Item6';
import Item7 from './components/Right/Item7';
import Item8 from './components/Right/Item8';
import Item9 from './components/Right/Item9';
import Item10 from './components/Right/Item10';
import Item11 from './components/Right/Item11';
import Item12 from './components/Right/Item12';

const HomeBodyRight: React.FC<any> = (props: any) => {
    const { data } = props;

    return (
        <div className="flex-box home-body-right">
            <div className="flex-box-column home-body-right-column">
                <Item1 data={data?.right1} />
                <Item2 data={data?.right2} />
                <Item3 data={data?.right3} />
                <Item4 data={data?.right4} />
            </div>
            <div className="flex-box-column home-body-right-column">
                <Item5 data={data?.right5} />
                <Item6 data={data?.right6} />
                <Item7 data={data?.right7} />
                <Item8 data={data?.right8} />
            </div>
            <div className="flex-box-column home-body-right-column">
                <Item9 data={data?.right9} />
                <Item10 data={data?.right10} />
                <Item11 data={data?.right11} />
                <Item12 data={data?.right12} />
            </div>
        </div>
    );
};

export default HomeBodyRight;
