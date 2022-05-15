import { computed, watch, defineEmits } from 'vue';
import { useStore } from "@/store";

// by convention, composable function names start with "use"
export default (dialogName :string) => {
    const store = useStore();
    /* TODO
    const emit = defineEmits([
        'modal:on:open',
        'modal:on:close'
    ]);
    */
    const dialogValue = computed(() => store.state.main.modals[dialogName]);
    const toggleModal = (value :boolean) => store.commit('main/toggleModal', [dialogName, value]);

    /* TODO
    watch(dialogValue, async (value) => {
        if(value){
            emit('modal:on:open');
        }else{
            emit('modal:on:close');
        }
    });
    */

    // expose managed state as return value
    return {
        dialogValue,
        toggleModal
    }
}