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
import { MethodComponent } from './pages/main/method/method.component';
import { FindSchoolsComponent } from './components/find-schools/find-schools.component';
import { ContactUsComponent } from './pages/main/contact-us/contact-us.component';
import { ParentComponent } from './pages/main/parent/parent.component';
import { SmartParentAcademyComponent } from './pages/main/parent/smart-parent-academy/smart-parent-academy.component';
import { SignUpComponent } from './pages/main/sign-up/sign-up.component';
import { BranchPriceDetailComponent } from './pages/main/branch-price-detail/branch-price-detail.component';
import { LoginComponent } from './components/login/login.component';
import { AdminPanelComponent } from './components/admin-panel/admin-panel.component';
import { DashboardComponent } from './components/admin-panel/dashboard/dashboard.component';
import { ProfileComponent } from './components/admin-panel/profile/profile.component';
import { BranchesComponent } from './components/admin-panel/branches/branches.component';


export const routes: Routes = [
    {
        path: '',
        component: MainLayoutComponent,
        children: [
            { path: '', component: HomeComponent },
            { path: 'courses', component: CoursesComponent },
            { path: 'schools', component: FindSchoolsComponent },
            { path: 'branch/detail', component: BranchPriceDetailComponent },
            { path: 'courses/english-for-children-3-6', component: EnglishFor3To6YearKidsComponent },
            { path: 'courses/english-for-children-7-10', component: EnglishFor7To10YearComponent },
            { path: 'courses/english-for-children-11-14', component: EnglishFor11To14YearTeenComponent },
            { path: 'courses/english-for-children-14-19', component: EnglishFor14To19YearOldComponent },
            { path: 'method', component: MethodComponent },
            { path: 'contact', component: ContactUsComponent },

            { path: 'about', component: AboutComponent },
            { path: 'parent', component: ParentComponent },
            { path: 'parent/smart-parent-academy', component: SmartParentAcademyComponent },
            { path: 'registration/applicationForm', component: SignUpComponent },
        ],
    },
    { path: 'login', component: LoginComponent },
    {
        path: 'adminPanel',
        component: AdminPanelComponent,
        children: [
            { path: '', component: DashboardComponent },
            { path: 'dashboard', component: DashboardComponent },
            { path: 'profile', component: ProfileComponent },
            { path: 'branches', component: BranchesComponent },
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


