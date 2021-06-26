import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { IBusiness } from 'src/app/models/business.model';
import { BusinessService } from 'src/app/services/business.service';
import { FilterBusiness } from 'src/app/utils/filterBusiness.util';

@Component({
  selector: 'app-business-list',
  templateUrl: './business-list.component.html',
  styleUrls: ['./business-list.component.scss']
})
export class BusinessListComponent implements OnInit {
  private businessList: IBusiness[] = [];
  public displayedColumns: string[] = ['name', 'business', 'valuation', 'active', 'id'];
  public businessListFilteredDataSource = new MatTableDataSource<IBusiness>();

  private filterBusiness = new FilterBusiness()

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private businessService: BusinessService) { }

  ngOnInit() {
    this.businessService.fetchAllBusiness().subscribe((resFetchBusiness) => {
      if (!resFetchBusiness) {
        return console.log('tratar erro')
      }

      this.businessList = resFetchBusiness;
      this.businessListFilteredDataSource = new MatTableDataSource(resFetchBusiness);

      this.configurePaginationAndSort();
    })
  }

  private configurePaginationAndSort() {
    this.paginator._intl.itemsPerPageLabel = 'Itens por página';
    this.businessListFilteredDataSource.paginator = this.paginator;
    this.businessListFilteredDataSource.sort = this.sort;
  }

  public onKeyUpSearch(event: any) {
    const { value } = event.target
    this.businessListFilteredDataSource = new MatTableDataSource(this.filterBusiness.filterItems(value, this.businessList));
  }

  public openBusinessDetail(businessId: string) {
    console.log(businessId)
  }
}
