import { MainComponent } from './main.component';

export const routes: Array<any> = [
    {
        path: '', component: MainComponent
    }
];

export const routeComponents: Array<any> = (function () {
    let components = [];
    routes.forEach(route => {
        components.push(route.component);
    });

    return components;
})()

