import { watch, ref, computed } from "vue";
import * as yup from "yup";

import useCheckDataUniqueness from "@/resources/composables/useCheckDataUniqueness";
import useFormStructure from "@/resources/composables/useFormStructure";
import useCheckDataPassword from "@/resources/composables/useCheckDataPassword";

import type { AnyRef } from "@/interfaces";

// T can be whatever but needs these 3
interface dataUserFormValuesEtc {
    password?: string
    username?: string
    email?: string
}

export default <T>(
    formValues :AnyRef<T & dataUserFormValuesEtc>,
    formSchema :AnyRef<yup.AnySchema> | yup.AnySchema,
    enableAsyncUsernameValidation ?:AnyRef<boolean> | boolean,
    enableAsyncEmailValidation ?:AnyRef<boolean> | boolean
) => {

    const {
        formErrors,
        formErrorsList :formErrorListOriginal,
        formIsValid,
        formToggleUIErrors,
        formValidate
    } = useFormStructure(
        formValues,
        formSchema
    );

    /**
     * Online checks for username and email to be unique
     * Online checks starts only if offline checks about username and email are clear
     */
    const {
        valid: formAsyncUsernameValid,
        loading: formAsyncUsernameLoading,
    } = useCheckDataUniqueness(
        'user/checkUsername',
        () => formValues.value.username,
        computed<boolean>(() =>
            !((enableAsyncUsernameValidation === false || !(enableAsyncUsernameValidation as AnyRef<boolean>).value) || formErrors.value.username)
        )
    );
    const {
        valid: formAsyncEmailValid,
        loading: formAsyncEmailLoading,
    } = useCheckDataUniqueness<string | undefined>(
        'user/checkEmail',
        () => formValues.value.email,
        computed<boolean>(() =>
            !((enableAsyncEmailValidation === false || !(enableAsyncEmailValidation as AnyRef<boolean>).value) || formErrors.value.email)
        )
    );

    /**
     * Check that the password respect various rules
     */
    const {
        formPasswordErrors,
        formPasswordRules
    } = useCheckDataPassword(formValues.value.password);
    // toggle show/hide password
    const formToggleShowPassword = ref(false);


    /**
     * Form errors made list
     */
    const formErrorsList = computed<string[]>(() => {
        const errorList :string[] = [
            ...formErrorListOriginal.value
        ];
        // async
        if(!formAsyncUsernameValid.value && !formErrors.value.username)
            errorList.push('username-already-used');
        if(!formAsyncEmailValid.value && !formErrors.value.email)
            errorList.push('email-already-used');
        return errorList;
    });

    return {
        formErrors,
        formErrorsList,
        formIsValid,
        formToggleUIErrors,
        formValidate,
        formAsyncUsernameValid,
        formAsyncUsernameLoading,
        formAsyncEmailValid,
        formAsyncEmailLoading,
        formPasswordErrors,
        formPasswordRules,
        formToggleShowPassword
    }
}