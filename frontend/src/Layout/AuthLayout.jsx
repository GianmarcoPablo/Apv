import { Outlet } from "react-router-dom"

export default function AuthLayout() {
    return (
        <>
            <main className='flex h-screen justify-center items-center container mx-auto  gap-14 p-5 md:p-0 mt-14 md:mt-0'>
                <div className="md:w-1/2 mx-auto lg:w-1/3">
                    <Outlet />
                </div>
            </main>
        </>
    )
}
