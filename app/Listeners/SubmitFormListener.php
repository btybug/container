<?php

namespace App\Listeners;

use App\Events\FormSubmit;

class SubmitFormListener
{
    /**
     * Create the event listener.
     *
     * @return void
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
    public function handle(FormSubmit $event)
    {
    }

    public function subscribe($events)
    {
        \Subscriber::listen($events);

    }
}
