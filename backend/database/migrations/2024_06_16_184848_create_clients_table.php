<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up() {
        Schema::create('clients', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->char('sex');
            $table->string('document')->unique();
            $table->string('email')->unique();
            $table->string('tel');
            $table->string('city');
            $table->string('state_name');
            $table->string('state_code');
            $table->string('cep');
            $table->string('street_name');
            $table->date('birthday');
            $table->enum('status', ['active', 'inactive']);
            $table->integer('score');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('clients');
    }
};
