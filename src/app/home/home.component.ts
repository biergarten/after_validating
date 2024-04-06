import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, WritableSignal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApplicationsService } from '../applications/applications.service';
import { phoneTypeValues, addressTypeValues, MembershipApplication } from '../applications/application.model';
import { NgIf } from '@angular/common';
import { Observable } from 'rxjs';
import { ApplicationForm } from '../models/interfaces/application-form.model';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { ApplicationFormComponent } from './application-form/application-form.component';


@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ReactiveFormsModule,
    NgIf,
    ApplicationFormComponent]
})
export class HomeComponent {



}
