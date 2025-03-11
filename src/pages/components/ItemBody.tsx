
import { useCallback, useEffect, useState } from 'react';
import itemHeaderIcon from '@/assets/images/home-item-header.svg';
import ItemHeader from './ItemHeader';

const ItemBody: React.FC<any> = (props: any) => {
    const { title = '', className, children, style, ...rest } = props;

    return (
        <div className="flex-box-column home-body-left-column-item" style={style}>
            {!!title ? <ItemHeader title={title} /> : null}
            <div className={`flex-box-column home-body-left-column-item-body ${className}`} {...rest}>
                {children}
            </div>
        </div>
    );
};

export default ItemBody;
