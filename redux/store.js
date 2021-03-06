import {createStore} from "redux";
import {reducer} from "./reducers";

/**
 * @param {object} initialState
 * @param {boolean} options.isServer indicates whether it is a server side or client side
 * @param {Request} options.req NodeJS Request object (not set when client applies initialState from server)
 * @param {Request} options.res NodeJS Request object (not set when client applies initialState from server)
 * @param {boolean} options.debug User-defined debug mode param
 * @param {string} options.storeKey This key will be used to preserve store in global namespace for safe HMR
 */
export const makeStore = (initialState, options) => {

    if(initialState === undefined) {

        const newState = {
            currentLanguage: "",
            filters: {
                adultsCount: 0,
                childrenCount: 0,
                childrenArr: [],
                householdIncomeValue: 0,
                zipcodeValue: 0,
                calculatorInputValid: false,
            },
            programs: [],
            categories: [],
            filtered_programs: [],
        };
        return createStore(reducer, newState);
    } else {
        return createStore(reducer, initialState);
    }
};