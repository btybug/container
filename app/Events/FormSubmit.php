<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Queue\SerializesModels;

class FormSubmit extends Event
{
    use InteractsWithSockets, SerializesModels;
    public $user;
    public $form;

    /**
     * Create a new event instance.
     *
     * @return void
     */
    public function __construct($user, $form, $entry)
    {
        $this->user = $user;
        $this->form = $form;
        $this->entry = $entry;
        parent::__construct();

    }

    public static function listen($event)
    {
        dd('listen', $event);
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
