<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Queue\SerializesModels;

class PageCreateEvent extends Event
{
    use InteractsWithSockets, SerializesModels;
    public $page;

    /**
     * Create a new event instance.
     *
     * @return void
     */
    public function __construct($page, $entry)
    {
        $this->page = $page;
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
        return new PrivateChannel('page_created');
    }
}
