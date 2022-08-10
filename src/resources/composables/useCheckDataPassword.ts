import { ref, watch } from "vue";
import { useI18n } from "vue-i18n";
import { formRules } from "@/resources/composables/useFormStructure";

export default (password ?:string) => {
    const { t } = useI18n();

    /**
     * To check in real time which characteristics the password is lacking
     * and to list them in the UI
     */
    // password only errors
    const formPasswordErrors = ref<string[]>([]);
    // schema
    const formPasswordValidate = async () =>
        formRules.password.validate(password, { abortEarly: false })
            .then(() => formPasswordErrors.value = [])
            .catch(({ inner }) => {
                const errors :string[] = [];
                for(let i = inner.length; i--; )
                    errors.push(...inner[i].errors);
                formPasswordErrors.value = errors;
            });
    // validation
    formPasswordValidate();
    watch(() => password, async () => formPasswordValidate());
    /**
     * Password needed characteristics
     * paired with rule as key and message as value
     * to link errors and UI
     */
    const formPasswordRules = {
        'min-number': t('authentication-form.password-strong.min-number'),
        'need-uppercase': t('authentication-form.password-strong.need-uppercase'),
        'need-lowercase': t('authentication-form.password-strong.need-lowercase'),
        'need-digit': t('authentication-form.password-strong.need-digit'),
        'need-special-char': t('authentication-form.password-strong.need-special-char'),
    };
    
    return {
        formPasswordErrors,
        formPasswordValidate,
        formPasswordRules
    }
}