<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class TransactionDetails extends Model
{
    //
    use SoftDeletes;

    protected $fillable = [
        'price',
        'home_service_id',
        'booking_transaction_id',
    ];

    public function bookingTransaction(): BelongsTo
    {
        return $this->belongsTo(Bookingtransaction::class, 'booking_transaction_id');
    }

    public function homeService(): BelongsTo
    {
        return $this->belongsTo(HomeService::class, 'home_service_id');
    }
}
