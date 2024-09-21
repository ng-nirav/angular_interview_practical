import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
  signal,
  WritableSignal,
} from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { NewsBlockComponent } from '../shared/components/news-block/news-block.component';
import { NewsHttpService } from '../shared/services/news-http.service';
import {
  IArticleListType,
  IParamsDataSet,
} from '../shared/interface/common.interface';

@Component({
  selector: 'nr-news-listing',
  standalone: true,
  imports: [CommonModule, HeaderComponent, NewsBlockComponent],
  templateUrl: './news-listing.component.html',
  styleUrl: './news-listing.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewsListingComponent {
  newApiService = inject(NewsHttpService);
  changeDetectorRed = inject(ChangeDetectorRef);
  newArticleList: WritableSignal<IArticleListType> = signal([]);
  isAPIError: boolean = false // No globle error handle implemented for short demo taking flag to show message

  ngOnInit(): void {
    const filterData = <IParamsDataSet>{};
    this.getAllNewsListing(filterData);
  }

  public onFilterChange(filterData: IParamsDataSet): void {
    if (filterData.isCountryChange) {
      this.getNewsByCountry(filterData);
    } else {
      this.getAllNewsListing(filterData);
    }
  }

  private getAllNewsListing(filterData: IParamsDataSet): void {
    this.newApiService.getAlllNewsListing(filterData).subscribe({
      next: (result) => {
        if (result.status === 'ok') {
          this.newArticleList.set([...result.articles]);
          this.isAPIError = false;
        }else{
          this.isAPIError = true;
        }
      },
      error: () => {
        this.isAPIError = true;
      },
    });
  }

  // On country change call this endpoint to get the all news listing based on country
  private getNewsByCountry(filterData: IParamsDataSet): void {
    this.newApiService.getNewsByCountry(filterData).subscribe({
      next: (result) => {
        if (result.status === 'ok') {
          this.newArticleList.set([...result.articles]);
          this.isAPIError = false;
        }else{
          this.isAPIError = true;
        }
      },error :()=>{
        this.isAPIError = true;
      }
    });
  }
}
