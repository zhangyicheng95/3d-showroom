import options from '@/constants/commonOptions';
import React, { useEffect, useRef } from 'react';
import styles from './index.less';

interface Props {
    list: string[];
    time?: number;
    text?: boolean;
    reverse?: boolean;
}

const BasicBanner: React.FC<Props> = (props: any) => {
    const { className, list, text = false, time = 10, reverse = false, ...rest } = props;
    const boxRef = useRef<any>(null);
    const box1Ref = useRef<any>(null);
    const box2Ref = useRef<any>(null);

    useEffect(() => {
        let timer: any = null;
        setTimeout(() => {
            box2Ref.current.innerHTML = box1Ref.current.innerHTML;

            function changeToLeft() {
                if (boxRef.current.scrollLeft - box2Ref.current.offsetWidth >= 0) {
                    boxRef.current.scrollLeft -= box1Ref.current.offsetWidth;
                } else {
                    boxRef.current.scrollLeft++;
                }
            };
            function changeToRight() {
                if (boxRef.current.scrollLeft + box2Ref.current.offsetWidth < boxRef.current.scrollWidth) {
                    boxRef.current.scrollLeft += box1Ref.current.offsetWidth;
                } else {
                    boxRef.current.scrollLeft = 0;  // 回到起始位置
                }
            };
            timer = setInterval(() => {
                if (reverse) {
                    changeToRight();
                } else {
                    changeToLeft();
                }
            }, time);
        }, 3000);

        return () => {
            !!timer && clearInterval(timer);
        }
    }, [time, reverse]);

    return <div className={`flex-box ${styles.basicBanner}`} {...rest} ref={boxRef}>
        <div className="flex-box picScroll1" ref={box1Ref}>
            {
                (list || [])?.map((url: string, index: number) => {
                    return !!text ?
                        <div
                            className="banner-text"
                            key={`banner-text-${index}`}
                            style={{ color: options.color[Math.ceil(Math.random() * 10)] }}
                        >
                            {url}
                        </div>
                        :
                        <img key={`img-${index}`} src={url} />
                })
            }
        </div>
        <div className="flex-box picScroll2" ref={box2Ref}></div>
    </div >;
}

export default BasicBanner;
