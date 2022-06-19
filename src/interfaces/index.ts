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

export interface disclaimerMap {
    icon :string
    text :string
    dismissable :boolean
}

export interface formScheduleMap {
    date?: string
    hourStart?: string
    hourEnd?: string
    rules?: boolean
    temporaryFillFormFlag ?:boolean
}

export interface scheduleReadableMap {
    date?: string
    hourStart?: string
    hourEnd?: string
    durationData?: {
        mode: number
        hours: number
        minutes: number
    }
}

