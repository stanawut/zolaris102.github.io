<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\cat>
 */
class CatFactory extends Factory
{
    /**
     * Define the model's default state.

						$table->id()																;
						$table->string('type')											;
						$table->string('template')									;
						$table->string('language')									;
						$table->string('title')											;
						$table->bigInteger('inherit_id')						;
						$table->string('ref')												;
						$table->string('note')											;
						$table->string('extend')										;
						$table->string('feuri_json_doc')						;
						$table->foreignId('user_id')->constrained()	;
            $table->timestamps()												;
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            //
						'type'					=> 'xml',
						'template' 			=> 'none',
						'language'			=> $this->faker->randomElement(['uni','thi','eng','chi','mul']),
						'title'					=> $this->faker->sentence(1),
						'inherit_id'		=> 0,
						'ref'						=> 'none',
						'note'					=> 'none',
						'extend'				=> 'none',
						'feuri_json_doc'=> 'none',
						'user_id'				=> $this->faker->randomElement([1,12])
        ];
    }
}
