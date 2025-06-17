@extends('admin.layouts.masters')
@section('content')
    <div class="container-xxl">
        <div class="row">
            <div class="col-xl-12">
                <div class="card">
                    <div class="card-header">
                        <h4 class="card-title">Brand Details: {{ $brand->name }}</h4>
                    </div>
                    
                    <div class="card-body">
                        <div class="row">
                            <div class="col-md-6">
                                <table class="table table-borderless">
                                    <tbody>
                                        <tr>
                                            <th width="30%">ID:</th>
                                            <td>{{ $brand->id }}</td>
                                        </tr>
                                        <tr>
                                            <th>Brand Name:</th>
                                            <td>{{ $brand->name }}</td>
                                        </tr>
                                        @if(isset($brand->slug))
                                        <tr>
                                            <th>Slug:</th>
                                            <td><code>{{ $brand->slug }}</code></td>
                                        </tr>
                                        @endif
                                        @if(isset($brand->status))
                                        <tr>
                                            <th>Status:</th>
                                            <td>
                                                <span class="badge bg-{{ $brand->status ? 'success' : 'secondary' }}">
                                                    {{ $brand->status ? 'Active' : 'Inactive' }}
                                                </span>
                                            </td>
                                        </tr>
                                        @else
                                        <tr>
                                            <th>Status:</th>
                                            <td>
                                                <span class="badge bg-success">Active</span>
                                            </td>
                                        </tr>
                                        @endif
                                        @if(isset($brand->description) && $brand->description)
                                        <tr>
                                            <th>Description:</th>
                                            <td>{{ $brand->description }}</td>
                                        </tr>
                                        @endif
                                        @if(isset($brand->sort_order))
                                        <tr>
                                            <th>Sort Order:</th>
                                            <td>{{ $brand->sort_order }}</td>
                                        </tr>
                                        @endif
                                        <tr>
                                            <th>Created:</th>
                                            <td>{{ $brand->created_at->format('d/m/Y H:i:s') }}</td>
                                        </tr>
                                        <tr>
                                            <th>Updated:</th>
                                            <td>{{ $brand->updated_at->format('d/m/Y H:i:s') }}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div class="col-md-6">
                                <div class="text-center">
                                    @if($brand->image)
                                        <div class="mb-3">
                                            <img src="{{ asset('storage/' . $brand->image) }}" 
                                                 alt="{{ $brand->name }}" 
                                                 class="img-fluid rounded shadow" 
                                                 style="max-width: 300px; max-height: 300px; object-fit: contain;">
                                        </div>
                                        <p class="text-muted small">Brand Logo/Image</p>
                                    @else
                                        <div class="text-muted">
                                            <iconify-icon icon="solar:crown-line-duotone" class="fs-64 mb-3"></iconify-icon>
                                            <p>No brand image available</p>
                                        </div>
                                    @endif
                                </div>

                                @if(isset($brand->meta_title) || isset($brand->meta_description))
                                <div class="mt-4">
                                    <h5 class="mb-3">SEO Information</h5>
                                    @if(isset($brand->meta_title) && $brand->meta_title)
                                    <div class="mb-2">
                                        <strong>Meta Title:</strong>
                                        <p class="text-muted mb-0">{{ $brand->meta_title }}</p>
                                    </div>
                                    @endif
                                    @if(isset($brand->meta_description) && $brand->meta_description)
                                    <div class="mb-2">
                                        <strong>Meta Description:</strong>
                                        <p class="text-muted mb-0">{{ $brand->meta_description }}</p>
                                    </div>
                                    @endif
                                </div>
                                @endif
                            </div>
                        </div>
                    </div>
                    
                    <div class="card-footer">
                        <div class="d-flex gap-2">
                            <a href="{{ route('brand_edit', $brand->id) }}" class="btn btn-primary">
                                <iconify-icon icon="solar:pen-2-broken" class="me-1"></iconify-icon> Edit Brand
                            </a>
                            <a href="{{ route('brand-list') }}" class="btn btn-light">
                                <iconify-icon icon="solar:arrow-left-broken" class="me-1"></iconify-icon> Back to List
                            </a>
                            @if(isset($brand->status))
                            <form action="{{ route('brand_toggle', $brand->id) }}" method="POST" class="d-inline">
                                @csrf
                                <button type="submit" class="btn btn-outline-{{ $brand->status ? 'warning' : 'success' }}">
                                    <iconify-icon icon="solar:{{ $brand->status ? 'eye-closed' : 'eye' }}-broken" class="me-1"></iconify-icon>
                                    {{ $brand->status ? 'Deactivate' : 'Activate' }}
                                </button>
                            </form>
                            @endif
                            <button type="button" class="btn btn-outline-danger" onclick="deleteBrand({{ $brand->id }})">
                                <iconify-icon icon="solar:trash-bin-minimalistic-2-broken" class="me-1"></iconify-icon> Delete
                            </button>
                        </div>
                    </div>
                </div>

                @if(method_exists($brand, 'products'))
                <!-- Related Products Section (nếu có relationship) -->
                <div class="card mt-4">
                    <div class="card-header">
                        <h5 class="card-title">Related Products</h5>
                    </div>
                    <div class="card-body">
                        @if($brand->products && $brand->products->count() > 0)
                            <div class="row">
                                @foreach($brand->products->take(6) as $product)
                                <div class="col-md-4 col-lg-2 mb-3">
                                    <div class="card">
                                        <div class="card-body text-center p-2">
                                            <h6 class="card-title small">{{ $product->name }}</h6>
                                            <small class="text-muted">{{ $product->price ?? 'N/A' }}</small>
                                        </div>
                                    </div>
                                </div>
                                @endforeach
                            </div>
                            @if($brand->products->count() > 6)
                            <div class="text-center">
                                <a href="#" class="btn btn-outline-primary btn-sm">
                                    View All Products ({{ $brand->products->count() }})
                                </a>
                            </div>
                            @endif
                        @else
                            <p class="text-muted text-center">No products found for this brand.</p>
                        @endif
                    </div>
                </div>
                @endif
            </div>
        </div>
    </div>

    <footer class="footer">
        <div class="container-fluid">
            <div class="row">
                <div class="col-12 text-center">
                    <script>document.write(new Date().getFullYear())</script> &copy; Larkon. Crafted by 
                    <iconify-icon icon="iconamoon:heart-duotone" class="fs-18 align-middle text-danger"></iconify-icon> 
                    <a href="https://1.envato.market/techzaa" class="fw-bold footer-text" target="_blank">Techzaa</a>
                </div>
            </div>
        </div>
    </footer>

    <script>
        function deleteBrand(brandId) {
            if (confirm('Bạn có chắc chắn muốn xóa thương hiệu này? Hành động này không thể hoàn tác!')) {
                const form = document.createElement('form');
                form.method = 'POST';
                form.action = `{{ url('brand_destroy') }}/${brandId}`;
                
                const csrfToken = document.createElement('input');
                csrfToken.type = 'hidden';
                csrfToken.name = '_token';
                csrfToken.value = '{{ csrf_token() }}';
                
                const methodField = document.createElement('input');
                methodField.type = 'hidden';
                methodField.name = '_method';
                methodField.value = 'DELETE';
                
                form.appendChild(csrfToken);
                form.appendChild(methodField);
                document.body.appendChild(form);
                form.submit();
            }
        }
    </script>
@endsection