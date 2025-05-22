<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Str;

class HomeService extends Model
{
    //
    use SoftDeletes;

    protected $fillable = [
        'name',
        'slug',
        'thumbnail',
        'about',
        'price',
        'category_id',
        'is_popular',
        'duration',
    ];

    public function setNameAttribute($value)
    {
        $this->attributes['name'] = $value;
        $this->attributes['slug'] = Str::slug($value);
    }

    public function benefits(): HasMany
    {
        return $this->hasMany(ServiceBenefit::class);
    }

    public function testimonials(): HasMany
    {
        return $this->hasMany(ServiceTestimonial::class);
    }

    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class, 'category_id');
    }
}
