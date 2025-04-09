import { Config } from '@stencil/core';

export const config: Config = {
  namespace: 'chatbot',
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
      componentCorePackage: '@your-org/component-lib',
      directivesProxyFile: '../angular-output/component-lib-angular/src/generated/proxies.ts',
      directivesArrayFile: '../angular-output/component-lib-angular/src/generated/index.ts',
    }) as OutputTargetCustom,

    /** React wrapper */
    reactOutputTarget({
      componentCorePackage: '@your-org/component-lib',
      proxiesFile: '../react-output/component-lib-react/src/components.ts',
    }) as OutputTargetCustom,

    /** Vue wrapper */
    vueOutputTarget({
      componentCorePackage: '@your-org/component-lib',
      proxiesFile: '../vue-output/component-lib-vue/src/components.ts',
    }) as OutputTargetCustom,
  ],
  testing: {
    browserHeadless: "shell",
  }


};
