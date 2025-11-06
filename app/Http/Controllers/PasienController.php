<?php

namespace App\Http\Controllers;

use App\Http\Requests\PasienStoreRequest;
use App\Http\Resources\PasienResource;
use Inertia\Inertia;
use App\Models\Pasien;
use Illuminate\Http\Request;

class PasienController extends Controller
{
    public function index()
    {
        $perPage = request()->query('perPage', 25);
        $search = request()->query('search', '');
        $query = Pasien::query();

        if ($search) {
            $query->where(function ($query) use ($search) {
                $query->where('nama_lengkap', 'like', '%' . $search . '%')
                      ->orWhere('nomor_pasien', 'like', '%' . $search . '%');
            });
        }

        $query->orderBy('nama_lengkap','asc');

        $pasiens = PasienResource::collection($query->paginate($perPage));

        return Inertia::render('pasien/index', compact('pasiens'));
    }

    public function store(PasienStoreRequest $request)
    {
        Pasien::create($request->validated());

        return redirect()->to('/data-pasien')->with('success', 'Pasien berhasil ditambahkan.');
    }

    public function update(string $pasien, PasienStoreRequest $request)
    {
        $pasien = Pasien::findOrFail($pasien);
        $pasien->update($request->validated());

        return redirect()->to('/data-pasien')->with('success', 'Data pasien berhasil diperbarui.');
    }

    public function destroy(string $pasien)
    {
        $pasien = Pasien::findOrFail($pasien);
        $pasien->delete();

        return redirect()->to('/data-pasien')->with('success', 'Data pasien berhasil dihapus.');
    }
}
