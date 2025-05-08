import { Routes } from '@angular/router';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { BlogsLayoutComponent } from './layouts/blogs-layout/blogs-layout.component';
import { HomeComponent } from './pages/main/home/home.component';
import { AboutComponent } from './pages/main/about/about.component';
import { EducationComponent } from './pages/blogs/education/education.component';
import { CreativeLearningComponent } from './pages/blogs/creative-learning/creative-learning.component';
import { CoursesComponent } from './pages/main/courses/courses.component';
import { EnglishFor3To6YearKidsComponent } from './pages/main/courses/english-for-3-to-6-year-kids/english-for-3-to-6-year-kids.component';
import { EnglishFor7To10YearComponent } from './pages/main/courses/english-for-7-to-10-year/english-for-7-to-10-year.component';
import { EnglishFor11To14YearTeenComponent } from './pages/main/courses/english-for-11-to-14-year-teen/english-for-11-to-14-year-teen.component';
import { EnglishFor14To19YearOldComponent } from './pages/main/courses/english-for-14-to-19-year-old/english-for-14-to-19-year-old.component';


export const routes: Routes = [
    {
        path: '',
        component: MainLayoutComponent,
        children: [
            { path: '', component: HomeComponent },
            { path: 'courses', component: CoursesComponent },
            { path: 'courses/english-for-children-3-6', component: EnglishFor3To6YearKidsComponent },
            { path: 'courses/english-for-children-7-10', component: EnglishFor7To10YearComponent },
            { path: 'courses/english-for-children-11-14', component: EnglishFor11To14YearTeenComponent },
            { path: 'courses/english-for-children-14-19', component: EnglishFor14To19YearOldComponent },
            { path: 'about', component: AboutComponent },
        ],
    },
    {
        path: 'blogs',
        component: BlogsLayoutComponent,
        children: [
            { path: '', component: EducationComponent },
            { path: 'creativeLearning', component: CreativeLearningComponent },
        ],
    },
];


