import React from "react";

const Hero = () => {
  return (
    <section
      className="h-[500px] bg-cover bg-center relative"
      style={{ backgroundImage: "url(/images/hero1.jpg)" }}
    >
      {/* Gradient overlay: koyu ve yumuşak */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-black/20 to-transparent pointer-events-none"></div>
      
      {/* İstersen blur efekti de ekleyebilirsin */}
      {/* <div className="absolute inset-0 backdrop-blur-sm pointer-events-none"></div> */}
      
      <div className="container mx-auto px-4 text-white flex items-center h-full relative z-10">
        <div className="bg-black/4 p-6 rounded-md max-w-2xl shadow-lg">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 font-headerText">
            Binlerce Kitap Tek Bir Yerde
          </h1>
          <p className="text-lg md:text-xl max-w-2xl font-handwritten">
            Kütüphanemizde dilediğiniz yazarı ve kitabı keşfedin. Dijital kitaplık deneyimine şimdi başlayın.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
