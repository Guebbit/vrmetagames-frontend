import type { stateUserMap, currentUserMap, paymentMethodMap, paymentMap } from "@/interfaces";

export default {
    /**
     * Set current user data
     *
     * @param {Object} state
     * @param {Object} userInfo
     */
    setAuthenticationTokens(state: stateUserMap, { jwt }: Record<string, string>) {
        state.jwt = jwt;
    },

    /**
     * Set current user data
     *
     * @param {Object} state
     * @param {Object} userInfo
     */
    setUserInfo(state: stateUserMap, userInfo: currentUserMap) {
        state.userInfo = userInfo;
    },

    /**
     * Set current user data
     *
     * @param {Object} paymentRecords
     * @param {Object} paymentMethodData
     */
    setPaymentMethods({ paymentMethods }: stateUserMap, paymentMethodData: paymentMethodMap) {
        paymentMethods[paymentMethodData.id] = paymentMethodData;
    },

    /**
     * Set current user data
     *
     * @param {Object} paymentRecords
     * @param {Object} paymentRecordData
     */
    setPaymentRecord({ paymentRecords }: stateUserMap, paymentRecordData: paymentMap) {
        paymentRecords[paymentRecordData.id] = paymentRecordData;
    },
}