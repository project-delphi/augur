import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader'; // eslint-disable-line import/no-extraneous-dependencies

import App from 'modules/app/components/app';
import { initAugur } from 'modules/app/actions/init-augur';
import { updateURL } from 'modules/link/actions/update-url';

import selectors from 'src/selectors';

import store from 'src/store';

import { augur } from 'services/augurjs';

import { IntlProvider, addLocaleData } from 'react-intl';
import en from 'react-intl/locale-data/en';
import es from 'react-intl/locale-data/es';
import zh from 'react-intl/locale-data/zh';
import localeData from './messages.json';

addLocaleData([...en, ...es, ...zh]);

const language = (navigator.languages && navigator.languages[0]) || navigator.language || navigator.userLanguage;
const languageWithoutRegionCode = language.toLowerCase().split(/[_-]+/)[0];
const messages = localeData[languageWithoutRegionCode] || localeData[language] || localeData.en;

require('core-js/fn/array/find');
require('core-js/fn/string/starts-with');

Object.defineProperty(window, 'state', { get: store.getState, enumerable: true });
window.selectors = selectors;
window.App = App;
window.augur = augur;
console.log(`
*******************************************
           DEVELOPMENT MODE
  window.state      -- all state data
  window.selectors  -- component data
  window.augur      -- Augur API methods
*******************************************
`);

store.dispatch(updateURL(window.location.pathname + window.location.search));
store.dispatch(initAugur());

const appElement = document.getElementById('app');

function render(appElement, selectors) {
  ReactDOM.render(
    <Provider store={store}>
      <AppContainer>
        <IntlProvider locale={languageWithoutRegionCode} messages={messages}>
          <App {...selectors} />
        </IntlProvider>
      </AppContainer>
    </Provider>,
    appElement
  );
}
// store.dispatch(MarketsActions.listenToMarkets());

store.subscribe(handleRender);

window.onpopstate = (e) => {
  store.dispatch(updateURL(window.location.pathname + window.location.search));
};

if (module.hot) {
  module.hot.accept();

  module.hot.accept('./modules/app/components/app', () => {
    handleRender();
  });

  module.hot.accept('./modules/app/actions/init-augur');
  module.hot.accept('./modules/link/actions/update-url');
  module.hot.accept('./services/augurjs');
}

function handleRender() {
  let currentSelectors;
  if (process.env.NODE_ENV === 'development') {
    currentSelectors = require('./selectors');
  } else {
    currentSelectors = selectors;
  }
  render(appElement, currentSelectors);
}
