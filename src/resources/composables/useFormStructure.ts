import { watch, ref, computed } from "vue";
import { useForm } from "vee-validate";
import * as yup from "yup";

import type { AnyRef } from "@/interfaces";

/**
 * List of common form schemas to build the final validation schema
 * (that need to be re-imported)
 */
export const formRules = {
    required: yup
        .string()
        .typeError('invalid')
        .required('required')
        .trim()
        .min(1, 'required'),
    requiredNumber: yup
        .number()
        .typeError('invalid')
        .required('required'),
    requiredCheck: yup
        .boolean()
        .typeError('required')
        .required('required')
        .oneOf([true], 'required'),
    requiredDate: yup
        .date()
        .typeError('invalid')
        .required('required'),
    requiredStringDate: yup
        .string()
        .typeError('invalid')
        .required('required')
        .test('not-invalid-date', 'invalid', (val) => val !== 'Invalid Date'),
    email: yup
        .string()
        .typeError('invalid')
        .email('invalid')
        .required('required'),
    password: yup
        .string()
        .typeError('invalid')
        .required('required')
        // The password length must be greater than or equal to 8
        .min(8, 'min-number')
        // The password must contain one or more uppercase characters
        .matches(/(?=.*[A-Z])/, 'need-uppercase')
        // The password must contain one or more lowercase characters
        .matches(/(?=.*[a-z])/, 'need-lowercase')
        // The password must contain one or more numeric values
        .matches(/(?=.*[0-9])/, 'need-digit'),
        // The password must contain one or more special characters (WARNING: disabled for admin request)
        // eslint-disable-next-line no-useless-escape
        // .matches(/(?=.*[!@#$%^&ç*\-_=+{}\[\]();:,<.>°§'"])/, 'need-special-char'),
    passwordConfirm: yup
        .string()
        .typeError('invalid')
        .required('required')
        // check that is the same as "password"
        .oneOf([yup.ref('password')], 'password-must-match'),
}

export default <T>(
    formValues :AnyRef<T>,
    formSchema :AnyRef<yup.AnySchema> | yup.AnySchema,
) => {
    /**
     * Vee-validate validation toolbox
     * Different schema if on authentication or registration
     */
    const { errors :formErrors, meta: formMeta, setValues, validate } = useForm({
        validationSchema: formSchema
    });

    /**
     * Shortcut validation flag
     */
    const formIsValid = computed(() => formMeta.value.valid);

    /**
     * Form errors made list
     */
    const formErrorsList = computed<string[]>(() => {
        const errorList :string[] = [];
        // regula
        for(const key in formErrors.value)
            errorList.push(key + '-' + formErrors.value[key]);
        return errorList;
    });

    /**
     * Hide UI errors, to show only after trying submit
     * TODO show errors on blur?
     */
    const formToggleUIErrors = ref(false);

    /**
     * Vee-validate reactive validation
     */
    watch(formValues, async (val) => {
        setValues(val);
        await validate();
    }, { deep: true });

    return {
        formErrors,
        formErrorsList,
        formMeta,
        formIsValid,
        formToggleUIErrors,
        formValidate: validate,
    }
}