import { AuthService } from './../../services/auth.service';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    constructor(private authService: AuthService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // Obtenemos el token
        const token = this.authService.getToken();

        // Importante: modificamos de forma inmutable, haciendo el clonado de la petición
        const authReq = req.clone({ headers: req.headers.set('Authorization', token) });

        // Pasamos al siguiente interceptor de la cadena la petición modificada
        return next.handle(authReq);
    }
}