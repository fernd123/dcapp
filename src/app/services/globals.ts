import { Injectable } from '@angular/core';

@Injectable()
export class Globals {
  public static URL_ENDPOINT_LOCAL: string = 'http://localhost:8080';
  public static URL_ENDPOINT_HEROKU: string = 'https://spring-dcnutrition.herokuapp.com';

  public static URL_LOGIN: string = '/login';
  public static URL_CUSTOMERS: string = '/api/customers';
  public static URL_MEASURES: string = '/api/measures';


}