import { computed, ref, watch } from "vue";
import { useI18n } from "vue-i18n";
import { formRules } from "@/resources/composables/useFormStructure";
import { AnyRef } from "@/interfaces";

export default (password :AnyRef<string | undefined> | (() => string | undefined)) => {
    const { t } = useI18n();

    /**
     * To check in real time which characteristics the password is lacking
     * and to list them in the UI
     */
    // password only errors
    const formPasswordErrors = ref<string[]>([]);
    // Shortcut to check if password is valid (no errors)
    const formPasswordValid = computed(() => formPasswordErrors.value.length < 0);
    // schema
    // TODO ZOD (yup?) pick & omit 
    const formPasswordValidate = async (psw ?:string) =>
        formRules.password.validate(psw, { abortEarly: false })
            .then(() => formPasswordErrors.value = [])
            .catch(({ inner }) => {
                const errors :string[] = [];
                for(let i = inner.length; i--; )
                    errors.push(...inner[i].errors);
                formPasswordErrors.value = errors;
            });
    // validation
    watch(password, async (val) => formPasswordValidate(val));

    /**
     * Password needed characteristics
     * paired with rule as key and message as value
     * to link errors and UI
     */
    const formPasswordRules = {
        'min-number': t('form-password-strong.min-number'),
        'need-uppercase': t('form-password-strong.need-uppercase'),
        'need-lowercase': t('form-password-strong.need-lowercase'),
        'need-digit': t('form-password-strong.need-digit'),
        // 'need-special-char': t('form-password-strong.need-special-char'), // (WARNING: disabled for admin request)
    };



    return {
        formPasswordValid,
        formPasswordErrors,
        formPasswordValidate,
        formPasswordRules
    }
}