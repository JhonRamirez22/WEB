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
      { name: "Jazmín", slug: "jazmin" },
      { name: "Rosa", slug: "rosa" },
      { name: "Lavanda", slug: "lavanda" },
      { name: "Lirio", slug: "lirio" },
      { name: "Gardenia", slug: "gardenia" },
      { name: "Vainilla", slug: "vainilla" },
      { name: "Ámbar", slug: "ambar" },
      { name: "Almizcle", slug: "almizcle" },
      { name: "Pachulí", slug: "patchouli" },
      { name: "Sándalo", slug: "sandalo" },
      { name: "Cedro", slug: "cedro" },
      { name: "Cuero", slug: "cuero" },
      { name: "Tabaco", slug: "tabaco" },
      { name: "Pimienta", slug: "pimienta" },
      { name: "Canela", slug: "canela" },
      { name: "Menta", slug: "menta" },
      { name: "Albahaca", slug: "albahaca" },
      { name: "Tomillo", slug: "tomillo" },
      { name: "Romerero", slug: "romero" },
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
    ],
    skipDuplicates: true,
  })
  console.log(`✅ ${brands.count} marcas creadas`)

  // Obtener IDs creados para crear perfumes
  const chanel = await prisma.brand.findUnique({ where: { slug: "chanel" } })
  const dior = await prisma.brand.findUnique({ where: { slug: "dior" } })
  const creed = await prisma.brand.findUnique({ where: { slug: "creed" } })
  const tomFord = await prisma.brand.findUnique({ where: { slug: "tom-ford" } })
  const guerlain = await prisma.brand.findUnique({ where: { slug: "guerlain" } })
  const acqua = await prisma.brand.findUnique({ where: { slug: "acqua-di-parma" } })

  const amaderada = await prisma.olfactoryFamily.findUnique({ where: { slug: "amaderada" } })
  const floral = await prisma.olfactoryFamily.findUnique({ where: { slug: "floral" } })
  const oriental = await prisma.olfactoryFamily.findUnique({ where: { slug: "oriental" } })
  const citrica = await prisma.olfactoryFamily.findUnique({ where: { slug: "citrica" } })

  if (!chanel || !dior || !creed || !tomFord || !guerlain || !acqua || !amaderada || !floral || !oriental || !citrica) {
    throw new Error("No se encontraron marcas o familias necesarias")
  }

  // Crear perfumes con variantes
  const perfumes = [
    {
      name: "Bleu de Chanel",
      slug: "bleu-de-chanel",
      description: "Una fragancia amaderada aromática que encarna la libertad masculina. Composición radical que se bate en el viento y el cielo azul.",
      brandId: chanel.id,
      familyId: amaderada.id,
      concentration: "EAU_DE_PARFUM",
      gender: "MASCULINO",
      year: 2010,
      perfumer: "Jacques Polge",
      originCountry: "Francia",
      variants: [
        { sizeMl: 50, sku: "BDC-50", price: 2899.00, stock: 15 },
        { sizeMl: 100, sku: "BDC-100", price: 3899.00, stock: 8 },
        { sizeMl: 150, sku: "BDC-150", price: 4899.00, stock: 3 },
      ],
      notes: [
        { position: "SALIDA", noteSlug: "bergamota" },
        { position: "SALIDA", noteSlug: "menta" },
        { position: "SALIDA", noteSlug: "pimienta" },
        { position: "CORAZON", noteSlug: "jazmin" },
        { position: "CORAZON", noteSlug: "almizcle" },
        { position: "FONDO", noteSlug: "sandalo" },
        { position: "FONDO", noteSlug: "cedro" },
        { position: "FONDO", noteSlug: "ambar" },
      ],
    },
    {
      name: "Sauvage",
      slug: "sauvage",
      description: "Radicalmente fresco, crudo y noble. Una composición innovadora que combina la fuerza de la naturaleza con la sofisticación moderna.",
      brandId: dior.id,
      familyId: amaderada.id,
      concentration: "EAU_DE_TOILETTE",
      gender: "MASCULINO",
      year: 2015,
      perfumer: "François Demachy",
      originCountry: "Francia",
      variants: [
        { sizeMl: 60, sku: "SVG-60", price: 2599.00, stock: 12 },
        { sizeMl: 100, sku: "SVG-100", price: 3499.00, stock: 6 },
        { sizeMl: 200, sku: "SVG-200", price: 4999.00, stock: 2 },
      ],
      notes: [
        { position: "SALIDA", noteSlug: "bergamota" },
        { position: "SALIDA", noteSlug: "pimienta" },
        { position: "CORAZON", noteSlug: "lavanda" },
        { position: "CORAZON", noteSlug: "patchouli" },
        { position: "FONDO", noteSlug: "almizcle" },
        { position: "FONDO", noteSlug: "ambar" },
      ],
    },
    {
      name: "Aventus",
      slug: "aventus",
      description: "Una fragancia poderosa y sofisticada que celebra la fuerza, el poder y el éxito. El perfume más icónico de la casa Creed.",
      brandId: creed.id,
      familyId: "amaderada" as any,
      familyId2: "frutal",
      familyIdReal: amaderada.id,
      concentration: "EAU_DE_PARFUM",
      gender: "MASCULINO",
      year: 2010,
      perfumer: "Olivier Creed",
      originCountry: "Francia",
      variants: [
        { sizeMl: 50, sku: "AVT-50", price: 5999.00, stock: 5 },
        { sizeMl: 100, sku: "AVT-100", price: 8499.00, stock: 3 },
      ],
      notes: [
        { position: "SALIDA", noteSlug: "bergamota" },
        { position: "SALIDA", noteSlug: "limon" },
        { position: "SALIDA", noteSlug: "naranja" },
        { position: "CORAZON", noteSlug: "rosa" },
        { position: "CORAZON", noteSlug: "patchouli" },
        { position: "FONDO", noteSlug: "sandalo" },
        { position: "FONDO", noteSlug: "ambar" },
        { position: "FONDO", noteSlug: "almizcle" },
      ],
    },
    {
      name: "Tobacco Vanille",
      slug: "tobacco-vanille",
      description: "Una fragancia opulenta y cálida que evoca un salón de caballeros victoriano. Notas ricas de tabaco y vainilla envueltas en especias orientales.",
      brandId: tomFord.id,
      familyId: oriental.id,
      concentration: "EAU_DE_PARFUM",
      gender: "UNISEX",
      year: 2007,
      perfumer: "Olivier Gillotin",
      originCountry: "Estados Unidos",
      variants: [
        { sizeMl: 50, sku: "TV-50", price: 5299.00, stock: 7 },
        { sizeMl: 100, sku: "TV-100", price: 7499.00, stock: 4 },
      ],
      notes: [
        { position: "SALIDA", noteSlug: "tabaco" },
        { position: "SALIDA", noteSlug: "hoja" },
        { position: "CORAZON", noteSlug: "vainilla" },
        { position: "CORAZON", noteSlug: "canela" },
        { position: "CORAZON", noteSlug: "pimienta" },
        { position: "FONDO", noteSlug: "almizcle" },
        { position: "FONDO", noteSlug: "ambar" },
      ],
    },
    {
      name: "Mon Guerlain",
      slug: "mon-guerlain",
      description: "Un homenaje a la feminidad actual, fuerte y libre. Notas de lavanda carla, jazmín sambac y vainilla de Tahití.",
      brandId: guerlain.id,
      familyId: oriental.id,
      concentration: "EAU_DE_PARFUM",
      gender: "FEMENINO",
      year: 2017,
      perfumer: "Thierry Wasser",
      originCountry: "Francia",
      variants: [
        { sizeMl: 30, sku: "MG-30", price: 1899.00, stock: 10 },
        { sizeMl: 50, sku: "MG-50", price: 2699.00, stock: 8 },
        { sizeMl: 100, sku: "MG-100", price: 3799.00, stock: 5 },
      ],
      notes: [
        { position: "SALIDA", noteSlug: "lavanda" },
        { position: "SALIDA", noteSlug: "bergamota" },
        { position: "CORAZON", noteSlug: "jazmin" },
        { position: "CORAZON", noteSlug: "rosa" },
        { position: "CORAZON", noteSlug: "lirio" },
        { position: "FONDO", noteSlug: "vainilla" },
        { position: "FONDO", noteSlug: "almizcle" },
        { position: "FONDO", noteSlug: "ambar" },
      ],
    },
    {
      name: "Colonia Essenza",
      slug: "colonia-essenza",
      description: "Una reinterpretación moderna y sofisticada de la clásica colonia italiana. Fresca, elegante y atemporal.",
      brandId: acqua.id,
      familyId: citrica.id,
      concentration: "EAU_DE_COLOGNE",
      gender: "UNISEX",
      year: 2010,
      perfumer: "Jean-Claude Ellena",
      originCountry: "Italia",
      variants: [
        { sizeMl: 50, sku: "CE-50", price: 1599.00, stock: 20 },
        { sizeMl: 100, sku: "CE-100", price: 2199.00, stock: 15 },
        { sizeMl: 180, sku: "CE-180", price: 2899.00, stock: 10 },
      ],
      notes: [
        { position: "SALIDA", noteSlug: "bergamota" },
        { position: "SALIDA", noteSlug: "limon" },
        { position: "SALIDA", noteSlug: "mandarina" },
        { position: "SALIDA", noteSlug: "naranja" },
        { position: "CORAZON", noteSlug: "romero" },
        { position: "CORAZON", noteSlug: "albahaca" },
        { position: "CORAZON", noteSlug: "rosa" },
        { position: "FONDO", noteSlug: "almizcle" },
        { position: "FONDO", noteSlug: "ambar" },
      ],
    },
  ]

  for (const perfumeData of perfumes) {
    const { notes: perfumeNotes, variants, familyId2, familyIdReal, ...perfumeInfo } = perfumeData as any

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
        familyId: familyIdReal || perfumeInfo.familyId,
      },
    })

    // Crear variantes
    await prisma.variant.createMany({
      data: variants.map((v: any) => ({
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
      }
    }

    console.log(`✅ Perfume creado: ${perfume.name} (${variants.length} variantes)`)
  }

  // Crear un usuario admin de demo
  const hashedPassword = await bcrypt.hash("admin123", 12)

  await prisma.user.create({
    data: {
      name: "Administrador",
      email: "admin@lessence.com",
      password: hashedPassword,
      role: "ADMIN",
    },
  })
  console.log(`✅ Usuario admin creado: admin@lessence.com / admin123`)

  // Crear usuario cliente de demo
  await prisma.user.create({
    data: {
      name: "Cliente Demo",
      email: "cliente@demo.com",
      password: await bcrypt.hash("cliente123", 12),
      role: "CLIENTE",
    },
  })
  console.log(`✅ Usuario cliente creado: cliente@demo.com / cliente123`)

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
