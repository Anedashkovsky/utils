import ExcludeBuider from './excludeBuilder/excludeBuilder'

function start() {
    let path = process.argv.slice(2)[0];
    
    let excludeBuilder = new ExcludeBuider(path, ['clobl', 'google-closure-library', 'lodash']);
    excludeBuilder.generateExludes();
}

(module).exports = start;

if (!(module.parent)) {
    (module).exports();
}
