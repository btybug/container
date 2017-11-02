<?php

namespace App\Listeners;

use App\Events\AfterLoginEvent;
use App\Modules\Manage\Models\Emails;

class LoginListener
{
    /**
     * Handle user login events.
     */
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
    public function handle(AfterLoginEvent $event)
    {
    }

    public function subscribe($events)
    {
        \Subscriber::listen($events);

    }

}