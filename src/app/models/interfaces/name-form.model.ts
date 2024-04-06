import { FormControl } from "@angular/forms";

export interface NameForm {
    firstName: FormControl<string>;
    lastName: FormControl<string>;
}