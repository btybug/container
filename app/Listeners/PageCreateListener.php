<?php

namespace App\Listeners;

use App\Events\PageCreateEvent;

class PageCreateListener
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

    public function onPageCreated($event)
    {

    }

    /**
     * Handle the event.
     *
     * @param  FormSubmit $event
     * @return void
     */
    public function handle(PageCreateEvent $event)
    {
    }

    public function subscribe($events)
    {
        \Subscriber::listen($events);

    }
}
