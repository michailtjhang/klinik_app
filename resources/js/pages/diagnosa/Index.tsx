import React, { useState } from "react";
import { BreadcrumbItem } from "@/types";
import AppLayout from "@/layouts/app-layout";
import { Head, useForm } from "@inertiajs/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { HeartPulse } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import InputError from "@/components/input-error";
import axios from "axios";
import { toast } from "sonner";
import AsyncSelect from "react-select/async";

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: "Data Diagnosa",
        href: "/diagnosa",
    }
];

const Index = () => {

    const [loading, setLoading] = useState<boolean>(false);
    const { data, setData, post, processing, errors, reset, clearErrors } = useForm({
        pasien_id: '',
        dokter: '',
        keluhan: '',
        diagnosa: '',
        tindakan: '',
        obat: '',
    });

    const getPasien = async (inputValue: string) => {
        if (!inputValue) return [];
        setLoading(true);

        try {
            const { data } = await axios.get('/data-pasien/get-json', { 
                params: { 
                    search: inputValue 
                } 
            });
            setLoading(false);
            console.log(data);
            return data;
        } catch (error) {
            setLoading(false);
            toast.error('Gagal memuat data pasien');
            return [];
        }
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            post('/diagnosa', {
                preserveScroll: true,
                onSuccess: () => {
                    reset();
                    clearErrors();

                    const reactSelect = document.getElementById('react-async-select-pasien') as HTMLSelectElement;
                    reactSelect.value = '';
                }
            });
        } catch (error) {
            toast.error('Terjadi kesalahan saat menyimpan data diagnosa');
        }
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Data Diagnosa" />

            <div className="grid grid-cols-12 gap-5">
                <Card className="col-span-6">
                    <form className="space-y-3" onSubmit={handleSubmit}>
                        <CardHeader className="flex flex-row justify-between items-center">
                            <CardTitle className="flex gap-x-1 items-center">
                                <HeartPulse />
                                Form Diagnosa
                            </CardTitle>
                            <Button disabled={processing}>Simpan Diagnosa</Button>
                        </CardHeader>
                        <CardContent>
                            <div>
                                <AsyncSelect 
                                cacheOptions
                                defaultOptions
                                loadOptions={getPasien}
                                isClearable
                                onChange={(selectOption: any) => {
                                    setData('pasien_id', selectOption?.value)
                                }}
                                id="react-async-select-pasien"
                                isLoading={loading}
                                placeholder="Pilih pasien..."
                                noOptionsMessage={() => "Data pasien tidak ditemukan"}
                                loadingMessage={() => "Memuat data pasien..."}
                                />
                            </div>
                            <div>
                                <Label>Keluhan</Label>
                                <Textarea
                                    className="min-h-32"
                                    value={data.keluhan}
                                    onChange={(e) => setData('keluhan', e.target.value)}
                                    placeholder="Masukkan keluhan pasien"
                                />
                                <InputError message={errors.keluhan} className="mt-2" />
                            </div>
                            <div>
                                <Label>Diagnosa</Label>
                                <Textarea
                                    className="min-h-32"
                                    value={data.diagnosa}
                                    onChange={(e) => setData('diagnosa', e.target.value)}
                                    placeholder="Masukkan diagnosa pasien"
                                />
                                <InputError message={errors.diagnosa} className="mt-2" />
                            </div>
                            <div>
                                <Label>Tindakan</Label>
                                <Textarea
                                    className="min-h-32"
                                    value={data.tindakan}
                                    onChange={(e) => setData('tindakan', e.target.value)}
                                    placeholder="Masukkan tindakan pasien"
                                />
                                <InputError message={errors.tindakan} className="mt-2" />
                            </div>
                            <div>
                                <Label>Obat</Label>
                                <Textarea
                                    className="min-h-32"
                                    value={data.obat}
                                    onChange={(e) => setData('obat', e.target.value)}
                                    placeholder="Masukkan obat pasien"
                                />
                                <InputError message={errors.obat} className="mt-2" />
                            </div>
                        </CardContent>
                    </form>
                </Card>
                <div className="col-span-6">Diagnosa</div>
            </div>
        </AppLayout>
    );
}

export default Index;