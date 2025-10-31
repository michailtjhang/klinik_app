<?php

namespace App\Http\Controllers;

use App\Http\Resources\PasienResource;
use Inertia\Inertia;
use App\Models\Pasien;
use Illuminate\Http\Request;

class PasienController extends Controller
{
    public function index()
    {
        $perPage = request()->query('perPage', 25);
        $query = Pasien::query();

        $query->orderBy('nama_lengkap','asc');

        $pasiens = PasienResource::collection($query->paginate($perPage));

        return Inertia::render('pasien/index', compact('pasiens'));
    }
}
