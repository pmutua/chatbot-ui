import { Config } from '@stencil/core';
import { angularOutputTarget } from '@stencil/angular-output-target';
import { reactOutputTarget } from '@stencil/react-output-target';
import { vueOutputTarget } from '@stencil/vue-output-target';
import { OutputTargetCustom } from '@stencil/core/internal';

export const config: Config = {
  namespace: 'chatbot-ui',
  outputTargets: [
    {
      type: 'dist',
      esmLoaderPath: '../loader',
    },
    {
      type: 'dist-custom-elements',
      customElementsExportBehavior: 'auto-define-custom-elements',
      externalRuntime: false,
    },
    {
      type: 'docs-readme',
    },
    {
      type: 'www',
      serviceWorker: null, // disable service workers
    },
    /** Angular wrapper */
    angularOutputTarget({
      componentCorePackage: 'chatbot-ui',
      directivesProxyFile: './angular-output/chatbot-ui-lib-angular/src/generated/proxies.ts',
      directivesArrayFile: './angular-output/chatbot-ui-lib-angular/src/generated/index.ts',
    }) as OutputTargetCustom,
    /** React wrapper */
    reactOutputTarget({
      stencilPackageName: 'chatbot-ui',
      outDir: './react-output/chatbot-ui-lib-react/src/components.ts',
    }) as OutputTargetCustom,

    /** Vue wrapper */
    vueOutputTarget({
      componentCorePackage: 'chatbot-ui',
      proxiesFile: './vue-output/chatbot-ui-lib-vue/src/components.ts',
    }) as OutputTargetCustom,
  ],
  testing: {
    browserHeadless: "shell",
  }


};
