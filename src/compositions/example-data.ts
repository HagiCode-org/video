// Example data for Hagicode Update Bulletin video
// Data is loaded from YAML files in the public/data directory

import { loadYamlWebpackInline } from '../utils/yaml-loader';
import type { UpdateBulletinData } from './schema';

// Webpack's ?raw suffix imports the file content as a string
// This bundles the YAML content into the JavaScript at build time
import maximumDataYaml from '../../public/data/update-bulletin/maximum-data.yaml?raw';
import exampleDataYaml from '../../public/data/update-bulletin/example-data.yaml?raw';
import minimalDataYaml from '../../public/data/update-bulletin/minimal-data.yaml?raw';

// Default data for HagicodeUpdateBulletin composition
// This uses the maximum data set with real PCode Platform update information
// Data is loaded from maximum-data.yaml file at build time
export const defaultData: UpdateBulletinData = loadYamlWebpackInline(
  'update-bulletin/maximum-data.yaml',
  maximumDataYaml as string
);

// Example update bulletin data (uses example-data.yaml)
export const exampleData: UpdateBulletinData = loadYamlWebpackInline(
  'update-bulletin/example-data.yaml',
  exampleDataYaml as string
);

// Minimal example data for testing (uses minimal-data.yaml)
export const minimalData: UpdateBulletinData = loadYamlWebpackInline(
  'update-bulletin/minimal-data.yaml',
  minimalDataYaml as string
);

// Maximum example data for testing limits (alias for defaultData)
// Reads directly from maximum-data.yaml file
export const maximumData: UpdateBulletinData = loadYamlWebpackInline(
  'update-bulletin/maximum-data.yaml',
  maximumDataYaml as string
);
