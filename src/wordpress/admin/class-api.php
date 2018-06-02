<?php
/**
 * CLASS PLUGINNAME_Rest_Api
 *
 * inspired by
 * - https://deliciousbrains.com/develop-wordpress-plugin-webpack-react-rest-api-part-2/
 * - https://github.com/deliciousbrains/wp-react-boilerplate/blob/master/server/wprb-rest-server.php
 *
 * Docs
 * - Routes
 *   - https://developer.wordpress.org/rest-api/extending-the-rest-api/adding-custom-endpoints/
 * - Authentication Example w/ _wpnonce or X-WP-Nonce header
 *   - https://www.cloudways.com/blog/setup-basic-authentication-in-wordpress-rest-api/
 * - js examples
 *   - https://gist.github.com/beardedtim/b4aa5763bbe220dc29d6ae0c2e5aaeb9
 *   - https://apppresser.com/wp-api-post-submission/
 *
 * Client
 * - consider using: http://wp-api.org/node-wpapi/using-the-client/
 */
class PLUGINNAME_Rest_Api extends WP_Rest_Controller {
  /**
   * Class variables
   */
  protected $plugin_name;
  protected $plugin_version;
  protected $translation_slug;
  protected $version;
  protected $api_namespace;
  protected $options;

  /**
   * Class constructor
   */
  public function __construct($plugin_getter) {
    $this->plugin_name = $plugin_getter->get_plugin_name;
    $this->plugin_version = $plugin_getter->get_plugin_version;
    $this->translation_slug = $plugin_getter->get_translation_slug;
    $this->api_namespace = $plugin_getter->get_api_namespace;
    $this->options = (array) json_decode(get_option( $plugin_getter->get_options_name ));
  }

  public function register_routes() {
    register_rest_route( $this->api_namespace, '/options', array(
      array(
        'methods'  => WP_REST_Server::READABLE,
        'callback' => array( $this, 'get_options' ),
        'permission_callback' => array( $this, 'get_options_permission' )
      ),
    ) );
  }

  public function get_options( WP_REST_Request $request ) {
    $result = (object) [
      data => [
        asset_path => plugin_dir_url( dirname(__FILE__) ) . 'static',
        name => $this->plugin_name,
        options => $this->options,
        translation_slug => $this->translation_slug,
        version => $this->plugin_version
      ]
    ];

    return $result;
  }

  public function get_options_permission() {
    $permissions = $this->options[settings_userAccessLevel];
    if (!current_user_can($permissions)) {
      return new WP_Error(
        'rest_forbidden',
        esc_html__('You do not have permissions to access this endpoint.', $this->translation_slug),
        array('status' => 401)
      );
    }

    return true;
  }

}
