import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modalagregardestinatario',
  templateUrl: './modalagregardestinatario.component.html',
  styleUrls: ['./modalagregardestinatario.component.css']
})
export class ModalagregardestinatarioComponent implements OnInit {

  @Input() public destinatario;

  constructor(
    public activeModal: NgbActiveModal
  ) { }

  ngOnInit(): void {
    console.log("Que trae al inciar modal?: ",this.destinatario)
  }

}
