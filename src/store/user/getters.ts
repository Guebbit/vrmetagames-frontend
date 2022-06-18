import type { stateUserMap } from "@/interfaces";

export default {

    /**
     *
     */
    isAuthenticated({ jwt } :stateUserMap) :boolean {
        // https://laracasts.com/discuss/channels/vue/vue-authentication-best-practice
        // https://auth0.com/blog/complete-guide-to-vue-user-authentication/
        return !!jwt;
    }
}