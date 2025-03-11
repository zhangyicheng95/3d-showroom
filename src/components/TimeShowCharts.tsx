import React, { Fragment, memo, useEffect, useRef, useState } from 'react';
import { Modal, Image, Skeleton } from 'antd';
import useClock from '@/hooks/useClock';

interface Props {

}

const TimeShowCharts: React.FC<Props> = (props: any) => {
    const { time } = useClock();

    return <Fragment>{time}</Fragment>;

};

export default memo(TimeShowCharts);