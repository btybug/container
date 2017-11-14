<?php



     function getStatus()
    {
        $output = array(
            'composer' => file_exists(__DIR__ . '/../../../composer.phar'),
            'composer_extracted' => file_exists(__DIR__ . '/../../../composer/extracted'),
            'installer' => file_exists(__DIR__ . '/../../../installer.php'),
        );
        header('Content-Type: application/json');
        echo json_encode($output);

    }

     function getMain($request)
    {
        $function = $request['function'];
        return call_user_func_array($function, $request);
    }

     function downloadComposer()
    {
        $installerURL = 'https://getcomposer.org/installer';
        $installerFile = __DIR__ . '/../../../installer.php';
        putenv('COMPOSER_HOME=' . __DIR__ . '/../../../composer/extracted/bin/composer');
        if (!file_exists($installerFile)) {

            echo 'Downloading ' . $installerURL . PHP_EOL;
            flush();
            $ch = curl_init($installerURL);
            curl_setopt($ch, CURLOPT_CAINFO, __DIR__ . '/../../../composer/cacert.pem');
            curl_setopt($ch, CURLOPT_FOLLOWLOCATION, TRUE);
            curl_setopt($ch, CURLOPT_FILE, fopen($installerFile, 'w+'));
            if (curl_exec($ch)) {

                return 'Success downloading ' . $installerURL . PHP_EOL;

            } else {
                return 'Error downloading ' . $installerURL . PHP_EOL;
            }
            flush();
        }
        echo 'Installer found : ' . $installerFile . PHP_EOL . '\r\n' . 'Starting installation...' . PHP_EOL;
        flush();
        $argv = array();
        include $installerFile;
        flush();
    }

     function command()
    {
        $path=__DIR__.'/../../../../../';
        command:
        set_time_limit(-1);
        ini_set('memory_limit', '2048M');
        putenv('COMPOSER_HOME=' . __DIR__ . '/../../../extracted/bin/composer');
        if (!file_exists($path)) {

            echo $_POST['path'];
            die();
        }
        if (file_exists(__DIR__ . '/../../../composer/extracted')) {
            require_once(__DIR__ . '/../../../composer/extracted/extracted/vendor/autoload.php');
            $input = new \Symfony\Component\Console\Input\StringInput('install -vvv -d ' . $path);
            $output = new \Symfony\Component\Console\Output\StreamOutput(fopen('php://output', 'w'));
            $app = new \Composer\Console\Application();
            $app->run($input, $output);
        } else {
            echo 'Composer not extracted.';
            $this->extractComposer();
            goto command;
        }
    }
if($_POST) {
    getMain($_POST);die;
}
