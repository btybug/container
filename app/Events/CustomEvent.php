<?php
/**
 * Created by PhpStorm.
 * User: menq
 * Date: 6/27/17
 * Time: 9:49 PM
 */

namespace App\Events;


use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Queue\SerializesModels;

class CustomEvent
{
    use InteractsWithSockets, SerializesModels;

    /**
     * Create a new event instance.
     *
     * @return void
     */
    public function __construct()
    {

    }

    public static function listen($event)
    {

    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return Channel|array
     */
    public function broadcastOn()
    {
        return new PrivateChannel('form_submited');
    }
}