import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonServicesModule } from '../common-services';
import { ArtAndDocCoreModule } from 'src/lib/art-and-doc-core';
import { CONTACTOS_COMPONENTES } from './componente.component';

@NgModule({
  declarations: [
    CONTACTOS_COMPONENTES,
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild([]),
    CommonServicesModule,
    ArtAndDocCoreModule,
  ],
  exports: [
    CONTACTOS_COMPONENTES,
  ],
})
export class ContactsModule {}
