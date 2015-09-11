<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateVillainsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('villains', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name', 50);
            $table->string('alias', 50);
            $table->string('origin', 100);
            $table->string('abilities', 150);
            $table->string('awesomeness', 100);
            $table->string('wiki', 100);
            $table->string('avatar', 100);
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
        Schema::drop('villains');
    }
}
