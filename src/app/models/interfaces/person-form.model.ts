import { FormControl, FormGroup } from "@angular/forms";
import { NameForm } from "./name-form.model";

export interface PersonForm {
    phone: FormControl<string>;
    email: FormControl<string>;
    name: FormGroup<NameForm>;
}