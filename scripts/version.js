import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PLATFORM = process.env.COMPILE_PLATFORM || 'welearn';
const ROOT_DIR = path.resolve(__dirname, '..');
const METADATA_PATH = path.join(ROOT_DIR, 'config/metadata.json');
const PACKAGE_JSON_PATH = path.join(ROOT_DIR, 'package.json');

async function main() {
    try {
        const metadataRaw = fs.readFileSync(METADATA_PATH, 'utf-8');
        const metadata = JSON.parse(metadataRaw);

        const project = metadata.projects[PLATFORM];
        if (!project) {
            console.error(`Project configuration for platform '${PLATFORM}' not found in metadata.`);
            process.exit(1);
        }

        const packageJsonRaw = fs.readFileSync(PACKAGE_JSON_PATH, 'utf-8');
        const packageJson = JSON.parse(packageJsonRaw);

        if (packageJson.version !== project.version) {
            console.log(`Updating package.json version from ${packageJson.version} to ${project.version}`);
            packageJson.version = project.version;

            fs.writeFileSync(PACKAGE_JSON_PATH, JSON.stringify(packageJson, null, 4) + '\n', 'utf-8');
            console.log('package.json updated successfully.');
        } else {
            console.log('package.json version is already up to date.');
        }

    } catch (error) {
        console.error('Error updating version:', error);
        process.exit(1);
    }
}

main();
