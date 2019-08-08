export class ValidationScope {
    public static FIELD = 0;
    public static CLASS = 1;
}

export class ValidationRule {
    public className: string;
    public propertyName: string;
    public displayName: string;
    public validationType: string;
    public minLength: number;
    public maxLength: number;
    public regularExpression: number;
    public minValue: number;
    public maxValue: number;
    public errorMessage: string;
    public validationRule: any;
    public validationFunc: any;
    public validationScope: number = ValidationScope.FIELD;
}
export class ValidationHelper {
    public REG_EX_EMAIL = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    public REG_EX_PASSWORD = '^(?=.*\d)(?=.*[a-zA-Z]).{4,8}$';
    /* tslint:disable-next-line:max-line-length */
    public REG_EX_PHONE = /^\(?(?:\+?61|0)(?:(?:2\)?[ -]?(?:3[ -]?[38]|[46-9][ -]?[0-9]|5[ -]?[0-35-9])|3\)?(?:4[ -]?[0-57-9]|[57-9][ -]?[0-9]|6[ -]?[1-67])|7\)?[ -]?(?:[2-4][ -]?[0-9]|5[ -]?[2-7]|7[ -]?6)|8\)?[ -]?(?:5[ -]?[1-4]|6[ -]?[0-8]|[7-9][ -]?[0-9]))(?:[ -]?[0-9]){6}|4\)?[ -]?(?:(?:[01][ -]?[0-9]|2[ -]?[0-57-9]|3[ -]?[1-9]|4[ -]?[7-9]|5[ -]?[018])[ -]?[0-9]|3[ -]?0[ -]?[0-5])(?:[ -]?[0-9]){5})$/;
    public VALIDATION_TYPE_STRING = 'VALID_STRING';
    public VALIDATION_TYPE_NUMBER = /^[0-9]*$/;
    public VALIDATION_POSITIVE_INTEGER = /^[1-9][0-9]*$/;
    public REX_TABLE_NUMBER = /^([1-9][0-9]*|(0)*[1-9][0-9]*)$/;
    public REX_FORMAT_TABLE_NUMBER = /^[0-9]*((\,|\/)[0-9]*)*$/;
    public REG_EX_DATE = /^[0-9]{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])/;
    public REG_EX_TIME = /^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;


    /**
     * Create validation rule
     * @param target is from prototype of instance
     */
    public static initValidationRules(target: any) {
        if (target.__validationRules == null) {
            target.__validationRules = new Array<ValidationRule>();
        }
    }

    public static initValidationRule(target: any, propertyKey: string, errorMessage: string): ValidationRule {
        const validationRule = new ValidationRule();
        validationRule.className = target.constructor.name;
        validationRule.errorMessage = errorMessage;
        validationRule.propertyName = propertyKey;
        validationRule.validationScope = ValidationScope.FIELD;
        return validationRule;
    }

    public required(errorMessage: string) {
        return (target: any, propertyKey: string) => {
            ValidationHelper.initValidationRules(target);
            const validationRule = ValidationHelper.initValidationRule(target, propertyKey, errorMessage);
            validationRule.validationType = 'required';
            validationRule.validationFunc = (data) => {
                return data != null && data.toString().trim() !== '';
            };
            target.__validationRules.unShift(validationRule);
        };
    }

}

const ValidationDecorator = new ValidationHelper();
export default ValidationDecorator;
