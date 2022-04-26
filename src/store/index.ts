// https://www.stephenli.ca/vuex-4-typescript-declarations-generator
// https://gist.github.com/luna-koury/ad3e2a2a62533aa590784a0eff2bef17

import { InjectionKey } from 'vue';
import { createStore, Store, useStore as baseUseStore } from 'vuex';
import { stateRootMap } from '@/interfaces';

import mainState from "./main/state";
import mainGetters from "./main/getters";
import mainMutations from "./main/mutations";
import mainActions from "./main/actions";

import usersState from "./users/state";
import usersGetters from "./users/getters";
import usersMutations from "./users/mutations";
import usersActions from "./users/actions";

import ecommerceState from "./ecommerce/state";
import ecommerceGetters from "./ecommerce/getters";
import ecommerceMutations from "./ecommerce/mutations";
import ecommerceActions from "./ecommerce/actions";

export const key: InjectionKey<Store<stateRootMap>> = Symbol()

export const store = createStore({
  modules: {
    main: {
      state: mainState,
      getters: mainGetters,
      mutations: mainMutations,
      actions: mainActions,
      namespaced: true
    },
    users: {
      state: usersState,
      getters: usersGetters,
      mutations: usersMutations,
      actions: usersActions,
      namespaced: true
    },
    ecommerce: {
      state: ecommerceState,
      getters: ecommerceGetters,
      mutations: ecommerceMutations,
      actions: ecommerceActions,
      namespaced: true
    }
  }
})

// define your own `useStore` composition function
export function useStore () {
  return baseUseStore(key)
}