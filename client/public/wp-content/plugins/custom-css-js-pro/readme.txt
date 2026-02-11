=== Simple Custom CSS and JS PRO ===
Created: 06/12/2015
Contributors: diana_burduja
Email: diana@burduja.eu
Tags: CSS, JS, javascript, custom CSS, custom JS, custom style, site css, add style, customize theme, custom code, external css, css3, style, styles, stylesheet, theme, editor, design, admin
Requires at least: 3.0.1
Tested up to: 6.7
Stable tag: 4.39
License: GPLv3
License URI: http://www.gnu.org/licenses/gpl-3.0.html
Requires PHP: 5.6

Easily add Custom CSS or JS to your website with an awesome editor.

== Description ==

Customize your WordPress site's appearance by easily adding custom CSS and JS code without even having to modify your theme or plugin files. This is perfect for adding custom CSS tweaks to your site.

= Features =
* **Text editor** with syntax highlighting
* Print the code **inline** or included into an **external file**
* Print the code in the **header** or the **footer**
* Add CSS or JS to the **frontend** or the **admin side**
* Add as many codes as you want
* Keep your changes also when you change the theme

= Frequently Asked Questions =
* **Can I recover the codes if I previous uninstalled the plugin?**
No, on the `Custom CSS and JS` plugin's uninstall all the added code will be removed. Before uninstalling make sure you don't need the codes anymore.

* **What if I want to add multiple external CSS codes?**
If you write multiple codes of the same type (for example: two external CSS codes), then all of them will be printed one after another

* **Will this plugin affect the loading time?**
When you click the `Save` button the codes will be cached in files, so there are no tedious database queries.

* **Does the plugin modify the code I write in the editor?**
No, the code is printed exactly as in the editor. It is not modified/checked/validated in any way. You take the full responsability for what is written in there.

* **My code doesn't show on the website**
Try one of the following:
1. If you are using any caching plugin (like "W3 Total Cache" or "WP Fastest Cache"), then don't forget to delete the cache before seing the code printed on the website.
2. Make sure the code is in **Published** state (not **Draft** or **in Trash**).
3. Check if the `wp-content/uploads/custom-css-js` folder exists and is writable

* **Does it work with a Multisite Network?**
Yes.

* **What if I change the theme?**
The CSS and JS are independent of the theme and they will persist through a theme change. This is particularly useful if you apply CSS and JS for modifying a plugin's output.

* **Can I use a CSS preprocesor like LESS or Sass?**
No, for the moment only plain CSS is supported.

* **Can I upload images for use with my CSS?**
Yes. You can upload an image to your Media Library, then refer to it by its direct URL from within the CSS stylesheet. For example:
`div#content {
    background-image: url('http://example.com/wp-content/uploads/2015/12/image.jpg');
}`

* **Can I use CSS rules like @import and @font-face?**
Yes.

* **CSS Help.**
If you are just starting with CSS, then here you'll find some resources:
* [codecademy.com - Learn HTML & CSS](https://www.codecademy.com/learn/web)
* [Wordpress.org - Finding Your CSS Styles](https://codex.wordpress.org/Finding_Your_CSS_Styles)

== Installation ==

* From the WP admin panel, click "Plugins" -> "Add new".
* In the browser input box, type "Simple Custom CSS and JS".
* Select the "Simple Custom CSS and JS" plugin and click "Install".
* Activate the plugin.

OR...

* Download the plugin from this page.
* Save the .zip file to a location on your computer.
* Open the WP admin panel, and click "Plugins" -> "Add new".
* Click "upload".. then browse to the .zip file downloaded from this page.
* Click "Install".. and then "Activate plugin".

OR...

* Download the plugin from this page.
* Extract the .zip file to a location on your computer.
* Use either FTP or your hosts cPanel to gain access to your website file directories.
* Browse to the `wp-content/plugins` directory.
* Upload the extracted `custom-css-js-pro` folder to this directory location.
* Open the WP admin panel.. click the "Plugins" page.. and click "Activate" under the newly added "Simple Custom CSS and JS Pro" plugin.

== Frequently Asked Questions ==

* The [HTML Editor Syntax Highlighter](https://wordpress.org/plugins/html-editor-syntax-highlighter/) plugin will make the Beautify and Fullscreen editor buttons not work properly.


== Changelog ==

= 4.39 =
* 11/15/2024
* Fix: add nuance for the "in Block editor" option for websites with WP before v6.6 and after

= 4.38 =
* 09/25/2024
* Feature: add JS/CSS custom codes to the Block editor
* Fix: show the handle for resizing the editor along the height

= 4.37 =
* 05/28/2024
* Fix: filter the allowed custom codes for the page only if there is a valid list of allowed custom codes
* Fix: use the GMT time for showing when a custom code was published or modified
* Tweak: remove the kebab-case rule from the CSS linting
* Tweak: load the SASS preprocessor only when saving SASS custom codes

= 4.36 =
* 02/06/2024
* Tweak: replace the CSSLint library with the https://github.com/stylelint/stylelint library
* Tweak: update the JSHint library

= 4.35 =
* 11/13/2023
* Fix: remove the qTranslate-x warning. The qTranslate-x plugin was removed from wp.org since Aug 2021
* Tweak: update the Bootstrap and jQuery library links

= 4.34 =
* 06/07/2023
* Feature: add the Wikimedia's library for preprocessing the Less code
* Compatibility with the WooCommerce "Custom Order Tables" feature

[See full changelog](https://www.silkypress.com/wp-content/uploads/changelogs/custom-css-js-pro.txt)
