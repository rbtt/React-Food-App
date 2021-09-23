import classes from './Checkout.module.css'
import { useRef, useState } from 'react';

const isEmpty = value => value.trim() !== ''
const isNotFourChars = value => value.trim().length === 4

const Checkout = (props) => {
    const nameInputRef = useRef()
    const streetInputRef = useRef()
    const postalInputRef = useRef()
    const cityInputRef = useRef()

    const [formValidity, setFormValidity] = useState({
        name: true,
        street: true,
        city: true,
        postalCode: true
    })

    const confirmHandler = (e) => {
        e.preventDefault();
        const enteredName = nameInputRef.current.value;
        const enteredStreet = streetInputRef.current.value;
        const enteredPostal = postalInputRef.current.value;
        const enteredCity = cityInputRef.current.value;

        const enteredNameIsValid = isEmpty(enteredName)
        const enteredStreetIsValid = isEmpty(enteredStreet)
        const enteredCityIsValid = isEmpty(enteredCity)
        const enteredPostalIsValid = isNotFourChars(enteredPostal)

        setFormValidity({
            name: enteredNameIsValid,
            street: enteredStreetIsValid,
            city: enteredCityIsValid,
            postalCode: enteredPostalIsValid
        })

        const formIsValid =
            enteredNameIsValid &&
            enteredStreetIsValid &&
            enteredCityIsValid &&
            enteredPostalIsValid;

        if (!formIsValid) {
            return;
        }

        props.onConfirm({
            name: enteredName,
            street: enteredStreet,
            city: enteredCity,
            postalCode: enteredPostal
        })
    }

    return <form onSubmit={confirmHandler} className={classes.form}>
        <div
            className={`${classes.control} ${formValidity.name ? '' : classes.invalid}`} >
            <label htmlFor="name">Your name</label>
            <input type="text" id="name" ref={nameInputRef}></input>
            {!formValidity.name && <p>Name shouldn't be empty</p>}
        </div>
        <div className={`${classes.control} ${formValidity.street ? '' : classes.invalid}`}>
            <label htmlFor="street">Your address</label>
            <input type="text" id="street" ref={streetInputRef}></input>
            {!formValidity.street && <p>Street shouldn't be empty</p>}
        </div>
        <div className={`${classes.control} ${formValidity.postalCode ? '' : classes.invalid}`}>
            <label htmlFor="postal">Post code</label>
            <input type="text" id="postal" ref={postalInputRef}></input>
            {!formValidity.postalCode && <p>Invalid post code</p>}
        </div>
        <div className={`${classes.control} ${formValidity.city ? '' : classes.invalid}`}>
            <label htmlFor="city">City</label>
            <input type="text" id="city" ref={cityInputRef}></input>
            {!formValidity.city && <p>City shouldn't be empty</p>}
        </div>
        <div className={classes.actions}>
            <button type="button" onClick={props.onCancel}>Cancel</button>
            <button>Checkout</button>
        </div>

    </form>
}

export default Checkout;