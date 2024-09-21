import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../../../environments/environment';

export const requestInterceptor: HttpInterceptorFn = (req, next) => {
  // Clone request and set the Authrization on the request header consist of API KY 
  req = req.clone({
    setHeaders: {
      Authorization: environment.API_KEY,
    },
  });

  return next(req);
};
