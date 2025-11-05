import type { ExternalPluginConfig } from '@windy/interfaces';

const config: ExternalPluginConfig = {
    name: 'windy-plugin-dew-detector',
    version: '0.0.1',
    title: 'Dew Detector',
    icon: '⛰️',
    description: 'Forcast the chances of dew formation based on my model.',
    author: 'Matteo Limauge',
    repository: 'https://github.com/malimaug/DewDetector',
    desktopUI: 'rhpane',
    mobileUI: 'fullscreen',
    routerPath: '/dew-detector',
    desktopWidth: 800,
};

export default config;
