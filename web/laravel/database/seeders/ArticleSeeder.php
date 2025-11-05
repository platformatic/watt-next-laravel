<?php

namespace Database\Seeders;

use App\Models\Article;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ArticleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Article::truncate();
        $articles = [
            [
                'title' => 'Getting Started with Laravel',
                'slug' => 'getting-started-with-laravel',
                'excerpt' => 'Laravel is a powerful PHP framework that makes web development a breeze. Learn the basics of getting started with Laravel.',
                'content' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

Laravel provides an elegant syntax and powerful tools for web artisans. It offers features like routing, sessions, caching, and authentication out of the box. The framework follows the MVC architectural pattern and provides a clean, simple API over the popular SwiftMailer library.

Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.',
                'author' => 'John Doe',
                'published' => true,
                'published_at' => now()->subDays(10),
            ],
            [
                'title' => 'Building RESTful APIs with Laravel',
                'slug' => 'building-restful-apis-with-laravel',
                'excerpt' => 'Learn how to build robust RESTful APIs using Laravel. This guide covers authentication, validation, and best practices.',
                'content' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi. Morbi tempus tortor sed sapien tincidunt, at rutrum dolor commodo. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Sed congue, magna at tincidunt cursus, tortor sapien facilisis est, vel consectetur nunc nisi vel orci.

RESTful APIs are the backbone of modern web applications. Laravel makes it incredibly easy to build APIs with features like API resources, rate limiting, and automatic JSON responses. You can quickly set up authentication using Laravel Sanctum or Passport.

Praesent euismod justo et tellus sodales, id aliquet tortor efficitur. Donec vitae consectetur lorem. Nullam at eros a magna vestibulum fringilla. Integer sit amet tempor turpis. Aliquam erat volutpat. Suspendisse potenti. Nunc et ante et turpis tempus blandit.',
                'author' => 'Jane Smith',
                'published' => true,
                'published_at' => now()->subDays(7),
            ],
            [
                'title' => 'Laravel Eloquent ORM Deep Dive',
                'slug' => 'laravel-eloquent-orm-deep-dive',
                'excerpt' => 'Master Laravel\'s Eloquent ORM with this comprehensive guide covering relationships, scopes, and advanced techniques.',
                'content' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum. Donec auctor a lacus in tincidunt. Proin blandit, tortor at ultrices tincidunt, elit sapien facilisis lectus, nec accumsan nulla massa a odio.

Eloquent is Laravel\'s implementation of the Active Record pattern. It provides a beautiful, simple ActiveRecord implementation for working with your database. Each database table has a corresponding Model which is used to interact with that table.

Sed ac felis et ante tincidunt viverra. Mauris condimentum sapien in metus euismod accumsan. Aliquam erat volutpat. Phasellus rhoncus est eget mi tempus, et vehicula libero sagittis. Maecenas finibus justo et tellus rutrum tincidunt. Sed tempor dapibus arcu, vitae accumsan odio mollis non.',
                'author' => 'Bob Johnson',
                'published' => true,
                'published_at' => now()->subDays(5),
            ],
            [
                'title' => 'Testing Laravel Applications',
                'slug' => 'testing-laravel-applications',
                'excerpt' => 'Ensure your Laravel applications are bug-free with comprehensive testing strategies including unit, feature, and browser tests.',
                'content' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque nisl eros, pulvinar facilisis justo mollis, auctor consequat urna. Morbi a bibendum metus. Donec scelerisque sollicitudin enim eu venenatis.

Testing is a crucial part of the development process. Laravel is built with testing in mind and provides support for testing with PHPUnit out of the box. It also includes helpful methods for testing your applications and making HTTP requests to your application and examining the output.

Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
                'author' => 'Alice Williams',
                'published' => true,
                'published_at' => now()->subDays(3),
            ],
            [
                'title' => 'Laravel Performance Optimization',
                'slug' => 'laravel-performance-optimization',
                'excerpt' => 'Discover techniques to optimize your Laravel application\'s performance including caching, query optimization, and more.',
                'content' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante venenatis dapibus posuere velit aliquet. Cras mattis consectetur purus sit amet fermentum.

Performance is key to user satisfaction. Laravel provides several ways to optimize your application including route caching, configuration caching, view caching, and query optimization. Learn about eager loading, database indexing, and using Laravel\'s built-in cache drivers.

Vestibulum id ligula porta felis euismod semper. Donec id elit non mi porta gravida at eget metus. Aenean lacinia bibendum nulla sed consectetur. Cras mattis consectetur purus sit amet fermentum.',
                'author' => 'Charlie Brown',
                'published' => true,
                'published_at' => now()->subDays(1),
            ],
            [
                'title' => 'Upcoming Features in Laravel',
                'slug' => 'upcoming-features-in-laravel',
                'excerpt' => 'A sneak peek at the exciting new features coming to Laravel in future releases.',
                'content' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus.

The Laravel team is constantly working on new features and improvements. Stay tuned for updates on improved performance, new Eloquent features, and enhanced developer experience. The community\'s feedback drives the framework\'s evolution.

Maecenas sed diam eget risus varius blandit sit amet non magna. Donec ullamcorper nulla non metus auctor fringilla. Nulla vitae elit libero, a pharetra augue.',
                'author' => 'David Lee',
                'published' => false,
                'published_at' => null,
            ],
        ];

        foreach ($articles as $article) {
            Article::create($article);
        }
    }
}
