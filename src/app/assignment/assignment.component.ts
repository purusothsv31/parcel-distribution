import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from '../models/user.model';

@Component({
  selector: 'app-assignment',
  templateUrl: './assignment.component.html',
  styleUrls: ['./assignment.component.scss']
})

export class AssignmentComponent implements OnInit {
  
  data: User[] = [
    { name: 'Hannelore Amsél', address: 'Malerweg 2 16798 Himmelpfort', userReference: 123456, transportvehicle: 'E-Scooter', deliveries: 0},
    { name: 'Horst Hurtzig', address: 'Adlerweg 13 16798 Himmelpfor', userReference: 654321, transportvehicle: 'Bike', deliveries: 0},
    { name: 'Annalena Lang', address: 'Hauptstr. 178a 16798 Himmelpfor', userReference: 332148, transportvehicle: 'E-Scooter', deliveries: 0},
    { name: 'Minh Lee Nhygen', address: 'Langestr. 1 16798 Himmelpfor', userReference: 987654, transportvehicle: 'Bike', deliveries: 0},
    { name: 'Karl Gans', address: 'Breite Str. 3e 16798 Himmelpfor', userReference: 975361, transportvehicle: 'Caddy', deliveries: 0}
  ];

  columns = [
    { DisplayName: 'User Reference', Name: 'userReference' },
    { DisplayName: 'Name', Name: 'name'},
    { DisplayName: 'Address', Name: 'address'},
    { DisplayName: 'Transport Vehicle', Name: 'transportvehicle' },
    { DisplayName: 'No. of Deliveries', Name: 'deliveries' }
  ];
  assignmentDate:Date = new Date();
  maxDate:Date = new Date(new Date().setDate(this.assignmentDate.getDate() + 7));
  dataColumns:string[] = [];

  constructor(private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.dataColumns = this.columns.map(x => x.Name);
    this.loadAssignments(this.assignmentDate);
  }

  loadAssignments(assignmentDate: Date)
  {
    let userAssignmentsStr = localStorage.getItem('UserAssignments');
    if(userAssignmentsStr)
    {
      let userData:{[id:string]: any[]} = JSON.parse(userAssignmentsStr);
      let assignmentData = userData[this.getFormattedDate(assignmentDate)];
      if(assignmentData){
        this.data.forEach(x => {
          x.deliveries = assignmentData.find(y => y.userReference == x.userReference).deliveries;
        });
        return;
      }
    }

    this.data.forEach(x => {
      x.deliveries = 0;
    });
  }

  saveAssignments(){
    let userAssignmentsStr = localStorage.getItem('UserAssignments');
    let userAssignments: {[id:string]: any[]} = {};
    if(userAssignmentsStr)
    {
      userAssignments = JSON.parse(userAssignmentsStr);
    }
    userAssignments[this.getFormattedDate(this.assignmentDate)] = this.data.map(x => {
      return {
        userReference: x.userReference,
        deliveries: x.deliveries
      };
    }); 
    localStorage.setItem('UserAssignments', JSON.stringify(userAssignments));

    this._snackBar.open("Assignments saved successfully.", '', {
      duration: 2000,
    });
  }

  resetAssignments(){
    this.loadAssignments(this.assignmentDate);
  }

  getFormattedDate(date: Date) {
    let year = date.getFullYear();
    let month = (1 + date.getMonth()).toString().padStart(2, '0');
    let day = date.getDate().toString().padStart(2, '0');
  
    return month + '/' + day + '/' + year;
  }
}
