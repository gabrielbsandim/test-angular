import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { IBusiness } from 'src/app/models/business.model';
import { UtilsService } from 'src/app/services/utils.service';
import { BusinessService } from 'src/app/services/business.service';
import { FilterBusiness } from 'src/app/utils/filterBusiness.util';

@Component({
  selector: 'app-business-list',
  templateUrl: './business-list.component.html',
  styleUrls: ['./business-list.component.scss']
})
export class BusinessListComponent implements OnInit {
  public displayedColumns: string[] = ['name', 'business', 'valuation', 'active', 'id'];
  public businessListFilteredDataSource = new MatTableDataSource<IBusiness>();
  private businessList: IBusiness[] = [];
  private filterBusiness = new FilterBusiness()

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private businessService: BusinessService,
    private router: Router,
    private utilsService: UtilsService
  ) { }

  ngOnInit() {
    this.businessService.fetchAllBusiness().subscribe((resFetchBusiness) => {
      this.businessList = resFetchBusiness;
      this.businessListFilteredDataSource = new MatTableDataSource(resFetchBusiness);

      this.configurePaginationAndSort();
    }, (error) => {
      // Se erro no get
      this.utilsService.snackBarError(error);
    });
  }

  private configurePaginationAndSort() {
    this.paginator._intl.itemsPerPageLabel = $localize`Itens por página`;
    this.businessListFilteredDataSource.paginator = this.paginator;
    this.businessListFilteredDataSource.sort = this.sort;
  }

  // Filtro dos polos a cada digitação
  public onKeyUpSearch(event: any) {
    const { value } = event.target
    this.businessListFilteredDataSource = new MatTableDataSource(this.filterBusiness.filterItems(value, this.businessList));
  }

  public openBusinessDetail(businessId: string) {
    this.router.navigateByUrl(`/business-detail/${businessId}`)
  }
}
