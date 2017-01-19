<?php
/**
 * Plugin Name: In-line Expert Peer Review Plugin
 * Plugin URI:
 * Description: A simple plugin that adds a custom button to the tinyMCE editor to simplify in-line expert peer review for academic blogging.
 * Version: 0.2.0
 * Author: Scott Kobner
 * Author URI:
 * License: GNU GPLv3
 *
 **/

function mytheme_enqueue_style() {
    wp_enqueue_style('inline_style', plugins_url('inline-style.css' , __FILE__));
}
add_action('wp_enqueue_scripts', 'mytheme_enqueue_style');

function inline_tinymce_main() {
    global $typenow;

    $wrong_editor = get_user_option('rich_editing') !== 'true';
    $wrong_privileges = (!current_user_can('edit_posts') && !current_user_can('edit_pages'));
    $wrong_type = !in_array($typenow, array('post', 'page'));

    if ($wrong_editor || $wrong_privileges || $wrong_type) return;

    add_filter('mce_external_plugins', 'inline_tinymce_add_tinymce_plugin');
    add_filter('mce_buttons_3', 'inline_tinymce_register_buttons');
}
add_action('admin_head', 'inline_tinymce_main');

function inline_tinymce_add_tinymce_plugin($plugin_array) {
    $plugin_array['inline_tinymce_plugin'] = plugins_url('/inline-plugin.js', __FILE__);
    return $plugin_array;
}

function inline_tinymce_register_buttons($buttons) {
    $buttons[] = 'inline_tinymce_button';
    return $buttons;
}
