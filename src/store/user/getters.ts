import type { stateUserMap } from "@/interfaces";

export default {

    /**
     *
     * @param jwt
     */
    isAuthenticated({ jwt } :stateUserMap) :boolean {
        // https://laracasts.com/discuss/channels/vue/vue-authentication-best-practice
        // https://auth0.com/blog/complete-guide-to-vue-user-authentication/
        return !!jwt;
    },

    /**
     *
     * @param isAdmin
     * @param isAuthenticated
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    isAdmin({ userInfo: { isAdmin } } :stateUserMap, { isAuthenticated } :any) :boolean {
        return isAuthenticated && isAdmin;
    }
}