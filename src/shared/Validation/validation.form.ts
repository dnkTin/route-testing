import { FormGroup } from '@angular/forms';

export default class ValidationForm {
    private controls = {};
    formGroup: FormGroup;
    formControls = {};
    errors = {};
    errorFormMessages = {};
    submitted = false;
    formGroupValue = {};
    currentFieldName: string = null;
    isChangeOnField = true;
}
