<?php
/**
 * CLASS PLUGINNAME
 *
 * A class that initialises both the admin and public part of the plugin. It
 * should contain hooks, actions and other activation methods the plugin requires.
 *
 * It for example initialises the PLUGINNAME_Admin class and passes the plugin
 * name and other definitions to it. You can either use CONSTANTS (see ./plugin-name.php)
 * or define them here before initialising a class. New definitions should be
 * made here (expect for CONSTANTS)
 *
 * @package    PLUGINNAME
 * @subpackage PLUGINNAME/includes
 */
class PLUGINNAME {

  /**
   * Maintains and registers all hooks for the plugin.
   */
  protected $hooks;

  /**
   * Class variables
   */
  protected $plugin_name;
  protected $plugin_version;
  protected $translation_slug;
  protected $api_namespace;
  protected $options_name;
  protected $admin_page_slug;

  /**
   * Class constructor
   */
  public function __construct() {
    $this->plugin_name = PLUGINNAME_NAME;
    $this->plugin_version = PLUGINNAME_VERSION;
    $this->translation_slug = PLUGINNAME_TRANSLATION_SLUG;
    $this->api_namespace = PLUGINNAME_API_NAMESPACE;
    $this->options_name = PLUGINNAME_OPTIONS_NAME;
    $this->admin_page_slug = PLUGINNAME_ADMIN_PAGE_SLUG;
  }

  /**
   * Load all required dependencies (eg. other classes). This includes the following
   * files which contain the basic (bootstraped) logic:
   *
   * - PLUGINNAME_Hooks: handles the registration of all hooks (actions, filters)
   * - PLUGINNAME_i18n: Defines internationalization functionality.
   * - PLUGINNAME_Admin: code for the page in the wp-admin interface
   * - PLUGINNAME_Public: code for the public site of the wordpress instance
   */
  private function load_dependencies() {
    /**
     * "BEHIND THE SCENCE" CLASSES
     * Note: usually the admin and public do not directly use them, they are
     * necessary for the plugin (eg. i18n)
     */
    require_once plugin_dir_path( dirname( __FILE__ ) ) . 'includes/class-i18n.php';

    /* ADMIN */
    require_once plugin_dir_path( dirname( __FILE__ ) ) . 'admin/class-admin.php';
    require_once plugin_dir_path( dirname( __FILE__ ) ) . 'admin/class-api.php';

    /* PUBLIC */
    require_once plugin_dir_path( dirname( __FILE__ ) ) . 'public/class-public.php';
  }

  /**
   * PLUGINNAME_i18n is responsible for the internationalization
   */
  private function load_localization() {
    $plugin_i18n = new PLUGINNAME_i18n($this->getter()->get_translation_slug);
    add_action('plugins_loaded', array($plugin_i18n, 'load_plugin_textdomain'));
  }

  /**
   * load ADMIN features
   */
  private function load_admin() {
    // initialse admin classes here and add them accordingly below
    $PluginAdmin = new PLUGINNAME_Admin($this->getter());
    $PluginApi = new PLUGINNAME_Rest_Api($this->getter());

    // load scripts and stylesheets
    add_action('admin_enqueue_scripts', array($PluginAdmin, 'enqueue_styles'));
    add_action('admin_enqueue_scripts', array($PluginAdmin, 'enqueue_scripts'));

    // Admin API
    add_action('rest_api_init', array($PluginApi, 'register_routes'));

    // Admin Page
    add_action('admin_menu', array($PluginAdmin, 'add_menu_page'));
  }

  /**
   * load PUBLIC features
   */
  private function load_public() {
    // initialse public classes here and add them accordingly below
    $PluginPublic = new PLUGINNAME_Public($this->getter());

    // load scripts and stylesheets
    add_action('wp_enqueue_scripts', array($PluginPublic, 'enqueue_styles'));
    add_action('wp_enqueue_scripts', array($PluginPublic, 'enqueue_scripts'));

    // NOTE:
    // - adding eg. shortcodes or other public features/hooks would happen here
  }

  /**
   * Load all dependencies which will eventuall start the plugin
   */
  public function run() {
    $this->load_dependencies();
    $this->load_localization();
    $this->load_admin();
    $this->load_public();
  }

  /**
   * Public GETTER
   *
   * NOTE: do not use the magic getter function of php
   * --> https://stackoverflow.com/a/8955492/1238150
   */
  public function getter () {
    return (object)[
      get_plugin_name => $this->plugin_name,
      get_plugin_version => $this->plugin_version,
      get_translation_slug => $this->translation_slug,
      get_admin_page_slug => $this->admin_page_slug,
      get_api_namespace => $this->api_namespace,
      get_options_name => $this->options_name
    ];
  }
}
