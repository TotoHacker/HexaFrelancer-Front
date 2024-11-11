import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BlogListComponent } from './pages/blog-list/blog-list.component';
import { BlogNewComponent } from './pages/blog-new/blog-new.component';




@NgModule({
    imports: [
        RouterModule.forChild([
            { path: 'new', component: BlogNewComponent },
            { path: 'list', component: BlogListComponent },
            { path: '**', redirectTo: '/notfound' },
        ]),
    ],
    exports: [RouterModule],
})
export class BlogRoutingModule {}