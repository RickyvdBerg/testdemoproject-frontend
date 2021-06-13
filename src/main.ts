// Load `$localize` onto the global scope - used if i18n tags appear in Angular templates.
import '@angular/localize/init';
import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from '@app/app.module';
import { environment } from '@environments/environment';
import {
  getTranslations,
  loadTranslations,
  ParsedTranslationBundle,
} from '@locl/core';
import { getLocale } from '@utils/i18nHelper';

if (environment.production) {
  enableProdMode();
}

getTranslations(`/assets/i18n/${getLocale()}.json`).then(
  (data: ParsedTranslationBundle) => {
    loadTranslations(data);

    platformBrowserDynamic()
      .bootstrapModule(AppModule)
      .catch((err) => console.error(err));
  },
);
