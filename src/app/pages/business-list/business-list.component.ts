import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { IBusiness } from 'src/app/models/business.model';
import { BusinessService } from 'src/app/services/business.service';

@Component({
  selector: 'app-business-list',
  templateUrl: './business-list.component.html',
  styleUrls: ['./business-list.component.scss']
})
export class BusinessListComponent implements OnInit {
  displayedColumns: string[] = ['name', 'business', 'valuation', 'active', 'id'];
  dataSource = new MatTableDataSource<IBusiness>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private businessService: BusinessService) { }

  ngOnInit() {
    this.businessService.fetchAllBusiness().subscribe((resFetchBusiness) => {
      console.log(resFetchBusiness)
      if (!resFetchBusiness) {
        return console.log('tratar erro')
      }

      this.dataSource = new MatTableDataSource(resFetchBusiness);
    })
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  public onKeyUpSearch(event: any) {
    console.log(event.target.value)
  }

  public openBusinessDetail(businessId: string) {
    console.log(businessId)
  }
}
