import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PIPES_STRINGS } from './pipes/strings.pipe';
import { PIPES_NUMERICS } from './pipes/numeric.pipe';
import { SizerComponent } from './components/font-sizer.component';
import { AAD_VALIDATORS } from './directives/validators.directive';

@NgModule({
  declarations: [
    PIPES_STRINGS,
    PIPES_NUMERICS,
    SizerComponent,
    AAD_VALIDATORS,

  ],
  exports: [
    PIPES_STRINGS,
    PIPES_NUMERICS,
    SizerComponent,
    AAD_VALIDATORS,

  ],
  imports: [
    CommonModule
  ]
})
export class ArtAndDocCoreModule { }
