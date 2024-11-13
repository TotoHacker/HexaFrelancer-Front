// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { lastValueFrom, Observable } from 'rxjs';

// import { DefaultResponse } from '../../../../shared/models/http.model';
// import { environment } from 'src/environments/environment';
// import { BlogNewComponent } from '../pages/blog-new/blog-new.component';
// import { BlogEntry, BlogTag } from '../models/blog-models.model';

// @Injectable({
//   providedIn: 'root',
// })
// export class BlogService {

//   private apiUrl: string = `${environment.URL_API}/blog/`;
//   private apiUrl2: string = `${environment.URL_API}/api/blog/`;
//   constructor(private http: HttpClient) {

//    }




// async createBlogEntry(entry: any): Promise<DefaultResponse> {
//   try {
//     let response = await lastValueFrom(this.http.post<DefaultResponse>(this.apiUrl + 'create', { entry }));
//     return response!;
//   } catch (error) {
//     console.log(error);
//     throw error;
//   }
// }

// async getBlogEntries(): Promise<BlogEntry[]> {
//   try {
//     const response = await lastValueFrom(this.http.get<DefaultResponse>(this.apiUrl + 'get-all'))
//     return response!.data
//   } catch (error) {
//     throw error;
//   }
// }

// async deleteBlogEntry(entryId: string): Promise<DefaultResponse> {
//   try {
//     let response = await lastValueFrom(this.http.post<DefaultResponse>(this.apiUrl + 'delete', { entryId }));
//     return response!
//   } catch (error) {
//     console.log(error);
//     throw error;
//   }
// }


// async getBlogEntryById(entryId: string): Promise<DefaultResponse> {
//   try {
//     const response = await lastValueFrom(this.http.get<DefaultResponse>(this.apiUrl + `get-by-id/${entryId}`));
//     return response!;
//   } catch (error) {
//     console.log(error);
//     throw error;
//   }
// }

// async updateBlogEntry(entryData: any, entryId: string): Promise<DefaultResponse> {
//   try {
//     let response = await lastValueFrom(this.http.post<DefaultResponse>(this.apiUrl + 'update', { entryData, entryId }));
//     return response!
//   } catch (error) {
//     console.log(error);
//     throw error;
//   }
// }





//   getBlogEntry(entryId: string): Observable<BlogEntry> {
//     return this.http.get<BlogEntry>(`${this.apiUrl}/get-by-id/${entryId}`);
//   }



//   // Método para subir la imagen
// /*uploadImage(file: File): Promise<string> {
//   const formData = new FormData();
//   formData.append('image', file);

//   return this.http.post<{ imagePath: string }>( `${this.apiUrl}upload-cover-image`, formData)
//     .toPromise()
//     .then(response => response.imagePath)
//     .catch(error => {
//       console.error('Error al subir la imagen', error);
//       throw error;
//     });
// }*/

// uploadImage(file: File): Promise<string> {
//   const formData = new FormData();
//   formData.append('image', file);

//   return this.http.post<{ imagePath: string }>(`${this.apiUrl}upload-cover-image`, formData)
//     .toPromise()
//     .then(response => {
//       if (response && response.imagePath) {
//         console.log('ruta img', response.imagePath);
//         return response.imagePath; // Retorna la URL de la imagen si es correcta
//       } else {
//         throw new Error('La respuesta del servidor no contiene una URL válida de la imagen.');
//       }
//     })
//     .catch(error => {
//       console.error('Error al subir la imagen:', error);
//       throw new Error('Error al subir la imagen: ' + (error.message || 'Error desconocido'));
//     });
// }

//   // BLOG TAGS

//   async getAllTags(): Promise<BlogTag[]> {
//     try {
//       const response = await lastValueFrom(this.http.get<DefaultResponse>(this.apiUrl + 'tag/get-all'))
//       return response!.data
//     } catch (error) {
//       throw error;
//     }
//   }

//   async createBlogTag(tagData: BlogTag): Promise<DefaultResponse> {

//     try {
//       let response = await lastValueFrom(this.http.post<DefaultResponse>(this.apiUrl + 'tag/create', { tagData }));
//       return response!;
//     } catch (error) {
//       console.log(error);
//       throw error;
//     }
//   }

//   async updateBlogTag(tagData: any, tagId: string): Promise<DefaultResponse> {
//     try {
//       let response = await lastValueFrom(this.http.put<DefaultResponse>(this.apiUrl + 'tag/update', { tagData, tagId }));
//       return response!
//     } catch (error) {
//       console.log(error);
//       throw error;
//     }
//   }

//   async deleteBlogTag(id: string): Promise<DefaultResponse> {
//     try {
//       let response = await lastValueFrom(this.http.post<DefaultResponse>(this.apiUrl + 'tag/delete', { id }));
//       return response!
//     } catch (error) {
//       console.log(error);
//       throw error;
//     }
//   }

// }
