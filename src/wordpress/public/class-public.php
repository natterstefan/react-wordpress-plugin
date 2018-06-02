<?php
/**
 * CLASS PLUGINNAME_Public
 *
 * Everything that sould be executed on the public page of WordPress should be
 * part of this file.
 *
 * @package    PLUGINNAME
 * @subpackage PLUGINNAME/public
 */

class PLUGINNAME_Public {
  /**
   * Class variables
   */
  protected $plugin_name;
  protected $plugin_version;

  /**
   * Class constructor
   */
  public function __construct($plugin_getter) {
    $this->plugin_name = $plugin_getter->get_plugin_name;
    $this->plugin_version = $plugin_getter->get_plugin_version;
  }

  /**
   * Public Stylesheets
   *
   * Docs: https://developer.wordpress.org/reference/functions/wp_enqueue_style/
   *
   * Note: this function is loaded in class-plugin.php (core file of the plugin)
   * and new public hooks should be initialised/added there and _not_ in this file.
   * This ensures a consistent way of adding new features and maintainability.
   */
  public function enqueue_styles() {
    wp_enqueue_style($this->plugin_name, plugin_dir_url(__FILE__) . 'css/public.styles.css', array(), $this->plugin_version, 'all');
  }

  /**
   * Public Javascript
   *
   * Docs: https://developer.wordpress.org/reference/functions/wp_enqueue_script/
   */
  public function enqueue_scripts() {
    wp_enqueue_script($this->plugin_name, plugin_dir_url(__FILE__) . 'js/public.bundled.js', array(), $this->plugin_version, false);
  }
}
