// https://gist.github.com/soerenmartius/ad62ad59b991c99983a4e495bf6acb04
import type { ComputedRef, Ref, WritableComputedRef } from "vue";
import type { stateEcommerceMap } from './state/ecommerce';
import type { stateMainMap } from './state/main';
import type { stateUserMap } from './state/user';

export {
    sendScheduleRequestMap,
    scheduleInputMap,
    scheduleMap,
    userMap,
    stationMap,
    gameMap
} from './state/ecommerce';

export {
    toastMap,
    BusinessHoursMap
} from './state/main';

export {
    paymentMethodMap,
    paymentMap,
    currentUserMap
} from './state/user';

export {
    stateEcommerceMap,
    stateMainMap,
    stateUserMap,
};

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
    birthday?: string,
    terms?: boolean,
}

export type AnyRef<T> = Ref<T> | ComputedRef<T> | WritableComputedRef<T>;