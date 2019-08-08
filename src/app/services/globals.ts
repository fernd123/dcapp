import { Injectable } from '@angular/core';

@Injectable()
export class Globals {

  // MESSAGE
  public static CONFIRMATION = 'Confirmación';
  public static ERROR_TYPE = 'success';
  public static ERROR = 'error';
  public static SUCCESS = 'Éxito';
  public static SUCCESS_TYPE = 'success';

  public static CUSTOMER_REMOVED = 'Cliente eliminado correctamente';
  public static CUSTOMER_UPDATED = 'Cliente actualizado correctamente';
  public static CUSTOMER_ADDED = 'Cliente creado correctamente';

  public static MEASURE_REMOVED = 'Medida eliminada correctamente';
  public static MEASURE_UPDATED = 'Medida actualizada correctamente';
  public static MEASURE_ADDED = 'Medida creada correctamente';

  // URL ENDPOINTS
  public static URL_ENDPOINT_LOCAL: string = 'http://localhost:8080';
  public static URL_ENDPOINT_HEROKU: string = '';
  public static URL_ENDPOINT_AWS: string = '';

  

  public static URL_LOGIN: string = '/login';
  public static URL_CUSTOMERS: string = '/api/customers';
  public static URL_MEASURES: string = '/api/measures';




}