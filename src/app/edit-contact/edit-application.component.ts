import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApplicationsService } from '../applications/applications.service';
import { phoneTypeValues, addressTypeValues } from '../applications/application.model';
import { restrictedWords } from '../validators/restricted-words.validator';

@Component({
  templateUrl: './edit-application.component.html',
  styleUrls: ['./edit-application.component.css']
})
export class EditApplicationComponent implements OnInit {
  phoneTypes = phoneTypeValues;
  addressTypes = addressTypeValues;
  applicationForm = this.fb.nonNullable.group({
    id: '',
    assignToUserId: '',
    dateInitiated: '',
    status: '',
    membershipType: ['', Validators.required],
    emailLocation: ['', Validators.required],
    person: this.fb.nonNullable.group({
      phone: ['', Validators.required],
      email: ['', Validators.required],
      name: this.fb.nonNullable.group({
        firstName: '',
        lastName: '',
      })
    })
  });

  constructor(
    private route: ActivatedRoute,
    private applicationsService: ApplicationsService,
    private router: Router,
    private fb: FormBuilder) { }

  ngOnInit() {


    this.applicationsService.getNextApplication().subscribe((application) => {
      if (!application) return;

      this.applicationForm.setValue(application);
    });
  }

  get emailLocation() {
    return this.applicationForm.controls.emailLocation;
  }


  referApplication() {
    this.applicationsService.referApplication(this.applicationForm.getRawValue()).subscribe({
      // next: () => this.router.navigate(['/contacts/edit'])
      next: () => window.location.reload()
    });
  }
}
