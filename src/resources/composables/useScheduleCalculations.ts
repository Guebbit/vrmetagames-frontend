import { AnyRef } from "@/interfaces";
import { computed, ref, toRefs } from "vue";
import { useStore } from "@/store";
import useScheduleHelpers from "@/resources/composables/useScheduleHelpers";

// TODO MASS RENAME
export default (steps :AnyRef<number>) => {
    const { state } = useStore();
    const { userInfo } = toRefs(state.user);
    const { scheduleTimeStep, scheduleTimeCost } = toRefs(state.ecommerce);

    const {
        getStepCost,
        getScheduleTotalTime,
        getScheduleTotalSteps,
        getNearestDiscountThreshold
    } = useScheduleHelpers();

    /**
     *
     */
    const scheduleCartTotalTime = computed(() =>
        steps.value * scheduleTimeStep.value
    );

    /**
     * Sum the COST of selected schedules (NO DISCOUNT, calculated later)
     */
    const scheduleCartTotalCost = computed(() =>
        (steps.value * scheduleTimeCost.value[0]) / 100
    );

    /**
     * REAL cart COST
     * AFTER base discounts ("many steps" special pack discounts)
     */
    const scheduleCartTotalCostDiscounted = computed(() =>
        getStepCost(steps.value) / 100
    )

    /**
     *
     */
    const userInfoWalletTime = computed(() =>
        (userInfo.value?.wallet || 0) * scheduleTimeStep.value
    );

    /**
     *
     */
    const userInfoWalletTimeRemaining = computed(() =>
        userInfoWalletTime.value - scheduleCartTotalTime.value
    );

    /**
     * The wallet is the number of steps already bought, they count as "standard price" because eventual discounts were already made at the wallet insertion
     * real monetary value of wallet steps
     */
    const scheduleCartFinalCost = computed(() =>
        Math.max(scheduleCartTotalCostDiscounted.value - (userInfo.value?.wallet || 0) * (scheduleTimeCost.value[0] / 100), 0)
    );

    return {
        scheduleTimeStep,
        scheduleTimeCost,
        getStepCost,
        getScheduleTotalTime,
        getScheduleTotalSteps,
        scheduleCartTotalTime,
        steps,
        scheduleCartTotalCost,
        scheduleCartTotalCostDiscounted,
        userInfoWalletTime,
        userInfoWalletTimeRemaining,
        scheduleCartFinalCost,
        getNearestDiscountThreshold
    }
}