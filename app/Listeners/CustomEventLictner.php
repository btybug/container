<?php
/**
 * Created by PhpStorm.
 * User: menq
 * Date: 6/27/17
 * Time: 10:11 PM
 */

namespace App\Listeners;


use App\Events\CustomEvent;

class CustomEventLictner
{
    public function __construct()
    {
        //
    }

    public function onFormSubmited($event)
    {

    }

    /**
     * Handle the event.
     *
     * @param  FormSubmit $event
     * @return void
     */
    public function handle(CustomEvent $event)
    {
    }

    public function subscribe($events)
    {
        \Subscriber::listen($events);

    }
}