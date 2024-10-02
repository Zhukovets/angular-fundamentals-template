import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SessionStorageService } from "./services/session-storage.service";
import { AuthService } from "./services/auth.service";
import { HttpClientModule } from "@angular/common/http";
import { WindowRefService } from "@app/shared/provides/window.provider";

@NgModule({
  declarations: [],
  imports: [CommonModule, HttpClientModule],
  providers: [SessionStorageService, AuthService],
})
export class AuthModule {}
