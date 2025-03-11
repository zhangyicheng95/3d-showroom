import options from '@/constants/commonOptions';
import React, { useEffect, useRef, useState } from 'react';
import styles from './index.less';

const getRandomStyle: any = (index: number) => {
    const minSize = 10;
    const maxSize = 24;
    const fontSize = Math.floor(Math.random() * (maxSize - minSize)) + minSize + 'px';
    const rotate = Math.floor(Math.random() * 360) + 'deg';
    const top = Math.random() * 80 + '%';
    const left = Math.random() * 80 + '%';

    return {
        fontSize: fontSize,
        // transform: `rotate(${rotate})`,
        color: options?.color[index % options?.color?.length],
        position: 'absolute',
        top: top,
        left: left,
    };
};

const RandomTextWall = (props: any) => {
    const { data = [], animate } = props;
    const [update, setUpdate] = useState(false);
    const timer = useRef<any>(null);
    useEffect(() => {
        timer.current && clearInterval(timer.current);
        if (animate) {
            timer.current = setInterval(() => {
                setUpdate((pre) => !pre);
            }, 10000);
        }

        return () => {
            timer.current && clearInterval(timer.current);
        }
    }, [animate]);

    return (
        <div className={styles.randomTextWall}>
            {(data || []).map((text: string, index: number) => (
                <div key={index} className="text-item" style={getRandomStyle(index)}>
                    {text}
                </div>
            ))}
        </div>
    );
};

export default RandomTextWall;