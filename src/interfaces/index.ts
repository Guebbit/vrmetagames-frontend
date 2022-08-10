// https://gist.github.com/soerenmartius/ad62ad59b991c99983a4e495bf6acb04
import type { ComputedRef, Ref, WritableComputedRef } from "vue";

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
    authentication ?:string
    password ?:string
}

export interface userInfoFormMap {
    username?: string,
    firstname?: string,
    lastname?: string,
    password?: string,
    passwordConfirm?: string,
    email?: string,
    phone?: string,
    birthday?: number,
    terms?: boolean,
}

export type AnyRef<T> = Ref<T> | ComputedRef<T> | WritableComputedRef<T>;