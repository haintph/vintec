<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function index()
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

        return view('users.index', compact('users'));
    }

    public function create()
    {
        if (!auth()->user()->isAdmin()) {
            abort(403, 'Chỉ Admin mới có thể tạo user mới');
        }

        $roles = User::getAllRoles();
        return view('users.create', compact('roles'));
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
        ]);

        User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role' => $request->role,
        ]);

        return redirect()->route('users.index')
            ->with('success', 'Tạo user thành công!');
    }

    public function show(User $user)
    {
        $currentUser = auth()->user();
        
        if (!$currentUser->isAdmin() && $currentUser->id !== $user->id) {
            abort(403, 'Bạn không có quyền xem thông tin này');
        }

        return view('users.show', compact('user'));
    }

    public function edit(User $user)
    {
        $currentUser = auth()->user();
        
        if (!$currentUser->isAdmin() && $currentUser->id !== $user->id) {
            abort(403, 'Bạn không có quyền chỉnh sửa');
        }

        $roles = User::getAllRoles();
        return view('users.edit', compact('user', 'roles'));
    }

    public function update(Request $request, User $user)
    {
        $currentUser = auth()->user();
        
        if (!$currentUser->isAdmin() && $currentUser->id !== $user->id) {
            abort(403, 'Bạn không có quyền cập nhật');
        }

        $rules = [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,email,' . $user->id,
            'password' => 'nullable|string|min:6|confirmed',
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

        $user->update($data);

        return redirect()->route('users.index')
            ->with('success', 'Cập nhật thành công!');
    }

    public function destroy(User $user)
    {
        if (!auth()->user()->isAdmin()) {
            abort(403, 'Chỉ Admin mới có thể xóa user');
        }

        if ($user->id == auth()->id()) {
            return back()->with('error', 'Bạn không thể xóa chính mình!');
        }

        $user->delete();

        return redirect()->route('users.index')
            ->with('success', 'Xóa user thành công!');
    }
}