import React, { useEffect, useRef } from 'react';
import styles from './index.less';

const ScrollBox: React.FC<any> = (props: any) => {
    const { data = [], direction = 'row', time = 5000 } = props;
    const domRef = useRef<any>();
    const timeRef = useRef<any>();

    useEffect(() => {
        if (!!domRef.current) {
            const pages = document.querySelectorAll('.scroll-page-item');
            let currentPageIndex = 0;

            function autoScroll() {
                currentPageIndex++;
                if (currentPageIndex >= pages.length) {
                    currentPageIndex = 0;
                };
                domRef.current.scrollTo(Object.assign(
                    { behavior: 'smooth', },
                    direction === 'row' ? {
                        left: pages[currentPageIndex]?.offsetLeft,
                    } : {
                        top: pages[currentPageIndex].offsetTop,
                    }
                ));
            }

            !!timeRef.current && clearInterval(timeRef.current);
            timeRef.current = setInterval(autoScroll, time); // 每3秒切换一次页面
        }

        return () => {
            !!timeRef.current && clearInterval(timeRef.current);
        };
    }, [data, direction, time, domRef.current]);

    return <div
        ref={domRef}
        className={`${styles.scrollBox} ${direction === 'row' ? 'flex-box' : ''}`}
        style={{ scrollSnapType: direction === 'row' ? 'x mandatory' : 'y mandatory' }}
    >
        {
            (data || [])?.map((item: any, index: number) => {
                return <div
                    className="scroll-page-item"
                    key={`scroll-page-item-${index}`}
                >
                    {item}
                </div>
            })
        }
    </div>
};

export default ScrollBox;
