// See all configuration options: https://remotion.dev/docs/config
// Each option also is available as a CLI flag: https://remotion.dev/docs/cli

// Note: When using the Node.JS APIs, the config file doesn't apply. Instead, pass options directly to the APIs

import { Config } from "@remotion/cli/config";
import { enableTailwind } from '@remotion/tailwind-v4';

Config.setVideoImageFormat("jpeg");
Config.setOverwriteOutput(true);
Config.overrideWebpackConfig(enableTailwind);

// Add webpack configuration for raw YAML imports
Config.overrideWebpackConfig((currentConfiguration) => {
  return {
    ...currentConfiguration,
    module: {
      ...currentConfiguration.module,
      rules: [
        ...(currentConfiguration.module?.rules ?? []),
        {
          test: /\.ya?ml(\?raw)?$/,
          type: 'asset/source',
        },
      ],
    },
    resolve: {
      ...currentConfiguration.resolve,
      fallback: {
        ...currentConfiguration.resolve?.fallback,
        // Ignore Node.js core modules in browser build
        fs: false,
        path: false,
      },
    },
  };
});
