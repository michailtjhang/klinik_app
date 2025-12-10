import AppLayout from "@/layouts/app-layout";
import { BreadcrumbItem, Diagnosa, Pasien } from "@/types";
import { Head } from "@inertiajs/react";
import axios from "axios";
import React, { useState } from "react";
import { toast } from "sonner";
import AsyncSelect from "react-select/async";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import RekamMedis from "../diagnosa/components/rekamMedis";

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Rekam Medis',
        href: '/rekam-medis',
    }
]

const RekamMedisIndex = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [diagnosa, setDiagnosa] = useState<Diagnosa[]>([]);
    const [pasien, setPasien] = useState<Pasien>();

    // untuk option react-select pasien
    const getPasienOptions = async (inputValue: string) => {
        if (!inputValue) return [];
        setLoading(true);

        try {
            const { data } = await axios.get('/data-pasien/get-json', {
                params: {
                    search: inputValue
                }
            });
            setLoading(false);
            return data;
        } catch (error) {
            setLoading(false);
            toast.error('Gagal memuat data pasien');
        }
    }

    const getPasien = async (inputValue: string) => {
        if (!inputValue) return [];
        setLoading(true);
        try {
            const { data } = await axios.get(`/data-pasien/${inputValue}`);
            setPasien(data);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            toast.error('Gagal memuat data pasien');
        }
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Rekam Medis" />
            <div>
                <AsyncSelect
                    cacheOptions
                    defaultOptions
                    loadOptions={getPasienOptions}
                    isClearable
                    onChange={(selectOption: any) => {
                        getPasien(selectOption?.value)
                    }}
                    id="react-async-select-pasien"
                    isLoading={loading}
                    placeholder="Pilih pasien..."
                    noOptionsMessage={() => "Data pasien tidak ditemukan"}
                    loadingMessage={() => "Memuat data pasien..."}
                />
            </div>
            <div className="mt-5 space-y-5">
                <Card>
                    <CardHeader>
                        <CardTitle>Data Pasien</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground text-sm">Nama : {pasien?.nama_lengkap || "-"}</p>
                        <p className="text-muted-foreground text-sm">Jenis Kelamin : {pasien?.jenis_kelamin || "-"}</p>
                        <p className="text-muted-foreground text-sm">Usia : {pasien?.usia || "-"}</p>
                        <p className="text-muted-foreground text-sm">Golongan Darah : {pasien?.golongan_darah || "-"}</p>
                        <p className="text-muted-foreground text-sm">Alamat : {pasien?.alamat || "-"}</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Rekam Medis</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <RekamMedis diagnosa={pasien?.diagnosa || []} />
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    )
}

export default RekamMedisIndex;