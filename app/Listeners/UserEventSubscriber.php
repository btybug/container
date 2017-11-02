<?php

namespace App\Listeners;

use App\Events\AfterLoginEvent;
use App\Events\AfterLogOutEvent;
use App\Modules\Manage\Models\Emails;

class UserEventSubscriber
{
    /**
     * Handle user login events.
     */
    public function onUserLogin($event)
    {
       event(new AfterLoginEvent($event));
    }

    /**
     * Handle user logout events.
     */
    public function onUserLogout($event)
    {
        event(new AfterLogOutEvent($event));


    }

    public function onUserRegisred($event)
    {

    }

    /**
     * Register the listeners for the subscriber.
     *
     * @param  Illuminate\Events\Dispatcher $events
     */
    public function subscribe($events)
    {
        $events->listen(
            'Illuminate\Auth\Events\Login',
            'App\Listeners\UserEventSubscriber@onUserLogin'
        );
        $events->listen(
            'Illuminate\Auth\Events\Registred',
            'App\Listeners\UserEventSubscriber@onUserRegisred'
        );

        $events->listen(
            'Illuminate\Auth\Events\Logout',
            'App\Listeners\UserEventSubscriber@onUserLogout'
        );
    }

}