import { Routes } from '@angular/router';
import { NotFound } from '@shared/not.found/not.found';
import { Campground } from 'src/main/campground/campground';
import { EditCampground } from 'src/main/edit.campground/edit.campground';
import { Main } from 'src/main/main';
import { NewCampground } from 'src/main/new.campground/new.campground';

export const routes: Routes = [
    {
        path: 'campgrounds',
        component: Main
    },
    {
        path: 'campgrounds/new',
        component: NewCampground
    },
    {
        path: 'campgrounds/:id',
        component: Campground
    },
    {
        path: 'campgrounds/:id/edit',
        component: EditCampground
    },
    {
        path: '404',
        component: NotFound
    },
    {
        path: '**',
        redirectTo: '/404',
    }
]