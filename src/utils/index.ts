// Utils Barrel Export
export * from './logger';
export * from './polyfill';
export * from './setting';

// Utility functions
export async function sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}
