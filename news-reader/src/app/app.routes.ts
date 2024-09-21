import { Routes } from '@angular/router';
import { NewsListingComponent } from './news-listing/news-listing.component';
import { NewsDetailsComponent } from './news-details/news-details.component';

export const routes: Routes = [
  {
    path: 'news',
    component: NewsListingComponent,
  },
  {
    path: 'news-detail',
    component: NewsDetailsComponent,
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'news',
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: 'news',
  },
];
