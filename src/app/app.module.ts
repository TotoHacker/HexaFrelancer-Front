import { NgModule } from '@angular/core';
import {
    HashLocationStrategy,
    LocationStrategy,
    PathLocationStrategy,
} from '@angular/common';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AppLayoutModule } from './layout/app.layout.module';
import { NotfoundComponent } from './main/components/notfound/notfound.component';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
// import { AngularFireModule } from '@angular/fire/compat';
// import { environment } from 'src/environments/environment';
import { CardModule } from 'primeng/card';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [AppComponent, NotfoundComponent],
    // AngularFireModule.initializeApp(environment.firebase)
    imports: [AppRoutingModule, AppLayoutModule, ToastModule, CardModule, CKEditorModule, ReactiveFormsModule],
    providers: [
        { provide: LocationStrategy, useClass: PathLocationStrategy },
        MessageService,
    ],
    bootstrap: [AppComponent],
})
export class AppModule { }
