import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit, WritableSignal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgIf } from '@angular/common';
import { Observable } from 'rxjs';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { ApplicationForm } from 'src/app/models/interfaces/application-form.model';
import { ApplicationsService } from 'src/app/applications/applications.service';
import { MembershipApplication, addressTypeValues, phoneTypeValues } from 'src/app/applications/application.model';


@Component({
    selector: 'node-application-form',
    templateUrl: './application-form.component.html',
    styleUrls: ['./application-form.component.css'],
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        ReactiveFormsModule,
        NgIf]
})
export class ApplicationFormComponent {


    application: WritableSignal<MembershipApplication | undefined> = this.applicationsService.application;
    application$ = toObservable(this.application);

    phoneTypes = phoneTypeValues;
    addressTypes = addressTypeValues;
    applicationForm: FormGroup<ApplicationForm> = this.fb.nonNullable.group({
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
      private fb: FormBuilder,
      private cd: ChangeDetectorRef) { }
  
    ngOnInit() {
  
      // this.applicationForm.patchValue(this.application);
      this.application$.subscribe((application) => {
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
      const referApplication$ = this.applicationsService.referApplication(this.applicationForm.getRawValue());
  
      this.prepareForNext(referApplication$);
    }
    referToBoard() {
      const referToBoard$ = this.applicationsService.referToBoard(this.applicationForm.getRawValue());
      this.prepareForNext(referToBoard$);
  
    }
  
    prepareForNext(obs$: Observable<MembershipApplication>): void {
      obs$.subscribe(
        () => {
          this.applicationForm.reset();
          this.cd.markForCheck();
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
  