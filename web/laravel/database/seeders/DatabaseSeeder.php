<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Database\Seeders\ArticleSeeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();
        $userCount = User::count();
        if ($userCount === 0) {
        User::factory()->create([
                'name' => 'Test User',
                'email' => 'test@example.com',
            ]);
        }
        $this->call([
            ArticleSeeder::class,
        ]);
    }
}
