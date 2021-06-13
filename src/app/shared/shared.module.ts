import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

/**
 * Shared module should be imported by every feature module
 * (Replace the CommonModule import with SharedModule)
 */

@NgModule({
  declarations: [],
  imports: [
    // Vendor
    CommonModule,
    RouterModule,
  ],
  exports: [
    // Vendor
    CommonModule,
    RouterModule,
  ],
})
export class SharedModule {}
