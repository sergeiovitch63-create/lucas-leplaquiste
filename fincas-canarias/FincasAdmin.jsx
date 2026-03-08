import { useState, useRef, useCallback } from "react";

// ─────────────────────────────────────────
//  DATA
// ─────────────────────────────────────────
const INITIAL_PRODUCTS = [
  {id:1,category:"Sauces",img:null,name:{es:"Pimienta Puta Madre",en:"Pimienta Puta Madre",de:"Pimienta Puta Madre"},subtitle:{es:"Pimiento rojo seco artesanal muy picante",en:"Artisanal dried red pepper, very hot",de:"Handgemachter getrockneter roter Pfeffer, sehr scharf"},desc:{es:"Pimiento rojo seco ecológico, cultivado tradicionalmente en las Islas Canarias, muy picante, cuidadosamente seleccionado y secado sin conservantes ni aditivos artificiales.",en:"Organic dried red pepper, traditionally grown in the Canary Islands, very hot, carefully selected and dried with no preservatives or artificial additives.",de:"Ökologisch getrockneter roter Pfeffer, traditionell auf den Kanarischen Inseln angebaut, sehr scharf, ohne Konservierungsstoffe."}},
  {id:2,category:"Sauces",img:null,name:{es:"Chimichurri",en:"Chimichurri",de:"Chimichurri"},subtitle:{es:"Salsa artesanal natural",en:"Natural artisan sauce",de:"Natürliche handgemachte Sauce"},desc:{es:"Salsa 100% natural elaborada de manera artesanal a partir de una mezcla de hierbas y especias, con aceite y vinagre, sin conservantes ni aditivos artificiales.",en:"100% natural sauce, artisanally made from a blend of herbs and spices with oil and vinegar, no preservatives or artificial additives.",de:"100% natürliche Sauce, handwerklich aus Kräutern und Gewürzen mit Öl und Essig hergestellt, ohne Konservierungsstoffe."}},
  {id:3,category:"Conserves",img:null,name:{es:"Antipasto Mix",en:"Antipasto Mix",de:"Antipasto Mix"},subtitle:{es:"Mezcla de verduras en conserva artesanal",en:"Artisanal mixed vegetable preserve",de:"Handgemachtes gemischtes Gemüsekonserve"},desc:{es:"Mezcla ecológica de verduras seleccionadas — berenjenas, calabacines, pimientos y zanahorias — conservadas en vinagre natural.",en:"Organic mix of selected vegetables — aubergines, courgettes, peppers and carrots — preserved in natural vinegar.",de:"Ökologische Mischung ausgewählter Gemüsesorten in natürlichem Essig konserviert, ohne Konservierungsstoffe."}},
  {id:4,category:"Conserves",img:null,name:{es:"Rabanitos",en:"Pickled Radishes",de:"Eingelegte Radieschen"},subtitle:{es:"Rabanitos encurtidos artesanales de Tenerife",en:"Artisanal pickled radishes from Tenerife",de:"Handgemachte eingelegte Radieschen aus Teneriffa"},desc:{es:"Rábanos ecológicos cultivados y encurtidos artesanalmente en Tenerife con métodos tradicionales. Sabor intenso, ligeramente ácido y crujiente.",en:"Organic radishes grown and pickled by hand in Tenerife using traditional methods. Intense, slightly acidic and crunchy flavour.",de:"Ökologische Radieschen, in Teneriffa mit traditionellen Methoden von Hand eingelegt."}},
  {id:5,category:"Conserves",img:null,name:{es:"Pimiento Redondo",en:"Round Sweet Pepper",de:"Runde Paprikaschote"},subtitle:{es:"Pimiento dulce pequeño artesanal",en:"Small artisanal sweet pepper",de:"Kleine handgemachte süße Paprika"},desc:{es:"Pequeño pimiento dulce cultivado y preparado artesanalmente en Tenerife. Textura crujiente, sabor dulce y ligeramente afrutado.",en:"Small sweet pepper grown and artisanally prepared in Tenerife. Crunchy texture and sweet, slightly fruity flavour.",de:"Kleine süße Paprika, in Teneriffa handwerklich zubereitet."}},
  {id:6,category:"Conserves",img:null,name:{es:"Zanahoria",en:"Preserved Carrots",de:"Eingelegte Karotten"},subtitle:{es:"Zanahorias enteras en conserva artesanal",en:"Whole artisanal carrot preserve",de:"Ganze handgemachte Karottenkonserve"},desc:{es:"Zanahorias ecológicas enteras, conservadas en vinagre natural con sal y ajo, sin conservantes ni aditivos artificiales.",en:"Whole organic carrots preserved in natural vinegar with salt and garlic, no preservatives or artificial additives.",de:"Ganze ökologische Karotten in natürlichem Essig mit Knoblauch konserviert, ohne Konservierungsstoffe."}},
  {id:7,category:"Conserves",img:null,name:{es:"Remolachas",en:"Pickled Beetroots",de:"Eingelegte Rote Bete"},subtitle:{es:"Remolachas artesanales de Tenerife",en:"Artisanal beetroots from Tenerife",de:"Handgemachte Rote Bete aus Teneriffa"},desc:{es:"Remolachas rojas ecológicas, cultivadas y preparadas a mano en Tenerife. Encurtidas en vinagre y especias naturales.",en:"Organic red beetroots grown and prepared by hand in Tenerife. Pickled in vinegar and natural spices.",de:"Ökologische rote Rüben, in Teneriffa von Hand angebaut und in Essig eingelegt."}},
  {id:8,category:"Sauces",img:null,name:{es:"Pimienta Palmera",en:"Palmera Pepper",de:"Palmera Pfeffer"},subtitle:{es:"Pimiento rojo seco artesanal de La Palma",en:"Artisanal dried red pepper from La Palma",de:"Handgemachter getrockneter roter Pfeffer aus La Palma"},desc:{es:"Pimiento rojo seco ecológico de La Palma, suave a ligeramente picante, seleccionado y secado sin conservantes ni aditivos.",en:"Organic dried red pepper from La Palma, mild to slightly hot, selected and dried with no preservatives or additives.",de:"Ökologisch getrockneter roter Pfeffer aus La Palma, mild bis leicht scharf, ohne Konservierungsstoffe."}},
  {id:9,category:"Conserves",img:null,name:{es:"Berenjena",en:"Preserved Aubergine",de:"Auberginen-Konserve"},subtitle:{es:"Berenjena en conserva artesanal",en:"Artisanal preserved aubergine",de:"Handgemachte Auberginen-Konserve"},desc:{es:"Berenjenas ecológicas conservadas en vinagre natural con sal y ajo, sin conservantes ni aditivos artificiales.",en:"Organic aubergines preserved in natural vinegar with salt and garlic, no preservatives or artificial additives.",de:"Ökologische Auberginen in natürlichem Essig mit Knoblauch konserviert, ohne Konservierungsstoffe."}},
  {id:10,category:"Confitures",img:null,name:{es:"Dulce de Plátano",en:"Banana Sweet",de:"Bananenkonfekt"},subtitle:{es:"Dulce artesanal de plátano de Tenerife",en:"Artisanal Tenerife banana sweet",de:"Handgemachtes Teneriffa-Bananenkonfekt"},desc:{es:"Dulce preparado con plátanos de Tenerife, con textura similar a la pasta de membrillo. Ideal con quesos, pan o galletas. Sin gluten y apto para veganos.",en:"Sweet made with Tenerife bananas, with a texture similar to quince paste. Ideal with cheeses, bread or biscuits. Gluten-free and vegan.",de:"Konfekt aus Teneriffa-Bananen mit einer Textur ähnlich wie Quittenpaste. Glutenfrei und vegan."}},
  {id:11,category:"Sauces",img:null,name:{es:"Crema de Vinagre",en:"Vinegar Cream",de:"Essigcreme"},subtitle:{es:"Crema agridulce de frutas canarias",en:"Sweet and sour Canarian fruit cream",de:"Süß-saure kanarische Fruchtsauce"},desc:{es:"Preparada con pulpa de fruta — plátano, mango, pimiento rojo o maracuyá. Sin grasas, sin gluten y apta para veganos.",en:"Made with fruit pulp — banana, mango, red pepper or passion fruit. Fat-free, gluten-free and vegan.",de:"Aus Fruchtfleisch — Banane, Mango, roter Paprika oder Maracuja. Fettfrei, glutenfrei und vegan."}},
  {id:12,category:"Sauces",img:null,name:{es:"Vinagre de Plátano",en:"Banana Vinegar",de:"Bananenessig"},subtitle:{es:"Vinagre artesanal de plátano de Tenerife",en:"Artisanal Tenerife banana vinegar",de:"Handgemachter Teneriffa-Bananenessig"},desc:{es:"Obtenido a partir de plátanos de Tenerife, ligeramente afrutado y con una suave dulzura. Ideal para aliñar ensaladas y marinar pescados.",en:"Made from Tenerife bananas, lightly fruity with a gentle sweetness. Ideal for dressing salads and marinating fish.",de:"Aus Teneriffa-Bananen hergestellt, leicht fruchtig mit milder Süße."}},
  {id:13,category:"Vins",img:null,name:{es:"Vino Pasión Frizzante",en:"Passion Frizzante Wine",de:"Passion Frizzante Wein"},subtitle:{es:"Vino espumoso de plátano y maracuyá · 5,5% vol.",en:"Sparkling banana & passion fruit wine · 5.5% vol.",de:"Prickelnder Bananen- & Maracujawein · 5,5 Vol.-%"},desc:{es:"Obtenido por fermentación de plátanos y maracuyá de Tenerife. 5,5% vol. Ideal para aperitivos, pescado, ensaladas o postres de chocolate.",en:"Made by fermenting Tenerife bananas and passion fruit. 5.5% vol. Ideal for aperitifs, fish, salads or chocolate desserts.",de:"Durch die Fermentierung von Teneriffa-Bananen und Maracuja gewonnen. 5,5 Vol.-%."}},
  {id:14,category:"Vins",img:null,name:{es:"Vino Afrutado Semidulce de Plátano",en:"Semi-Sweet Fruity Banana Wine",de:"Halbsüßer Fruchtiger Bananenwein"},subtitle:{es:"Vino semidulce de plátano · 12% vol. · Sin uva",en:"Semi-sweet banana wine · 12% vol. · Grape-free",de:"Halbsüßer Bananenwein · 12 Vol.-% · Traubenfrei"},desc:{es:"Elaborado con plátanos de Tenerife en su punto óptimo de maduración, sin uva. 12% vol. Ideal con antipasti, sushi o postres.",en:"Made with Tenerife bananas at optimal ripeness, grape-free. 12% vol. Ideal with antipasti, sushi or desserts.",de:"Aus Teneriffa-Bananen, traubenfrei. 12 Vol.-%."}},
  {id:15,category:"Vins",img:null,name:{es:"Vino Blanco Semiseco de Plátano",en:"Semi-Dry White Banana Wine",de:"Halbtrockener Weißer Bananenwein"},subtitle:{es:"Vino blanco semiseco · 12,5% vol. · Sin uva",en:"Semi-dry white wine · 12.5% vol. · Grape-free",de:"Halbtrockener Weißwein · 12,5 Vol.-% · Traubenfrei"},desc:{es:"Elaborado con plátanos de Tenerife, sin uva. 12,5% vol. Ideal con pescado, mariscos o carnes blancas.",en:"Made with Tenerife bananas, grape-free. 12.5% vol. Ideal with fish, seafood or white meats.",de:"Aus Teneriffa-Bananen, traubenfrei. 12,5 Vol.-%."}},
  {id:16,category:"Packs",img:null,name:{es:"Pack de 3 Mojos",en:"3 Mojos Pack",de:"3 Mojos Paket"},subtitle:{es:"Mojo rojo suave, rojo picón y verde · Sin gluten",en:"Mild red, spicy red & green mojo · Gluten-free",de:"Milder roter, scharfer roter & grüner Mojo · Glutenfrei"},desc:{es:"Pack con las tres salsas mojo canario: rojo suave, rojo picante y verde. Sin gluten.",en:"Pack with the three Canarian mojo sauces: mild red, spicy red and green. Gluten-free.",de:"Paket mit den drei kanarischen Mojo-Saucen. Glutenfrei."}},
  {id:17,category:"Sauces",img:null,name:{es:"Mojo Rojo Picón",en:"Spicy Red Mojo",de:"Scharfer Roter Mojo"},subtitle:{es:"Salsa mojo canaria roja picante · Sin gluten",en:"Spicy Canarian red mojo sauce · Gluten-free",de:"Scharfe kanarische rote Mojo-Sauce · Glutenfrei"},desc:{es:"Salsa mojo canaria roja picante elaborada según la receta tradicional con aceite, pimiento rojo picante, ajo, vinagre y especias. Sin gluten.",en:"Spicy Canarian red mojo sauce made following the traditional recipe with oil, hot red pepper, garlic, vinegar and spices. Gluten-free.",de:"Scharfe kanarische rote Mojo-Sauce nach traditionellem Rezept. Glutenfrei."}},
  {id:18,category:"Sauces",img:null,name:{es:"Mojo Rojo Suave",en:"Mild Red Mojo",de:"Milder Roter Mojo"},subtitle:{es:"Salsa mojo canaria roja suave · Sin gluten",en:"Mild Canarian red mojo sauce · Gluten-free",de:"Milde kanarische rote Mojo-Sauce · Glutenfrei"},desc:{es:"Salsa mojo canaria roja suave elaborada según la receta tradicional. Sabor aromático y auténtico. Sin gluten.",en:"Mild Canarian red mojo sauce made following the traditional recipe. Aromatic and authentic flavour. Gluten-free.",de:"Milde kanarische rote Mojo-Sauce nach traditionellem Rezept. Glutenfrei."}},
  {id:19,category:"Biscuits",img:null,name:{es:"Merengues",en:"Meringues",de:"Baiser"},subtitle:{es:"Merengues artesanales · 12 sabores · Sin gluten",en:"Artisanal meringues · 12 flavours · Gluten-free",de:"Handgemachte Baiser · 12 Sorten · Glutenfrei"},desc:{es:"Merengues artesanales ligeros y crujientes disponibles en doce sabores. Sin gluten.",en:"Light and crispy artisanal meringues available in twelve flavours. Gluten-free.",de:"Leichte und knusprige handgemachte Baiser in zwölf Sorten. Glutenfrei."}},
  {id:20,category:"Biscuits",img:null,name:{es:"Galleta Ginger",en:"Ginger Biscuit",de:"Ingwer-Keks"},subtitle:{es:"Galleta artesanal de jengibre y harina de plátano · Sin gluten",en:"Artisanal ginger & banana flour biscuit · Gluten-free",de:"Handgemachter Ingwer- & Bananenmehl-Keks · Glutenfrei"},desc:{es:"Galleta artesanal con jengibre y canela, elaborada con harina de plátano verde. Sin gluten.",en:"Artisanal biscuit with ginger and cinnamon, made with green banana flour. Gluten-free.",de:"Handgemachter Keks mit Ingwer und Zimt aus grünem Bananenmehl. Glutenfrei."}},
  {id:21,category:"Biscuits",img:null,name:{es:"Galleta Choco Nueces",en:"Choco Walnut Biscuit",de:"Schoko-Walnuss-Keks"},subtitle:{es:"Galleta artesanal de chocolate negro y nueces · Sin gluten",en:"Artisanal dark chocolate & walnut biscuit · Gluten-free",de:"Handgemachter Zartbitterschokolade-Walnuss-Keks · Glutenfrei"},desc:{es:"Galleta crujiente con harina de plátano verde, chocolate negro y nueces. Sin gluten.",en:"Crunchy biscuit with green banana flour, dark chocolate and walnuts. Gluten-free.",de:"Knuspriger Keks aus grünem Bananenmehl mit Zartbitterschokolade und Walnüssen. Glutenfrei."}},
  {id:22,category:"Biscuits",img:null,name:{es:"Galleta Estilo Gomera",en:"Gomera Style Biscuit",de:"Gomera-Style-Keks"},subtitle:{es:"Galleta artesanal inspirada en La Gomera · Sin gluten",en:"Artisanal biscuit inspired by La Gomera · Gluten-free",de:"Handgemachter Keks inspiriert von La Gomera · Glutenfrei"},desc:{es:"Galleta artesanal inspirada en La Gomera, con harina de plátano verde, limón, anís y canela. Sin gluten.",en:"Artisanal biscuit inspired by La Gomera, with green banana flour, lemon, anise and cinnamon. Gluten-free.",de:"Handgemachter Keks inspiriert von La Gomera, aus grünem Bananenmehl. Glutenfrei."}},
  {id:23,category:"Sauces",img:null,name:{es:"Adobo Gomero",en:"Adobo Gomero",de:"Adobo Gomero"},subtitle:{es:"Condimento tradicional de La Gomera · 100% natural",en:"Traditional La Gomera seasoning · 100% natural",de:"Traditionelles Gewürz aus La Gomera · 100% natürlich"},desc:{es:"Condimento tradicional de La Gomera con sal, pimienta, comino, pimentón, ajo, cayena, orégano y laurel.",en:"Traditional La Gomera seasoning with salt, pepper, cumin, paprika, garlic, cayenne, oregano and bay leaf.",de:"Traditionelles Gewürz aus La Gomera mit Salz, Pfeffer, Kreuzkümmel und Gewürzen."}},
  {id:24,category:"Sauces",img:null,name:{es:"Mojo Gomero de Picón",en:"Gomero Spicy Mojo",de:"Gomero Pikanter Mojo"},subtitle:{es:"Receta tradicional de La Gomera · Picante",en:"Traditional La Gomera recipe · Spicy",de:"Traditionelles Rezept aus La Gomera · Scharf"},desc:{es:"Receta tradicional de La Gomera con pimiento local, aceite, vinagre, ajo y especias.",en:"Traditional La Gomera recipe with local pepper, oil, vinegar, garlic and spices.",de:"Traditionelles Rezept aus La Gomera mit lokalem Pfeffer, Öl, Essig und Gewürzen."}},
  {id:25,category:"Sauces",img:null,name:{es:"Mojo Gomero de Cilantro",en:"Gomero Coriander Mojo",de:"Gomero Koriander Mojo"},subtitle:{es:"Receta tradicional de La Gomera · Cilantro",en:"Traditional La Gomera recipe · Coriander",de:"Traditionelles Rezept aus La Gomera · Koriander"},desc:{es:"Receta tradicional de La Gomera con cilantro, aceite, vinagre, ajo y especias.",en:"Traditional La Gomera recipe with coriander, oil, vinegar, garlic and spices.",de:"Traditionelles Rezept aus La Gomera mit Koriander, Öl, Essig und Gewürzen."}},
  {id:26,category:"Sauces",img:null,name:{es:"Almogrote",en:"Almogrote",de:"Almogrote"},subtitle:{es:"Crema canaria de queso curado · 8 sabores",en:"Canarian cured cheese spread · 8 flavours",de:"Kanarischer Hartkäse-Aufstrich · 8 Sorten"},desc:{es:"Crema tradicional canaria de queso de cabra curado, aceite, ajo y especias. Disponible en 8 sabores y pack degustación.",en:"Traditional Canarian spread from cured goat's cheese, oil, garlic and spices. 8 flavours and tasting pack.",de:"Traditioneller kanarischer Aufstrich aus gereiftem Ziegenkäse. In 8 Geschmacksrichtungen erhältlich."}},
  {id:27,category:"Sauces",img:null,name:{es:"Sol Picón",en:"Sol Picón",de:"Sol Picón"},subtitle:{es:"Salsa picante artesanal ecológica · 100% natural",en:"Artisanal organic hot sauce · 100% natural",de:"Handgemachte Bio-Chilisauce · 100% natürlich"},desc:{es:"Salsa picante 100% natural y ecológica de pimientos amarillos y especias. Sin conservantes ni aditivos.",en:"100% natural and organic hot sauce from yellow peppers and spices. No preservatives or additives.",de:"100% natürliche und ökologische Chilisauce aus gelben Paprikaschoten. Ohne Konservierungsstoffe."}},
  {id:28,category:"Sauces",img:null,name:{es:"Guayota",en:"Guayota",de:"Guayota"},subtitle:{es:"Salsa picante natural de pimientos piconas · Artesanal",en:"Natural hot sauce with picona peppers · Artisanal",de:"Natürliche Chilisauce mit Picona-Paprika · Handgemacht"},desc:{es:"Salsa picante 100% natural con pimientos rojos piconas de Tenerife y vinagre de manzana. Sabor intenso con notas afrutadas.",en:"100% natural hot sauce with Tenerife picona red peppers and apple vinegar. Intense flavour with fruity notes.",de:"100% natürliche Chilisauce aus roten Picona-Paprikaschoten aus Teneriffa und Apfelessig."}},
  {id:29,category:"Sauces",img:null,name:{es:"Pimentón Picante",en:"Hot Paprika",de:"Scharfes Paprikapulver"},subtitle:{es:"Pimentón 100% natural de Tenerife",en:"100% natural paprika from Tenerife",de:"100% natürliches Paprikapulver aus Teneriffa"},desc:{es:"Pimentón picante 100% natural de pimientos de Tenerife. Picante moderado. Ideal para salsas, carnes y verduras.",en:"100% natural hot paprika from Tenerife peppers. Moderate heat. Ideal for sauces, meats and vegetables.",de:"100% natürliches scharfes Paprikapulver aus Teneriffa. Ideal für Saucen, Fleisch oder Suppen."}},
  {id:30,category:"Sauces",img:null,name:{es:"Palmera Ginger Roja Bio",en:"Palmera Ginger Red Bio",de:"Palmera Ginger Rot Bio"},subtitle:{es:"Salsa picante ecológica de jengibre fresco · 100% natural",en:"Organic fresh ginger hot sauce · 100% natural",de:"Bio-Ingwer-Chilisauce · 100% natürlich"},desc:{es:"Salsa picante ecológica con jengibre fresco, vinagre de manzana, ajo y azúcar de caña. Equilibrio entre picante y dulzura.",en:"Organic hot sauce with fresh ginger, apple vinegar, garlic and cane sugar. Perfect balance between heat and sweetness.",de:"Bio-Chilisauce mit frischem Ingwer, Apfelessig, Knoblauch und Rohrzucker."}},
  {id:31,category:"Sauces",img:null,name:{es:"Mojo Picón",en:"Mojo Picón",de:"Mojo Picón"},subtitle:{es:"Salsa picante artesanal canaria · Ecológica · Sin conservantes",en:"Artisanal Canarian spicy sauce · Organic · No preservatives",de:"Handgemachte kanarische Chilisauce · Bio · Ohne Konservierungsstoffe"},desc:{es:"Salsa picante 100% natural con pimientos piconas, ajo, vinagre, aceite de oliva y sal. Sin conservantes.",en:"100% natural spicy sauce with picona peppers, garlic, vinegar, olive oil and salt. No preservatives.",de:"100% natürliche scharfe Sauce aus Picona-Paprikaschoten, Knoblauch, Essig und Olivenöl."}},
  {id:32,category:"Sauces",img:null,name:{es:"Sal con Pimienta",en:"Pepper Salt",de:"Pfeffersalz"},subtitle:{es:"Sal marina de La Palma con pimienta ecológica de Tenerife",en:"La Palma sea salt with organic Tenerife pepper",de:"La-Palma-Meersalz mit Bio-Teneriffa-Pfeffer"},desc:{es:"Mezcla de sal marina de La Palma y pimienta ecológica de Tenerife. 100% natural.",en:"Blend of La Palma sea salt and organic Tenerife pepper. 100% natural.",de:"Mischung aus La-Palma-Meersalz und Bio-Teneriffa-Pfeffer. 100% natürlich."}},
  {id:33,category:"Miel",img:null,name:{es:"Miel de Tajinaste",en:"Tajinaste Honey",de:"Tajinaste-Honig"},subtitle:{es:"Miel 100% natural y artesanal de flor de tajinaste",en:"100% natural artisanal tajinaste flower honey",de:"100% natürlicher handgemachter Tajinaste-Blütenhonig"},desc:{es:"Miel 100% natural de la flor del tajinaste, planta emblemática de Tenerife. Sabor suave con aroma floral.",en:"100% natural honey from the tajinaste flower, emblematic of Tenerife. Soft flavour with floral aroma.",de:"100% natürlicher Honig aus der Tajinaste-Blüte Teneriffas. Sanfter Geschmack mit Blumenaroma."}},
  {id:34,category:"Miel",img:null,name:{es:"Miel con Jalea Real",en:"Honey with Royal Jelly",de:"Honig mit Gelée Royale"},subtitle:{es:"Miel 100% natural con jalea real · Energía y vitalidad",en:"100% natural honey with royal jelly · Energy & vitality",de:"100% natürlicher Honig mit Gelée Royale · Energie & Vitalität"},desc:{es:"Miel 100% natural combinada con jalea real. Aporta energía y vitalidad.",en:"100% natural honey combined with royal jelly. Provides energy and vitality.",de:"100% natürlicher Honig mit Gelée Royale. Ideal für Aufgüsse oder Brot."}},
  {id:35,category:"Miel",img:null,name:{es:"Miel con Polen",en:"Honey with Pollen",de:"Honig mit Pollen"},subtitle:{es:"Miel 100% natural con polen · Proteínas y minerales",en:"100% natural honey with pollen · Proteins & minerals",de:"100% natürlicher Honig mit Pollen · Proteine & Mineralien"},desc:{es:"Miel 100% natural con polen. Aporta proteínas y minerales.",en:"100% natural honey with pollen. Provides proteins and minerals.",de:"100% natürlicher Honig mit Pollen. Liefert Proteine und Mineralien."}},
  {id:36,category:"Miel",img:null,name:{es:"Zum 4",en:"Zum 4",de:"Zum 4"},subtitle:{es:"Miel cremoso con propóleos, polen y jalea real",en:"Creamy honey with propolis, pollen & royal jelly",de:"Cremiger Honig mit Propolis, Pollen & Gelée Royale"},desc:{es:"Miel cremoso 100% natural con propóleos, polen y jalea real.",en:"100% natural creamy honey with propolis, pollen and royal jelly.",de:"100% natürlicher cremiger Honig mit Propolis, Pollen und Gelée Royale."}},
  {id:37,category:"Miel",img:null,name:{es:"Miel de Tenerife",en:"Tenerife Honey",de:"Teneriffa-Honig"},subtitle:{es:"Miel 100% natural y artesanal de Tenerife",en:"100% natural artisanal honey from Tenerife",de:"100% natürlicher handgemachter Honig aus Teneriffa"},desc:{es:"Miel 100% natural y artesanal sin aditivos ni tratamiento industrial.",en:"100% natural artisanal honey with no additives or industrial processing.",de:"100% natürlicher handgemachter Honig ohne Zusatzstoffe."}},
  {id:38,category:"Vins",img:null,name:{es:"Ocho Islas Tinto Roble",en:"Ocho Islas Tinto Roble",de:"Ocho Islas Tinto Roble"},subtitle:{es:"Tinto de Tenerife · Listán Negro, Castelao, Tintilla · Bodega Tafuriaste",en:"Tenerife red wine · Listán Negro, Castelao, Tintilla · Bodega Tafuriaste",de:"Teneriffa-Rotwein · Listán Negro, Castelao, Tintilla · Bodega Tafuriaste"},desc:{es:"Vino tinto de Tenerife con Listán Negro, Castelao y Tintilla, criado en barrica de roble.",en:"Tenerife red wine with Listán Negro, Castelao and Tintilla, aged in oak barrels.",de:"Teneriffa-Rotwein aus Listán Negro, Castelao und Tintilla, in Eichenholzfässern gereift."}},
  {id:39,category:"Vins",img:null,name:{es:"La Suertita Blanco Afrutado",en:"La Suertita Fruity White",de:"La Suertita Fruchtiger Weißwein"},subtitle:{es:"Blanco afrutado de Tenerife · Listán Blanco · Ligeramente dulce",en:"Fruity Tenerife white · Listán Blanco · Slightly sweet",de:"Fruchtiger Teneriffa-Weißwein · Listán Blanco · Leicht süß"},desc:{es:"Listán Blanco aromático y ligeramente dulce, con notas de frutas tropicales. Perfecto como aperitivo. Servir bien frío.",en:"Aromatic and slightly sweet Listán Blanco, with tropical fruit notes. Perfect as an aperitif. Serve well chilled.",de:"Aromatischer leicht süßer Listán Blanco mit Tropenfrucht-Noten. Gut gekühlt servieren."}},
  {id:40,category:"Vins",img:null,name:{es:"La Suertita Blanco Seco",en:"La Suertita Dry White",de:"La Suertita Trockener Weißwein"},subtitle:{es:"Blanco seco de Tenerife · Listán Blanco · Fresco y ligero",en:"Dry Tenerife white · Listán Blanco · Fresh and light",de:"Trockener Teneriffa-Weißwein · Listán Blanco · Frisch und leicht"},desc:{es:"Listán Blanco con notas de cítricos y manzana verde. Ideal con pescados y ensaladas.",en:"Listán Blanco with notes of citrus and green apple. Ideal with fish and salads.",de:"Listán Blanco mit Zitrus- und Grünapfel-Noten. Ideal zu Fisch und Salaten."}},
  {id:41,category:"Snacks",img:null,name:{es:"Barrita Plátano, Avellanas y Chocolate",en:"Banana, Hazelnut & Chocolate Bar",de:"Bananen-, Haselnuss- & Schokoladen-Riegel"},subtitle:{es:"Plátano deshidratado de Canarias · Sin conservantes ni colorantes",en:"Dehydrated Canary Islands banana · No preservatives or colourings",de:"Getrocknete Kanarische Banane · Ohne Konservierungsstoffe oder Farbstoffe"},desc:{es:"Plátano deshidratado (65%), chocolate 74% y avellanas (35%). Sin conservantes ni colorantes.",en:"Dehydrated banana (65%), 74% chocolate and hazelnuts (35%). No preservatives or colourings.",de:"Getrocknete Banane (65%), 74% Schokolade und Haselnüsse (35%). Ohne Konservierungsstoffe."}},
  {id:42,category:"Snacks",img:null,name:{es:"Barrita Plátano, Almendras y Chocolate",en:"Banana, Almond & Chocolate Bar",de:"Bananen-, Mandel- & Schokoladen-Riegel"},subtitle:{es:"Plátano deshidratado de Canarias · Sin conservantes ni colorantes",en:"Dehydrated Canary Islands banana · No preservatives or colourings",de:"Getrocknete Kanarische Banane · Ohne Konservierungsstoffe oder Farbstoffe"},desc:{es:"Plátano deshidratado (65%), almendras (35%) y chips de chocolate 74%. Sin conservantes.",en:"Dehydrated banana (65%), almonds (35%) and 74% chocolate chips. No preservatives.",de:"Getrocknete Banane (65%), Mandeln (35%) und 74% Schokoladenstückchen. Ohne Konservierungsstoffe."}},
  {id:43,category:"Biscuits",img:null,name:{es:"Bombón Plátano, Chocolate y Avellanas · Naturjube",en:"Banana, Chocolate & Hazelnut Bonbon · Naturjube",de:"Bananen-, Schokoladen- & Haselnuss-Bonbon · Naturjube"},subtitle:{es:"Plátano deshidratado · Chocolate negro 55% · Sin azúcares añadidos",en:"Dehydrated banana · 55% dark chocolate · No added sugars",de:"Getrocknete Banane · 55% Zartbitterschokolade · Ohne Zuckerzusatz"},desc:{es:"Plátano deshidratado, chocolate negro 55% y avellanas. Sin conservantes ni azúcares añadidos.",en:"Dehydrated banana, 55% dark chocolate and hazelnuts. No preservatives or added sugars.",de:"Getrocknete Banane, 55% Zartbitterschokolade und Haselnüsse. Ohne Konservierungsstoffe."}},
  {id:44,category:"Biscuits",img:null,name:{es:"Bombón Plátano, Chocolate y Cacahuetes",en:"Banana, Chocolate & Peanut Bonbon",de:"Bananen-, Schokoladen- & Erdnuss-Bonbon"},subtitle:{es:"Plátano deshidratado · Chocolate negro 55% · Sin azúcares añadidos",en:"Dehydrated banana · 55% dark chocolate · No added sugars",de:"Getrocknete Banane · 55% Zartbitterschokolade · Ohne Zuckerzusatz"},desc:{es:"Plátano deshidratado, chocolate negro 55% y cacahuetes. Sin conservantes ni azúcares añadidos.",en:"Dehydrated banana, 55% dark chocolate and peanuts. No preservatives or added sugars.",de:"Getrocknete Banane, 55% Zartbitterschokolade und Erdnüsse. Ohne Konservierungsstoffe."}},
  {id:45,category:"Biscuits",img:null,name:{es:"Plátano Deshidratado con Chocolate Negro",en:"Dehydrated Banana with Dark Chocolate",de:"Getrocknete Banane mit Zartbitterschokolade"},subtitle:{es:"Plátano 100% natural · Chocolate 55% cacao · Sin conservantes",en:"100% natural banana · 55% cocoa chocolate · No preservatives",de:"100% natürliche Banane · 55% Kakao-Schokolade · Ohne Konservierungsstoffe"},desc:{es:"Plátano deshidratado con chocolate negro 55%. Sin conservantes ni colorantes.",en:"Dehydrated banana with 55% dark chocolate. No preservatives or colourings.",de:"Getrocknete Banane mit 55% Zartbitterschokolade. Ohne Konservierungsstoffe."}},
  {id:46,category:"Biscuits",img:null,name:{es:"Plátano Deshidratado con Cacao Puro",en:"Dehydrated Banana with Pure Cocoa",de:"Getrocknete Banane mit reinem Kakao"},subtitle:{es:"Plátano 100% natural · Cacao puro · Sin azúcares añadidos",en:"100% natural banana · Pure cocoa · No added sugars",de:"100% natürliche Banane · Reiner Kakao · Ohne Zuckerzusatz"},desc:{es:"Plátano deshidratado con cacao puro. Sin conservantes ni azúcares añadidos.",en:"Dehydrated banana with pure cocoa. No preservatives or added sugars.",de:"Getrocknete Banane mit reinem Kakao. Ohne Konservierungsstoffe oder Zuckerzusatz."}},
  {id:47,category:"Biscuits",img:null,name:{es:"Plátano Deshidratado con Gofio",en:"Dehydrated Banana with Gofio",de:"Getrocknete Banane mit Gofio"},subtitle:{es:"Plátano 100% natural · Gofio canario · Sin azúcares añadidos",en:"100% natural banana · Canarian gofio flour · No added sugars",de:"100% natürliche Banane · Kanarisches Gofio-Mehl · Ohne Zuckerzusatz"},desc:{es:"Plátano deshidratado con gofio canario. Sin conservantes ni azúcares añadidos.",en:"Dehydrated banana with traditional Canarian gofio flour. No preservatives or added sugars.",de:"Getrocknete Banane mit kanarischem Gofio-Röstmehl. Ohne Konservierungsstoffe."}},
  {id:48,category:"Biscuits",img:null,name:{es:"Plátano Deshidratado con Canela",en:"Dehydrated Banana with Cinnamon",de:"Getrocknete Banane mit Zimt"},subtitle:{es:"Plátano 100% natural · Canela natural · Sin azúcares añadidos",en:"100% natural banana · Natural cinnamon · No added sugars",de:"100% natürliche Banane · Natürlicher Zimt · Ohne Zuckerzusatz"},desc:{es:"Plátano deshidratado con canela natural. Sin conservantes ni azúcares añadidos.",en:"Dehydrated banana with natural cinnamon. No preservatives or added sugars.",de:"Getrocknete Banane mit natürlichem Zimt. Ohne Konservierungsstoffe."}},
  {id:49,category:"Biscuits",img:null,name:{es:"Plátano Deshidratado Natural",en:"Natural Dehydrated Banana",de:"Natürliche Getrocknete Banane"},subtitle:{es:"Plátano 100% natural de Canarias · Sin azúcares añadidos",en:"100% natural Canary Islands banana · No added sugars",de:"100% natürliche Kanarische Banane · Ohne Zuckerzusatz"},desc:{es:"Plátano deshidratado 100% natural. Sin azúcares añadidos, conservantes ni aditivos.",en:"100% natural dehydrated banana. No added sugars, preservatives or additives.",de:"100% natürliche getrocknete Banane. Ohne Zuckerzusatz oder Konservierungsstoffe."}},
  {id:50,category:"Biscuits",img:null,name:{es:"Galleta Chocolate, Almendras y Avellanas",en:"Chocolate, Almond & Hazelnut Biscuit",de:"Schokoladen-, Mandel- & Haselnuss-Keks"},subtitle:{es:"Galleta artesanal · Sin conservantes ni aditivos",en:"Artisanal biscuit · No preservatives or additives",de:"Handgemachter Keks · Ohne Konservierungsstoffe oder Zusatzstoffe"},desc:{es:"Galleta artesanal con chocolate, almendras y avellanas. Sin conservantes.",en:"Artisanal biscuit with chocolate, almonds and hazelnuts. No preservatives.",de:"Handgemachter Keks mit Schokolade, Mandeln und Haselnüssen. Ohne Konservierungsstoffe."}},
  {id:51,category:"Biscuits",img:null,name:{es:"Galleta Almendras, Coco y Chocolate Blanco",en:"Almond, Coconut & White Chocolate Biscuit",de:"Mandel-, Kokos- & Weißschokoladen-Keks"},subtitle:{es:"Galleta artesanal · Sin conservantes ni aditivos",en:"Artisanal biscuit · No preservatives or additives",de:"Handgemachter Keks · Ohne Konservierungsstoffe oder Zusatzstoffe"},desc:{es:"Galleta artesanal con almendras, coco y chocolate blanco. Sin conservantes.",en:"Artisanal biscuit with almonds, coconut and white chocolate. No preservatives.",de:"Handgemachter Keks mit Mandeln, Kokos und weißer Schokolade. Ohne Konservierungsstoffe."}},
  {id:52,category:"Sauces",img:null,name:{es:"Aceite de Oliva a la Pimienta",en:"Pepper Olive Oil",de:"Pfeffer-Olivenöl"},subtitle:{es:"Aceite de oliva aromatizado a la pimienta · Sin conservantes",en:"Pepper-flavoured olive oil · No preservatives",de:"Pfefferaromatisiertes Olivenöl · Ohne Konservierungsstoffe"},desc:{es:"Aceite de oliva aromatizado con pimienta. Sin conservantes. Ideal para ensaladas, verduras o pan.",en:"Olive oil flavoured with pepper. No preservatives. Ideal for salads, vegetables or bread.",de:"Mit Pfeffer aromatisiertes Olivenöl. Ohne Konservierungsstoffe."}},
  {id:53,category:"Sauces",img:null,name:{es:"Vinagre de Vino a la Pimienta",en:"Pepper Wine Vinegar",de:"Pfeffer-Weinessig"},subtitle:{es:"Vinagre de vino natural aromatizado a la pimienta · Sin conservantes",en:"Natural wine vinegar flavoured with pepper · No preservatives",de:"Natürlicher Weinessig mit Pfefferaroma · Ohne Konservierungsstoffe"},desc:{es:"Vinagre de vino aromatizado con pimienta. Sin conservantes.",en:"Wine vinegar flavoured with pepper. No preservatives.",de:"Weinessig mit Pfeffer aromatisiert. Ohne Konservierungsstoffe."}},
  {id:54,category:"Sauces",img:null,name:{es:"Pimienta Seca",en:"Dried Pepper",de:"Getrockneter Pfeffer"},subtitle:{es:"Pimientos enteros secos 100% naturales · Sin conservantes",en:"Whole dried peppers 100% natural · No preservatives",de:"Ganze getrocknete Paprikaschoten 100% natürlich · Ohne Konservierungsstoffe"},desc:{es:"Pimientos enteros secos, 100% naturales. Sin conservantes.",en:"Whole dried peppers, 100% natural. No preservatives.",de:"Ganze getrocknete Paprikaschoten, 100% natürlich. Ohne Konservierungsstoffe."}},
  {id:55,category:"Vins",img:null,name:{es:"Concentrado de Tuno Indio",en:"Prickly Pear Concentrate",de:"Kaktusfeigen-Konzentrat"},subtitle:{es:"Concentrado 100% natural · Sin conservantes ni aditivos",en:"100% natural concentrate · No preservatives or additives",de:"100% natürliches Konzentrat · Ohne Konservierungsstoffe oder Zusatzstoffe"},desc:{es:"Concentrado de jugo de tuno indio. Sin conservantes. Rico en vitaminas y antioxidantes.",en:"Prickly pear juice concentrate. No preservatives. Rich in vitamins and antioxidants.",de:"Kaktusfeigensaft-Konzentrat. Ohne Konservierungsstoffe. Reich an Vitaminen und Antioxidantien."}},
  {id:56,category:"Vins",img:null,name:{es:"Concentrado de Maracuyá",en:"Passion Fruit Concentrate",de:"Maracuja-Konzentrat"},subtitle:{es:"Concentrado 100% natural · Sin conservantes ni aditivos",en:"100% natural concentrate · No preservatives or additives",de:"100% natürliches Konzentrat · Ohne Konservierungsstoffe oder Zusatzstoffe"},desc:{es:"Concentrado de jugo de maracuyá. Sin conservantes. Sabor exótico e intenso.",en:"Passion fruit juice concentrate. No preservatives. Exotic and intense flavour.",de:"Maracujasaft-Konzentrat. Ohne Konservierungsstoffe. Exotischer intensiver Geschmack."}},
  {id:57,category:"Vins",img:null,name:{es:"Licor de Higos de Fasnia",en:"Fasnia Fig Liqueur",de:"Fasnia Feigenlikör"},subtitle:{es:"Licor artesanal de higos · 25% vol.",en:"Artisanal fig liqueur · 25% vol.",de:"Handgemachter Feigenlikör · 25 Vol.-%"},desc:{es:"Licor artesanal de higos maduros. 25% vol. Ideal como aperitivo, digestivo o con postres.",en:"Artisanal liqueur from ripe figs. 25% vol. Ideal as aperitif, digestif or with desserts.",de:"Handgemachter Likör aus reifen Feigen. 25 Vol.-%."}},
  {id:58,category:"Confitures",img:null,name:{es:"Confituras Artesanales",en:"Artisanal Jams",de:"Handgemachte Konfitüren"},subtitle:{es:"13 sabores · 100% natural · Sin conservantes · Formato 45g, 100g y 300g",en:"13 flavours · 100% natural · No preservatives · Available in 45g, 100g & 300g",de:"13 Sorten · 100% natürlich · Ohne Konservierungsstoffe · Erhältlich in 45g, 100g & 300g"},desc:{es:"Confituras artesanales de frutas de Tenerife. 13 sabores disponibles.",en:"Artisanal jams from Tenerife fruits. 13 flavours available.",de:"Handgemachte Konfitüren aus Teneriffa-Früchten. 13 Sorten erhältlich."}},
  {id:59,category:"Sauces",img:null,name:{es:"Aliño Frambuesa",en:"Raspberry Dressing",de:"Himbeer-Dressing"},subtitle:{es:"Crema de vinagre de higos y frambuesa · 100% natural",en:"Fig & raspberry vinegar cream · 100% natural",de:"Feigen- & Himbeer-Essigcreme · 100% natürlich"},desc:{es:"Crema de vinagre de higos y frambuesa. Ideal para ensaladas, postres o quesos frescos.",en:"Fig and raspberry vinegar cream. Ideal for salads, desserts or fresh cheeses.",de:"Essigcreme aus Feigen und Himbeeren."}},
  {id:60,category:"Sauces",img:null,name:{es:"Aliño Albahaca",en:"Basil Dressing",de:"Basilikum-Dressing"},subtitle:{es:"Crema de vinagre de higos y albahaca · 100% natural",en:"Fig & basil vinegar cream · 100% natural",de:"Feigen- & Basilikum-Essigcreme · 100% natürlich"},desc:{es:"Crema de vinagre de higos y albahaca. Ideal para ensaladas, verduras o pescados.",en:"Fig and basil vinegar cream. Ideal for salads, vegetables or fish.",de:"Essigcreme aus Feigen und Basilikum."}},
  {id:61,category:"Sauces",img:null,name:{es:"Aliño Almogrote",en:"Almogrote Dressing",de:"Almogrote-Dressing"},subtitle:{es:"Crema de vinagre de higos y almogrote · 100% natural",en:"Fig & almogrote vinegar cream · 100% natural",de:"Feigen- & Almogrote-Essigcreme · 100% natürlich"},desc:{es:"Crema de vinagre de higos y almogrote. Ideal para ensaladas, verduras o carnes.",en:"Fig and almogrote vinegar cream. Ideal for salads, vegetables or grilled meats.",de:"Essigcreme aus Feigen und Almogrote."}},
  {id:62,category:"Confitures",img:null,name:{es:"Dulce de Higos de Fasnia",en:"Fasnia Fig Sweet",de:"Fasnia Feigenkonfekt"},subtitle:{es:"Preparación artesanal de higos 100% naturales · Sin conservantes",en:"Artisanal preparation of 100% natural figs · No preservatives",de:"Handgemachte Zubereitung aus 100% natürlichen Feigen · Ohne Konservierungsstoffe"},desc:{es:"Preparación artesanal de higos frescos. Sin conservantes. Ideal para pan, quesos o postres.",en:"Artisanal preparation of fresh figs. No preservatives. Ideal for bread, cheeses or desserts.",de:"Handgemachte Zubereitung aus frischen Feigen. Ohne Konservierungsstoffe."}},
  {id:63,category:"Confitures",img:null,name:{es:"Mermelada de Higos de Fasnia",en:"Fasnia Fig Jam",de:"Fasnia Feigenmarmelade"},subtitle:{es:"Mermelada artesanal de higos 100% naturales · Sin conservantes",en:"Artisanal jam of 100% natural figs · No preservatives",de:"Handgemachte Marmelade aus 100% natürlichen Feigen · Ohne Konservierungsstoffe"},desc:{es:"Mermelada artesanal de higos. Sin conservantes. Aporta fibra y nutrientes.",en:"Artisanal fig jam. No preservatives. Provides fibre and nutrients.",de:"Handgemachte Feigenmarmelade. Ohne Konservierungsstoffe."}},
  {id:64,category:"Vins",img:null,name:{es:"Vento Tinto Vendimia Seleccionada",en:"Vento Selected Harvest Red",de:"Vento Rotwein Ausgewählte Ernte"},subtitle:{es:"Tinto artesanal D.O.P. Abona · Listán Negro & Castellana · Bodega Vento",en:"Artisanal red D.O.P. Abona · Listán Negro & Castellana · Bodega Vento",de:"Handwerklicher Rotwein D.O.P. Abona · Listán Negro & Castellana · Bodega Vento"},desc:{es:"Tinto artesanal con Listán Negro y Castellana. Afrutado, equilibrado y ligeramente amaderado.",en:"Artisanal red with Listán Negro and Castellana. Fruity, balanced and lightly woody.",de:"Handwerklicher Rotwein aus Listán Negro und Castellana. Fruchtig und ausgewogen."}},
  {id:65,category:"Vins",img:null,name:{es:"Vento Tinto Barrica",en:"Vento Oak Aged Red",de:"Vento Barrique-Rotwein"},subtitle:{es:"Tinto envejecido en barrica · D.O.P. Abona · Bodega Vento",en:"Oak barrel aged red · D.O.P. Abona · Bodega Vento",de:"Im Eichenfass gereifter Rotwein · D.O.P. Abona · Bodega Vento"},desc:{es:"Tinto en barrica de roble D.O.P. Abona. Aromas complejos de frutas rojas y notas a madera.",en:"Oak barrel red from D.O.P. Abona. Complex aromas of red fruits and woody notes.",de:"Eichenfass-Rotwein D.O.P. Abona. Komplexe Aromen reifer Früchte und Holznoten."}},
  {id:66,category:"Vins",img:null,name:{es:"Vento Tinto Joven",en:"Vento Young Red",de:"Vento Junger Rotwein"},subtitle:{es:"Tinto joven · D.O.P. Abona · Bodega Vento",en:"Young red wine · D.O.P. Abona · Bodega Vento",de:"Junger Rotwein · D.O.P. Abona · Bodega Vento"},desc:{es:"Tinto joven D.O.P. Abona. Aromas a frutas rojas.",en:"Young red D.O.P. Abona. Aromas of red fruits.",de:"Junger Rotwein D.O.P. Abona. Aromen roter Früchte."}},
  {id:67,category:"Vins",img:null,name:{es:"Vento Rosado Seco Joven",en:"Vento Young Dry Rosé",de:"Vento Junger Trockener Rosé"},subtitle:{es:"Rosado seco joven · D.O.P. Abona · Bodega Vento",en:"Young dry rosé · D.O.P. Abona · Bodega Vento",de:"Junger trockener Rosé · D.O.P. Abona · Bodega Vento"},desc:{es:"Rosado seco joven D.O.P. Abona. Aromas frutales frescos.",en:"Young dry rosé D.O.P. Abona. Fresh fruity aromas.",de:"Junger trockener Rosé D.O.P. Abona. Frische Fruchtaromen."}},
  {id:68,category:"Vins",img:null,name:{es:"Vento Blanco Afrutado Joven",en:"Vento Young Fruity White",de:"Vento Junger Fruchtiger Weißwein"},subtitle:{es:"Blanco afrutado joven · D.O.P. Abona · Bodega Vento",en:"Young fruity white wine · D.O.P. Abona · Bodega Vento",de:"Junger fruchtiger Weißwein · D.O.P. Abona · Bodega Vento"},desc:{es:"Blanco afrutado D.O.P. Abona con aromas frutales delicados.",en:"Fruity white D.O.P. Abona with delicate fruity aromas.",de:"Fruchtiger Weißwein D.O.P. Abona mit zarten Fruchtaromen."}},
  {id:69,category:"Vins",img:null,name:{es:"Vento Blanco Seco Joven",en:"Vento Young Dry White",de:"Vento Junger Trockener Weißwein"},subtitle:{es:"Blanco seco joven · D.O.P. Abona · Bodega Vento",en:"Young dry white wine · D.O.P. Abona · Bodega Vento",de:"Junger trockener Weißwein · D.O.P. Abona · Bodega Vento"},desc:{es:"Blanco seco joven D.O.P. Abona. Aromas frutales, florales y herbáceos.",en:"Young dry white D.O.P. Abona. Fruity, floral and herbaceous aromas.",de:"Junger trockener Weißwein D.O.P. Abona. Fruchtige, blumige und kräuterige Aromen."}},
  {id:70,category:"Biscuits",img:null,name:{es:"Rosquetas Vino y Oliva",en:"Wine & Olive Rosquetas",de:"Wein- & Olivenöl-Rosquetas"},subtitle:{es:"Galleta tradicional de Tenerife · Dulcería familiar desde 1978",en:"Traditional Tenerife biscuit · Family bakery since 1978",de:"Traditioneller Teneriffa-Keks · Familienbäckerei seit 1978"},desc:{es:"Galleta tradicional con vino y aceite de oliva, textura crujiente. Dulcería familiar desde 1978.",en:"Traditional biscuit with wine and olive oil, crunchy texture. Family bakery since 1978.",de:"Traditioneller Keks mit Wein und Olivenöl. Familienbäckerei seit 1978."}},
  {id:71,category:"Biscuits",img:null,name:{es:"Torta Especial de Almendra",en:"Special Almond Cake",de:"Spezielle Mandelkuchen"},subtitle:{es:"Galleta tradicional de Tenerife · Dulcería familiar desde 1978",en:"Traditional Tenerife biscuit · Family bakery since 1978",de:"Traditioneller Teneriffa-Keks · Familienbäckerei seit 1978"},desc:{es:"Galleta tradicional de Tenerife con almendras y azúcar. Dulcería familiar desde 1978.",en:"Traditional Tenerife biscuit with almonds and sugar. Family bakery since 1978.",de:"Traditioneller Teneriffa-Keks mit Mandeln und Zucker. Familienbäckerei seit 1978."}},
  {id:72,category:"Biscuits",img:null,name:{es:"Bizcochos",en:"Sponge Biscuits",de:"Biskuits"},subtitle:{es:"Galleta tradicional de Tenerife · Dulcería familiar desde 1978",en:"Traditional Tenerife biscuit · Family bakery since 1978",de:"Traditioneller Teneriffa-Keks · Familienbäckerei seit 1978"},desc:{es:"Galleta tradicional ligera y tierna. Dulcería familiar desde 1978.",en:"Traditional light and tender biscuit. Family bakery since 1978.",de:"Traditioneller leichter und zarter Keks. Familienbäckerei seit 1978."}},
  {id:73,category:"Biscuits",img:null,name:{es:"Mantecados",en:"Mantecados",de:"Mantecados"},subtitle:{es:"Galleta tradicional de Tenerife · Dulcería familiar desde 1978",en:"Traditional Tenerife biscuit · Family bakery since 1978",de:"Traditioneller Teneriffa-Keks · Familienbäckerei seit 1978"},desc:{es:"Galleta tradicional de textura quebradiza y fundente. Dulcería familiar desde 1978.",en:"Traditional biscuit with crumbly and melt-in-the-mouth texture. Family bakery since 1978.",de:"Traditioneller Keks mit mürber Textur. Familienbäckerei seit 1978."}},
  {id:74,category:"Biscuits",img:null,name:{es:"Torta de Coco",en:"Coconut Cake",de:"Kokosnuss-Torte"},subtitle:{es:"Galleta tradicional de Tenerife · Dulcería familiar desde 1978",en:"Traditional Tenerife biscuit · Family bakery since 1978",de:"Traditioneller Teneriffa-Keks · Familienbäckerei seit 1978"},desc:{es:"Galleta tradicional con coco y azúcar, textura tierna. Dulcería familiar desde 1978.",en:"Traditional biscuit with coconut and sugar, tender texture. Family bakery since 1978.",de:"Traditioneller Keks mit Kokos und Zucker. Familienbäckerei seit 1978."}},
  {id:75,category:"Biscuits",img:null,name:{es:"Roscos Rellenos de Almendras",en:"Almond-Filled Roscos",de:"Mandel-Gefüllte Roscos"},subtitle:{es:"Galleta tradicional de Tenerife · Dulcería familiar desde 1978",en:"Traditional Tenerife biscuit · Family bakery since 1978",de:"Traditioneller Teneriffa-Keks · Familienbäckerei seit 1978"},desc:{es:"Galleta tradicional rellena de almendras y azúcar. Dulcería familiar desde 1978.",en:"Traditional biscuit filled with almonds and sugar. Family bakery since 1978.",de:"Traditioneller Keks mit Mandel-Füllung. Familienbäckerei seit 1978."}},
  {id:76,category:"Biscuits",img:null,name:{es:"Torta de Almendras",en:"Almond Cake",de:"Mandelkuchen"},subtitle:{es:"Galleta tradicional de Tenerife · Dulcería familiar desde 1978",en:"Traditional Tenerife biscuit · Family bakery since 1978",de:"Traditioneller Teneriffa-Keks · Familienbäckerei seit 1978"},desc:{es:"Galleta de harina de almendra y azúcar, textura tierna y ligeramente crujiente. Dulcería familiar desde 1978.",en:"Almond flour and sugar biscuit, tender and slightly crunchy. Family bakery since 1978.",de:"Keks aus Mandelmehl und Zucker. Familienbäckerei seit 1978."}},
  {id:77,category:"Biscuits",img:null,name:{es:"Dedos de Santo",en:"Dedos de Santo",de:"Dedos de Santo"},subtitle:{es:"Galleta tradicional de Tenerife · Dulcería familiar desde 1978",en:"Traditional Tenerife biscuit · Family bakery since 1978",de:"Traditioneller Teneriffa-Keks · Familienbäckerei seit 1978"},desc:{es:"Masa de almendra y azúcar en forma de dedo, textura tierna. Dulcería familiar desde 1978.",en:"Almond dough and sugar in finger shape, tender texture. Family bakery since 1978.",de:"Mandelteig in Fingerform. Familienbäckerei seit 1978."}},
  {id:78,category:"Snacks",img:null,name:{es:"Plátano Frito",en:"Fried Banana Chips",de:"Gebratene Bananenchips"},subtitle:{es:"3 sabores: salado, al ajo y picante · Sin gluten · Aperitivo crujiente",en:"3 flavours: salted, garlic & spicy · Gluten-free · Crunchy snack",de:"3 Sorten: gesalzen, Knoblauch & scharf · Glutenfrei · Knuspriger Snack"},desc:{es:"Plátanos fritos crujientes en tres sabores: salado, al ajo y picante. Sin gluten.",en:"Crunchy fried bananas in three flavours: salted, garlic and spicy. Gluten-free.",de:"Knusprige gebratene Bananen in drei Geschmacksrichtungen. Glutenfrei."}},
];

const CAT_KEYS = ["All","Biscuits","Snacks","Confitures","Miel","Sauces","Conserves","Vins","Packs"];
const CAT_LABEL = {
  All:"Tous", Biscuits:"Galletas & Repostería", Snacks:"Snacks",
  Confitures:"Confitures & Dulces", Miel:"Miel", Sauces:"Salsas & Condimentos",
  Conserves:"Conservas", Vins:"Vinos, Licores & Zumos", Packs:"Packs"
};

// ─────────────────────────────────────────
//  STYLES (CSS-in-JS via style tag)
// ─────────────────────────────────────────
const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Lato:wght@300;400;600;700&display=swap');
  :root {
    --bg:#0f0a06; --surface:#1c1108; --surface2:#261608;
    --border:rgba(201,150,58,0.2); --gold:#c9963a; --gold-light:#e8b85a;
    --gold-pale:#f5d98a; --cream:#f0e0c0; --muted:#7a5a3a;
    --danger:#c0392b; --danger-bg:rgba(192,57,43,0.12);
    --success:#27ae60; --success-bg:rgba(39,174,96,0.12); --text:#e0c898;
  }
  *{margin:0;padding:0;box-sizing:border-box;}
  body{background:var(--bg);color:var(--text);font-family:'Lato',sans-serif;}
  ::-webkit-scrollbar{width:4px;}
  ::-webkit-scrollbar-track{background:var(--bg);}
  ::-webkit-scrollbar-thumb{background:var(--gold);border-radius:2px;}
`;

// ─────────────────────────────────────────
//  SUB-COMPONENTS
// ─────────────────────────────────────────

function PlaceholderImg() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{width:18,height:18,color:"var(--muted)",opacity:.5}}>
      <rect x="3" y="3" width="18" height="18" rx="2"/>
      <circle cx="8.5" cy="8.5" r="1.5"/>
      <polyline points="21 15 16 10 5 21"/>
    </svg>
  );
}

function Toast({ message, type, visible }) {
  if (!visible) return null;
  return (
    <div style={{
      position:"fixed", bottom:24, right:24, zIndex:999,
      background:"var(--surface)", border:`1px solid ${type==="success" ? "rgba(39,174,96,.4)" : "rgba(192,57,43,.4)"}`,
      borderRadius:10, padding:"14px 20px", fontSize:".82rem",
      display:"flex", alignItems:"center", gap:10,
      boxShadow:"0 8px 32px rgba(0,0,0,.4)",
      animation:"toastIn .3s ease",
    }}>
      <div style={{width:8,height:8,borderRadius:"50%",background:type==="success"?"var(--success)":"var(--danger)",flexShrink:0}}/>
      <span style={{color:"var(--cream)"}}>{message}</span>
    </div>
  );
}

function FormTabs({ activeTab, onTabChange }) {
  const tabs = [
    { id:"es", label:"🇪🇸 Español" },
    { id:"en", label:"🇬🇧 English" },
    { id:"de", label:"🇩🇪 Deutsch" },
    { id:"img", label:"📷 Photo" },
    { id:"meta", label:"⚙ Infos" },
  ];
  return (
    <div style={{display:"flex",gap:2,marginBottom:20,background:"var(--surface2)",padding:4,borderRadius:8}}>
      {tabs.map(t => (
        <button key={t.id} onClick={() => onTabChange(t.id)} style={{
          flex:1, textAlign:"center", padding:"7px 4px", borderRadius:6,
          fontSize:".72rem", fontWeight:700, letterSpacing:".08em", cursor:"pointer",
          border:"none", transition:"all .2s",
          background: activeTab===t.id ? "var(--gold)" : "transparent",
          color: activeTab===t.id ? "#1a0a02" : "var(--muted)",
        }}>{t.label}</button>
      ))}
    </div>
  );
}

function FormGroup({ label, children }) {
  return (
    <div style={{marginBottom:16}}>
      <label style={{fontSize:".7rem",letterSpacing:".12em",textTransform:"uppercase",color:"var(--muted)",marginBottom:6,display:"block"}}>{label}</label>
      {children}
    </div>
  );
}

const inputStyle = {
  width:"100%", background:"var(--surface2)", border:"1px solid var(--border)",
  borderRadius:8, color:"var(--cream)", fontFamily:"'Lato',sans-serif", fontSize:".88rem",
  padding:"10px 14px", outline:"none",
};
const textareaStyle = { ...inputStyle, resize:"vertical", minHeight:90, lineHeight:1.5 };
const selectStyle = { ...inputStyle };

function ProductForm({ product, onChange, imgData, onImgChange, onImgRemove }) {
  const [activeTab, setActiveTab] = useState("es");
  const fileRef = useRef();

  const field = (lang, key) => product?.[key]?.[lang] ?? "";
  const set = (lang, key, val) => onChange({ ...product, [key]: { ...product?.[key], [lang]: val } });

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => onImgChange(ev.target.result);
    reader.readAsDataURL(file);
  };

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => onImgChange(ev.target.result);
    reader.readAsDataURL(file);
  }, [onImgChange]);

  const currentImg = imgData === "__remove__" ? null : imgData || product?.img;

  return (
    <div>
      <FormTabs activeTab={activeTab} onTabChange={setActiveTab} />

      {activeTab === "es" && (
        <div>
          <FormGroup label="Nom (ES)"><input style={inputStyle} value={field("es","name")} onChange={e=>set("es","name",e.target.value)}/></FormGroup>
          <FormGroup label="Sous-titre (ES)"><input style={inputStyle} value={field("es","subtitle")} onChange={e=>set("es","subtitle",e.target.value)}/></FormGroup>
          <FormGroup label="Description (ES)"><textarea style={textareaStyle} value={field("es","desc")} onChange={e=>set("es","desc",e.target.value)}/></FormGroup>
        </div>
      )}
      {activeTab === "en" && (
        <div>
          <FormGroup label="Name (EN)"><input style={inputStyle} value={field("en","name")} onChange={e=>set("en","name",e.target.value)}/></FormGroup>
          <FormGroup label="Subtitle (EN)"><input style={inputStyle} value={field("en","subtitle")} onChange={e=>set("en","subtitle",e.target.value)}/></FormGroup>
          <FormGroup label="Description (EN)"><textarea style={textareaStyle} value={field("en","desc")} onChange={e=>set("en","desc",e.target.value)}/></FormGroup>
        </div>
      )}
      {activeTab === "de" && (
        <div>
          <FormGroup label="Name (DE)"><input style={inputStyle} value={field("de","name")} onChange={e=>set("de","name",e.target.value)}/></FormGroup>
          <FormGroup label="Untertitel (DE)"><input style={inputStyle} value={field("de","subtitle")} onChange={e=>set("de","subtitle",e.target.value)}/></FormGroup>
          <FormGroup label="Beschreibung (DE)"><textarea style={textareaStyle} value={field("de","desc")} onChange={e=>set("de","desc",e.target.value)}/></FormGroup>
        </div>
      )}
      {activeTab === "img" && (
        <FormGroup label="Photo du produit">
          <div
            onDrop={handleDrop}
            onDragOver={e=>e.preventDefault()}
            onClick={() => fileRef.current?.click()}
            style={{
              border:"2px dashed var(--border)", borderRadius:10,
              padding:24, textAlign:"center", cursor:"pointer",
              transition:"all .2s", position:"relative",
            }}
          >
            <input ref={fileRef} type="file" accept="image/*" style={{display:"none"}} onChange={handleFile}/>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{width:32,height:32,color:"var(--muted)",marginBottom:8}}>
              <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/>
              <polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/>
            </svg>
            <p style={{fontSize:".78rem",color:"var(--muted)"}}>Glisser-déposer ou <span style={{color:"var(--gold)"}}>cliquer pour choisir</span></p>
            <p style={{marginTop:4,fontSize:".7rem",color:"var(--muted)"}}>PNG, JPG, WEBP · Max 5MB</p>
          </div>
          {currentImg && (
            <div style={{textAlign:"center",marginTop:12,position:"relative",display:"inline-block",marginLeft:"50%",transform:"translateX(-50%)"}}>
              <img src={currentImg} alt="" style={{width:120,height:120,objectFit:"cover",borderRadius:10,border:"1px solid var(--border)"}}/>
              <button onClick={onImgRemove} style={{
                position:"absolute",top:-8,right:-8,width:22,height:22,
                background:"var(--danger)",border:"none",borderRadius:"50%",color:"#fff",
                fontSize:".85rem",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",lineHeight:1,
              }}>×</button>
            </div>
          )}
        </FormGroup>
      )}
      {activeTab === "meta" && (
        <FormGroup label="Catégorie">
          <select style={selectStyle} value={product?.category ?? "Sauces"} onChange={e=>onChange({...product,category:e.target.value})}>
            {CAT_KEYS.filter(k=>k!=="All").map(k => (
              <option key={k} value={k} style={{background:"#1c1108"}}>{CAT_LABEL[k]}</option>
            ))}
          </select>
        </FormGroup>
      )}
    </div>
  );
}

// ─────────────────────────────────────────
//  MAIN COMPONENT
// ─────────────────────────────────────────
export default function FincasAdmin() {
  const [products, setProducts] = useState(INITIAL_PRODUCTS);
  const [activeFilter, setActiveFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [editProduct, setEditProduct] = useState(null); // product being edited
  const [editImgData, setEditImgData] = useState(null);
  const [showAddPanel, setShowAddPanel] = useState(false);
  const [newProduct, setNewProduct] = useState(null);
  const [newImgData, setNewImgData] = useState(null);
  const [confirmId, setConfirmId] = useState(null);
  const [nextId, setNextId] = useState(79);
  const [toast, setToast] = useState({ visible:false, message:"", type:"success" });

  const showToast = (message, type="success") => {
    setToast({ visible:true, message, type });
    setTimeout(() => setToast(t => ({...t, visible:false})), 3000);
  };

  // ── FILTER ──
  const filtered = products.filter(p => {
    const catOk = activeFilter === "All" || p.category === activeFilter;
    const q = search.toLowerCase().trim();
    const qOk = !q || [p.name.es, p.subtitle.es, p.category].join(" ").toLowerCase().includes(q);
    return catOk && qOk;
  });

  const counts = Object.fromEntries(CAT_KEYS.map(k => [k, k==="All" ? products.length : products.filter(p=>p.category===k).length]));
  const withImg = products.filter(p=>p.img).length;

  // ── EDIT ──
  const openEdit = (p) => { setEditProduct({...p, name:{...p.name}, subtitle:{...p.subtitle}, desc:{...p.desc}}); setEditImgData(null); };
  const saveEdit = () => {
    const img = editImgData === "__remove__" ? null : editImgData || editProduct.img;
    setProducts(prev => prev.map(p => p.id === editProduct.id ? {...editProduct, img} : p));
    setEditProduct(null); setEditImgData(null);
    showToast("Produit mis à jour !");
  };

  // ── INLINE IMG UPLOAD ──
  const handleInlineImg = (id, file) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = e => {
      setProducts(prev => prev.map(p => p.id===id ? {...p, img:e.target.result} : p));
      showToast("Photo mise à jour !");
    };
    reader.readAsDataURL(file);
  };

  // ── ADD ──
  const openAdd = () => {
    setNewProduct({ id:nextId, category:"Sauces", img:null, name:{es:"",en:"",de:""}, subtitle:{es:"",en:"",de:""}, desc:{es:"",en:"",de:""} });
    setNewImgData(null); setShowAddPanel(true);
  };
  const saveNew = () => {
    if (!newProduct.name.es.trim()) { showToast("Le nom en espagnol est requis","error"); return; }
    const img = newImgData && newImgData!=="__remove__" ? newImgData : null;
    setProducts(prev => [...prev, {...newProduct, img}]);
    setNextId(n=>n+1); setShowAddPanel(false); setNewProduct(null); setNewImgData(null);
    showToast(`"${newProduct.name.es}" ajouté !`);
  };

  // ── DELETE ──
  const confirmDelete = () => {
    const p = products.find(x=>x.id===confirmId);
    setProducts(prev => prev.filter(x => x.id!==confirmId));
    setConfirmId(null);
    showToast(`"${p?.name?.es}" supprimé`);
  };

  // ── EXPORT ──
  const exportJSON = () => {
    const json = JSON.stringify(products, null, 2);
    const a = document.createElement("a");
    a.href = "data:application/json;charset=utf-8," + encodeURIComponent(json);
    a.download = "fincas-canarias-products.json";
    a.click();
    showToast("Export JSON téléchargé !");
  };

  const btnStyle = (variant="gold") => ({
    fontFamily:"'Lato',sans-serif", fontSize:".75rem", fontWeight:700,
    letterSpacing:".1em", textTransform:"uppercase",
    padding:"7px 16px", borderRadius:6, border:"none", cursor:"pointer", transition:"all .2s",
    ...(variant==="gold" ? { background:"var(--gold)", color:"#1a0a02" } :
        variant==="outline" ? { background:"transparent", border:"1px solid var(--border)", color:"var(--muted)" } :
        variant==="danger" ? { background:"var(--danger-bg)", border:"1px solid rgba(192,57,43,.3)", color:"#e74c3c" } : {}),
  });
  const btnSm = (variant) => ({ ...btnStyle(variant), padding:"5px 10px", fontSize:".68rem" });

  return (
    <>
      <style>{CSS}</style>
      <style>{`@keyframes toastIn{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}} @keyframes modalIn{from{opacity:0;transform:scale(.96) translateY(8px)}to{opacity:1;transform:scale(1) translateY(0)}}`}</style>

      {/* ── TOPBAR ── */}
      <div style={{background:"rgba(10,6,2,.98)",borderBottom:"1px solid var(--border)",padding:"0 24px",display:"flex",alignItems:"center",justifyContent:"space-between",height:58,position:"sticky",top:0,zIndex:100}}>
        <div style={{display:"flex",alignItems:"center",gap:12}}>
          <span style={{fontFamily:"'Playfair Display',serif",color:"var(--gold)",fontSize:"1.05rem",letterSpacing:".06em"}}>Fincas Canarias</span>
          <span style={{background:"var(--gold)",color:"#1a0a02",fontSize:".65rem",fontWeight:700,padding:"2px 8px",borderRadius:20,letterSpacing:".1em"}}>ADMIN</span>
        </div>
        <div style={{display:"flex",gap:10}}>
          <button style={btnStyle("outline")} onClick={exportJSON}>⬇ Exporter JSON</button>
          <button style={btnStyle("gold")} onClick={openAdd}>+ Ajouter produit</button>
        </div>
      </div>

      {/* ── LAYOUT ── */}
      <div style={{display:"flex",minHeight:"calc(100vh - 58px)"}}>

        {/* ── SIDEBAR ── */}
        <aside style={{width:220,flexShrink:0,background:"var(--surface)",borderRight:"1px solid var(--border)",padding:"20px 0",position:"sticky",top:58,height:"calc(100vh - 58px)",overflowY:"auto"}}>
          <span style={{fontSize:".6rem",letterSpacing:".25em",textTransform:"uppercase",color:"var(--muted)",padding:"10px 22px 6px",display:"block"}}>Catégories</span>
          {CAT_KEYS.map(k => (
            <div key={k} onClick={() => setActiveFilter(k)}
              style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"8px 20px",cursor:"pointer",transition:"background .15s",marginBottom:2,
                background: activeFilter===k ? "rgba(201,150,58,.15)" : "transparent",
                borderLeft: activeFilter===k ? "2px solid var(--gold)" : "2px solid transparent",
              }}>
              <span style={{fontSize:".82rem",color:activeFilter===k?"var(--gold)":"var(--text)"}}>{CAT_LABEL[k]}</span>
              <span style={{background:"rgba(201,150,58,.2)",color:"var(--gold)",fontSize:".6rem",fontWeight:700,padding:"2px 6px",borderRadius:10}}>{counts[k]}</span>
            </div>
          ))}
        </aside>

        {/* ── MAIN ── */}
        <main style={{flex:1,padding:24,overflowY:"auto"}}>

          {/* Stats */}
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(150px,1fr))",gap:12,marginBottom:24}}>
            {[
              ["Produits total", products.length],
              ["Avec photo", withImg],
              ["Sans photo", products.length - withImg],
              ["Catégories", CAT_KEYS.length - 1],
            ].map(([label, num]) => (
              <div key={label} style={{background:"var(--surface)",border:"1px solid var(--border)",borderRadius:10,padding:"14px 16px"}}>
                <div style={{fontFamily:"'Playfair Display',serif",fontSize:"1.6rem",color:"var(--gold-light)"}}>{num}</div>
                <div style={{fontSize:".68rem",letterSpacing:".12em",textTransform:"uppercase",color:"var(--muted)",marginTop:2}}>{label}</div>
              </div>
            ))}
          </div>

          {/* Add panel */}
          {showAddPanel && newProduct && (
            <div style={{background:"var(--surface)",border:"1px solid rgba(201,150,58,.25)",borderRadius:12,padding:20,marginBottom:24}}>
              <div style={{fontFamily:"'Playfair Display',serif",fontSize:"1rem",color:"var(--gold)",marginBottom:16}}>✦ Nouveau produit</div>
              <ProductForm product={newProduct} onChange={setNewProduct} imgData={newImgData} onImgChange={setNewImgData} onImgRemove={()=>setNewImgData("__remove__")}/>
              <div style={{display:"flex",gap:10,marginTop:16}}>
                <button style={btnStyle("outline")} onClick={()=>{setShowAddPanel(false);setNewProduct(null);}}>Annuler</button>
                <button style={btnStyle("gold")} onClick={saveNew}>Ajouter le produit</button>
              </div>
            </div>
          )}

          {/* Page header */}
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:20,flexWrap:"wrap",gap:12}}>
            <div>
              <div style={{fontFamily:"'Playfair Display',serif",fontSize:"1.4rem",color:"var(--cream)"}}>{activeFilter==="All"?"Tous les produits":CAT_LABEL[activeFilter]}</div>
              <div style={{fontSize:".75rem",color:"var(--muted)",marginTop:2}}>{filtered.length} produit{filtered.length!==1?"s":""}</div>
            </div>
          </div>

          {/* Search */}
          <div style={{marginBottom:20}}>
            <div style={{position:"relative",maxWidth:400}}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                style={{position:"absolute",left:12,top:"50%",transform:"translateY(-50%)",width:16,height:16,color:"var(--muted)",pointerEvents:"none"}}>
                <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
              </svg>
              <input value={search} onChange={e=>setSearch(e.target.value)}
                placeholder="Rechercher un produit…"
                style={{...inputStyle,paddingLeft:40}}
              />
            </div>
          </div>

          {/* Table */}
          <div style={{background:"var(--surface)",border:"1px solid var(--border)",borderRadius:12,overflow:"hidden"}}>
            <div style={{display:"grid",gridTemplateColumns:"60px 1fr 180px 120px 110px",padding:"10px 16px",borderBottom:"1px solid var(--border)",fontSize:".65rem",letterSpacing:".15em",textTransform:"uppercase",color:"var(--muted)"}}>
              <div>Photo</div><div>Produit</div><div>Catégorie</div><div>Image</div><div>Actions</div>
            </div>

            {filtered.length === 0 && (
              <div style={{textAlign:"center",padding:"48px 20px",color:"var(--muted)",fontStyle:"italic"}}>Aucun produit trouvé</div>
            )}

            {filtered.map(p => (
              <div key={p.id} style={{display:"grid",gridTemplateColumns:"60px 1fr 180px 120px 110px",padding:"12px 16px",borderBottom:"1px solid rgba(201,150,58,.08)",alignItems:"center",transition:"background .15s"}}
                onMouseEnter={e=>e.currentTarget.style.background="rgba(201,150,58,.04)"}
                onMouseLeave={e=>e.currentTarget.style.background="transparent"}
              >
                {/* Thumb */}
                <label style={{width:44,height:44,borderRadius:8,background:"var(--surface2)",border:"1px solid var(--border)",display:"flex",alignItems:"center",justifyContent:"center",overflow:"hidden",position:"relative",cursor:"pointer"}}>
                  {p.img
                    ? <img src={p.img} alt="" style={{width:"100%",height:"100%",objectFit:"cover"}}/>
                    : <PlaceholderImg/>
                  }
                  <div style={{position:"absolute",inset:0,background:"rgba(201,150,58,.85)",display:"flex",alignItems:"center",justifyContent:"center",opacity:0,transition:"opacity .2s",borderRadius:8}}
                    onMouseEnter={e=>e.currentTarget.style.opacity=1} onMouseLeave={e=>e.currentTarget.style.opacity=0}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{width:18,height:18,color:"#1a0a02"}}>
                      <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/>
                    </svg>
                  </div>
                  <input type="file" accept="image/*" style={{position:"absolute",inset:0,opacity:0,cursor:"pointer"}} onChange={e=>handleInlineImg(p.id, e.target.files[0])}/>
                </label>

                {/* Info */}
                <div>
                  <div style={{fontSize:".88rem",color:"var(--cream)",fontWeight:600,lineHeight:1.3}}>{p.name.es}</div>
                  <div style={{fontSize:".72rem",color:"var(--muted)",marginTop:2,lineHeight:1.3}}>{p.subtitle.es}</div>
                </div>

                {/* Category */}
                <div>
                  <span style={{display:"inline-block",background:"rgba(201,150,58,.12)",border:"1px solid rgba(201,150,58,.25)",color:"var(--gold)",fontSize:".62rem",letterSpacing:".12em",textTransform:"uppercase",padding:"3px 8px",borderRadius:20,whiteSpace:"nowrap"}}>
                    {CAT_LABEL[p.category]}
                  </span>
                </div>

                {/* Img status */}
                <div style={{fontSize:".7rem",color:p.img?"var(--success)":"var(--muted)"}}>
                  {p.img ? "✓ Photo" : "— Aucune"}
                </div>

                {/* Actions */}
                <div style={{display:"flex",gap:6}}>
                  <button style={btnSm("outline")} onClick={()=>openEdit(p)}>✏ Modifier</button>
                  <button style={btnSm("danger")} onClick={()=>setConfirmId(p.id)}>🗑</button>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>

      {/* ── EDIT MODAL ── */}
      {editProduct && (
        <div style={{position:"fixed",inset:0,zIndex:200,background:"rgba(5,2,1,.92)",backdropFilter:"blur(8px)",display:"flex",alignItems:"center",justifyContent:"center",padding:16}}>
          <div style={{background:"var(--surface)",border:"1px solid rgba(201,150,58,.3)",borderRadius:16,width:"100%",maxWidth:680,maxHeight:"92vh",overflowY:"auto",position:"relative",animation:"modalIn .25s ease"}}>
            <div style={{padding:"20px 24px 16px",borderBottom:"1px solid var(--border)",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
              <div style={{fontFamily:"'Playfair Display',serif",fontSize:"1.15rem",color:"var(--cream)"}}>Modifier — {editProduct.name.es}</div>
              <button style={{background:"transparent",border:"none",color:"var(--muted)",fontSize:"1.4rem",cursor:"pointer",lineHeight:1}} onClick={()=>{setEditProduct(null);setEditImgData(null);}}>×</button>
            </div>
            <div style={{padding:24}}>
              <ProductForm product={editProduct} onChange={setEditProduct} imgData={editImgData} onImgChange={setEditImgData} onImgRemove={()=>setEditImgData("__remove__")}/>
            </div>
            <div style={{padding:"16px 24px",borderTop:"1px solid var(--border)",display:"flex",justifyContent:"flex-end",gap:10}}>
              <button style={btnStyle("outline")} onClick={()=>{setEditProduct(null);setEditImgData(null);}}>Annuler</button>
              <button style={btnStyle("gold")} onClick={saveEdit}>Enregistrer</button>
            </div>
          </div>
        </div>
      )}

      {/* ── CONFIRM DELETE ── */}
      {confirmId && (
        <div style={{position:"fixed",inset:0,zIndex:300,background:"rgba(5,2,1,.95)",display:"flex",alignItems:"center",justifyContent:"center",padding:20}}>
          <div style={{background:"var(--surface)",border:"1px solid rgba(192,57,43,.4)",borderRadius:14,padding:"28px 32px",maxWidth:400,width:"100%",textAlign:"center",animation:"modalIn .25s ease"}}>
            <div style={{fontSize:"2.2rem",marginBottom:12}}>🗑</div>
            <div style={{fontSize:".9rem",color:"var(--cream)",marginBottom:20,lineHeight:1.5}}>
              Supprimer « {products.find(p=>p.id===confirmId)?.name?.es} » définitivement ?
            </div>
            <div style={{display:"flex",gap:10,justifyContent:"center"}}>
              <button style={btnStyle("outline")} onClick={()=>setConfirmId(null)}>Annuler</button>
              <button style={btnStyle("danger")} onClick={confirmDelete}>Supprimer</button>
            </div>
          </div>
        </div>
      )}

      {/* ── TOAST ── */}
      <Toast message={toast.message} type={toast.type} visible={toast.visible}/>
    </>
  );
}
