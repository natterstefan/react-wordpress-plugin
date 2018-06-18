// i18n webpack generator plugin
// inspired by
// - https://github.com/yahoo/react-intl/issues/463#issuecomment-228989785
// - https://github.com/webpack-contrib/copy-webpack-plugin/blob/master/src/index.js
const cpx = require('cpx')
const manageTranslations = require('react-intl-translations-manager').default;

function i18nGenerator (src, dest, languages = ['en']) {
  const afterEmit = async (compilation, cb) => {
    try {
      await doTranslate(cb);
      cpx.copy(src, dest)
    } catch (error) {
      console.error('i18nGenerator:', error)
    } finally {
      cb();
    }
  }

  const doTranslate = () => {
    return new Promise(function(resolve, reject) {
      manageTranslations({
        messagesDirectory: './dist-build/messages/', // keep this in sync with .babelrc
        translationsDirectory: './dist-build/locales/',
        languages
      })

      var callback = () => {
          resolve();
      };

      callback();
    });
  }

  const apply = async (compiler) => {
    if (compiler.hooks) {
        const plugin = { name: 'i18nGenerator' };
        compiler.hooks.afterEmit.tapAsync(plugin, afterEmit);
    } else {
        compiler.plugin('after-emit', afterEmit);
    }
  }

  return {
    apply: apply
  };
}

i18nGenerator['default'] = i18nGenerator;
module.exports = i18nGenerator;
