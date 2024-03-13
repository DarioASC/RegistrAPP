import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
@Component({
  selector: 'app-api',
  templateUrl: './api.page.html',
  styleUrls: ['./api.page.scss'],
})
export class ApiPage implements OnInit {

  constructor() { }

  ngOnInit() {
    // Ejecutar el código cuando la página se haya cargado completamente
    $(document).ready(() => {
      $('#enviar').click(() => {
        $.get("https://www.themealdb.com/api/json/v1/1/categories.php", function (data) {
          $.each(data.categories, function (i, item) {
            // Crear una tarjeta <ion-card> para cada categoría
            const ionCard = `
              <ion-card>
                <ion-card-header>
                  <ion-card-title>${item.strCategory}</ion-card-title>
                  <ion-card-subtitle>${item.idCategory}</ion-card-subtitle>
                </ion-card-header>
    
                <ion-card-content>
                  <img src="${item.strCategoryThumb}" alt="${item.strCategory}">
                  ${item.strCategoryDescription}
                </ion-card-content>
              </ion-card>
            `;
    
            // Agregar la tarjeta <ion-card> al contenedor
            $("#categorias").append(ionCard);
          });
        });
      });
    });

  }}
