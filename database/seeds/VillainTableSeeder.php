<?php

use Illuminate\Database\Seeder;

class VillainTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
    	$c_date = date('Y-m-d H:i:s');

		DB::table('villains')->insert([
		   'name' => 'Wade Wilson',
		   'alias' => 'Deadpool',
		   'origin' => 'Arma X',
		   'abilities' => 'Regeneración',
		   'awesomeness' => "It's fucking Deadpool yoh!",
		   'wiki' => 'http://es.marvel.wikia.com/wiki/Deadpool',
		   'avatar' => 'prueba',
		   'created_at' => $c_date
		]);
    }
}
