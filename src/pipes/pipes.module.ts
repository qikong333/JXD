import { NgModule } from '@angular/core';
import { MfqbNumPipe } from './mfqb-num/mfqb-num';
import { MfqbDatePipe } from './mfqb-date/mfqb-date';
@NgModule({
	declarations: [MfqbNumPipe,
    MfqbDatePipe],
	imports: [],
	exports: [MfqbNumPipe,
    MfqbDatePipe]
})
export class PipesModule {}
