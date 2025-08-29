import { Footer } from "./Footer";
import { Header } from "./Header";
import { Mapa } from "./Mapa";

export default function Home(){
    return(
        <div>
            <Header></Header>

            <Mapa></Mapa>

            <Footer></Footer>
        </div>
    );
}