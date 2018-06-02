<?php
/**
 * PLUGINNAME
 *
 * @link              http://example.com
 * @package           PLUGINNAME
 *
 * Plugin Name:       plugin-name
 * Plugin URI:        https://example.com
 * Description:       Description shown in the WordPress admin area.
 * Version:           0.0.1
 * Author:            Your Name
 * Author URI:        https://example.com
 * License:           MIT
 * License URI:       https://opensource.org/licenses/MIT
 * Text Domain:       plugin-name
 * Domain Path:       /languages
 */

// If this file is called directly, abort.
if (!defined( 'WPINC')) {
  die;
}

/**
 * CONSTANTS
 * Add plugin constants here, but consider to not overdo it with too many of them.
 */
define('PLUGINNAME_NAME', 'plugin-name');
define('PLUGINNAME_VERSION', '0.0.1');
define('PLUGINNAME_TRANSLATION_SLUG', 'plugin-name'); // do not forget to rename the file in languages as well!
define('PLUGINNAME_ADMIN_PAGE_SLUG', 'plugin-name');
define('PLUGINNAME_OPTIONS_NAME', 'plugin-name_options');
define('PLUGINNAME_API_NAMESPACE', 'plugin-name/v1');

class PLUGINNAME_Startup {
  /**
   * The ACTIVATE Class code runs when the plugin is activated in the wp-admin.
   * Keep in mind, that it will run with every activation (even during updates)
   * Docs: https://codex.wordpress.org/Function_Reference/register_activation_hook
   */
  public static function activate() {
    require_once plugin_dir_path( __FILE__ ) . 'includes/class-activator.php';
    PLUGINNAME_Activator::activate();
  }

  /**
   * The DEACTIVATE Class code runs when the plugin is deactivated in the wp-admin.
   * Docs: https://codex.wordpress.org/Function_Reference/register_deactivation_hook
   */
  public static function deactivate() {
    require_once plugin_dir_path( __FILE__ ) . 'includes/class-deactivator.php';
    PLUGINNAME_Deactivator::deactivate();
  }

  /**
   * INITIALISES the plugin
   */
  public static function init() {
    // register main hooks (eg. activation, deactivation or uninstall) here
    register_activation_hook( __FILE__, array('PLUGINNAME_Startup', 'activate') );
    register_deactivation_hook( __FILE__, array('PLUGINNAME_Startup', 'deactivate') );

    /**
     * class-plugin contains the core logic and registers public and admin-specific
     * hooks. It also initialises i18n and can be extended to add shortcodes and
     * other actions and hooks.
     */
    require plugin_dir_path( __FILE__ ) . 'includes/class-plugin.php';
    $plugin = new PLUGINNAME();
    $plugin->run();
  }
}

/**
 * Let's initialise the plugin :)
 */
PLUGINNAME_Startup::init();
