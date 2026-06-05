import { PrismaClient } from "@prisma/client"
import bcrypt from "bcryptjs"

const prisma = new PrismaClient()

async function main() {
  console.log("🌱 Iniciando seeding de la base de datos...")

  // Crear familias olfativas
  const families = await prisma.olfactoryFamily.createMany({
    data: [
      { name: "Cítrica", slug: "citrica", description: "Fresca y energizante, con notas de limón, bergamota y naranja" },
      { name: "Floral", slug: "floral", description: "Romántica y elegante, con notas de rosa, jazmín y lavanda" },
      { name: "Oriental", slug: "oriental", description: "Cálida y exótica, con notas de vainilla, ámbar y especias" },
      { name: "Amaderada", slug: "amaderada", description: "Sofisticada y terrosa, con notas de sándalo, cedro y patchouli" },
      { name: "Fougère", slug: "fougere", description: "Clásica masculina, con notas de lavanda, musgo de roble y coumarina" },
      { name: "Chipre", slug: "chipre", description: "Elegante y compleja, con notas de bergamota, rosa y musgo de roble" },
      { name: "Cuero", slug: "cuero", description: "Intensa y sofisticada, con notas de cuero, tabaco y miel" },
      { name: "Frutal", slug: "frutal", description: "Vibrante y jugosa, con notas de piña, manzana, frutos rojos y grosella" },
      { name: "Acuática", slug: "acuatica", description: "Limpia y marina, con notas de sal, algas, ozono y calone" },
    ],
    skipDuplicates: true,
  })
  console.log(`✅ ${families.count} familias olfativas creadas`)

  // Crear notas olfativas
  const notes = await prisma.olfactoryNote.createMany({
    data: [
      { name: "Bergamota", slug: "bergamota" },
      { name: "Limón", slug: "limon" },
      { name: "Naranja", slug: "naranja" },
      { name: "Mandarina", slug: "mandarina" },
      { name: "Pomelo", slug: "pomelo" },
      { name: "Piña", slug: "pina" },
      { name: "Manzana", slug: "manzana" },
      { name: "Grosella Negra", slug: "grosella-negra" },
      { name: "Pera", slug: "pera" },
      { name: "Jazmín", slug: "jazmin" },
      { name: "Rosa", slug: "rosa" },
      { name: "Lavanda", slug: "lavanda" },
      { name: "Lirio de los Valles", slug: "lirio" },
      { name: "Gardenia", slug: "gardenia" },
      { name: "Iris", slug: "iris" },
      { name: "Ylang-Ylang", slug: "ylang-ylang" },
      { name: "Neroli", slug: "neroli" },
      { name: "Violeta", slug: "violeta" },
      { name: "Vainilla", slug: "vainilla" },
      { name: "Ámbar", slug: "ambar" },
      { name: "Almizcle", slug: "almizcle" },
      { name: "Pachulí", slug: "patchouli" },
      { name: "Sándalo", slug: "sandalo" },
      { name: "Cedro", slug: "cedro" },
      { name: "Vetiver", slug: "vetiver" },
      { name: "Cuero", slug: "cuero" },
      { name: "Tabaco", slug: "tabaco" },
      { name: "Musgo de Roble", slug: "musgo-roble" },
      { name: "Pimienta Negra", slug: "pimienta" },
      { name: "Canela", slug: "canela" },
      { name: "Cardamomo", slug: "cardamomo" },
      { name: "Jengibre", slug: "jengibre" },
      { name: "Menta", slug: "menta" },
      { name: "Albahaca", slug: "albahaca" },
      { name: "Romero", slug: "romero" },
      { name: "Salvia", slug: "salvia" },
      { name: "Tonka", slug: "tonka" },
      { name: "Benjuí", slug: "benjui" },
      { name: "Incenso", slug: "incenso" },
      { name: "Azafrán", slug: "azafran" },
      { name: "Café", slug: "cafe" },
      { name: "Miel", slug: "miel" },
      { name: "Enebro", slug: "enebro" },
      { name: "Pino", slug: "pino" },
      { name: "Oud", slug: "oud" },
      { name: "Sal Marina", slug: "sal-marina" },
      { name: "Geranio", slug: "geranio" },
      { name: "Cacao", slug: "cacao" },
    ],
    skipDuplicates: true,
  })
  console.log(`✅ ${notes.count} notas olfativas creadas`)

  // Crear marcas
  const brands = await prisma.brand.createMany({
    data: [
      { name: "Chanel", slug: "chanel", description: "Maison de alta costura y perfumería francesa fundada en 1910", country: "Francia" },
      { name: "Dior", slug: "dior", description: "Casa de moda y perfumería de lujo fundada en 1946", country: "Francia" },
      { name: "Creed", slug: "creed", description: "Casa de perfumería de nicho con más de 260 años de historia", country: "Francia" },
      { name: "Tom Ford", slug: "tom-ford", description: "Marca de lujo contemporánea fundada por el diseñador estadounidense", country: "Estados Unidos" },
      { name: "Guerlain", slug: "guerlain", description: "Una de las casas de perfumería más antiguas del mundo, fundada en 1828", country: "Francia" },
      { name: "Acqua di Parma", slug: "acqua-di-parma", description: "Casa italiana de fragancias de lujo fundada en 1916", country: "Italia" },
      { name: "Yves Saint Laurent", slug: "ysl", description: "Casa de moda y belleza francesa, ícono del lujo contemporáneo", country: "Francia" },
      { name: "Hermès", slug: "hermes", description: "Maison francesa de ultralujo fundada en 1837", country: "Francia" },
      { name: "Le Labo", slug: "le-labo", description: "Perfumería artesanal neoyorquina de nicho, cada fragancia compuesta a mano", country: "Estados Unidos" },
      { name: "Byredo", slug: "byredo", description: "Casa sueca de fragancias de nicho con estética minimalista contemporánea", country: "Suecia" },
      { name: "Maison Francis Kurkdjian", slug: "mfk", description: "Perfumería de nicho francesa fundada por el maestro perfumista Francis Kurkdjian", country: "Francia" },
      { name: "Jo Malone", slug: "jo-malone", description: "Casa británica de fragancias elegantes y sofisticadas para combinar", country: "Reino Unido" },
    ],
    skipDuplicates: true,
  })
  console.log(`✅ ${brands.count} marcas creadas`)

  const chanel = await prisma.brand.findUnique({ where: { slug: "chanel" } })
  const dior = await prisma.brand.findUnique({ where: { slug: "dior" } })
  const creed = await prisma.brand.findUnique({ where: { slug: "creed" } })
  const tomFord = await prisma.brand.findUnique({ where: { slug: "tom-ford" } })
  const guerlain = await prisma.brand.findUnique({ where: { slug: "guerlain" } })
  const acqua = await prisma.brand.findUnique({ where: { slug: "acqua-di-parma" } })
  const ysl = await prisma.brand.findUnique({ where: { slug: "ysl" } })
  const hermes = await prisma.brand.findUnique({ where: { slug: "hermes" } })
  const leLabo = await prisma.brand.findUnique({ where: { slug: "le-labo" } })
  const byredo = await prisma.brand.findUnique({ where: { slug: "byredo" } })
  const mfk = await prisma.brand.findUnique({ where: { slug: "mfk" } })
  const joMalone = await prisma.brand.findUnique({ where: { slug: "jo-malone" } })

  const amaderada = await prisma.olfactoryFamily.findUnique({ where: { slug: "amaderada" } })
  const floral = await prisma.olfactoryFamily.findUnique({ where: { slug: "floral" } })
  const oriental = await prisma.olfactoryFamily.findUnique({ where: { slug: "oriental" } })
  const citrica = await prisma.olfactoryFamily.findUnique({ where: { slug: "citrica" } })
  const fougere = await prisma.olfactoryFamily.findUnique({ where: { slug: "fougere" } })
  const chipre = await prisma.olfactoryFamily.findUnique({ where: { slug: "chipre" } })
  const frutal = await prisma.olfactoryFamily.findUnique({ where: { slug: "frutal" } })
  const acuatica = await prisma.olfactoryFamily.findUnique({ where: { slug: "acuatica" } })

  if (!chanel || !dior || !creed || !tomFord || !guerlain || !acqua || !ysl || !hermes || !leLabo || !byredo || !mfk || !joMalone) {
    throw new Error("No se encontraron las marcas necesarias")
  }
  if (!amaderada || !floral || !oriental || !citrica || !fougere || !chipre || !frutal || !acuatica) {
    throw new Error("No se encontraron las familias necesarias")
  }

  // Perfume images from Unsplash (stable URLs)
  const IMG = {
    bleu: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=600&q=80",
    sauvage: "https://images.unsplash.com/photo-1588701607060-4104b1776b62?w=600&q=80",
    aventus: "https://images.unsplash.com/photo-1594035910387-fae6c6c2abda?w=600&q=80",
    tobacco: "https://images.unsplash.com/photo-1547887538-e3a2f32cb1cc?w=600&q=80",
    guerlain: "https://images.unsplash.com/photo-1565843708714-52ecf69ab0f0?w=600&q=80",
    colonia: "https://images.unsplash.com/photo-1523293182086-38f79cf89a5b?w=600&q=80",
    ysl: "https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?w=600&q=80",
    hermes: "https://images.unsplash.com/photo-1592914610354-fd354ea2a3bb?w=600&q=80",
    santal: "https://images.unsplash.com/photo-1590736969955-71cc94901144?w=600&q=80",
    byredo: "https://images.unsplash.com/photo-1587017539504-67cfbddac569?w=600&q=80",
    baccarat: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=600&q=80",
    jomalone: "https://images.unsplash.com/photo-1590636495042-fba75d9b27a8?w=600&q=80",
    no5: "https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=600&q=80",
    jadore: "https://images.unsplash.com/photo-1591604466107-ec97de577aff?w=600&q=80",
    terre: "https://images.unsplash.com/photo-1563170351-be82bc888aa4?w=600&q=80",
    oud: "https://images.unsplash.com/photo-1595425964275-6e2e15949b2a?w=600&q=80",
    noir: "https://images.unsplash.com/photo-1587132129911-80e544e7e7b9?w=600&q=80",
    another: "https://images.unsplash.com/photo-1595833327635-ea585dd1735f?w=600&q=80",
  }

  const perfumes = [
    {
      name: "Bleu de Chanel",
      slug: "bleu-de-chanel",
      description: "Una fragancia amaderada aromática que encarna la libertad masculina. Composición radical que se debate entre el cielo azul y las profundidades de la tierra.",
      brandId: chanel.id,
      familyId: amaderada.id,
      concentration: "EAU_DE_PARFUM",
      gender: "MASCULINO",
      year: 2010,
      perfumer: "Jacques Polge",
      originCountry: "Francia",
      isPremium: true,
      variants: [
        { sizeMl: 50, sku: "BDC-EDP-50", price: 2899.00, comparePrice: 3199.00, stock: 15, imageUrl: IMG.bleu },
        { sizeMl: 100, sku: "BDC-EDP-100", price: 3899.00, comparePrice: 4299.00, stock: 8, imageUrl: IMG.bleu },
        { sizeMl: 150, sku: "BDC-EDP-150", price: 4899.00, stock: 3, imageUrl: IMG.bleu },
      ],
      notes: [
        { position: "SALIDA", noteSlug: "bergamota" },
        { position: "SALIDA", noteSlug: "menta" },
        { position: "SALIDA", noteSlug: "pimienta" },
        { position: "SALIDA", noteSlug: "pomelo" },
        { position: "CORAZON", noteSlug: "jazmin" },
        { position: "CORAZON", noteSlug: "jengibre" },
        { position: "CORAZON", noteSlug: "neroli" },
        { position: "FONDO", noteSlug: "sandalo" },
        { position: "FONDO", noteSlug: "cedro" },
        { position: "FONDO", noteSlug: "ambar" },
        { position: "FONDO", noteSlug: "incenso" },
      ],
    },
    {
      name: "Chanel N°5",
      slug: "chanel-n5",
      description: "El perfume más famoso del mundo. Un bouquet floral aldehídico abstracto e inconfundible. La esencia misma de la feminidad según Coco Chanel.",
      brandId: chanel.id,
      familyId: floral.id,
      concentration: "EAU_DE_PARFUM",
      gender: "FEMENINO",
      year: 1921,
      perfumer: "Ernest Beaux",
      originCountry: "Francia",
      isPremium: true,
      variants: [
        { sizeMl: 35, sku: "N5-EDP-35", price: 2299.00, stock: 10, imageUrl: IMG.no5 },
        { sizeMl: 50, sku: "N5-EDP-50", price: 3299.00, stock: 8, imageUrl: IMG.no5 },
        { sizeMl: 100, sku: "N5-EDP-100", price: 4599.00, stock: 5, imageUrl: IMG.no5 },
      ],
      notes: [
        { position: "SALIDA", noteSlug: "neroli" },
        { position: "SALIDA", noteSlug: "ylang-ylang" },
        { position: "SALIDA", noteSlug: "bergamota" },
        { position: "SALIDA", noteSlug: "limon" },
        { position: "CORAZON", noteSlug: "jazmin" },
        { position: "CORAZON", noteSlug: "rosa" },
        { position: "CORAZON", noteSlug: "lirio" },
        { position: "CORAZON", noteSlug: "iris" },
        { position: "FONDO", noteSlug: "vainilla" },
        { position: "FONDO", noteSlug: "almizcle" },
        { position: "FONDO", noteSlug: "sandalo" },
        { position: "FONDO", noteSlug: "vetiver" },
      ],
    },
    {
      name: "Sauvage",
      slug: "sauvage",
      description: "Radicalmente fresco, crudo y noble. Inspirado en los grandes espacios abiertos bajo un cielo azul cobalto. Una explosión cítrica-amaderada inolvidable.",
      brandId: dior.id,
      familyId: amaderada.id,
      concentration: "EAU_DE_PARFUM",
      gender: "MASCULINO",
      year: 2015,
      perfumer: "François Demachy",
      originCountry: "Francia",
      isPremium: true,
      variants: [
        { sizeMl: 60, sku: "SVG-EDP-60", price: 2799.00, comparePrice: 3099.00, stock: 12, imageUrl: IMG.sauvage },
        { sizeMl: 100, sku: "SVG-EDP-100", price: 3699.00, comparePrice: 4099.00, stock: 6, imageUrl: IMG.sauvage },
        { sizeMl: 200, sku: "SVG-EDP-200", price: 5299.00, stock: 2, imageUrl: IMG.sauvage },
      ],
      notes: [
        { position: "SALIDA", noteSlug: "bergamota" },
        { position: "SALIDA", noteSlug: "pimienta" },
        { position: "CORAZON", noteSlug: "lavanda" },
        { position: "CORAZON", noteSlug: "pachulí" },
        { position: "CORAZON", noteSlug: "vetiver" },
        { position: "CORAZON", noteSlug: "geranio" },
        { position: "FONDO", noteSlug: "ambar" },
        { position: "FONDO", noteSlug: "cedro" },
        { position: "FONDO", noteSlug: "almizcle" },
      ],
    },
    {
      name: "J'adore",
      slug: "jadore",
      description: "Un ramo floral absoluto que celebra la feminidad radiante. J'adore es el oro de una mujer, una declaración olfativa de alegría y sofisticación.",
      brandId: dior.id,
      familyId: floral.id,
      concentration: "EAU_DE_PARFUM",
      gender: "FEMENINO",
      year: 1999,
      perfumer: "Calice Becker",
      originCountry: "Francia",
      isPremium: true,
      variants: [
        { sizeMl: 30, sku: "JAD-EDP-30", price: 1899.00, stock: 14, imageUrl: IMG.jadore },
        { sizeMl: 50, sku: "JAD-EDP-50", price: 2899.00, stock: 10, imageUrl: IMG.jadore },
        { sizeMl: 100, sku: "JAD-EDP-100", price: 3999.00, stock: 6, imageUrl: IMG.jadore },
      ],
      notes: [
        { position: "SALIDA", noteSlug: "bergamota" },
        { position: "SALIDA", noteSlug: "mandarina" },
        { position: "SALIDA", noteSlug: "neroli" },
        { position: "CORAZON", noteSlug: "jazmin" },
        { position: "CORAZON", noteSlug: "rosa" },
        { position: "CORAZON", noteSlug: "ylang-ylang" },
        { position: "CORAZON", noteSlug: "violeta" },
        { position: "CORAZON", noteSlug: "lirio" },
        { position: "FONDO", noteSlug: "almizcle" },
        { position: "FONDO", noteSlug: "sandalo" },
        { position: "FONDO", noteSlug: "vainilla" },
        { position: "FONDO", noteSlug: "cedro" },
      ],
    },
    {
      name: "Aventus",
      slug: "aventus",
      description: "El perfume más icónico de Creed. Una fragancia que celebra la fuerza, el poder y el éxito. Inspirada en la vida de un emperador, combina piña, grosella negra y musgo.",
      brandId: creed.id,
      familyId: frutal.id,
      concentration: "EAU_DE_PARFUM",
      gender: "MASCULINO",
      year: 2010,
      perfumer: "Olivier Creed",
      originCountry: "Francia",
      isPremium: true,
      variants: [
        { sizeMl: 50, sku: "AVT-EDP-50", price: 6499.00, comparePrice: 7199.00, stock: 5, imageUrl: IMG.aventus },
        { sizeMl: 100, sku: "AVT-EDP-100", price: 8999.00, comparePrice: 9999.00, stock: 3, imageUrl: IMG.aventus },
      ],
      notes: [
        { position: "SALIDA", noteSlug: "pina" },
        { position: "SALIDA", noteSlug: "bergamota" },
        { position: "SALIDA", noteSlug: "grosella-negra" },
        { position: "SALIDA", noteSlug: "manzana" },
        { position: "CORAZON", noteSlug: "rosa" },
        { position: "CORAZON", noteSlug: "jazmin" },
        { position: "CORAZON", noteSlug: "pachulí" },
        { position: "FONDO", noteSlug: "almizcle" },
        { position: "FONDO", noteSlug: "ambar" },
        { position: "FONDO", noteSlug: "vainilla" },
        { position: "FONDO", noteSlug: "musgo-roble" },
      ],
    },
    {
      name: "Tobacco Vanille",
      slug: "tobacco-vanille",
      description: "Una fragancia opulenta que evoca un salón de caballeros victoriano. Tabaco rico, vainilla cremosa y especias orientales en perfecta armonía.",
      brandId: tomFord.id,
      familyId: oriental.id,
      concentration: "EAU_DE_PARFUM",
      gender: "UNISEX",
      year: 2007,
      perfumer: "Olivier Gillotin",
      originCountry: "Estados Unidos",
      isPremium: true,
      variants: [
        { sizeMl: 50, sku: "TV-EDP-50", price: 5799.00, comparePrice: 6499.00, stock: 7, imageUrl: IMG.tobacco },
        { sizeMl: 100, sku: "TV-EDP-100", price: 7999.00, comparePrice: 8999.00, stock: 4, imageUrl: IMG.tobacco },
      ],
      notes: [
        { position: "SALIDA", noteSlug: "tabaco" },
        { position: "SALIDA", noteSlug: "canela" },
        { position: "CORAZON", noteSlug: "vainilla" },
        { position: "CORAZON", noteSlug: "tonka" },
        { position: "CORAZON", noteSlug: "cacao" },
        { position: "FONDO", noteSlug: "almizcle" },
        { position: "FONDO", noteSlug: "ambar" },
        { position: "FONDO", noteSlug: "benjui" },
      ],
    },
    {
      name: "Oud Wood",
      slug: "oud-wood",
      description: "Una interpretación contemporánea del oud más exquisito. Notas de madera de oud ahumada entrelazadas con cardamomo, vainilla y ámbar. Misteriosa y magnética.",
      brandId: tomFord.id,
      familyId: amaderada.id,
      concentration: "EAU_DE_PARFUM",
      gender: "UNISEX",
      year: 2007,
      perfumer: "Rodrigo Flores-Roux",
      originCountry: "Estados Unidos",
      variants: [
        { sizeMl: 50, sku: "OW-EDP-50", price: 5999.00, stock: 6, imageUrl: IMG.oud },
        { sizeMl: 100, sku: "OW-EDP-100", price: 8499.00, stock: 3, imageUrl: IMG.oud },
      ],
      notes: [
        { position: "SALIDA", noteSlug: "cardamomo" },
        { position: "SALIDA", noteSlug: "rosa" },
        { position: "SALIDA", noteSlug: "pimienta" },
        { position: "CORAZON", noteSlug: "oud" },
        { position: "CORAZON", noteSlug: "sandalo" },
        { position: "CORAZON", noteSlug: "vetiver" },
        { position: "FONDO", noteSlug: "vainilla" },
        { position: "FONDO", noteSlug: "ambar" },
        { position: "FONDO", noteSlug: "tonka" },
      ],
    },
    {
      name: "Mon Guerlain",
      slug: "mon-guerlain",
      description: "Un homenaje a la feminidad actual. La lavanda carla, el jazmín sambac y la vainilla de Tahití se fusionan en una fragancia fuerte, libre y radiante.",
      brandId: guerlain.id,
      familyId: oriental.id,
      concentration: "EAU_DE_PARFUM",
      gender: "FEMENINO",
      year: 2017,
      perfumer: "Thierry Wasser",
      originCountry: "Francia",
      variants: [
        { sizeMl: 30, sku: "MG-EDP-30", price: 1999.00, stock: 10, imageUrl: IMG.guerlain },
        { sizeMl: 50, sku: "MG-EDP-50", price: 2899.00, stock: 8, imageUrl: IMG.guerlain },
        { sizeMl: 100, sku: "MG-EDP-100", price: 3999.00, stock: 5, imageUrl: IMG.guerlain },
      ],
      notes: [
        { position: "SALIDA", noteSlug: "lavanda" },
        { position: "SALIDA", noteSlug: "bergamota" },
        { position: "CORAZON", noteSlug: "jazmin" },
        { position: "CORAZON", noteSlug: "iris" },
        { position: "CORAZON", noteSlug: "rosa" },
        { position: "FONDO", noteSlug: "vainilla" },
        { position: "FONDO", noteSlug: "sandalo" },
        { position: "FONDO", noteSlug: "tonka" },
        { position: "FONDO", noteSlug: "benjui" },
      ],
    },
    {
      name: "Colonia Essenza",
      slug: "colonia-essenza",
      description: "Una reinterpretación moderna de la clásica colonia italiana. Frescura mediterránea capturada en un frasco. Bergamota, limón y neroli sobre un fondo limpio y almizclado.",
      brandId: acqua.id,
      familyId: citrica.id,
      concentration: "EAU_DE_COLOGNE",
      gender: "UNISEX",
      year: 2010,
      perfumer: "François Demachy",
      originCountry: "Italia",
      variants: [
        { sizeMl: 50, sku: "CE-EDC-50", price: 1699.00, stock: 20, imageUrl: IMG.colonia },
        { sizeMl: 100, sku: "CE-EDC-100", price: 2399.00, stock: 15, imageUrl: IMG.colonia },
        { sizeMl: 180, sku: "CE-EDC-180", price: 3099.00, stock: 10, imageUrl: IMG.colonia },
      ],
      notes: [
        { position: "SALIDA", noteSlug: "bergamota" },
        { position: "SALIDA", noteSlug: "limon" },
        { position: "SALIDA", noteSlug: "mandarina" },
        { position: "SALIDA", noteSlug: "naranja" },
        { position: "CORAZON", noteSlug: "jazmin" },
        { position: "CORAZON", noteSlug: "rosa" },
        { position: "CORAZON", noteSlug: "romero" },
        { position: "FONDO", noteSlug: "almizcle" },
        { position: "FONDO", noteSlug: "ambar" },
        { position: "FONDO", noteSlug: "pachulí" },
      ],
    },
    {
      name: "La Nuit de L'Homme",
      slug: "la-nuit-de-lhomme",
      description: "El lado oscuro y seductor del hombre YSL. Una explosión de cardamomo y bergamota que se funde con lavanda y cedro. Elegancia nocturna en cada gota.",
      brandId: ysl.id,
      familyId: oriental.id,
      concentration: "EAU_DE_TOILETTE",
      gender: "MASCULINO",
      year: 2009,
      perfumer: "Anne Flipo",
      originCountry: "Francia",
      isPremium: true,
      variants: [
        { sizeMl: 60, sku: "LNH-EDT-60", price: 2199.00, stock: 12, imageUrl: IMG.ysl },
        { sizeMl: 100, sku: "LNH-EDT-100", price: 2999.00, stock: 7, imageUrl: IMG.ysl },
      ],
      notes: [
        { position: "SALIDA", noteSlug: "cardamomo" },
        { position: "SALIDA", noteSlug: "bergamota" },
        { position: "CORAZON", noteSlug: "lavanda" },
        { position: "CORAZON", noteSlug: "cedro" },
        { position: "CORAZON", noteSlug: "violeta" },
        { position: "FONDO", noteSlug: "tonka" },
        { position: "FONDO", noteSlug: "almizcle" },
        { position: "FONDO", noteSlug: "vainilla" },
      ],
    },
    {
      name: "Terre d'Hermès",
      slug: "terre-dhermes",
      description: "Un viaje olfativo a la tierra. Mineral, vegetal y amaderado. La fuerza de la tierra transformada en perfume. Vetiver, cedro y pomelo en una composición magistral.",
      brandId: hermes.id,
      familyId: amaderada.id,
      concentration: "EAU_DE_TOILETTE",
      gender: "MASCULINO",
      year: 2006,
      perfumer: "Jean-Claude Ellena",
      originCountry: "Francia",
      isPremium: true,
      variants: [
        { sizeMl: 50, sku: "TDH-EDT-50", price: 2399.00, stock: 10, imageUrl: IMG.hermes },
        { sizeMl: 100, sku: "TDH-EDT-100", price: 3399.00, stock: 6, imageUrl: IMG.hermes },
      ],
      notes: [
        { position: "SALIDA", noteSlug: "naranja" },
        { position: "SALIDA", noteSlug: "pomelo" },
        { position: "CORAZON", noteSlug: "pimienta" },
        { position: "CORAZON", noteSlug: "geranio" },
        { position: "CORAZON", noteSlug: "pachulí" },
        { position: "FONDO", noteSlug: "vetiver" },
        { position: "FONDO", noteSlug: "cedro" },
        { position: "FONDO", noteSlug: "benjui" },
      ],
    },
    {
      name: "Santal 33",
      slug: "santal-33",
      description: "La fragancia de culto de Le Labo. Una interpretación moderna del sándalo con notas de cardamomo, iris y violeta que se funden en un acorde amaderado y ahumado adictivo.",
      brandId: leLabo.id,
      familyId: amaderada.id,
      concentration: "EAU_DE_PARFUM",
      gender: "UNISEX",
      year: 2011,
      perfumer: "Frank Voelkl",
      originCountry: "Estados Unidos",
      isPremium: true,
      variants: [
        { sizeMl: 50, sku: "S33-EDP-50", price: 5499.00, stock: 5, imageUrl: IMG.santal },
        { sizeMl: 100, sku: "S33-EDP-100", price: 7999.00, stock: 3, imageUrl: IMG.santal },
      ],
      notes: [
        { position: "SALIDA", noteSlug: "cardamomo" },
        { position: "SALIDA", noteSlug: "iris" },
        { position: "SALIDA", noteSlug: "violeta" },
        { position: "CORAZON", noteSlug: "ambar" },
        { position: "CORAZON", noteSlug: "pachulí" },
        { position: "CORAZON", noteSlug: "cedro" },
        { position: "FONDO", noteSlug: "sandalo" },
        { position: "FONDO", noteSlug: "almizcle" },
      ],
    },
    {
      name: "Another 13",
      slug: "another-13",
      description: "Una fragancia hipnótica creada en colaboración con AnOther Magazine. Ambreta sintética, jazmín y musgo se combinan en un aroma limpio, cálido y adictivamente cercano a la piel.",
      brandId: leLabo.id,
      familyId: oriental.id,
      concentration: "EAU_DE_PARFUM",
      gender: "UNISEX",
      year: 2010,
      perfumer: "Nathalie Lorson",
      originCountry: "Estados Unidos",
      variants: [
        { sizeMl: 50, sku: "A13-EDP-50", price: 5499.00, stock: 4, imageUrl: IMG.another },
        { sizeMl: 100, sku: "A13-EDP-100", price: 7999.00, stock: 2, imageUrl: IMG.another },
      ],
      notes: [
        { position: "SALIDA", noteSlug: "jazmin" },
        { position: "SALIDA", noteSlug: "pera" },
        { position: "CORAZON", noteSlug: "ambar" },
        { position: "CORAZON", noteSlug: "almizcle" },
        { position: "FONDO", noteSlug: "ambar" },
        { position: "FONDO", noteSlug: "musgo-roble" },
      ],
    },
    {
      name: "Gypsy Water",
      slug: "gypsy-water",
      description: "Una oda a la belleza de la naturaleza y al espíritu libre. Notas de bergamota, enebro y pimienta se funden con incienso, agujas de pino y sándalo cremoso.",
      brandId: byredo.id,
      familyId: amaderada.id,
      concentration: "EAU_DE_PARFUM",
      gender: "UNISEX",
      year: 2008,
      perfumer: "Jerome Epinette",
      originCountry: "Suecia",
      variants: [
        { sizeMl: 50, sku: "GW-EDP-50", price: 4799.00, stock: 6, imageUrl: IMG.byredo },
        { sizeMl: 100, sku: "GW-EDP-100", price: 6999.00, stock: 3, imageUrl: IMG.byredo },
      ],
      notes: [
        { position: "SALIDA", noteSlug: "bergamota" },
        { position: "SALIDA", noteSlug: "limon" },
        { position: "SALIDA", noteSlug: "pimienta" },
        { position: "SALIDA", noteSlug: "enebro" },
        { position: "CORAZON", noteSlug: "incenso" },
        { position: "CORAZON", noteSlug: "pino" },
        { position: "CORAZON", noteSlug: "iris" },
        { position: "FONDO", noteSlug: "ambar" },
        { position: "FONDO", noteSlug: "vainilla" },
        { position: "FONDO", noteSlug: "sandalo" },
      ],
    },
    {
      name: "Baccarat Rouge 540",
      slug: "baccarat-rouge-540",
      description: "La obra maestra de Maison Francis Kurkdjian. Un aroma cristalino y luminoso nacido del encuentro entre el jazmín de Egipto, el azafrán y la madera de cedro pulida por el ámbar.",
      brandId: mfk.id,
      familyId: oriental.id,
      concentration: "EAU_DE_PARFUM",
      gender: "UNISEX",
      year: 2014,
      perfumer: "Francis Kurkdjian",
      originCountry: "Francia",
      isPremium: true,
      variants: [
        { sizeMl: 35, sku: "BR540-EDP-35", price: 4299.00, stock: 4, imageUrl: IMG.baccarat },
        { sizeMl: 70, sku: "BR540-EDP-70", price: 6999.00, stock: 3, imageUrl: IMG.baccarat },
      ],
      notes: [
        { position: "SALIDA", noteSlug: "jazmin" },
        { position: "SALIDA", noteSlug: "azafran" },
        { position: "CORAZON", noteSlug: "ambar" },
        { position: "CORAZON", noteSlug: "cedro" },
        { position: "FONDO", noteSlug: "cedro" },
        { position: "FONDO", noteSlug: "ambar" },
      ],
    },
    {
      name: "Wood Sage & Sea Salt",
      slug: "wood-sage-sea-salt",
      description: "Escape a la costa británica. Las olas rompiendo, la brisa salada y la tierra mineral se entrelazan con la salvia amaderada. Fresca, natural y sofisticada.",
      brandId: joMalone.id,
      familyId: acuatica.id,
      concentration: "EAU_DE_COLOGNE",
      gender: "UNISEX",
      year: 2014,
      perfumer: "Christine Nagel",
      originCountry: "Reino Unido",
      variants: [
        { sizeMl: 30, sku: "WSSS-EDC-30", price: 1499.00, stock: 15, imageUrl: IMG.jomalone },
        { sizeMl: 100, sku: "WSSS-EDC-100", price: 2999.00, stock: 8, imageUrl: IMG.jomalone },
      ],
      notes: [
        { position: "SALIDA", noteSlug: "bergamota" },
        { position: "SALIDA", noteSlug: "pomelo" },
        { position: "CORAZON", noteSlug: "salvia" },
        { position: "CORAZON", noteSlug: "sal-marina" },
        { position: "FONDO", noteSlug: "almizcle" },
        { position: "FONDO", noteSlug: "ambar" },
      ],
    },
  ]

  for (const perfumeData of perfumes) {
    const { notes: perfumeNotes, variants, ...perfumeInfo } = perfumeData

    // Verificar si el perfume ya existe
    const existingPerfume = await prisma.perfume.findUnique({
      where: { slug: perfumeInfo.slug },
    })

    if (existingPerfume) {
      console.log(`⏩ Perfume ya existe: ${perfumeInfo.name}, omitiendo...`)
      continue
    }

    // Crear perfume
    const perfume = await prisma.perfume.create({
      data: {
        ...perfumeInfo,
        isVerified: true,
      },
    })

    // Crear variantes
    await prisma.variant.createMany({
      data: variants.map((v) => ({
        ...v,
        perfumeId: perfume.id,
      })),
    })

    // Crear notas del perfume
    for (const noteInfo of perfumeNotes) {
      const note = await prisma.olfactoryNote.findUnique({
        where: { slug: noteInfo.noteSlug },
      })
      if (note) {
        await prisma.perfumeNote.create({
          data: {
            perfumeId: perfume.id,
            noteId: note.id,
            position: noteInfo.position,
          },
        })
      } else {
        console.log(`⚠ Nota no encontrada: ${noteInfo.noteSlug} para ${perfume.name}`)
      }
    }

    console.log(`✅ Perfume creado: ${perfume.name} (${variants.length} variantes)`)
  }

  // Crear usuarios demo
  const hashedPassword = await bcrypt.hash("admin123", 12)

  const adminExists = await prisma.user.findUnique({ where: { email: "admin@lessence.com" } })
  if (!adminExists) {
    await prisma.user.create({
      data: {
        name: "Administrador",
        email: "admin@lessence.com",
        password: hashedPassword,
        role: "ADMIN",
      },
    })
    console.log("✅ Usuario admin creado: admin@lessence.com / admin123")
  }

  const clienteExists = await prisma.user.findUnique({ where: { email: "cliente@demo.com" } })
  if (!clienteExists) {
    await prisma.user.create({
      data: {
        name: "Cliente Demo",
        email: "cliente@demo.com",
        password: await bcrypt.hash("cliente123", 12),
        role: "CLIENTE",
      },
    })
    console.log("✅ Usuario cliente creado: cliente@demo.com / cliente123")
  }

  console.log("\n🎉 Seeding completado exitosamente!")
}

main()
  .catch((e) => {
    console.error("❌ Error durante el seeding:", e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
