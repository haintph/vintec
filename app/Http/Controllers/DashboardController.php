<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function adminDashboard()
    {
        if (!auth()->user()->isAdmin()) {
            abort(403, 'Bạn không có quyền truy cập');
        }

        $totalUsers = User::count();
        $adminCount = User::where('role', 'admin')->count();
        $managerCount = User::where('role', 'manager')->count();

        // CHÍNH XÁC: return về view admin.index
        return view('admin.index', compact('totalUsers', 'adminCount', 'managerCount'));
    }

    public function managerDashboard()
    {
        if (!auth()->user()->isManager() && !auth()->user()->isAdmin()) {
            abort(403, 'Bạn không có quyền truy cập');
        }

        $managerCount = User::where('role', 'manager')->count();
        
        // CHÍNH XÁC: return về view manager dashboard
        return view('admin.manager.index', compact('managerCount'));
    }
}