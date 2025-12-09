import React from "react";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { Diagnosa } from "@/types";

interface RekamMedisProps {
    diagnosa: Diagnosa[];
}

const RekamMedis = ({ diagnosa }: RekamMedisProps) => {
    return (
        <div>
            {diagnosa.length === 0 && <p className="text-center">Tidak ada riwayat diagnosa</p>}
            <Accordion type="multiple">
                {diagnosa.map((item, index) => (
                    <AccordionItem value={item.id.toString()} key={index}>
                        <AccordionTrigger>{item.tanggal_periksa}</AccordionTrigger>
                        <AccordionContent className="space-y-3">
                            <p>
                                <span className="font-semibold">Pemeriksa</span> : {item.dokter}
                            </p>
                            <p>
                                <span className="font-semibold">Keluhan</span> : {item.keluhan}
                            </p>
                            <p>
                                <span className="font-semibold">Diagnosa</span> : {item.diagnosa}
                            </p>
                            <p>
                                <span className="font-semibold">Tindakan</span> : {item.tindakan}
                            </p>
                            <p>
                                <span className="font-semibold">Obat</span> : {item.obat}
                            </p>
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
        </div>
    )
}

export default RekamMedis;
