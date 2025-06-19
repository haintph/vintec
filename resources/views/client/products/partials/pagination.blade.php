{{-- resources/views/client/products/partials/pagination.blade.php --}}

@if ($products->hasPages())
    <div class="pc-pagination-wrapper">
        {{ $products->links() }}
    </div>
@endif