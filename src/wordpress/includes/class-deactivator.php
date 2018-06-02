<?php
/**
 * CLASS PLUGINNAME_Deactivator
 *
 * This class handles all logic necessary during the deactivation of the plugin.
 *
 * @package    PLUGINNAME
 * @subpackage PLUGINNAME/includes
 */
class PLUGINNAME_Deactivator {
  public static function deactivate() {
    // do something here, but consider using uninstall.php if user removes plugin
    // eg. update the last installed plugin version
    $options = (array) json_decode(get_option(PLUGINNAME_OPTIONS_NAME));
    $options['plugin_lastVersion'] = PLUGINNAME_VERSION;
    update_option(PLUGINNAME_OPTIONS_NAME, json_encode($options));
  }
}
