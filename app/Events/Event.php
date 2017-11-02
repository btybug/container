<?php

namespace App\Events;

abstract class Event
{
    public $namespace;
    public function __construct()
    {
        $this->namespace=static::class;
    }
}
