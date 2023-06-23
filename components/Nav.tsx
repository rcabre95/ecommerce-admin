import Link from "next/link";
import HomeIcon from "./icons/HomeIcon";
import StoreIcon from "./icons/StoreIcon";
import ProductsIcon from "./icons/ProductsIcon";
import OrdersIcon from "./icons/OrdersIcon";
import SettingsIcon from "./icons/SettingsIcon";
import { useRouter } from "next/router";

export default function Navigation() {
    const inactiveLink: string = "flex gap-1 p-1";
    const activeLink: string = inactiveLink + " bg-white text-blue-900 rounded-l-lg"
    const router = useRouter();
    const { pathname } = router;

    return (
        <aside className="text-white p-4 pr-0 h-full">
            <Link className="flex gap-1 mb-4 mr-2" href={`/`}>
                <StoreIcon />
                <span>E-commerce admin</span>
            </Link>
            <nav className={`flex flex-col gap-2`}>
                <Link className={pathname === '/' ? activeLink : inactiveLink } href={`/`}>
                    <HomeIcon />
                    Dashboard
                </Link>
                <Link className={pathname.includes('/products') ? activeLink : inactiveLink} href={`/products`}>
                    <ProductsIcon />
                    Products
                </Link>
                <Link className={pathname.includes('/orders') ? activeLink : inactiveLink} href={`/orders`}>
                    <OrdersIcon />
                    Orders
                </Link>
                <Link className={pathname.includes('/settings') ? activeLink : inactiveLink} href={`/settings`}>
                    <SettingsIcon />
                    Settings
                </Link>
            </nav>
        </aside>
    )
}