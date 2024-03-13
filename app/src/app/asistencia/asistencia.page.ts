// asistencia.page.ts

import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-asistencia',
  templateUrl: 'asistencia.page.html',
  styleUrls: ['asistencia.page.scss'],
})
export class AsistenciaPage {
  asistenciaCollection$!: Observable<any[]>;

  constructor(private firestore: AngularFirestore) {
    this.getAsistenciaData();
  }

  getAsistenciaData() {
    const asistenciaCollection = this.firestore.collection('asistencia');
    this.asistenciaCollection$ = asistenciaCollection.valueChanges();
  }
}
