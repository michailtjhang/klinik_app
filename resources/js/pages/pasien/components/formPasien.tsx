import React, { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button";
import { Pasien } from "@/types";
import { EditIcon } from "lucide-react";
import { useForm } from "@inertiajs/react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import InputError from "@/components/input-error";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

interface FormPasienProps {
    pasien?: Pasien
}

const FormPasien = ({ pasien }: FormPasienProps) => {

    const method = pasien ? "put" : "post";
    const url = pasien ? `/data-pasien/${pasien.id}` : `/data-pasien`;
    const [open, setOpen] = useState<boolean>(false);

    const jenisKelamin = [
        { label: "Laki-laki", value: "Laki-laki" },
        { label: "Perempuan", value: "Perempuan" },
    ]

    const golonganDarah = [
        { label: "A", value: "A" },
        { label: "B", value: "B" },
        { label: "AB", value: "AB" },
        { label: "O", value: "O" },
    ]

    const { data, setData, errors, post, put, reset, clearErrors, processing } = useForm({
        nama_lengkap: pasien ? pasien.nama_lengkap : "",
        alamat: pasien ? pasien.alamat : "",
        nomor_telepon: pasien ? pasien.nomor_telepon : "",
        jenis_kelamin: pasien ? pasien.jenis_kelamin : "",
        tanggal_lahir: pasien ? pasien.tanggal_lahir : "",
        golongan_darah: pasien ? pasien.golongan_darah : "",
        pekerjaan: pasien ? pasien.pekerjaan : "",
        nomor_ktp: pasien ? pasien.nomor_ktp : "",
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            if (method === "post") {
                post(url, {
                    onSuccess: () => {
                        setOpen(false);
                        clearErrors();
                        reset();
                    }
                });
            } else {
                put(url, {
                    onSuccess: () => {
                        setOpen(false);
                        clearErrors();
                        reset();
                    }
                });
            }
        } catch (error) {
            toast.error("Terjadi kesalahan saat menyimpan data pasien.");
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button
                    variant={pasien ? "outline" : "default"}
                    size={pasien ? "icon" : "default"}
                >
                    {pasien ? <EditIcon size={16} /> : "Pasien Baru"}
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Form Pasien</DialogTitle>
                    <DialogDescription asChild>
                        <div>
                            <form className="space-y-2" onSubmit={handleSubmit}>
                                <div>
                                    <Label>Nama Lengkap</Label>
                                    <Input
                                        type="text"
                                        value={data.nama_lengkap}
                                        onChange={e => setData("nama_lengkap", e.target.value)}
                                    />
                                    <InputError message={errors.nama_lengkap} className="mt-1" />
                                </div>
                                <div>
                                    <Label>Tanggal Lahir</Label>
                                    <Input
                                        type="date"
                                        value={data.tanggal_lahir}
                                        onChange={e => setData("tanggal_lahir", e.target.value)}
                                    />
                                    <InputError message={errors.tanggal_lahir} className="mt-1" />
                                </div>
                                <div>
                                    <Label>Jenis Kelamin</Label>
                                    <div className="space-x-5 mt-1 flex items-center">
                                        {jenisKelamin.map((jk, index) => (
                                            <Label key={index} className="flex items-center flex-row cursor-pointer">
                                                <input
                                                    type="radio"
                                                    name="jenis_kelamin"
                                                    value={jk.value}
                                                    checked={data.jenis_kelamin === jk.value}
                                                    onChange={e => setData("jenis_kelamin", e.target.value)}
                                                    className="mr-1"
                                                />
                                                {jk.label}
                                            </Label>
                                        ))}
                                    </div>
                                    <InputError message={errors.jenis_kelamin} className="mt-1" />
                                </div>
                                <div>
                                    <Label>Golongan Darah</Label>
                                    <Select defaultValue={data.golongan_darah} onValueChange={(value) => setData("golongan_darah", value)}>
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Golongan Darah" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {golonganDarah.map((gd, index) => (
                                                <SelectItem key={index} value={gd.value}>
                                                    {gd.label}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <InputError message={errors.golongan_darah} className="mt-1" />
                                </div>
                                <div>
                                    <Label>Nomor Telepon</Label>
                                    <Input
                                        type="text"
                                        value={data.nomor_telepon}
                                        onChange={e => setData("nomor_telepon", e.target.value)}
                                    />
                                    <InputError message={errors.nomor_telepon} className="mt-1" />
                                </div>
                                <div>
                                    <Label>Pekerjaan</Label>
                                    <Input
                                        type="text"
                                        value={data.pekerjaan}
                                        onChange={e => setData("pekerjaan", e.target.value)}
                                    />
                                    <InputError message={errors.pekerjaan} className="mt-1" />
                                </div>
                                <div>
                                    <Label>Nomor KTP</Label>
                                    <Input
                                        type="text"
                                        value={data.nomor_ktp}
                                        onChange={e => setData("nomor_ktp", e.target.value)}
                                    />
                                    <InputError message={errors.nomor_ktp} className="mt-1" />
                                </div>
                                <div>
                                    <Label>Alamat</Label>
                                    <Textarea
                                        value={data.alamat}
                                        onChange={e => setData("alamat", e.target.value)}
                                    />
                                    <InputError message={errors.alamat} className="mt-1" />
                                </div>
                                <div>
                                    <Button type="submit" className="w-full mt-4" disabled={processing}>
                                        {pasien ? "Update" : "Save"}
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
};

export default FormPasien;
