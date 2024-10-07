import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { UserService } from "./services/user.service";
import { UserStoreService } from "./services/user-store.service";
import { AdminGuard } from "./guards/admin.guard";
import { WindowRefService } from "@app/shared/provides/window.provider";
import { HttpClientModule } from "@angular/common/http";

@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [
    UserService,
    UserStoreService,
    AdminGuard,
    WindowRefService,
    HttpClientModule,
  ],
})
export class UserModule {}
