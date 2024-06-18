<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

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
     * /**
     *  Define a relação de pertencimento com Client.
     *
     * @return BelongsTo
     * /
     */
    public function client() : BelongsTo {
        return $this->belongsTo(Client::class);
    }

    /**
     * Define a relação de pertencimento com Product.
     *
     * @return BelongsTo
     */
    public function product() : BelongsTo{
        return $this->belongsTo(Product::class);
    }
}
