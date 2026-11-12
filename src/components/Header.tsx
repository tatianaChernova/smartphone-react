
import logo from '/images/logo.png';
import { NavLink } from "react-router-dom";
import { HomeIcon } from '../ui/icons/HomeIcon';
import { CatalogIcon } from '../ui/icons/CatalogIcon'
import { CartIcon } from '../ui/icons/CartIcon'
import { ProfileIcon } from '../ui/icons/ProfileIcon';
import { SearchIcon } from '../ui/icons/SearchIcon';
import { HeartIcon } from '../ui/icons/HeartIcon';
import { useCartStore } from "../store/cartStore";


export default function Header() {
    const cartCount = useCartStore((s) => s.items.reduce((sum, i) => sum + i.quantity, 0));
    return (
        <header className="pb-4 pt-15 px-0 xl:px-6 md:py-3.5 border-b border-custom-light">
            <div className="container">
                <div className="flex flex-col md:flex-row justify-between items-center gap-6 lg:gap-22">
                    <a href="/" className="w-29.5 h-6">
                        <img src={logo} alt="Логотип" />
                    </a>
                    <div className="w-full h-10 flex flex-1 items-center bg-[#DEDEDE] rounded-lg overflow-hidden">
                        <button className="pl-4">
                            <SearchIcon className="w-5 h-5 color-[#454545]" />
                        </button>
                        <input
                            type="text"
                            placeholder="Поиск товаров..."
                            className="flex-1 px-4 py-2 bg-[#DEDEDE] text-gray-900 outline-none"
                        />
                    </div>
                    <div className="h-24 md:h-auto px-4 py-4 sm:px-7.5 sm:py-5 fixed z-10 bottom-0 left-0 w-full bg-white border-t border-custom-light flex justify-between gap-1 sm:gap-2 md:p-0 md:static md:w-auto md:border-0 md:bg-transparent md:justify-start md:gap-5">
                        <NavLink
                            to="/" end className={({ isActive }) =>
                                `flex flex-col items-center justify-center gap-1 transition
                                 ${isActive ? "text-custom-primary md:text-custom-dark-grey" : "text-custom-dark-grey"} md:hidden`
                            }>
                            <HomeIcon className="w-5 h-5 sm:w-6 sm:h-6" />
                            <span className="text-[13px] sm:text-[14px] md:text-[16px]">Главная</span>
                        </NavLink>
                        <NavLink
                            to="/catalog" className={({ isActive }) =>
                                `flex flex-col items-center justify-center gap-1 transition
                                ${isActive ? "text-custom-primary md:text-custom-dark-grey" : "text-custom-dark-grey"}`
                            }
                        >
                            <CatalogIcon className="w-5 h-5 sm:w-6 sm:h-6" />
                            <span className="text-[13px] sm:text-[14px] md:text-[16px]">Каталог</span>
                        </NavLink>
                        <NavLink
                            to="/favorites" className={({ isActive }) =>
                                `flex flex-col items-center justify-center gap-1 transition
                                ${isActive ? "text-custom-primary md:text-custom-dark-grey" : "text-custom-dark-grey"}`
                            }
                        >
                            <HeartIcon className="w-5 h-5 sm:w-6 sm:h-6" />
                            <span className="text-[13px] sm:text-[14px] md:text-[16px]">Избранное</span>
                        </NavLink>
                        <NavLink to="/cart" className={({ isActive }) =>
                            `flex flex-col items-center justify-center gap-1 transition
                             ${isActive ? "text-custom-primary md:text-custom-dark-grey" : "text-custom-dark-grey"}`
                        }
                        >
                            <div className="relative">
                                <CartIcon className="w-5 h-5 sm:w-6 sm:h-6" />
                                {cartCount > 0 && (
                                    <span className="absolute -top-2 -right-2.5 min-w-5 h-5 px-1 rounded-full bg-custom-secondary text-white text-xs leading-none flex items-center justify-center">
                                        {cartCount}
                                    </span>
                                )}
                            </div>
                            <span className="text-[13px] sm:text-[14px] md:text-[16px]">Корзина</span>
                        </NavLink>
                        <NavLink to="/profile" className={({ isActive }) =>
                            `flex flex-col items-center justify-center gap-1 transition
                             ${isActive ? "text-custom-primary md:text-custom-dark-grey" : "text-custom-dark-grey"}`
                        }
                        >
                            <ProfileIcon className="w-5 h-5 sm:w-6 sm:h-6" />
                            <span className="text-[13px] sm:text-[14px] md:text-[16px]">Профиль</span>
                        </NavLink>
                    </div>
                </div>
            </div>
        </header>
    );
}