// https://gist.github.com/soerenmartius/ad62ad59b991c99983a4e495bf6acb04

export {
    // ecommerce
    scheduleMap,
    userMap,
    stationMap,
    gameMap,
    stateEcommerceMap,

    //main
    BusinessHoursMap,
    stateMainMap,

    // user
    paymentMethodMap,
    paymentMap,
    currentUserMap,
    stateUserMap,
} from './state';

import { stateMainMap, stateUserMap, stateEcommerceMap} from './state';

export interface stateRootMap {
    main: stateMainMap,
    user: stateUserMap,
    ecommerce: stateEcommerceMap
}



