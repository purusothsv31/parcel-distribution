import { Overlay } from '@angular/cdk/overlay';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from '../app-routing.module';

import { AssignmentComponent } from './assignment.component';

describe('AssignmentComponent', () => {
  let component: AssignmentComponent;
  let fixture: ComponentFixture<AssignmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssignmentComponent ],
      imports : [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        MatRippleModule,
        MatTableModule,
        MatButtonModule,
        MatIconModule,
        MatFormFieldModule,
        MatInputModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatSnackBarModule
      ],
      providers: [
        MatSnackBar,
        Overlay
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    let store: {[id:string]:any} = {};
    const mockLocalStorage = {
      getItem: (key: string): string => {
        return key in store ? store[key] : null;
      },
      setItem: (key: string, value: string) => {
        store[key] = `${value}`;
      },
      removeItem: (key: string) => {
        delete store[key];
      },
      clear: () => {
        store = {};
      }
    };
    
  spyOn(localStorage, 'getItem')
    .and.callFake(mockLocalStorage.getItem);
  spyOn(localStorage, 'setItem')
    .and.callFake(mockLocalStorage.setItem);
  spyOn(localStorage, 'removeItem')
    .and.callFake(mockLocalStorage.removeItem);
  spyOn(localStorage, 'clear')
    .and.callFake(mockLocalStorage.clear);

    fixture = TestBed.createComponent(AssignmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be assigned with default user data', () => {
    expect(component.data).toBeTruthy();
    expect(component.data.length).toBeGreaterThan(0);
  });

  it('should assign user deliveries to 0', () => {
    component.loadAssignments(new Date());
    expect(component.data.every(x => x.deliveries == 0)).toBeTrue();
  });

  it('should assign save user deliveries to data store', () => {
    component.data.forEach((x,i) => { x.deliveries = i+1; });
    component.saveAssignments();
    component.loadAssignments(new Date());
    expect(component.data.every(x => x.deliveries != 0)).toBeTrue();
  });
  
  it('should assign update user deliveries to data store', () => {
    component.data.forEach((x,i) => { x.deliveries = i+1; });
    component.saveAssignments();
    component.loadAssignments(new Date());
    component.data.forEach((x,i) => { x.deliveries = i+5; });
    component.saveAssignments();
    expect(component.data.every((x,i) => x.deliveries == i+5)).toBeTrue();
  });

  it('should assign user deliveries from data store', () => {
    component.data.forEach((x,i) => { x.deliveries = i+1; });
    component.saveAssignments();
    component.loadAssignments(new Date());    
    expect(component.data.every(x => x.deliveries != 0)).toBeTrue();
  });

  it('should reset assignments to default values', () => {
    component.data.forEach((x,i) => { x.deliveries = i+1; });
    component.resetAssignments();
    expect(component.data.every(x => x.deliveries == 0)).toBeTrue();
  });

  it('should reset assignments to previous saved values', () => {
    component.data.forEach((x,i) => { x.deliveries = i+1; });
    component.saveAssignments();
    component.loadAssignments(new Date());    
    component.data.forEach((x,i) => { x.deliveries = i+5; });
    component.resetAssignments();
    expect(component.data.every((x, i) => x.deliveries == i + 1)).toBeTrue();
  });
});
