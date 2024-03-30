import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApplicationsService } from '../applications/applications.service';
import { phoneTypeValues, addressTypeValues, MembershipApplication } from '../applications/application.model';
import { NgIf } from '@angular/common';
import { Observable } from 'rxjs';

@Component({
  templateUrl: './edit-application.component.html',
  styleUrls: ['./edit-application.component.css'],
  standalone: true,
  //changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ReactiveFormsModule,
    NgIf]
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
    private applicationsService: ApplicationsService,
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

  get membershipType() {
    return this.applicationForm.controls.membershipType;
  }


  referApplication() {
    this.applicationsService.referApplication(this.applicationForm.getRawValue()).subscribe(
      () => {
        this.applicationForm.reset();
        this.applicationsService.getNextApplicationPolling().subscribe((appl) => {
          if (!appl) {
            //return;
          }
          else
            this.applicationForm.setValue(appl);
        });
      }
    );
  }
  referToBoard() {
    this.applicationsService.referToBoard(this.applicationForm.getRawValue()).subscribe(
      () => {
        this.applicationForm.reset();
        this.applicationsService.getNextApplicationPolling().subscribe((appl) => {
          if (!appl) {
            //return;
          }
          else
            this.applicationForm.setValue(appl);
        });
      }
    );
  }

  prepareForNext(obs$: Observable<MembershipApplication>): void {
    obs$.subscribe(
      () => {
        this.applicationForm.reset();
        this.applicationsService.getNextApplicationPolling().subscribe((appl) => {
          if (!appl) {
            //return;
          }
          else {
            this.applicationForm.patchValue(appl);
          }
        });
      }
    );
  }
}
