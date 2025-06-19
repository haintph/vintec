<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;

class UserController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function list()
    {
        $user = auth()->user();
        
        if ($user->isAdmin()) {
            $users = User::paginate(10);
        } elseif ($user->isManager()) {
            // Manager chỉ xem được manager khác
            $users = User::where('role', 'manager')->paginate(10);
        } else {
            abort(403, 'Bạn không có quyền truy cập');
        }

        return view('admin.users.list', compact('users'));
    }

    public function index()
    {
        return $this->list();
    }

    public function create()
    {
        if (!auth()->user()->isAdmin()) {
            abort(403, 'Chỉ Admin mới có thể tạo user mới');
        }

        $roles = User::getAllRoles();
        return view('admin.users.create', compact('roles'));
    }

    public function store(Request $request)
    {
        if (!auth()->user()->isAdmin()) {
            abort(403, 'Chỉ Admin mới có thể tạo user mới');
        }

        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:6|confirmed',
            'role' => 'required|in:admin,manager',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        $data = [
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role' => $request->role,
        ];

        // Handle image upload
        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $imageName = time() . '_' . uniqid() . '.' . $image->getClientOriginalExtension();
            $imagePath = $image->storeAs('users', $imageName, 'public');
            $data['image'] = $imagePath;
        }

        User::create($data);

        return redirect()->route('user-list')
            ->with('success', 'Tạo user thành công!');
    }

    public function detail($id)
    {
        $user = User::findOrFail($id);
        $currentUser = auth()->user();
        
        if (!$currentUser->isAdmin() && $currentUser->id !== $user->id) {
            abort(403, 'Bạn không có quyền xem thông tin này');
        }

        return view('admin.users.detail', compact('user'));
    }

    public function show(User $user)
    {
        return $this->detail($user->id);
    }

    public function edit($id)
    {
        $user = User::findOrFail($id);
        $currentUser = auth()->user();
        
        if (!$currentUser->isAdmin() && $currentUser->id !== $user->id) {
            abort(403, 'Bạn không có quyền chỉnh sửa');
        }

        $roles = User::getAllRoles();
        return view('admin.users.edit', compact('user', 'roles'));
    }

    public function update(Request $request, $id)
    {
        $user = User::findOrFail($id);
        $currentUser = auth()->user();
        
        if (!$currentUser->isAdmin() && $currentUser->id !== $user->id) {
            abort(403, 'Bạn không có quyền cập nhật');
        }

        $rules = [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,email,' . $user->id,
            'password' => 'nullable|string|min:6|confirmed',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ];

        // Chỉ admin mới có thể thay đổi role
        if ($currentUser->isAdmin()) {
            $rules['role'] = 'required|in:admin,manager';
        }

        $request->validate($rules);

        $data = [
            'name' => $request->name,
            'email' => $request->email,
        ];

        if ($currentUser->isAdmin()) {
            $data['role'] = $request->role;
        }

        if ($request->filled('password')) {
            $data['password'] = Hash::make($request->password);
        }

        // Handle image upload
        if ($request->hasFile('image')) {
            // Delete old image if exists
            if ($user->image && Storage::disk('public')->exists($user->image)) {
                Storage::disk('public')->delete($user->image);
            }

            $image = $request->file('image');
            $imageName = time() . '_' . uniqid() . '.' . $image->getClientOriginalExtension();
            $imagePath = $image->storeAs('users', $imageName, 'public');
            $data['image'] = $imagePath;
        }

        // Handle remove image
        if ($request->has('remove_image') && $request->remove_image == '1') {
            if ($user->image && Storage::disk('public')->exists($user->image)) {
                Storage::disk('public')->delete($user->image);
            }
            $data['image'] = null;
        }

        $user->update($data);

        return redirect()->route('user-list')
            ->with('success', 'Cập nhật thành công!');
    }

    public function destroy($id)
    {
        if (!auth()->user()->isAdmin()) {
            abort(403, 'Chỉ Admin mới có thể xóa user');
        }

        $user = User::findOrFail($id);

        if ($user->id == auth()->id()) {
            return back()->with('error', 'Bạn không thể xóa chính mình!');
        }

        // Delete user image if exists
        if ($user->image && Storage::disk('public')->exists($user->image)) {
            Storage::disk('public')->delete($user->image);
        }

        $user->delete();

        return redirect()->route('user-list')
            ->with('success', 'Xóa user thành công!');
    }
}