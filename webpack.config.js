const path = require('path');

module.exports = {
    entry: './src/app.js',
    output: {
        filename: 'build.js',
        path: path.resolve(__dirname)
    }
};
