import { InjectionKey } from 'vue';
import { createStore, Store, useStore as baseUseStore } from 'vuex';
import { stateUserMap } from '@/interfaces';

import usersState from "./users/state";
import usersGetters from "./users/getters";
import usersMutations from "./users/mutations";
import usersActions from "./users/actions";

import ecommerceState from "./ecommerce/state";
import ecommerceGetters from "./ecommerce/getters";
import ecommerceMutations from "./ecommerce/mutations";
import ecommerceActions from "./ecommerce/actions";


// define injection key
export const key: InjectionKey<Store<stateUserMap>> = Symbol()

export const store = createStore<stateUserMap>({
  modules: {
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