import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PIPES_STRINGS } from './pipes/strings.pipe';
import { PIPES_NUMERICS } from './pipes/numeric.pipe';
import { SizerComponent } from './components/font-sizer.component';

@NgModule({
  declarations: [
    PIPES_STRINGS,
    PIPES_NUMERICS,
    SizerComponent,

  ],
  exports: [
    PIPES_STRINGS,
    PIPES_NUMERICS,
    SizerComponent,

  ],
  imports: [
    CommonModule
  ]
})
export class ArtAndDocCoreModule { }
