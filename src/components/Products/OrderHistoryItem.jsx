import React from 'react';
import Divider from "@material-ui/core/Divider";
import {TextDetail} from "../UIkit";
import {dateToString, datetimeToString} from "../../functions/common";
import {OrderedProducts} from "./index";

const OrderHistoryItem = (props) => {
    const order = props.order;
    const orderedDate = datetimeToString(order.updated_at.toDate());
    const shippingDate = dateToString(order.shippingDate.toDate());
    const price = '¥' + order.amount.toLocaleString();
    return (
        <div>
            <div className='module-spacer--small' />
            <TextDetail label={'注文ID'} value={order.id} />
            <TextDetail label={'注文日時'} value={orderedDate} />
            <TextDetail label={'発送予定日'} value={shippingDate} />
            <TextDetail label={'注文金額'} value={price} />
            {order.products.length > 0 && (
                <OrderedProducts
                    key={order.id}
                    products={order.products}
                />
            )}
            <div className='module-spacer--extra-extra-small' />
            <Divider />
        </div>
    );
};

export default OrderHistoryItem;
