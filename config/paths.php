<?php

return [
    'COUNTRY_PATH' => '/config/country.php',
    'TIMEZONE_PATH' => '/config/timezone.php',
    'LANGUAGE_PATH' => '/config/language.php',
    'LANG_PATH' => '/config/lang.php',
    'CONFIG_PATH' => '/config/config.php',
    'MAIL_PATH' => '/config/mail.php',
    'SMS_PATH' => '/config/twilio.php',
    'TEMPLATE_PATH' => '/config/template.php',
    'SERVICE_PATH' => '/config/services.php',
    'SMS_TEMPLATE_PATH' => '/config/sms_template.php',
    'PAGE_PATH' => '/config/page.php',
    'LOGIN_REG_PATH' => '/config/login_registration/index.php',
    'ADMIN_MENU' => base_path() . "/resources/menus/admin/",
    'ADMIN_MENU_SETTINGS' => base_path() . "/storage/app/menus/admin/",
    'ADMIN_MENU_VARIATION' => base_path() . "/resources/menus/admin/variations/",
    'FRONT_MENU' => base_path() . "/resources/menus/",
    'CACHE' => base_path() . "/storage/framework/cache/",
    'CACHE_MEDIA_URL'=> "storage/framework/cache/media/",
	'CACHE_GSPEED_URL' => "storage/framework/cache/page_speed/",
	'MEDIA_PATH' => 'public/media/',
    'GEARS_CONFIG_FILE' => storage_path('app'),
    'tmp_packeges' => "public/packeges/",
    'modules_path' => base_path() ."/app/Modules/",
    'templates_path' => "public/templates",
    'templates_cache' => "resources/views/tplcache/",
    'themes'=> 'resources/themes',
    'email_templates' => 'resources/views/emails',

    'tmp_upl_packages' => "app/Modules/Modules/Uploads/",

    'samples' => "public/resources/samples/",
    'tmp_upload' => "public/resources/tmp/",
    'js' => 'resources/assets/js',
    'css' => 'resources/assets/css',
    'images' => 'resources/assets/images',
    'libs' => 'resources/assets/js',
    'fonts' => 'resources/assets/fonts',
    'editor' => 'resources/assets/js/editor',
    'jquery_main'=> 'resources/assets/js/jquery_main',
    'css_main'=> 'resources/assets/css/css_main',
    'forms' => 'resources/views/forms/',
    'form_cache' => 'resources/views/forms/cache/',
    'widg_path' => "resources/views/widgets/",
    'loginRedirectPath'=>'/admin',
    'extraModulesPath' => "app/ExtraModules",
    'extra_modules'=>base_path()."/app/ExtraModules",
    'modules_upl'=> "app/Modules/Modules/Uploads/",

	'themesPath' => "app/Themes",
	'themes' =>base_path('/app/Themes'),

    'template_path' => 'resources/templates/',
    'unit_path' => '../resources/units/',
    'sections_path' => 'resources'.DS.'sections'.DS,
    'units_uplaod' =>'resources'.DS.'units'.DS,
    'ui_elements_path' => 'resources/uiElements/',
    'ui_elements_uplaod' => storage_path("/Uploads/"),
	'backend_themes'=> 'resources/views/layouts/themes',
	'backend_layouts'=> 'resources/views/ContentLayouts',
	'backend_themes_upl' => "app/Modules/Assets/Uploads/",
	'styles_upl' => "app/Modules/Assets/Uploads/",
	'backend_themes_stub' => "app/Modules/Assets/Stub/layout.stub",
	'backend_themes_settings_stub' => "app/Modules/Assets/Stub/settings.stub",
	'files_path' => 'resources/assets/files/',
    'uploader'=>base_path('public/all-media')
];