<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

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
        'status',
        'score',
    ];
}
