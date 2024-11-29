import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom, lastValueFrom, Observable } from 'rxjs';
import { DefaultResponse } from '../../../../shared/models/http.model';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class ProyectService {

    private apiUrl: string = `${environment.URL_API}/api`;
    constructor(private http: HttpClient) {

    }

    async createProyectEntry(entry: any): Promise<any> {
        try {
            console.log(entry);

            let response = await firstValueFrom(this.http.post<any>(this.apiUrl + '/projects/create', { entry }));
            return response;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async getProyectEntries(): Promise<any[]> {
        try {
            const response = await firstValueFrom(this.http.get<any>(this.apiUrl + '/projects'));
            return response;
        } catch (error) {
            throw error;
        }
    }

    async getNotificacion(): Promise<any[]> {
        try {
            const response = await firstValueFrom(this.http.get<any>('http://localhost:3001/project-applications'));
            return response;
        } catch (error) {
            throw error;
        }
    }

    async deleteProyectEntry(entryId: number): Promise<DefaultResponse> {
        try {
            let response = await lastValueFrom(this.http.delete<any>('http://localhost:3001/api/projects/delete/' + entryId));
            return response!
        } catch (error) {
            console.log(error);
            throw error;
        }
    }


    async getProyectEntryById(entryId: string): Promise<DefaultResponse> {
        try {
            const response = await lastValueFrom(this.http.get<DefaultResponse>(this.apiUrl + `/projects/${entryId}`));
            return response!;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async updateProyectEntry(entryData: any, entryId: string): Promise<DefaultResponse> {
        try {
            let response = await lastValueFrom(this.http.post<DefaultResponse>(this.apiUrl + 'update', { entryData, entryId }));
            return response!
        } catch (error) {
            console.log(error);
            throw error;
        }
    }


    getProyectEntry(entryId: string): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}/get-by-id/${entryId}`);
    }


}
