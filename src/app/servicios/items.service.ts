import { Injectable, Type } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {
  
baseUrl: string;
httpOptions : any;

constructor(private httpClient: HttpClient) {

  this.baseUrl = 'http://localhost:3000/api';
  this.httpOptions = {
    headers: new HttpHeaders({
      'user-token': localStorage.getItem('userToken')
    })
  }
  }
  
   // All Items - works
  allItems(): Promise<any> {
    return this.httpClient.get<any>(`${this.baseUrl}/items`, this.httpOptions).toPromise();
  }
  
  // Item detail - works
  ItemById(pItemId): Promise<any> {
    return this.httpClient.get<any>(`${this.baseUrl}/items/`+pItemId, this.httpOptions).toPromise();
  }

  // Create new item - works
  UpItem(formValues): Promise<any> {
    formValues.hand_delivery = (formValues.hand_delivery === true) ? 1 : 0 ;
    formValues.post_delivery = (formValues.post_delivery === true) ? 1 : 0 ;
    /* console.log(formValues) */
  return this.httpClient.post(`${this.baseUrl}/items`, formValues, this.httpOptions).toPromise();
  }
  
  // Categories names - works
  getCategories (): Promise<any> {
    return this.httpClient.get<any>(`${this.baseUrl}/cats/`, this.httpOptions).toPromise();
  }

  // Upload images - in process
  UploadImage (formData): Promise<any> {
  console.log (formData);
  const options = {
    headers: new HttpHeaders({
      'user-token': localStorage.getItem('userToken'),
  /*'Content-Type': 'multipart/form-data' */  
    }),
    content: formData
  }
  return this.httpClient.post(`${this.baseUrl}/items/uploadimg`, options).toPromise();
  }

  // Items for each user - works
  ItemsById(): Promise<any> {
  const pUserId = localStorage.getItem('userId')
  return this.httpClient.get<any>(`${this.baseUrl}/items/by-user/`+pUserId, this.httpOptions).toPromise();
  }

  // Delete item - works
  DeleteById(pItemId): Promise<any> {
  return this.httpClient.delete<any>(`${this.baseUrl}/items/`+pItemId, this.httpOptions).toPromise();
  }

  // Update item - works
  UpdateById(pItemId, formValues): Promise<any> {
    return this.httpClient.put<any>(`${this.baseUrl}/items/`+pItemId, formValues, this.httpOptions).toPromise();
  }

}
