<?php
/**
 * CLASS PLUGINNAME_Admin
 *
 * Everything that sould be executed on the admin page of WordPress should be
 * part of this file.
 *
 * @package    PLUGINNAME
 * @subpackage PLUGINNAME/admin
 */
class PLUGINNAME_Admin {
  /**
   * Class variables
   */
  protected $plugin_name;
  protected $plugin_version;
  protected $translation_slug;
  protected $admin_page_slug;
  protected $api_namespace;
  protected $options;

  /**
   * Class constructor
   */
  public function __construct($plugin_getter) {
    $this->plugin_name = $plugin_getter->get_plugin_name;
    $this->plugin_version = $plugin_getter->get_plugin_version;
    $this->translation_slug = $plugin_getter->get_translation_slug;
    $this->admin_page_slug = $plugin_getter->get_admin_page_slug;
    $this->api_namespace = $plugin_getter->get_api_namespace;
    $this->options = (array) json_decode(get_option( $plugin_getter->get_options_name ));
  }

  private function is_plugin_page () {
    // only enqueue on plugin page
    // TODO: add better way to catch all future IDs
    return $_GET['page'] == $this->admin_page_slug;
  }

  /**
   * Add an options page under the Settings submenu
   */
  public function add_menu_page() {
    $this->plugin_screen_hook_suffix = add_menu_page(
      __( 'PLUGINNAME Settings', $this->translation_slug ), // page title
      __( 'PLUGINNAME', $this->translation_slug ), // menu
      $this->options['settings_userAccessLevel'],
      $this->admin_page_slug, // url
      array( $this, 'display_settings_page') // page
      //plugin_dir_url(__FILE__) . 'assets/logo-menu.png' // icon
    );
  }

  /**
   * Include the settings page(s) for the plugin
   *
   * Note: as we render a react application, we most likely need only one view file
   */
  public function display_settings_page() {
    include_once 'views/admin-index.php';
  }

  /**
   * Admin Stylesheets
   *
   * Docs: https://developer.wordpress.org/reference/functions/wp_enqueue_style/
   */
  public function enqueue_styles() {
    if($this->is_plugin_page()) {
      wp_enqueue_style(
        $this->plugin_name,
        plugin_dir_url(__FILE__) . 'css/admin.styles.css',
        array(),
        $this->plugin_version,
        'all'
      );
    }
  }

  /**
   * Admin Javascript
   *
   * Docs: https://developer.wordpress.org/reference/functions/wp_enqueue_script/
   */
  public function enqueue_scripts() {
    if($this->is_plugin_page()) {
      wp_enqueue_script(
        $this->plugin_name,
        plugin_dir_url(__FILE__) . 'js/admin.bundled.js',
        array(), // add dependencies, currently not necessary
        $this->plugin_version,
        true // true => in_footer
      );

      // inject some wp specific variables into the admin script, they are
      // available in the wpGlobals object afterwards
      wp_localize_script($this->plugin_name, 'wpGlobals', array(
        'namespace' => $this->api_namespace,
        'nonce' => wp_create_nonce('wp_rest'),
        'root' => esc_url_raw(rest_url()),
      ));
    }

  }

}
