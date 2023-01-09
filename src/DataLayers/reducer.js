// import Cars from '../data'
export const defaultState = {
    cars : [ ],
    user: {}
}
   


const reducer = (state,action) => {
    console.log('action', action.type);
    switch(action.type) {
        case 'UPDATE_CAR':
            return {
                ...state,
                cars: action.newCars
            }
        case 'ADD_CAR':
            const newCars = [...state.cars,action.car]
            return {
                ...state, 
                cars: newCars
            }
        case 'SET_USER': 
            return {
                ...state,
                user: action.user
            }
        default: 
            return state;
    }
}

export default reducer;