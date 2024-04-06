import { FormControl, FormGroup } from "@angular/forms";
import { PersonForm } from "./person-form.model";

export interface ApplicationForm {
    id: FormControl<string>;
    assignToUserId: FormControl<string>;
    dateInitiated: FormControl<string>;
    status: FormControl<string>;
    membershipType: FormControl<string>;
    emailLocation: FormControl<string>;
    person: FormGroup<PersonForm>
}