import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { CardModule } from 'primeng/card';
import { ToastService } from 'src/app/main/services/toast.service';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
// import { AngularFireAuth } from '@angular/fire/compat/auth';
import { BlogEntry } from '../../../blog/models/blog-models.model';
import { BlogService } from '../../../blog/services/blog.service';
import { PrimeNgModule } from 'src/app/primeng.module';

@Component({
    standalone: true,
    imports: [
        CardModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        BreadcrumbModule,
        TableModule,
        ButtonModule,
        PrimeNgModule,
    ],
    selector: 'app-dashboard-main-page',
    templateUrl: './dashboard-main-page.component.html',
})
export class DashboardMainPageComponent implements OnInit {
    public blogEntries: Array<BlogEntry> = [];
    public recentBlogs: Array<BlogEntry> = [];

    public currentUser!: any | null;
    blogStatistics: { draftCount: number; publishedCount: number; privateCount: number; publicCount: number; totalBlogs: number; mostPopularTag: string; topTags:any; };

    constructor(
        // private auth: AngularFireAuth,
        private router: Router,
        public blogService: BlogService,
        private toastService: ToastService
    ) {
        // this.auth.authState.subscribe(async (auth) => {
        //     this.currentUser = auth;
        //     if (auth != null) {
        //         const token = await auth.getIdTokenResult();
        //     }
        // });
    }

    ngOnInit(): void {
        this.getBlogEntries();
    }



        async getBlogEntries(): Promise<void> {
            try {
                const response = await this.blogService.getBlogEntries();
                this.blogEntries = response;


                this.recentBlogs = this.blogEntries
                    .sort(
                        (a, b) =>
                            new Date(b.date).getTime() - new Date(a.date).getTime()
                    )
                    .slice(0, 3);


                this.calculateBlogStatistics();

                console.info('recentBlogs ', this.recentBlogs);
                console.info('blogStatistics ', this.blogStatistics);
            } catch (error) {
                console.log(error);
                this.toastService.showError(
                    'Error',
                    'Ocurrió un problema al realizar la consulta'
                );
            } finally {

            }
        }

        calculateBlogStatistics(): void {
            const draftCount = this.blogEntries.filter(blog => blog.state.toLowerCase() === 'borrador').length;
            const publishedCount = this.blogEntries.filter(blog => blog.state.toLowerCase() === 'publicado').length;
            const privateCount = this.blogEntries.filter(blog => blog.visibility.toLowerCase() === 'privado').length;
            const publicCount = this.blogEntries.filter(blog => blog.visibility.toLowerCase() === 'público').length;

            this.blogStatistics = {
                draftCount,
                publishedCount,
                privateCount,
                publicCount,
                totalBlogs: this.blogEntries.length,
                mostPopularTag: this.getMostPopularTag(),
                topTags: this.getTopTags()
            };
        }

        getMostPopularTag(): string {
            const tags = this.blogEntries.flatMap(blog => blog.tags);
            const tagCounts = tags.reduce((acc, tag) => {
                acc[tag] = (acc[tag] || 0) + 1;
                return acc;
            }, {} as Record<string, number>);

            const mostPopularTag = Object.keys(tagCounts).reduce((a, b) => tagCounts[a] > tagCounts[b] ? a : b);
            return mostPopularTag;
        }

        getTopTags(): { name: string, count: number }[] {
            const tags = this.blogEntries.flatMap(blog => blog.tags);
            const tagCounts = tags.reduce((acc, tag) => {
                acc[tag] = (acc[tag] || 0) + 1;
                return acc;
            }, {} as Record<string, number>);

            //
            const sortedTags = Object.keys(tagCounts)
                .map(tag => ({ name: tag, count: tagCounts[tag] }))
                .sort((a, b) => b.count - a.count); //

            //
            return sortedTags.slice(0, 5);
        }




    openArticleForm(entryId: string) {
        this.router.navigate(['blog/update/' + entryId]);
    }
}
