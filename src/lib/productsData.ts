export type Variant = "italian" | "chinese";

export interface Product {
  id: string;
  images: string[];
  nameAr: string;
  nameEn: string;
  type: Variant;
  tag: "slab" | "vanity" | "countertop";
  finishAr: string;
  finishEn: string;
  size: string;
}

export const imagesGlob = import.meta.glob('/src/assets/**/*.{jpg,jpeg,png,webp}', { eager: true, import: 'default' }) as Record<string, string>;

export const productsData: Product[] = [
  { id: "001", nameEn: "Alice Gold", nameAr: "أليس جولد", images: ["/src/assets/Alice Gold/Alice Gold Polshied.webp", "/src/assets/Alice Gold/Alice Gold Polshied1.webp", "/src/assets/Alice Gold/Alice Gold Polshied2.webp"], tag: "slab", type: "chinese", finishAr: "مصقول لامع", finishEn: "Polished", size: "1600 X 3200mm X 12mm" },
  { id: "002", nameEn: "Arbeescato", nameAr: "ارابيسكاتو", images: ["/src/assets/Arbeescato/Arbeescato.webp", "/src/assets/Arbeescato/Arbeescato2.webp"], tag: "slab", type: "chinese", finishAr: "مصقول لامع", finishEn: "Polished", size: "1600 X 3200mm X 12mm" },
  { id: "003", nameEn: "ARCTIC OCEAN", nameAr: "أركتيك أوشن", images: ["/src/assets/ARCTIC OCEAN/ARCTIC OCEAN.webp", "/src/assets/ARCTIC OCEAN/ARCTIC OCEAN1.webp"], tag: "slab", type: "chinese", finishAr: "مصقول لامع", finishEn: "Polished", size: "1600 X 3200mm X 12mm" },
  { id: "004", nameEn: "Armani Dark Grey", nameAr: "أرماني رمادي غامق", images: ["/src/assets/Armani Dark Grey/Armani Dark Grey.webp", "/src/assets/Armani Dark Grey/Armani Dark Grey1.webp"], tag: "slab", type: "chinese", finishAr: "مصقول لامع", finishEn: "Polished", size: "1600 X 3200mm X 12mm" },
  { id: "005", nameEn: "Bouique Calartte Gold", nameAr: "بوتيك كلكتا جولد", images: ["/src/assets/Bouique Calartte Gold/Bouique Calartte Gold.webp", "/src/assets/Bouique Calartte Gold/Bouique Calartte Gold1.webp", "/src/assets/Bouique Calartte Gold/Bouique Calartte Gold2.webp"], tag: "slab", type: "chinese", finishAr: "مصقول لامع", finishEn: "Polished", size: "1600 X 3200mm X 12mm" },
  { id: "006", nameEn: "Bvlgari Black", nameAr: "بولغاري أسود", images: ["/src/assets/Bvlgari Black/Bvlgari Black.webp", "/src/assets/Bvlgari Black/Bvlgari Black1.webp", "/src/assets/Bvlgari Black/Bvlgari Black2.webp", "/src/assets/Bvlgari Black/Bvlgari Black3.webp", "/src/assets/Bvlgari Black/Bvlgari Black4.webp"], tag: "slab", type: "chinese", finishAr: "مصقول لامع", finishEn: "Polished", size: "1600 X 3200mm X 12mm" },
  { id: "007", nameEn: "Calactta Gold-X", nameAr: "كلكتا جولد إكس", images: ["/src/assets/Calactta Gold-X/Calactta Gold-X.webp", "/src/assets/Calactta Gold-X/Calartte Gold 1.webp", "/src/assets/Calactta Gold-X/Calartte Gold.webp"], tag: "slab", type: "chinese", finishAr: "مصقول لامع", finishEn: "Polished", size: "1600 X 3200mm X 12mm" },
  { id: "008", nameEn: "Calctta Macchia Vecchia", nameAr: "كلكتا ماكيا فيكيا", images: ["/src/assets/Calctta Macchia Vecchia/Calctta Macchia Vecchia.webp", "/src/assets/Calctta Macchia Vecchia/Calctta Macchia Vecchia1.webp"], tag: "slab", type: "chinese", finishAr: "مصقول لامع", finishEn: "Polished", size: "1600 X 3200mm X 12mm" },
  { id: "009", nameEn: "CHARM  IVORY", nameAr: "تشارم آيفوري", images: ["/src/assets/CHARM  IVORY/CHARM  IVORY.webp", "/src/assets/CHARM  IVORY/CHARM  IVORY1.webp", "/src/assets/CHARM  IVORY/CHARM  IVORY2.webp"], tag: "slab", type: "chinese", finishAr: "مصقول لامع", finishEn: "Polished", size: "1600 X 3200mm X 12mm" },
  { id: "010", nameEn: "CRISTALLO AMBRA", nameAr: "كريستالو أمبرا", images: ["/src/assets/CRISTALLO AMBRA/CRISTALLO AMBRA.webp"], tag: "slab", type: "chinese", finishAr: "مصقول لامع", finishEn: "Polished", size: "1600 X 3200mm X 12mm" },
  { id: "011", nameEn: "GOLD JADE", nameAr: "جولد جيد", images: ["/src/assets/GOLD JADE/GOLD JADE.webp", "/src/assets/GOLD JADE/GOLD JADE1.webp"], tag: "slab", type: "chinese", finishAr: "مصقول لامع", finishEn: "Polished", size: "1600 X 3200mm X 12mm" },
  { id: "012", nameEn: "GREEK WHITE", nameAr: "جريك وايت", images: ["/src/assets/GREEK WHITE/GREEK WHITE.webp", "/src/assets/GREEK WHITE/GREEK WHITE1.webp", "/src/assets/GREEK WHITE/GREEK WHITE2.webp", "/src/assets/GREEK WHITE/GREEK WHITE3.webp"], tag: "slab", type: "chinese", finishAr: "مصقول لامع", finishEn: "Polished", size: "1600 X 3200mm X 12mm" },
  { id: "013", nameEn: "Laurent White", nameAr: "لوران وايت", images: ["/src/assets/Laurent White/Laurent White.webp", "/src/assets/Laurent White/Laurent White1.webp"], tag: "slab", type: "chinese", finishAr: "مصقول لامع", finishEn: "Polished", size: "1600 X 3200mm X 12mm" },
  { id: "014", nameEn: "MARMO BRUNO PERLA", nameAr: "مارمو برونو بيرلا", images: ["/src/assets/MARMO BRUNO PERLA/MARMO BRUNO PERLA.webp", "/src/assets/MARMO BRUNO PERLA/MARMO BRUNO PERLA1.webp"], tag: "slab", type: "chinese", finishAr: "مصقول لامع", finishEn: "Polished", size: "1600 X 3200mm X 12mm" },
  { id: "015", nameEn: "Patagonia", nameAr: "باتاغونيا", images: ["/src/assets/Patagonia/Patagonia.webp", "/src/assets/Patagonia/Patagonia1.webp"], tag: "slab", type: "chinese", finishAr: "مصقول لامع", finishEn: "Polished", size: "1600 X 3200mm X 12mm" },
  { id: "016", nameEn: "port Laurent", nameAr: "بورت لوران", images: ["/src/assets/port Laurent/port Laurent.webp"], tag: "slab", type: "chinese", finishAr: "مصقول لامع", finishEn: "Polished", size: "1600 X 3200mm X 12mm" },
  { id: "017", nameEn: "Shakespeare Black", nameAr: "شكسبير بلاك", images: ["/src/assets/Shakespeare Black/Shakespeare Black.webp", "/src/assets/Shakespeare Black/Shakespeare Black1.webp"], tag: "slab", type: "chinese", finishAr: "مصقول لامع", finishEn: "Polished", size: "1600 X 3200mm X 12mm" },
  { id: "018", nameEn: "Statuario Gold", nameAr: "ستاتيواريو جولد", images: ["/src/assets/Statuario Gold/Statuario Gold.webp", "/src/assets/Statuario Gold/Statuario Gold2.webp", "/src/assets/Statuario Gold/Statuario Goldd1.webp"], tag: "slab", type: "chinese", finishAr: "مصقول لامع", finishEn: "Polished", size: "1600 X 3200mm X 12mm" },
  { id: "019", nameEn: "Statuario White", nameAr: "ستاتيواريو وايت", images: ["/src/assets/Statuario White/Statuario White.webp", "/src/assets/Statuario White/Statuario Whitee.webp"], tag: "slab", type: "chinese", finishAr: "مصقول لامع", finishEn: "Polished", size: "1600 X 3200mm X 12mm" },
  { id: "020", nameEn: "TAJ MAHAL", nameAr: "تاج محل", images: ["/src/assets/TAJ MAHAL/TAJ MAHAL.webp", "/src/assets/TAJ MAHAL/TAJ MAHAL1.webp"], tag: "slab", type: "chinese", finishAr: "مصقول لامع", finishEn: "Polished", size: "1600 X 3200mm X 12mm" },
  { id: "021", nameEn: "TRAVERTINO ROMANO", nameAr: "ترافنتينو رومانو", images: ["/src/assets/TRAVERTINO ROMANO/TRAVERTINO ROMANO.webp", "/src/assets/TRAVERTINO ROMANO/TRAVERTINO ROMANO1.webp", "/src/assets/TRAVERTINO ROMANO/TRAVERTINO ROMANO2.webp"], tag: "slab", type: "chinese", finishAr: "مصقول لامع", finishEn: "Polished", size: "1600 X 3200mm X 12mm" },
  { id: "022", nameEn: "Wooden", nameAr: "خشبي وودن", images: ["/src/assets/Wooden/Wooden.webp", "/src/assets/Wooden/Wooden1.webp", "/src/assets/Wooden/Wooden2.webp", "/src/assets/Wooden/Wooden3.webp", "/src/assets/Wooden/Wooden4.webp"], tag: "slab", type: "chinese", finishAr: "مصقول لامع", finishEn: "Polished", size: "1600 X 3200mm X 12mm" }
];
