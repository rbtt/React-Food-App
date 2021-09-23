import classes from './AvailableMeals.module.css'
import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';
import { useEffect, useState } from 'react';


const AvailableMeals = () => {
    const [meals, setMeals] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [httpError, setHttpError] = useState()

    useEffect(() => {
        const fetchMeals = async () => {
            try {
                setIsLoading(true)
                const response = await fetch('https://reacthttp-a1e1d-default-rtdb.europe-west1.firebasedatabase.app/meals.json')
                const responseData = await response.json()
                const mealsArray = []
                for (const key in responseData) {
                    mealsArray.push({
                        id: key,
                        name: responseData[key].name,
                        description: responseData[key].description,
                        price: responseData[key].price
                    })
                }
                setMeals(mealsArray)
                setIsLoading(false)
            } catch(e) {
                setHttpError(e)
            }            
        }
        fetchMeals()
    }, [])

    if (httpError) {
        return <section className={classes.mealsError}>
            {httpError.message}
        </section>
    }

    if (isLoading) {
        return <section className={classes.mealsLoading}>
            Loading ...
        </section>
    }

    const mealsList = meals.map((meal) => {
        return <MealItem
            key={meal.id}
            id={meal.id}
            name={meal.name}
            description={meal.description}
            price={meal.price}
        />
    })
    return <section className={classes.meals}>
        <Card>
            <ul>
                {mealsList}
            </ul>
        </Card>
    </section>
}

export default AvailableMeals;