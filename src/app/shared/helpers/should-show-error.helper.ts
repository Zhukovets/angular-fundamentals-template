import {FormGroup, Validators} from "@angular/forms";

export function shouldShowError(form: FormGroup, controlName: string, submitted?: boolean): boolean {
    const control = form.get(controlName);
    if (!control) {
        return false;
    }

    const wasInteractedWith = control.touched || control.dirty || !!submitted;
    const isEmpty = control.value === null || control.value === undefined || control.value === '';
    const hasRequiredValidator = control.hasValidator?.(Validators.required);

    if (!hasRequiredValidator && isEmpty) {
        return false;
    }

    return control.invalid && wasInteractedWith;
}