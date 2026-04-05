Module system
common js / ES6
require function ->it takes argument and return value
module.exports
module object
module.paths
module wrapper function

ES6
Accessing filename and directory name in ES6
import.meta

Why different module system ?
Difference b/w common and es6 module ?
common js - synchronously load

Different types of modules
-core modules = fs
-npm modules = axios
-user modules

Npm modules
custom package - node_modules/maths/index.js
import {num} from 'maths;

understanding package.json
scripts
dependencies

package-lock.json
axios:^1.1.0
Major minor patch
^ -> minor and patch update increase not major update
axios:1.1.0 -> install the exact version in node_modules
~ -> patch update
* -> latest version

Dev dependencies

Shebang
cli vs library packges

npx = searches for a file and executes it
only install executable packages - vite ,hello,typescript,create-react-app (CLI packages)

install packages in npm_cache

Run a Node package without installing it globally