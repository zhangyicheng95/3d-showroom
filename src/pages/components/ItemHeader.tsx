
import { Fragment, useCallback, useEffect, useState } from 'react';
// @ts-ignore
import { Decoration1 } from '@jiaminghi/data-view-react';
import itemHeaderIcon from '@/assets/images/header-icon.gif';

const ItemHeader: React.FC<any> = (props: any) => {
    const { title = '' } = props;

    return (
        <div className="flex-box home-body-left-column-item-header">
            <img src={itemHeaderIcon} alt="" />
            <div className="home-body-left-column-item-header-title">
                {title}
            </div>
            <div className="home-body-left-column-item-header-sub-title">
                SHAANXI
                <div>CULTURE TOURISM</div>
            </div>
            <div className="flex-box-justify-end home-body-left-column-item-header-icon">
                <Decoration1 className="home-body-left-column-item-header-icon-i" />
            </div>
        </div>
    );
};

export default ItemHeader;
