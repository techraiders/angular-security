import { Component, OnInit } from "@angular/core";
import { AuthService } from "./services/auth.service";
import { Observable } from "rxjs";
import { User } from "./model/user";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  user$: Observable<User>;
  isLoggedIn$: Observable<boolean>;
  isLoggedOut$: Observable<boolean>;

  ngOnInit(): void {
    this.user$ = this.authService.user$;
    this.isLoggedIn$ = this.authService.isLoggedIn$;
    this.isLoggedOut$ = this.authService.isLoggedOut$;
  }
  constructor(private authService: AuthService) {}
}
