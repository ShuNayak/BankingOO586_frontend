import { NgModule, ModuleWithProviders } from '@angular/core';
import { AuthGuard } from './shared/auth/auth.guard';
import { AuthService } from './shared/auth/auth.service';

@NgModule({
    exports: [],
    providers: [AuthGuard, AuthService],
    imports: []
})

export class CoreModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: CoreModule,
            providers: []
        };
    }
}
