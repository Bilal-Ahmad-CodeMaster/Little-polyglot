import { Routes } from '@angular/router';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { BlogsLayoutComponent } from './layouts/blogs-layout/blogs-layout.component';
import { HomeComponent } from './pages/main/home/home.component';
import { AboutComponent } from './pages/main/about/about.component';
import { EducationComponent } from './pages/blogs/education/education.component';
import { CreativeLearningComponent } from './pages/blogs/creative-learning/creative-learning.component';
import { CoursesComponent } from './pages/main/courses/courses.component';


export const routes: Routes = [
    {
        path: '',
        component: MainLayoutComponent,
        children: [
            { path: '', component: HomeComponent }, 
            { path: 'courses', component: CoursesComponent },

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

