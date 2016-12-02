// this import should be first in order to load some required settings (like globals and reflect-metadata)
import { platformNativeScriptDynamic, NativeScriptModule } from "nativescript-angular/platform";
import { NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { routes, routeComponents } from './app.routing';

@NgModule({
    declarations: [AppComponent, ...routeComponents],
    //entryComponents: [AppComponent, ...routeComponents],
    bootstrap: [AppComponent],
    imports: [
        NativeScriptModule,
        NativeScriptRouterModule,
        NativeScriptRouterModule.forRoot(routes)
    ]
})
class AppComponentModule { }

platformNativeScriptDynamic().bootstrapModule(AppComponentModule);