<?php

namespace App\Listeners;

use App\Events\AfterLoginEvent;
use App\Events\AfterLogOutEvent;
use App\Modules\Manage\Models\Emails;

class LogOutListener
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
    public function handle(AfterLogOutEvent $event)
    {
    }

    public function subscribe($events)
    {
        \Subscriber::listen($events);

    }

}