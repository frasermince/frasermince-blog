'use strict';

exports.createPages = require('./gatsby/create-pages');
exports.onCreateNode = require('./gatsby/on-create-node');

exports.onCreateWebpackConfig = ({ stage, loaders, actions }) => {
    if (stage === `build-html`) {
      actions.setWebpackConfig({
        module: {
          rules: [
            {
              test: /plotly/,
              use: loaders.null(),
            },
          ],
        },
      })
    }
  }