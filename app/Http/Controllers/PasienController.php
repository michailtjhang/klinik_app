<?php

namespace App\Http\Controllers;

use App\Http\Requests\PasienStoreRequest;
use App\Http\Resources\PasienResource;
use App\Models\Diagnosa;
use Inertia\Inertia;
use App\Models\Pasien;
use Carbon\Carbon;
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

        $query->orderBy('nama_lengkap', 'asc');

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

    public function getDataPasienJson(Request $request)
    {
        $search = $request->query('search', '');
        $query = Pasien::query();

        if ($search) {
            $query->where(function ($query) use ($search) {
                $query->where('nama_lengkap', 'like', '%' . $search . '%')
                    ->orWhere('nomor_pasien', 'like', '%' . $search . '%');
            });
        }


        $query->orderBy('nama_lengkap', 'asc')->get();

        $pasien = $query->get()->map(function ($pasien) {
            return [
                'label' => $pasien->nomor_pasien . ' - ' . $pasien->nama_lengkap,
                'value' => $pasien->id,
            ];
        });

        return response()->json($pasien);
    }

    public function getRekamMedis(string $pasien_id)
    {
        $limit = request()->query('limit');

        $query = Diagnosa::where('pasien_id', $pasien_id)
            ->orderBy('created_at', 'desc');

        if ($limit) {
            $query->limit($limit);
        }

        $rekamMedis = $query->get()->map(function ($diagnosa) {
            $diagnosa->tanggal_periksa = Carbon::parse($diagnosa->created_at)->locale('id')->format('l, d F Y');
            return $diagnosa;
        });
        return response()->json($rekamMedis);
    }
}
