import CustomPagination from "@/components/custom-pagination";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import AppLayout from "@/layouts/app-layout";
import { handleChangePerPage } from "@/lib/utils";
import { BreadcrumbItem, Pasien } from "@/types";
import { Head, router, usePage } from "@inertiajs/react";
import { RefreshCcw, Search, Trash } from "lucide-react";
import React, { useEffect } from "react";
import FormPasien from "./components/formPasien";
import { toast } from "sonner";

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: "Data Pasien",
        href: "/data-pasien",
    }
];

const Index = () => {

    const { pasiens }: any = usePage().props;
    const [searchQuery, setSearchQuery] = React.useState("");
    const meta = pasiens.meta;
    const path = meta.path;

    useEffect(() => {
        console.log(pasiens);
    }, []);

    const searchData = (e: React.FormEvent) => {
        e.preventDefault();
        router.get(path, { search: searchQuery }, { preserveState: true, replace: true });
    }

    const clearSearch = () => {
        setSearchQuery("");
        router.get(path, {}, { preserveState: true, replace: true });
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Data Pasien" />
            <div className="flex items-center gap-x-5 mb-4">
                <select className="border rounded-md px-3 py-2" onChange={(e) => handleChangePerPage(Number(e.target.value), path)} defaultValue={meta.per_page}>
                    <option value="25">25</option>
                    <option value="50">50</option>
                    <option value="100">100</option>
                </select>
                <div className="flex items-center gap-x-2 w-full">
                    <Input type="text" placeholder="Cari pasien..." className="max-w-lg" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
                    <Button className="ml-2 px-4 py-2 bg-primary text-primary-foreground rounded-md" onClick={(e) => searchData(e)} size={"icon"} variant={"outline"}>
                        <Search size={16} />
                    </Button>
                    <Button size={"icon"} variant="outline" onClick={clearSearch}>
                        <RefreshCcw size={16} />
                    </Button>
                </div>
                <FormPasien />
            </div>
            <Table>
                <TableHeader>
                    <TableHead className="w-10 text-center">No</TableHead>
                    <TableHead>Nomor Pasien</TableHead>
                    <TableHead>Nama Pasien</TableHead>
                    <TableHead>Jenis Kelamin</TableHead>
                    <TableHead>Usia</TableHead>
                    <TableHead className="w-32 text-center">Opsi</TableHead>
                </TableHeader>
                <TableBody>
                    {pasiens.data.map((pasien: Pasien, index: number) => (
                        <TableRow key={pasien.id}>
                            <TableCell className="text-center">{index + 1}</TableCell>
                            <TableCell>{pasien.nomor_pasien}</TableCell>
                            <TableCell>{pasien.nama_lengkap}</TableCell>
                            <TableCell>{pasien.jenis_kelamin}</TableCell>
                            <TableCell>{pasien.usia ?? '-'}</TableCell>
                            <TableCell className="text-center">
                                <div className="flex justify-center items-center gap-x-2">
                                    <Button variant="destructive" size="icon" onClick={() => {
                                        if (confirm("Apakah Anda yakin ingin menghapus data pasien ini?")) {
                                            router.delete(`/data-pasien/${pasien.id}`, {
                                                preserveState: true,
                                            });
                                        }
                                    }}>
                                        <Trash size={16} />
                                    </Button>
                                    <FormPasien pasien={pasien} />
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <div>
                <CustomPagination meta={meta} />
            </div>
        </AppLayout>
    )
}

export default Index