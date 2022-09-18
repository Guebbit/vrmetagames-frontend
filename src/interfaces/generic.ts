// https://gist.github.com/soerenmartius/ad62ad59b991c99983a4e495bf6acb04
import type { ComputedRef, Ref, WritableComputedRef } from "vue";
import type { stateEcommerceMap } from './state/ecommerce';
import type { stateMainMap } from './state/main';
import type { stateUserMap } from './state/user';

export interface imageMap {
    src: string
    thumbnail?: string
    wallpaper?: string
    title?: string
    alt?: string
    role?: string
}

export interface stateRootMap {
    main: stateMainMap,
    user: stateUserMap,
    ecommerce: stateEcommerceMap
}

export type AnyRef<T> = Ref<T> | ComputedRef<T> | WritableComputedRef<T>;