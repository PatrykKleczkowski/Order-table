import { SideNavLayoutModule } from '@app/shared/modules';
import { GeoLocationService } from '@shared/services/geo-location.service';
import { GoogleMapsAPIWrapper } from '@agm/core/services';
import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import { DialogService } from '@shared/services/dialog.service';
import { AgmCoreModule } from '@agm/core';
import { NgModule } from '@angular/core';
import {
  NavBarComponent,
  LoginDialogComponent,
  RegisterDialogComponent,
  MainPageComponent,
  ReservationDialogComponent,
  LayoutComponent
} from './components';
import { HomeRoutingModule } from './home-routing.module';
import { SharedModule } from '@shared/modules/shared.module';
import { CompareValidatorDirective } from '@shared/validators/compare-validator.directive';
import { VenueService } from '@shared/services/venue.service';
import { SidenavService } from '@app/shared/modules/side-nav-layout/services';
import { UserReservationsComponent } from './components/user-reservations/user-reservations.component';
import { UserNotificationsComponent } from './components/user-notifications/user-notifications.component';
import { ReservationNotificationsComponent } from './components/reservation-notifications/reservation-notifications.component';
// import {ReservationService} from '@shared/services/reservation.service';

@NgModule({
  declarations: [
    NavBarComponent,
    LoginDialogComponent,
    RegisterDialogComponent,
    MainPageComponent,
    CompareValidatorDirective,
    ReservationDialogComponent,
    LayoutComponent,
    UserReservationsComponent,
    UserNotificationsComponent,
    ReservationNotificationsComponent
  ],
  imports: [
    SharedModule,
    HomeRoutingModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDeOn1yZdl6o6xUyv17VLAW1A0szWaRcMY'
    }),
    SideNavLayoutModule
  ],
  providers: [
    DialogService,
    {
      provide: LocationStrategy,
      useClass: PathLocationStrategy
    },
    VenueService,
    GoogleMapsAPIWrapper,
    GeoLocationService,
    SidenavService
    // ReservationService -- is missing
  ],
  entryComponents: [
    LoginDialogComponent,
    RegisterDialogComponent,
    ReservationDialogComponent
  ]
})
export class HomeModule { }
