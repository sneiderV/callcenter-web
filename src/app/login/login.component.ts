import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  loginForm!: FormGroup;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router,
    private toastrService: ToastrService
  ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ["", Validators.required],
      password: ["", Validators.required]
    });
  }

  async validateLogin(dataLogin: any) {
    try {
      const validaInfo = await this.authService.validateLogin(dataLogin);

      const meInfo = await this.authService.getMeInfo(validaInfo.token);
      
      if (meInfo !== undefined && meInfo !== null) {
        this.toastrService.success("Bienvenido!");
        const userInfo = JSON.parse(localStorage.getItem('meInfo')!);
        this.router.navigate([`/${userInfo.role}`]);
      } else {
        this.toastrService.warning("Verifique sus datos.", "Verificacion");
      }
    } catch (error) {
      console.error('Error during login:', error);
      this.toastrService.warning("Verifique sus datos.", "Verificacion");
    }

  }
}
