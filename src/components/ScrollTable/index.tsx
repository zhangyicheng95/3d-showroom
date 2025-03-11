import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Progress } from 'antd';
import styles from './index.less';
import TooltipDiv from '../TooltipDiv';

interface Props {
    data: any;
    header: any;
    speed?: number
    hiddenHeader?: boolean;
    staitc?: boolean;
}

const ScrollTable: React.FC<Props> = (props: any) => {
    let { data = [], header, speed = 1, hiddenHeader, staitc, ...rest } = props;
    const tableContainerRef = useRef<any>(null);

    useEffect(() => {
        if (staitc) {
            return;
        }
        const scrollContainer = tableContainerRef.current;
        const scrollSpeed = speed; // Adjust the scroll speed as needed
        let scrollPosition = 0;

        const scrollTable: any = () => {
            scrollPosition += scrollSpeed;
            if (
                scrollContainer.scrollHeight - scrollPosition <= scrollContainer.clientHeight * 4 / 5
                ||
                scrollPosition >= scrollContainer.scrollHeight
            ) {
                scrollPosition = 0;
            }
            scrollContainer.scrollTop = scrollPosition;
            requestAnimationFrame(scrollTable);
        };

        // Start the scrolling
        requestAnimationFrame(scrollTable);

        // Cleanup on component unmount
        return () => cancelAnimationFrame(scrollTable);
    }, [speed, staitc]);

    const rows = data?.map((item: any, index: number) => {
        return <div className="flex-box scroll-table-body-tr" key={`scroll-table-body-tr-${index}`}>
            {
                header?.map((i: any, index: number) => {
                    return <TooltipDiv
                        className="scroll-table-body-tr-td"
                        key={`scroll-table-body-tr-td-${i.value}`}
                        style={{
                            width: i.width || `${100 / header?.length}`,
                            ...(i.value === 'name' ? { padding: '0 2rem 0 0.8rem' } : {})
                        }}
                        content={item?.[i?.value]}
                    >
                        {!!i.addFront ? `${i.addFront} ` : ''}
                        {!!i.addFront ? Number(item?.[i?.value])?.toFixed(1) : item?.[i.value]}
                    </TooltipDiv>
                })
            }
        </div>
    });

    return (
        <div className={styles.scrollTable} {...rest}>
            {
                hiddenHeader ? null
                    :
                    <div className="flex-box scroll-table-header">
                        {
                            header?.map((i: any, index: number) => {
                                const { label, value, width, color } = i;
                                return <TooltipDiv
                                    className="scroll-table-header-item"
                                    key={`scroll-table-header-item-${value}`}
                                    style={{ width: width || `${100 / header?.length}`, color }}
                                >
                                    {label}
                                </TooltipDiv>
                            })
                        }
                    </div>
            }
            <div
                className="scroll-table-body"
                style={!!hiddenHeader ? { height: '100%' } : {}}
                ref={tableContainerRef}
            >
                {rows}
            </div>
        </div>
    );
};

export default ScrollTable;
