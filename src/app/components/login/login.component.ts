import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router';
import { delay, first } from 'rxjs/operators';
import { UserService } from './../../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  submitted!: boolean;
  loading!: boolean;

  constructor(
    private FormBuilder: FormBuilder,
    private accountService: UserService,
    private route: ActivatedRoute,
    private router: Router) { }


  ngOnInit(): void {
    this.createForm();
    if (this.accountService.userValue) {
      this.router.navigate(['/repescs']);
    }
  }

  private createForm() {
    this.loginForm = this.FormBuilder.group({
      document: [null, Validators.required],
      password: [null, Validators.required]
    });
  }

  get frm() { return this.loginForm.controls }

  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    this.accountService.authenticate(this.frm.document.value, this.frm.password.value)
      .pipe(delay(0), first())
      .subscribe({
        next: () => {
          // get return url from query parameters or default to home page

          const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/repescs';
          this.router.navigateByUrl(returnUrl);
        },
        error: error => {
          this.loading = false;
        }
      });
  }
}
