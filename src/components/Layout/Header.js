import React from 'react'
import classes from './Header.module.css'
import mealsImage from '../../assets/meals.jpg'
import HeaderCartButton from './HeaderCartButton'

const Header = (props) => {

    return <React.Fragment>
        <header className={classes.header}>
            <h1>ReactMeals</h1>
            <HeaderCartButton onClick={props.onShowCart}>Shopping Cart</HeaderCartButton>
        </header>
        <div className={classes['main-image']}><img src={mealsImage} alt="Table of meals" /></div>
    </React.Fragment>
}

export default Header