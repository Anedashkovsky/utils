import fs = require('fs');
import path = require('path');

const NODE_MODULES = 'node_modules';
const DEAFULT_FILE_NAME = 'excludes';

class ExcludeBuilder {
    /**
     * Module name which need to include
     * @type {Array<string>}
     */
    includedModules: Array<string>;

    /**
     * Path to project for generating excludes
     * @type {string}
     */
    pathToProject: string;

    constructor(pathToProject: string, includedModules: Array<string>) {
        this.pathToProject = path.resolve(pathToProject);

        this.includedModules = includedModules;
    }

    /**
     * Build file with excludes from node_modules
     */
    generateExludes() {
        let directoryNames = this.getDirectories_(this.pathToProject);
        let filteredDirectoryNames = this.filterDirectories_(directoryNames);
        let excludeList = this.createExludeList_(filteredDirectoryNames);
        this.writeFile_(excludeList);
    }

    /**
     * Return list of entries in node modules directory
     * @param {string} pathToProject
     * @return {Array<string>}
     */
    private getDirectories_(pathToProject: string): Array<string> {
        let nodeModulesPath = path.resolve(pathToProject, NODE_MODULES);

        return fs.readdirSync(nodeModulesPath);
    }

    /**
     * Filter directories and return list of directories without includedModules
     * @param {Array<string>} directories
     * @return {Array<string>}
     */
    private filterDirectories_(directories: Array<string>): Array<string> {
        return directories.filter(this.isNotIncludedModule_.bind(this));
    }

    /**
     * Check that given directory is in includedModules
     * @param {string} directory
     * @return {boolean}
     */
    private isNotIncludedModule_(directory: string): boolean {
        var result = !~this.includedModules.findIndex(function(includedModule: string): boolean {
            return includedModule == directory;
        });
        return result;
    }

    /**
     * Build list of directories for writing to file
     * @param {Array<string>} directories
     * @return {Array<string>}
     * @private
     */
    private createExludeList_(directories: Array<string>): Array<string> {
        return directories.map(function(directory: string) {
            return `${NODE_MODULES}/${directory}`;
        }, this);
    }


    /**
     * Write given exludes to file
     * @param {Array<string>} excludes
     * @private
     */
    private writeFile_(excludes: Array<string>, fileName?: string) {
        let actualFileName = fileName ? fileName : DEAFULT_FILE_NAME;
        let filePath = path.resolve(__dirname, '..', actualFileName);
        this.checkIfFileExists_(filePath);

        fs.writeFileSync(filePath, JSON.stringify(excludes, null, 4));
    }


    /**
     * Check is file exists wukt given file name in directory of script entry point
     * @param {string} fileName
     * @private
     */
    private checkIfFileExists_(fileName: string) {
        fs.closeSync(fs.openSync(fileName, 'w'));
    }
}

export default ExcludeBuilder;
