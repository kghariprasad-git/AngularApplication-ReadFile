//app.component.ts
import { Component, ViewChild, OnInit } from '@angular/core';

import {MatTable} from '@angular/material/table';
import { DialogBoxComponent } from './dialog-box/dialog-box.component';
import { MatDialog } from '@angular/material/dialog';
import { Data } from './service/data';
import { AppService } from './service/app.service';


@Component({
  providers: [AppService],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
 
})
export class AppComponent  implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'action'];
  promiseBooks: Promise<Data[]>
 
  errorMessage: String;
  dataSource : Data[] ;

  @ViewChild(MatTable,{static:true}) table: MatTable<any>;


  constructor(public dialog: MatDialog,private appService: AppService) {}
  ngOnInit(): void {
    this.promiseBooks = this.appService.getDataWithPromise();
    this.promiseBooks.then(
             info => this.dataSource = info,
             error =>  this.errorMessage = <any>error);
  }

  openDialog(action,obj) {
    obj.action = action;
    const dialogRef = this.dialog.open(DialogBoxComponent, {
      width: '250px',
      data:obj
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result.event == 'Add'){
        this.addRowData(result.data);
      }else if(result.event == 'Update'){
        this.updateRowData(result.data);
      }else if(result.event == 'Delete'){
        this.deleteRowData(result.data);
      }
    });
  }

  addRowData(row_obj){
    
    var d = new Date();
    var randomValue = Math.random();
    this.dataSource.push({
      id:d.getTime(),
      name:row_obj.name,
      sl: randomValue
    });
    this.table.renderRows();
    
  }
  updateRowData(row_obj){
    this.dataSource = this.dataSource.filter((value)=>{
     if(value.sl == row_obj.sl){
        value.id = row_obj.id;
        value.name = row_obj.name;
       
      }
      return true;
    });
  }
  deleteRowData(row_obj){
    this.dataSource = this.dataSource.filter((value)=>{
      return value.id != row_obj.id;
    });
  }


}
