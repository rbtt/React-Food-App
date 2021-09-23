import classes from './Cart.module.css'
import Modal from '../UI/Modal'
import React, { useContext, useState } from 'react'
import CartContext from '../../store/cart-context'
import CartItem from './CartItem'
import Checkout from './Checkout'

const Cart = (props) => {
    const [isCheckout, setIsCheckout] = useState(false)
    const [isSubmiting, setIsSubmiting] = useState(false)
    const [didSubmit, setDidSubmit] = useState(false)
    const cartCtx = useContext(CartContext)

    const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`
    const hasItems = cartCtx.items.length > 0

    const cartItemRemoveHandler = id => {
        cartCtx.removeItem(id)
    }
    const cartItemAddHandler = item => {
        cartCtx.addItem({ ...item, amount: 1 })
    }

    const cartitems = (
        <ul className={classes['cart-items']}>
            {cartCtx.items.map(item =>
                <CartItem key={item.id}
                    name={item.name}
                    amount={item.amount}
                    price={item.price}
                    onRemove={cartItemRemoveHandler.bind(null, item.id)}
                    onAdd={cartItemAddHandler.bind(null, item)}
                />
            )}
        </ul>
    )

    const orderHandler = () => {
        setIsCheckout(true)
    }
    const modalActions = <div className={classes.actions}>
        <button className={classes['button--alt']} onClick={props.onHideCart}>Close</button>
        {hasItems && <button className={classes.button} onClick={orderHandler}>Order</button>}
    </div>

    const submitOrderHandler = async (userData) => {
        setIsSubmiting(true)
        await fetch('https://reacthttp-a1e1d-default-rtdb.europe-west1.firebasedatabase.app/orders.json', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                user: userData,
                orderedItems: cartCtx.items
            })
        })
        setIsSubmiting(false)
        setDidSubmit(true)
        cartCtx.clearCart()
    }

    const cartModalContent = (
        <React.Fragment>
            {cartitems}
            <div className={classes.total}>
                <span>Total amount</span>
                <span>{totalAmount}</span>
            </div>
            {isCheckout && <Checkout onCancel={props.onHideCart} onConfirm={submitOrderHandler} />}
            {!isCheckout && modalActions}
        </React.Fragment>
    );

    const isSubmitingModalContent = (
        <p>Sending order data ...</p>
    )

    const didSubmitModalContent = (
        <p>Successfully sent the order!</p>
    )

    return <Modal onHideCart={props.onHideCart}>
        {!isSubmiting && !didSubmit && cartModalContent}
        {isSubmiting && isSubmitingModalContent}
        {didSubmit && didSubmitModalContent}
    </Modal >
}

export default Cart