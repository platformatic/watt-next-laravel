@extends('layouts.admin')

@section('content')
<div class="py-12">
    <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
        <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg">
            <div class="p-6 bg-white border-b border-gray-200">
                <div class="flex justify-between items-start mb-6">
                    <h2 class="text-2xl font-semibold">{{ $article->title }}</h2>
                    <div class="flex space-x-2">
                        <a href="{{ route('admin.articles.edit', $article) }}" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            Edit
                        </a>
                        <form action="{{ route('admin.articles.destroy', $article) }}" method="POST" class="inline">
                            @csrf
                            @method('DELETE')
                            <button type="submit" class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onclick="return confirm('Are you sure?')">
                                Delete
                            </button>
                        </form>
                    </div>
                </div>

                <div class="mb-4">
                    <p class="text-gray-600 mb-2">
                        <strong>Slug:</strong> {{ $article->slug }}
                    </p>
                    <p class="text-gray-600 mb-2">
                        <strong>Author:</strong> {{ $article->author }}
                    </p>
                    <p class="text-gray-600 mb-2">
                        <strong>Status:</strong> 
                        @if($article->published)
                            <span class="text-green-600">Published</span>
                        @else
                            <span class="text-gray-600">Draft</span>
                        @endif
                    </p>
                    @if($article->published_at)
                        <p class="text-gray-600 mb-2">
                            <strong>Published At:</strong> {{ $article->published_at->format('F j, Y g:i A') }}
                        </p>
                    @endif
                    <p class="text-gray-600 mb-2">
                        <strong>Created:</strong> {{ $article->created_at->format('F j, Y g:i A') }}
                    </p>
                    <p class="text-gray-600 mb-4">
                        <strong>Last Updated:</strong> {{ $article->updated_at->format('F j, Y g:i A') }}
                    </p>
                </div>

                @if($article->excerpt)
                    <div class="mb-6">
                        <h3 class="text-lg font-semibold mb-2">Excerpt</h3>
                        <p class="text-gray-700 italic">{{ $article->excerpt }}</p>
                    </div>
                @endif

                <div>
                    <h3 class="text-lg font-semibold mb-2">Content</h3>
                    <div class="prose max-w-none">
                        {!! nl2br(e($article->content)) !!}
                    </div>
                </div>

                <div class="mt-6">
                    <a href="{{ route('admin.articles.index') }}" class="text-blue-600 hover:text-blue-800">← Back to Articles</a>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection