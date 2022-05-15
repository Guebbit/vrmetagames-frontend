// https://www.codeproject.com/Tips/5295301/Correctly-Typing-Vuex-with-TypeScript
// https://gist.github.com/luna-koury/ad3e2a2a62533aa590784a0eff2bef17

import { InjectionKey } from 'vue';
import { createStore, Store, useStore as baseUseStore } from 'vuex';
import { stateRootMap } from '@/interfaces';

import mainState from "./main/state";
import mainGetters from "./main/getters";
import mainMutations from "./main/mutations";
import mainActions from "./main/actions";

import usersState from "./user/state";
import usersGetters from "./user/getters";
import usersMutations from "./user/mutations";
import usersActions from "./user/actions";

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
    user: {
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