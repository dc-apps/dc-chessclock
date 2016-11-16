export const routes: Array<any> = [
    //path: '', component: SomeComponent
];

export const routeComponents: Array<any> = (function () {
    let components = [];
    routes.forEach(route => {
        components.push(route.component);
    });

    return components;
})()

