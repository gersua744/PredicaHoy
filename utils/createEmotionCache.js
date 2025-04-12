"use strict";

const createCache = require('@emotion/cache').default;

function createEmotionCache() {
  return createCache({ key: 'css', prepend: true });
}

module.exports = createEmotionCache;
