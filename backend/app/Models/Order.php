<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use \Illuminate\Database\Eloquent\Relations\BelongsTo;

use App\Models\Client;
use App\Models\Product;

class Order extends Model{
    use HasFactory;

    protected $fillable = [
        'client_id',
        'product_id',
        'status',
    ];

    /**
     * Get the client that owns the order.
     */
    public function client() : BelongsTo {
        return $this->belongsTo(Client::class);
    }

    /**
     * Get the product that belongs to the order.
     */
    public function product() : BelongsTo{
        return $this->belongsTo(Product::class);
    }
}
