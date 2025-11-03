import React from "react";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import { Meta } from "@/types"; // Pastikan tipe Meta Anda sesuai

interface CustomPaginationProps {
    meta: Meta; // Asumsi Meta memiliki { links: Array<{ url: string|null, label: string, active: boolean }> }
}

const CustomPagination = ({ meta }: CustomPaginationProps) => {
    // Jika tidak ada links, jangan render apa-apa
    if (!meta || !meta.links || meta.links.length === 0) {
        return null;
    }

    return (
        <Pagination className="mt-4">
            <PaginationContent>
                {/* Kita map seluruh array meta.links dari backend.
                  Setiap item akan dirender secara kondisional.
                */}
                {meta.links.map((link, index) => {
                    // Bersihkan label dari HTML entity
                    const label = link.label.replace(/&laquo;|&raquo;/g, '');

                    // 1. Render Tombol "Previous"
                    // Label dari Laravel biasanya 'pagination.previous' atau '&laquo; Previous'
                    if (label.toLowerCase().includes('previous')) {
                        return (
                            <PaginationItem key={index}>
                                <PaginationPrevious
                                    href={link.url ?? '#'} // Ambil URL dari data
                                    aria-disabled={!link.url} // Nonaktifkan jika URL null
                                    className={
                                        !link.url ? "pointer-events-none opacity-50" : "" // Styling untuk nonaktif
                                    }
                                />
                            </PaginationItem>
                        );
                    }

                    // 2. Render Tombol "Next"
                    // Label dari Laravel biasanya 'pagination.next' atau 'Next &raquo;'
                    if (label.toLowerCase().includes('next')) {
                        return (
                            <PaginationItem key={index}>
                                <PaginationNext
                                    href={link.url ?? '#'} // Ambil URL dari data
                                    aria-disabled={!link.url}
                                    className={
                                        !link.url ? "pointer-events-none opacity-50" : ""
                                    }
                                />
                            </PaginationItem>
                        );
                    }

                    // 3. Render "Ellipsis" (...)
                    // Label dari Laravel biasanya '...'
                    if (label.includes('...')) {
                        return (
                            <PaginationItem key={index}>
                                <PaginationEllipsis />
                            </PaginationItem>
                        );
                    }

                    // 4. Render Link Angka Halaman
                    return (
                        <PaginationItem key={index}>
                            <PaginationLink
                                size={"sm"}
                                href={link.url ?? '#'}
                                isActive={link.active} // Status aktif dari data
                                aria-disabled={!link.url}
                                // Styling Anda untuk link aktif + styling untuk nonaktif
                                className={`
                                    ${link.active ? 'bg-primary text-primary-foreground hover:bg-primary/80' : ''}
                                    ${!link.url ? 'pointer-events-none opacity-50' : ''}
                                    rounded-md
                                `}
                            >
                                {label}
                            </PaginationLink>
                        </PaginationItem>
                    );
                })}
            </PaginationContent>
        </Pagination>
    );
};

export default CustomPagination;