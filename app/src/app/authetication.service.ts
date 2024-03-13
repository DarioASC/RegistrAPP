import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  isLoggedIn: boolean = false; // Propiedad para verificar si el usuario está autenticado
  redirectUrl: string = '/'; // Propiedad para guardar la URL a la que se debe redirigir después del inicio de sesión

  private userEmail: string = ''; // Variable para almacenar el correo electrónico

  constructor(public ngFireAuth: AngularFireAuth) {}

  async registerUser(email: string, password: string) {
    return await this.ngFireAuth.createUserWithEmailAndPassword(email, password);
  }

  async resetPassword(email: string) {
    return await this.ngFireAuth.sendPasswordResetEmail(email);
  }

  async signOut() {
    return await this.ngFireAuth.signOut();
  }

  async getProfile() {
    return await this.ngFireAuth.currentUser;
  }

  setLoggedIn(value: boolean) {
    this.isLoggedIn = value;
  }

  async loginUser(email: string, password: string) {
    console.log('Intentando iniciar sesión con email:', email);
    try {
      const userCredential = await this.ngFireAuth.signInWithEmailAndPassword(email, password);
      const user = userCredential.user;
      console.log('Usuario autenticado:', user);
      return user;
    } catch (error) {
      console.error('Error al iniciar sesión:', (error as Error).message);
      return null;
    }
  }
  
  

  setEmail(userEmail: string) {
    this.userEmail = userEmail;
  }

  getEmail() {
    return this.userEmail;
  }
}
