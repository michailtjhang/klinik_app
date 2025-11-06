import AuthLayoutTemplate from '@/layouts/auth/auth-simple-layout';
import { usePage } from '@inertiajs/react';
import { useEffect } from 'react';
import { Toaster } from 'sonner';

export default function AuthLayout({
    children,
    title,
    description,
    ...props
}: {
    children: React.ReactNode;
    title: string;
    description: string;
}) {
    const { flash }: any = usePage().props;

    useEffect(() => {
        if (flash && flash.success) {
            // You can use your preferred toast notification library here
            console.log('Success:', flash.success);
        }
        if (flash && flash.error) {
            console.log('Error:', flash.error);
        }
        if (flash && flash.warning) {
            console.log('Warning:', flash.warning);
        }
        if (flash && flash.info) {
            console.log('Info:', flash.info);
        }
    }, [flash]);

    return (
        <AuthLayoutTemplate title={title} description={description} {...props}>
            <Toaster />
            {children}
        </AuthLayoutTemplate>
    );
}
