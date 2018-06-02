# React-WordPress-Plugin

[![GitHub issues](https://img.shields.io/github/issues/natterstefan/react-wordpress-plugin.svg)](https://github.com/natterstefan/react-wordpress-plugin/issues)
[![Dependencies](https://img.shields.io/david/natterstefan/react-wordpress-plugin.svg)](https://github.com/natterstefan/react-wordpress-plugin/blob/master/package.json)
[![DevDependencies](https://img.shields.io/david/dev/natterstefan/react-wordpress-plugin.svg)](https://github.com/natterstefan/react-wordpress-plugin/blob/master/package.json)
[![Known Vulnerabilities](https://snyk.io/test/github/natterstefan/react-wordpress-plugin/badge.svg)](https://snyk.io/test/github/natterstefan/react-wordpress-plugin)
[![GitHub license](https://img.shields.io/github/license/natterstefan/react-wordpress-plugin.svg)](https://github.com/natterstefan/react-wordpress-plugin/blob/master/LICENCE)

React-WordPress-Plugin enables you to use React on your admin-page
and on the public-page alongside a fully functionally WordPress plugin.

<!-- TOC -->

* [React-WordPress-Plugin](#react-wordpress-plugin)
  * [Requirements](#requirements)
  * [Usage & Development](#usage--development)
    * [Debug Mode](#debug-mode)
    * [Troubleshooting](#troubleshooting)
  * [Development Quickstart](#development-quickstart)
    * [Introduction and Overview](#introduction-and-overview)
    * [Folder Structure](#folder-structure)
    * [WordPress REST API](#wordpress-rest-api)
    * [Plugin Settings Page](#plugin-settings-page)
    * [i18n Translation](#i18n-translation)
  * [Deployment Quickstart](#deployment-quickstart)
  * [Technology Stack](#technology-stack)
  * [Maintainers](#maintainers)

<!-- /TOC -->

## Requirements

* Install [Node 8.11.1 or greater](https://nodejs.org)
* Install [Yarn](https://yarnpkg.com/en/docs/install) (Or npm if you prefer)
* Install [Docker](https://www.docker.com/get-docker)

## Usage & Development

* Install required modules: `yarn` (or `npm install`)

To start coding there are certain scripts available, see [package.json](package.json)
for more details. Anyways, start coding by doing this:

* Build development version and watch for changes: `yarn watch` (or `npm run watch`)
* A docker compose file is provided for local development and testing, see
  [docker/README](docker/README.md). Docker has to run in order to develop.
* Then open http://localhost:8000, set up WordPress and activate the plugin.
* You can then see the admin page on http://localhost:8000/wp-admin/admin.php?page=plugin-name

**Additional Notes:**

* Docker has to run in order to develop!
* Currently you have to rename `PLUGINNAME` and `plugin-name` in the `src` folder
  to match it with your plugin name. We will add a script for this later on.
* You also have to rename all files including `plugin-name`
  (eg. [plugin-name.php](src/wordpress/plugin-name.php))

### Debug Mode

To enable logging in your browser, you have to enter debug mode by running
`localStorage.setItem('debug', '*')` in your browser's console.

### Troubleshooting

* _changes are not visible or plugin is deactivated_: just re-start the docker image
  and the `yarn watch` script

## Development Quickstart

### Introduction and Overview

This boilerplate plugin provides certain out-of-the-box features for both development
and plugin usage already:

* WordPress plugin boilerplate with some already built-in hooks (eg. activation
  and deactivation)
* i18n support with sample translation \*.pot template file
* Simple WordPress plugin options handling (eg. minimum required permissons for
  accessing the settings page)
* Settings page in the backend (wp-admin)
* Simple React-App with an example component
* Simple WordPress REST-API endpoint which is already used by the React App
* Webpack Bundling (with babel)
* ESLint, Stylelint and Prettier support

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

### i18n Translation

One can easily start translating the plugin (php-codebase) by first reading the
WordPress [developer documentation](https://developer.wordpress.org/themes/functionality/localization/)
and the [i18n for WordPress Developers](https://codex.wordpress.org/I18n_for_WordPress_Developers)
before following the documentation here: https://wordpress.stackexchange.com/a/258562.

Eventually you will run a command similar to:

```
cd wpdev/tools/i18n
php makepot.php wp-plugin ../../../react-wordpress-plugin/src/wordpress/ plugin-name.pot
```

Our preferred editor is PoEdit (availble for both Mac and Windows: https://poedit.net/download).

## Deployment Quickstart

If you are ready for production run `yarn build` (or `npm run build`). You can
then upload the entire `dist` folder to the WordPress svn repository of your plugin.

## Technology Stack

There are some technologies we use, which we want to highlight here:

| Technology                                       | Description                                                                                                                                                        |
| ------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [React](https://facebook.github.io/react/)       | React is a declarative, efficient, and flexible JavaScript library for building user interfaces.                                                                   |
| [Babel](http://babeljs.io)                       | Babel is a JavaScript transpiler that converts edge JavaScript into plain old ES5 JavaScript that can run in any browser (even the old ones).                      |
| [Webpack](http://webpack.js.org)                 | webpack is a module bundler. Its main purpose is to bundle JavaScript files for usage in a browser, yet it is also capable of transforming, bundling or packaging. |
| [Jest](https://facebook.github.io/jest/)         | Jest is the de facto unit testing framework for ReactJS project.                                                                                                   |
| [Enzyme](https://github.com/airbnb/enzyme)       | JavaScript library for testing React components.                                                                                                                   |
| [ESLint](http://eslint.org/)                     | Linting utility for JavaScript.                                                                                                                                    |
| [Prettier](https://github.com/prettier/prettier) | Prettier is an opinionated code formatter.                                                                                                                         |

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
