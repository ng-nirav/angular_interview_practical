import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Signal,
  signal,
  WritableSignal,
} from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { IsActiveMatchOptions, Router } from '@angular/router';
import { IArticleList } from '../shared/interface/common.interface';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'nr-news-details',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule],
  templateUrl: './news-details.component.html',
  styleUrl: './news-details.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewsDetailsComponent {
  router = inject(Router);
  article: WritableSignal<IArticleList> = signal({} as IArticleList);
  constructor() {
    const newsDetails = this.router.getCurrentNavigation()?.extras.state;
    if (newsDetails && newsDetails['state']) {
      this.article.set(newsDetails['state']);
    } else {
      this.router.navigate(['news']);
    }
  }
  public navigateToList(): void {
    this.router.navigate(['news']);
  }
}
