import { AnyRef } from "@/interfaces";
import { computed, ref, toRefs } from "vue";
import { useStore } from "@/store";
import useScheduleHelpers from "@/resources/composables/useScheduleHelpers";

export default (idArray :AnyRef<string[]>) => {
    const { state, getters } = useStore();
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
     *
     * warning: double step added
     */
    const stepAdded = ref(0);

    /**
     *
     */
    const stepAddedTime = computed(() => stepAdded.value * 2 * scheduleTimeStep.value);

    /**
     *
     */
    const stepAddedCost = computed(() => stepAdded.value * 2 * scheduleTimeCost.value[0] / 100);

    /**
     *
     */
    const stepAddedCostDiscounted = computed(() => getStepCost(stepAdded.value * 2) / 100);

    /**
     *
     */
    const scheduleCartTotalTime = computed(() =>
        getScheduleTotalTime(idArray.value) + stepAddedTime.value
    );

    /**
     * Sum the STEPS of selected schedules (NO DISCOUNT, calculated later)
     */
    const scheduleCartTotalSteps = computed(() =>
        getScheduleTotalSteps(idArray.value)
    );

    /**
     * Sum the COST of selected schedules (NO DISCOUNT, calculated later)
     */
    const scheduleCartTotalCost = computed(() =>
        (scheduleCartTotalSteps.value * scheduleTimeCost.value[0]) / 100
    );

    /**
     * REAL cart COST
     * AFTER base discounts ("many steps" special pack discounts)
     */
    const scheduleCartTotalCostDiscounted = computed(() =>
        getStepCost(scheduleCartTotalSteps.value) / 100
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
        Math.max(scheduleCartTotalCostDiscounted.value + stepAddedCostDiscounted.value - (userInfo.value?.wallet || 0) * (scheduleTimeCost.value[0] / 100), 0)
    );

    return {
        scheduleTimeStep,
        scheduleTimeCost,
        getStepCost,
        getScheduleTotalTime,
        getScheduleTotalSteps,
        stepAdded,
        stepAddedTime,
        stepAddedCost,
        stepAddedCostDiscounted,
        scheduleCartTotalTime,
        scheduleCartTotalSteps,
        scheduleCartTotalCost,
        scheduleCartTotalCostDiscounted,
        userInfoWalletTime,
        userInfoWalletTimeRemaining,
        scheduleCartFinalCost,
        getNearestDiscountThreshold
    }
}