<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Client extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'surname',
        'sex',
        'document',
        'email',
        'tel',
        'city',
        'state_name',
        'state_code',
        'cep',
        'street_name',
        'birthday',
        'score'
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
