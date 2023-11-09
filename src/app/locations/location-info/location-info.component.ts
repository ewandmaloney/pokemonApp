import { Component, OnDestroy, OnInit } from '@angular/core';
import { LocationService } from 'src/app/services/location.service';
import { LocationResponse } from '../interfaces/LocationResponse';
import { Region } from '../interfaces/LocationDetailsResponse';
import { RegionDetailsResponse } from '../interfaces/RegionsDetailsResponse';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-location-info',
  templateUrl: './location-info.component.html',
  styleUrls: ['./location-info.component.css']
})
export class LocationInfoComponent implements OnInit, OnDestroy {
  public orderId: boolean = false;
  public orderName: boolean = false;
  public copyRegions: RegionDetailsResponse[] = [];
  public regionsArr: any = {};
  public regions: RegionDetailsResponse[] = [];
  ngUnsubscribe = new Subject<void>();


  constructor(private locService: LocationService, private router: Router) {

  }
  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  ngOnInit(): void {
    this.getAllRegions();
  }

  getAllRegions() {
    this.locService.getRegions().pipe(takeUntil(this.ngUnsubscribe)).subscribe((region: LocationResponse) => {
      this.regionsArr = region.results;
      this.getInfoRegion();
      console.log(this.regions)
    })
  }

  getInfoRegion() {
    this.regionsArr.forEach((region: Region) => {
      this.locService.getSpecificRegion(region.url).pipe(takeUntil(this.ngUnsubscribe)).subscribe((res: RegionDetailsResponse) => {
        this.regions.push(res);
        this.regions.sort((a, b) => a.id - b.id);
        this.copyRegions = this.regions;
      })
    });
  }

  goToRegionInfo(id: number) {
    this.router.navigate(['/region', id]);
  }

  orderById() {
    if (!this.orderId) {
      this.orderId = !this.orderId;
      this.regions = [];
      this.regions = this.copyRegions.sort((a, b) => (a.id > b.id ? -1 : 1));
    } else {
      this.orderId = !this.orderId;
      this.regions = [];
      this.regions = this.copyRegions.sort((a, b) => (a.id < b.id ? -1 : 1));
    }
  }

  orderByName() {
    if (!this.orderName) {
      this.orderName = !this.orderName;
      this.regions = [];
      this.regions = this.copyRegions.sort((a, b) => (a.name > b.name ? -1 : 1));
    } else {
      this.orderName = !this.orderName;
      this.regions = [];
      this.regions = this.copyRegions.sort((a, b) => (a.name < b.name ? -1 : 1));
    }
  }

}
