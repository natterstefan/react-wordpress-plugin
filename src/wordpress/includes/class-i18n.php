<?php
/**
 * CLASS PLUGINNAME_i18n
 *
 * Initilises the internationalization functionality
 *
 * Docs:
 * - https://developer.wordpress.org/themes/functionality/localization/
 * - https://codex.wordpress.org/I18n_for_WordPress_Developers
 *
 * How to translate and generate *.pot file
 * - https://blog.templatetoaster.com/translate-wordpress-themes-plugins/
 * - https://wordpress.stackexchange.com/questions/149212/how-to-create-pot-files-with-poedit
 *   - use wpdev to extract and create *.pot file: https://wordpress.stackexchange.com/a/258562
 *
 * Apps
 * - Windows: http://www.eazypo.ca/download.html
 * - Windows/Mac: https://poedit.net/download
 *
 * @package    PLUGINNAME
 * @subpackage PLUGINNAME/includes
 */

class PLUGINNAME_i18n {
  /**
   * Class variables
   */
  protected $translation_slug;

  /**
   * Class constructor
   */
  public function __construct($translation_slug) {
    $this->translation_slug = $translation_slug;
  }

  /**
   * Load the translation file
   */
  public function load_plugin_textdomain() {
    load_plugin_textdomain(
      $this->translation_slug,
      false,
      dirname(dirname(plugin_basename(__FILE__))) . '/languages/'
    );
  }
}
