<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class ServiceBenefit extends Model
{
    //
    use SoftDeletes;

    protected $fillable = [
        'name',
        'home_service_id',
    ];
}
