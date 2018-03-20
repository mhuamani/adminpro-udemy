import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef,
  Renderer 
} from "@angular/core";

@Component({
  selector: "app-incrementador",
  templateUrl: "./incrementador.component.html",
  styles: []
})
export class IncrementadorComponent implements OnInit {
  constructor(private renderer: Renderer) {
    console.log("Progreso", this.progreso);
  }

  @ViewChild("txtProgress") txtProgress: ElementRef;
  @Input("nombre") leyenda: string = "Leyenda";
  @Input() progreso: number = 50;
  @Output() cambioValor: EventEmitter<number> = new EventEmitter();

  ngOnInit() {
    // console.log('Leyenda', this.leyenda);
  }

  onChanges(newValue: number) {
    //let elemHTML: any = document.getElementsByName('progreso')[0];
    //let elemHTML: any = document.getElementsByName('progreso')[0];

    // console.log(this.txtProgress);
    // console.log(newValue);
    if (newValue >= 100) {
      this.progreso = 100;
    } else if (newValue <= 0) {
      this.progreso = 0;
    } else {
      this.progreso = newValue;
    }

    //elemHTML.value = Number(this.progreso);
    this.txtProgress.nativeElement.value = this.progreso;
    this.cambioValor.emit(this.progreso);
    //this.txtProgress.nativeElement.focus();
    this.renderer.invokeElementMethod(this.txtProgress.nativeElement, 'focus'); 
  }

  cambiarValor(valor) {
    if (this.progreso >= 100 && valor > 0) {
      return;
    }

    if (this.progreso <= 0 && valor < 0) {
      return;
    }
    this.progreso = this.progreso + valor;

    this.cambioValor.emit(this.progreso);
  }
}
