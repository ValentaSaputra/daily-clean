<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ServiceTestimonial extends Model
{
    //
    use SoftDeletes;

    protected $fillable = [
        'name',
        'message',
        'photo',
        'home_service_id',
    ];

    public function homeService(): BelongsTo
    {
        return $this->belongsTo(HomeService::class, 'home_service_id');
    }
}
