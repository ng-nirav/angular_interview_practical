import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'calendar',
    loadChildren: () =>
      import('./core/features/calender-view/calender-view.module').then(
        (e) => e.CalenderViewModule
      ),
  },
  { path: '', redirectTo: '/calendar', pathMatch: 'full' },
];
