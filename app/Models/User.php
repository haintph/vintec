<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Support\Facades\Storage;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    // Enum roles theo database
    const ROLE_ADMIN = 'admin';
    const ROLE_MANAGER = 'manager';

    protected $fillable = [
        'name',
        'email',
        'password',
        'role',
        'image',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $casts = [
        'password' => 'hashed',
    ];

    public function isAdmin()
    {
        return $this->role === self::ROLE_ADMIN;
    }

    public function isManager()
    {
        return $this->role === self::ROLE_MANAGER;
    }

    public function getRoleName()
    {
        return $this->role === 'admin' ? 'Admin' : 'Manager';
    }

    public static function getAllRoles()
    {
        return [
            self::ROLE_ADMIN => 'Admin',
            self::ROLE_MANAGER => 'Manager'
        ];
    }

    /**
     * Get the user's avatar URL
     */
    public function getAvatarUrl()
    {
        if ($this->image && Storage::exists($this->image)) {
            return Storage::url($this->image);
        }
        
        // Return default avatar or generate initials avatar
        return $this->getDefaultAvatarUrl();
    }

    /**
     * Get default avatar URL (can be a service like UI Avatars)
     */
    public function getDefaultAvatarUrl()
    {
        $initials = $this->getInitials();
        // Using UI Avatars service for default avatar
        return "https://ui-avatars.com/api/?name=" . urlencode($initials) . "&background=1e9cdb&color=ffffff&size=200&font-size=0.6";
    }

    /**
     * Get user initials
     */
    public function getInitials()
    {
        $words = explode(' ', $this->name);
        $initials = '';
        
        foreach ($words as $word) {
            if (!empty($word)) {
                $initials .= strtoupper(substr($word, 0, 1));
                if (strlen($initials) >= 2) break;
            }
        }
        
        return $initials ?: 'U';
    }

    /**
     * Check if user has avatar
     */
    public function hasAvatar()
    {
        return !empty($this->image) && Storage::exists($this->image);
    }

    /**
     * Delete user avatar
     */
    public function deleteAvatar()
    {
        if ($this->hasAvatar()) {
            Storage::delete($this->image);
            $this->update(['image' => null]);
            return true;
        }
        return false;
    }
}