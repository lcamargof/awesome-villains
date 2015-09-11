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

		DB::table('villains')->insert([[
		   'name' => 'Wade Wilson',
		   'alias' => 'Deadpool',
		   'origin' => 'Arma X',
		   'abilities' => 'Regeneración',
		   'awesomeness' => "It's fucking Deadpool yoh!",
		   'wiki' => 'http://es.marvel.wikia.com/wiki/Deadpool',
		   'avatar' => 'deadpool.jpg',
		   'created_at' => $c_date,
		   'created_at' => $c_date
		], [
		   'name' => 'Slade Wilson',
		   'alias' => 'DeathStroke',
		   'origin' => 'NPI pero es awesome',
		   'abilities' => "Badass",
		   'awesomeness' => "the scariest badass on the planet!",
		   'wiki' => 'http://dc.wikia.com/wiki/Slade_Wilson_(Prime_Earth)',
		   'avatar' => 'deathstroke.jpg',
		   'created_at' => $c_date,
		   'created_at' => $c_date
		], [
		   'name' => 'Anakin Skywalker',
		   'alias' => 'Darth Vader',
		   'origin' => 'The force is with you.. or not?',
		   'abilities' => "Luke's father",
		   'awesomeness' => "LUKE I'M YOUR FATHER!",
		   'wiki' => 'http://es.starwars.wikia.com/wiki/Darth_Vader:_El_Se%C3%B1or_Oscuro',
		   'avatar' => 'vader.jpg',
		   'created_at' => $c_date,
		   'created_at' => $c_date
		], [
		   'name' => 'Sephiroth',
		   'alias' => 'Sefirot?',
		   'origin' => 'Final Fantasy VII',
		   'abilities' => 'Mitad alien?!',
		   'awesomeness' => "TAN TAN TAN TAN SEPHIROTH!!!",
		   'wiki' => 'http://es.finalfantasy.wikia.com/wiki/Sefirot',
		   'avatar' => 'sephiroth.jpg',
		   'created_at' => $c_date,
		   'created_at' => $c_date
		], [
		   'name' => 'The Joker',
		   'alias' => 'Joker',
		   'origin' => 'Gothic City',
		   'abilities' => 'Crazyness',
		   'awesomeness' => "HA HA HA HA HA HA HAHAHAHA!",
		   'wiki' => 'http://batman.wikia.com/wiki/The_Joker',
		   'avatar' => 'joker.jpg',
		   'created_at' => $c_date,
		   'created_at' => $c_date
		]]);
   }
}
