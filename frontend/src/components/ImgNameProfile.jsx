import * as React from "react";
import "@styles/imgnameprofile.css";
import imageNamePerfil from "@img/img-name-perfil.png";

function ImgNameProfile() {
    return (
        <section>
            <h1 className="h1-miperfil"> Mi Perfil</h1>
            <div className="section-img-name-perfil">
                <img
                    className="img-name-perfil"
                    src={imageNamePerfil}
                    alt="img de perfil"
                />
                <h1 className="h1-name-perfil">Daniel Santos</h1>
            </div>
        </section>
    );
}
export default ImgNameProfile;
