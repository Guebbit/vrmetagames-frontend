// https://gist.github.com/soerenmartius/ad62ad59b991c99983a4e495bf6acb04

export {
    // ecommerce
    scheduleInputMap,
    scheduleMap,
    userMap,
    stationMap,
    gameMap,
    stateEcommerceMap,

    //main
    toastMap,
    BusinessHoursMap,
    stateMainMap,

    // user
    paymentMethodMap,
    paymentMap,
    currentUserMap,
    stateUserMap,
} from './state';

import type { stateMainMap, stateUserMap, stateEcommerceMap} from './state';

export interface stateRootMap {
    main: stateMainMap,
    user: stateUserMap,
    ecommerce: stateEcommerceMap
}

export interface loginFormMap {
    user :string
    password :string
}

export interface registrationFormMap {
    username :string
    email :string
    password :string
    repeatPassword :string
}
