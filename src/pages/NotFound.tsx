import { PageTransition } from "../components/PageTransition";
import { ReloadIcon } from '../ui/icons/ReloadIcon';
import notFound from '/images/not-found.webp';
import { Link } from "react-router-dom";

export default function NotFound() {
    return (
         <PageTransition>
            <section>
                <div className="container">
                    <div className="flex flex-col items-center justify-center text-center">
                        <h1 className="text-xl md:text-[32px]">Ошибка 404</h1>

                        <div className=" h-90  md:h-120 aspect-square">
                            <img src={notFound} alt="" className="w-full h-full object-contain" />
                        </div>

                        <p>Перезагрузите страницу или проверьте  подключение к интернету</p>

                        <div className="mt-5 w-full text-white flex gap-4 items-center justify-center flex-col sm:flex-row">
                            <button type="button" onClick={() => window.location.reload()} className="flex items-center justify-center gap-4 px-4 py-2.5 rounded-lg font-medium transition-colors duration-300 bg-custom-primary hover:bg-custom-secondary w-full sm:w-fit">
                                <span> Перезагрузить</span>
                                <ReloadIcon />
                            </button>

                            <Link to="/" className="px-4 py-2.5 rounded-lg  font-medium transition-colors duration-300 bg-custom-primary hover:bg-custom-secondary w-full sm:w-fit">Вернуться на главную</Link>
                        </div>

                    </div>
                </div>
            </section>
        </PageTransition>
    );
}