<?php

namespace App\Models;

use DateTime;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Pasien extends Model
{
    /** @use HasFactory<\Database\Factories\PasienFactory> */
    use HasFactory;
    protected $fillable = [
        'nomor_pasien',
        'nama_lengkap',
        'alamat',
        'nomor_telepon',
        'jenis_kelamin',
        'tanggal_lahir',
        'golongan_darah',
        'pekerjaan',
        'nomor_ktp',
    ];

    public static function nomorPasien() {
        $maxID = self::max('id');
        $kode = sprintf("%04d", $maxID ? $maxID + 1 : 1);

        return 'PSN-' . date('Y') . $kode;
    }

    public static function getUsia($tanggal_lahir) {
       try {
           $birthDate = new DateTime($tanggal_lahir);
           $today = new DateTime();
           $age = $today->diff($birthDate);
           return $age->y . ' tahun, ' . $age->m . ' bulan';
       } catch (\Throwable $th) {
           return null;
       }
    }

    public function diagnosa()
    {
        return $this->hasMany(Diagnosa::class);
    }

    protected static function booted()
    {
        static::created(function ($pasien) {
            $pasien->nomor_pasien = self::nomorPasien();
            $pasien->save();
        });

        // static::creating(function ($pasien) {
        //     $pasien->nomor_pasien = self::nomorPasien();
        // });
    }
}
