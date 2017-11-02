<?php

namespace App\Events;

use App\User;
use Illuminate\Queue\SerializesModels;


class CustomFormSubmittedEvent extends Event
{
    use SerializesModels;
    public $model;
    public $form_id;


    public function __construct($form_id)
    {

        $this->form_id = $form_id;
        $this->model   = User::orderBy('created_at', 'desc')->first();

    }

    /**
     * Get the channels the event should be broadcast on.
     *
     * @return array
     */
    public function broadcastOn()
    {
        return [];
    }
}
