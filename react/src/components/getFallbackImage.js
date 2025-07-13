const urls = {
    blush: "https://www.elfcosmetics.com/dw/image/v2/BBXC_PRD/on/demandware.static/-/Sites-elf-master/default/dw9e02a47a/2024/PrimerInfusedMatteBlush/83749_OpenA_V6_R.png",
    bronzer: "https://www.elfcosmetics.com/dw/image/v2/BBXC_PRD/on/demandware.static/-/Sites-elf-master/default/dwf0986276/2024/PrimerInfusedMatteBronzer/84497_OpenA_2_V5_R.jpg?sfrm=png&sw=700&q=90&strip=false",
    eyebrow: "https://absolutenewyork.com/cdn/shop/products/SSEB01_1024x1024.jpg?v=1625689523",
    eyeliner: "https://pimg.us.marykaycdn.com/HeroZoom/10001/mary-kay-waterproof-eyeliner-0220.jpg",
    eyeshadow: "https://www.palladiobeauty.com/cdn/shop/products/PROPALLET8-ultimate-pro-palette-35-count-eyeshadow-palette-open-compact-image_600x.jpg?v=1689287227",
    foundation: "https://www.laurageller.com/cdn/shop/files/LG_Double_Take_Liquid_Foundation_Soldier_Light.jpg?v=1745334015",
    lip_liner: "https://sdcdn.io/mac/us/mac_sku_M38074_1x1_0.png?width=1440&height=1440",
    lipstick: "https://sdcdn.io/mac/us/mac_sku_M0N904_1x1_0.png?width=1080&height=1080",
    mascara: "https://www.dior.com/dw/image/v2/BGXS_PRD/on/demandware.static/-/Sites-master_dior/default/dw101095a9/Y0697150/Y0697150_F069715090_E01_GHC.jpg?sw=1850&sh=1850",
    nail_polish: "https://funlacquer.com/cdn/shop/products/fun-lacquer-kiss-me-1_800x.jpg?v=1583289455"
}

export function getFallbackImage(type) {
    return urls[type];
}