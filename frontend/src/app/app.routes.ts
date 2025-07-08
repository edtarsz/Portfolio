import { Routes } from '@angular/router';
import { Campground } from 'src/main/campground/campground';
import { Main } from 'src/main/main';

export const routes: Routes = [
    {
        path: 'campgrounds',
        component: Main
    },
    {
        path: 'campgrounds/:id',
        component: Campground
    },
]

// {
//     path: '',
//     redirectTo: '/',
//     pathMatch: 'full'
// }