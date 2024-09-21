import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsListingComponent } from './news-listing.component';

describe('NewsListingComponent', () => {
  let component: NewsListingComponent;
  let fixture: ComponentFixture<NewsListingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewsListingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewsListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
