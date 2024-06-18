<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'price',
        'sku',
        'category',
        'quantity',
        'status',
        'image'
    ];

    /**
     * Indica que a relação orders não deve ser carregada automaticamente.
     *
     * @var array
     */


    protected $hidden = [
        'orders',
    ];

    /**
     * Define a relação hasMany com Order.
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function orders()
    {
        return $this->hasMany(Order::class);
    }
}
