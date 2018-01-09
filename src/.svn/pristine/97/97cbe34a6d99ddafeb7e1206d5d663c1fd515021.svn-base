import { Component, Output, EventEmitter } from '@angular/core';

/**
 * Generated class for the NetworkShowComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'network-show',
  templateUrl: 'network-show.html'
})
export class NetworkShowComponent {

  @Output() willEnt = new EventEmitter();

  reload(){
    this.willEnt.emit();
    alert('component');
  }

  constructor() {
  }

}
