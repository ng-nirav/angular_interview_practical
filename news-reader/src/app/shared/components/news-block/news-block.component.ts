import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
} from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { IArticleList } from '../../interface/common.interface';
import { CommonModule } from '@angular/common';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'nr-news-block',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  templateUrl: './news-block.component.html',
  styleUrl: './news-block.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewsBlockComponent {
  private readonly router = inject(Router);
  article = input.required<IArticleList>();

  public openDetailsPage(): void {
    const navigationExtras: NavigationExtras = {
      state: Object.assign({}, this.article()),
    };

    this.router.navigate(['news-detail'], {
      state: navigationExtras,
      queryParams: { author: this.article().author },
    });
  }
}
