
import { Component, OnInit } from '@angular/core';
import { FrutasService } from '../../services/frutas.service';

interface Fruta {
  id_fruta: number;
  nombre: string;
}

@Component({
  selector: 'app-frutas',
  templateUrl: './frutas.page.html',
  styleUrls: ['./frutas.page.scss'],
})
export class FrutasPage implements OnInit {
  frutas: Fruta[] = [];
  nueva_fruta: Fruta = { id_fruta: 0, nombre: '' };
  esEdicion: boolean = false; // Bandera para saber si se está editando

  constructor(private frutasService: FrutasService) {}

  ngOnInit() {
    this.obtenerFrutas();
  }

  obtenerFrutas() {
    this.frutasService.getFrutas().subscribe((frutas) => {
      this.frutas = frutas;
    });
  }

  cargarFrutaEnFormulario(fruta: Fruta) {
    this.nueva_fruta = { ...fruta }; // Cargar la fruta en el formulario
    this.esEdicion = true; // Activar modo edición
  }

  guardarFruta() {
    if (!this.nueva_fruta.nombre) return;

    if (this.esEdicion) {
      // Modo edición
      this.frutasService.updateFruta(this.nueva_fruta.id_fruta, this.nueva_fruta).subscribe(() => {
        this.frutas = this.frutas.map((f) =>
          f.id_fruta === this.nueva_fruta.id_fruta ? { ...this.nueva_fruta } : f
        );
        this.limpiarFormulario();
      });
    } else {
      // Modo agregar
      this.frutasService.createFruta(this.nueva_fruta).subscribe((fruta) => {
        this.frutas.push(fruta);
        this.limpiarFormulario();
      });
    }
  }

  eliminarFruta(id_fruta: number) {
    this.frutasService.deleteFruta(id_fruta).subscribe(() => {
      this.frutas = this.frutas.filter((fruta) => fruta.id_fruta !== id_fruta);
    });
  }

  limpiarFormulario() {
    this.nueva_fruta = { id_fruta: 0, nombre: '' };
    this.esEdicion = false;
  }
}
