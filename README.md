# React-WordPress-Plugin

[![Build Status](https://travis-ci.org/natterstefan/react-wordpress-plugin.svg?branch=master)](https://travis-ci.org/natterstefan/react-wordpress-plugin)
[![GitHub issues](https://img.shields.io/github/issues/natterstefan/react-wordpress-plugin.svg)](https://github.com/natterstefan/react-wordpress-plugin/issues)
[![Dependencies](https://img.shields.io/david/natterstefan/react-wordpress-plugin.svg)](https://github.com/natterstefan/react-wordpress-plugin/blob/master/package.json)
[![DevDependencies](https://img.shields.io/david/dev/natterstefan/react-wordpress-plugin.svg)](https://github.com/natterstefan/react-wordpress-plugin/blob/master/package.json)
[![Known Vulnerabilities](https://snyk.io/test/github/natterstefan/react-wordpress-plugin/badge.svg)](https://snyk.io/test/github/natterstefan/react-wordpress-plugin)
[![GitHub license](https://img.shields.io/github/license/natterstefan/react-wordpress-plugin.svg)](https://github.com/natterstefan/react-wordpress-plugin/blob/master/LICENCE)

React-WordPress-Plugin is a WordPress Plugin boilerplate with React on both the
admin page and React component rendering on the public page alongside a fully
functionally WordPress plugin.

### Features

This boilerplate plugin provides certain out-of-the-box features for both development
and production:

* :tada: WordPress plugin boilerplate with
  * :arrows_counterclockwise: already built-in [WordPress hooks](https://codex.wordpress.org/Plugin_API/Hooks)
    (eg. activation and deactivation hooks)
  * :twisted_rightwards_arrows: [WordPress REST-API endpoint](https://developer.wordpress.org/rest-api/)
    which is already used by the React App
  * :pencil: plugin options handling with WordPress's [Options API](https://codex.wordpress.org/Options_API)
    (eg. store data in the WordPress database)
  * :page_with_curl: plugin settings page in wp-admin
* :boom: Sample React-App with example components on the plugin settings-page
* :earth_americas: i18n support for both [React](#i18n-translation-in-react)
  and [WordPress](<(#i18n-translation-in-wordpress)>), with sample translation
  \*.pot template file
* :rocket: Webpack, react-intl, ESLint, Stylelint and Prettier and other [awesome
  technologies](#technology-stack)

<!-- TOC -->

## Table of Contents

* [React-WordPress-Plugin](#react-wordpress-plugin)
  * [Requirements](#requirements)
  * [Quickstart](#quickstart)
    * [Debug Mode](#debug-mode)
    * [Troubleshooting](#troubleshooting)
  * [Development](#development)
    * [Introduction and Overview](#introduction-and-overview)
    * [Folder Structure](#folder-structure)
    * [WordPress REST API](#wordpress-rest-api)
    * [Plugin Settings Page](#plugin-settings-page)
    * [i18n Translation in WordPress](#i18n-translation-in-wordpress)
    * [i18n Translation in React](#i18n-translation-in-react)
  * [Deployment](#deployment)
  * [Technology Stack](#technology-stack)
  * [Maintainers](#maintainers)

<!-- /TOC -->

## Requirements

* Install [Node 8.11.1 or greater](https://nodejs.org)
* Install [Yarn](https://yarnpkg.com/en/docs/install) (min. 1.3.2, or
  [npm](https://www.npmjs.com/get-npm) if you prefer)
* Install [Docker](https://www.docker.com/get-docker)

## Quickstart

1.  Install the required modules with `yarn` (or `npm install`),
2.  start the docker containers with `cd docker && docker-compose up`
3.  and finally watch for changes or build the client bundle with `yarn watch`
    or `yarn build`.
4.  Now open http://localhost:8000, set up WordPress and activate the plugin.
5.  Finally you can then see the admin page on http://localhost:8000/wp-admin/admin.php?page=plugin-name

To improve the coding experience and efficiency there are helpful scripts
available, see [package.json](package.json) for more details.

**Additional Notes:**

* Docker has to run in order to develop!
* A docker compose file is provided for local development and testing, see
  [docker/README](docker/README.md).
* Currently you have to rename `PLUGINNAME` and `plugin-name` in the `src` folder
  to match it with your plugin name. We will add a script for this later on.
* You also have to rename all files including `plugin-name`
  (eg. [plugin-name.php](src/wordpress/plugin-name.php))

### Debug Mode

To enable logging in your browser, you have to enter debug mode by running
`localStorage.setItem('debug', '*')` in your browser's console.

### Troubleshooting

* _changes are not visible or plugin is deactivated_: just re-start the docker
  image and the `yarn watch` script

## Development

### Folder Structure

Generally we have put both React and WordPress into their own subfolder for
better maintainability.

```
/src/react << contains React related code (eg. components)
/src/static << contains static files like images for both React and/or WordPress
/src/wordpress << contains WordPress plugin related code (eg. hooks, actions)
```

The current boilerplate setup of WordPress is more "sophisticated". This is the
reason why we will talk more about it's folder structure.

```
admin/ << contains code relevant in wp-admin (eg. settings-page)
includes/ << contains i18n, activator and deactivator, generally speaking helpers and plugin wide classes/features
languages/ << i18n translation files
public/ << contains code relevant for the public site of the WordPress instance
static/ << images and other static assets
plugin-name.php << initialises the Plugin and defines Constants
README.txt << describe the plugin, certain features, FAQ and other details
uninstall.php << will be triggered when the plugin will be uninstalled
```

### WordPress REST API

To interact with the WordPress database React needs to interact with a WordPress
REST API. We have already included an example controller class in this boilerplate.
We followed the guideline and examples in the [WordPress developer documentation](https://developer.wordpress.org/rest-api/extending-the-rest-api/adding-custom-endpoints/).
Please take a look at it to familiarise yourself with the topic. You will need
to create new endpoints or enhance existing ones to enable React to talk with
WordPress and update data.

### Plugin Settings Page

The boilerplate also includes the creation and setup of a wp-admin menu page.
The admin class (see [admin/class-admin.php](src/wordpress/admin/class-admin.php))
takes care of adding a menu page and rendering a DOM node for the React app by
including [views/admin-index.php](src/wordpress/admin/views/admin-index.php).
From there you can develop the React app in [react/admin.js](src/react/admin.js)
and follow React best practices.

### i18n Translation in WordPress

One can easily start translating the WordPress plugin (php-codebase) by first
reading the WordPress [developer documentation](https://developer.wordpress.org/themes/functionality/localization/)
and the [i18n for WordPress Developers](https://codex.wordpress.org/I18n_for_WordPress_Developers)
before following the documentation here: https://wordpress.stackexchange.com/a/258562.

Eventually you will run a command similar to this one to create a pot file:

```
cd wpdev/tools/i18n
php makepot.php wp-plugin ../../../react-wordpress-plugin/src/wordpress/ plugin-name.pot
```

From there you can start translating with our preferred editor [PoEdit](https://poedit.net/download)
(availble for both Mac and Windows) for instance.

### i18n Translation in React

To enable translations in React we use [react-intl](https://github.com/yahoo/react-intl).

#### How to use react-intl

Simply use the following components and methods from react-intl:
[defineMessages()](https://github.com/yahoo/react-intl/wiki/API#definemessages),
[<FormattedMessage\>](https://github.com/yahoo/react-intl/wiki/Components#formattedmessage), and
[<FormattedHTMLMessage\>](https://github.com/yahoo/react-intl/wiki/Components#formattedhtmlmessage)
in your components. Check out the example in the [App](src/components/app/index.js)
component to get started.

#### How to extract and generate json files for each language

Once you have added some translation strings, you can generate the necessary files
to start translating. To create the translation files run either `yarn watch` or
`yarn client`. [babel-plugin-react-intl](https://github.com/yahoo/babel-plugin-react-intl)
will then create the `*.json` files (by extracting the default message descriptors)
for each language and our [i18n webpack plugin](webpack/plugins/i18n.js) will do
the rest (eg. copy it into `dist/static/languages`).

#### How to translate and use translation

All you have to do now is translating the generated \*.json files (see
`/dist/static/languages/*.json`) and putting them back into the static folder
before releasing your plugin.

**Attention:** babel-plugin-react-intl will overwrite the translation files in
`dist/static/languages` everytime it runs. This should be improved in the future,
as [react-intl-translations-manager](https://www.npmjs.com/package/react-intl-translations-manager)
is capable of doing this!

#### Additonal scripts and help

To generate only one default language (currently en) file called `en.json` run
`yarn i18n:generate-default-language` _after_ you built the app with `yarn build`.

Because `yarn build` uses the custom made webpack plugin to create multiple
translation files for multiple languages (see [webpack/common.config.js](webpack/common.config.js)).
With the command above you can overwrite it.

If you need - for whatever reason - to generate a \*.json file from a \*.po
translation file (eg. you want to use it in React as well), we found another
script for you: https://github.com/mikeedwards/po2json (GNU Licence). Install it
and add another script to your package.json similar to

```
po2json -f 'mf' src/wordpress/languages/plugin-name-en.po src/wordpress/languages/plugin-name-en.json
```

Note, you might have to adjust it to fit your individual needs, as currently en
is the default input and output in this example.

## Deployment

If you are ready for production run `yarn build` (or `npm run build`). You can
then upload the entire `dist` folder to the WordPress svn repository of your plugin.

## Technology Stack

There are some technologies and packages we use, which we want to further highlight
here:

| Technology                                        | Description                                                                                                                                                        |
| ------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [React](https://facebook.github.io/react/)        | React is a declarative, efficient, and flexible JavaScript library for building user interfaces.                                                                   |
| [Babel](http://babeljs.io)                        | Babel is a JavaScript transpiler that converts edge JavaScript into plain old ES5 JavaScript that can run in any browser (even the old ones).                      |
| [Webpack](http://webpack.js.org)                  | webpack is a module bundler. Its main purpose is to bundle JavaScript files for usage in a browser, yet it is also capable of transforming, bundling or packaging. |
| [Jest](https://facebook.github.io/jest/)          | Jest is the de facto unit testing framework for ReactJS project.                                                                                                   |
| [Enzyme](https://github.com/airbnb/enzyme)        | JavaScript library for testing React components.                                                                                                                   |
| [ESLint](http://eslint.org/)                      | Linting utility for JavaScript.                                                                                                                                    |
| [Prettier](https://github.com/prettier/prettier)  | Prettier is an opinionated code formatter.                                                                                                                         |
| [react-intl](https://github.com/yahoo/react-intl) | Internationalize React apps.                                                                                                                                       |

## Maintainers

<table>
  <tbody>
    <tr>
      <td align="center">
        <a href="https://github.com/natterstefan">
          <img width="150" height="150" src="https://github.com/natterstefan.png?v=3&s=150">
          </br>
          Stefan Natter
        </a>
      </td>
      <td align="center">
        <a href="https://github.com/lumannnn">
          <img width="150" height="150" src="https://github.com/lumannnn.png?v=3&s=150">
          </br>
          Lukas Ender
        </a>
      </td>
    </tr>
  <tbody>
</table>
