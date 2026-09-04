export interface District {
  name: string;
  /** Main towns, alphabetical — enough for a shopper to find themselves. */
  cities: readonly string[];
}

/**
 * The 25 administrative districts of Sri Lanka with their principal towns,
 * alphabetical throughout. A call-back form asks for both so the enquiry
 * reaches the team covering the nearest showroom.
 */
export const districts: readonly District[] = [
  {
    name: "Ampara",
    cities: [
      "Akkaraipattu",
      "Ampara",
      "Kalmunai",
      "Pottuvil",
      "Sainthamaruthu",
      "Uhana",
    ],
  },
  {
    name: "Anuradhapura",
    cities: [
      "Anuradhapura",
      "Eppawala",
      "Kekirawa",
      "Medawachchiya",
      "Mihintale",
      "Thambuttegama",
    ],
  },
  {
    name: "Badulla",
    cities: [
      "Badulla",
      "Bandarawela",
      "Diyatalawa",
      "Ella",
      "Haputale",
      "Mahiyanganaya",
      "Welimada",
    ],
  },
  {
    name: "Batticaloa",
    cities: [
      "Batticaloa",
      "Eravur",
      "Kaluwanchikudy",
      "Kattankudy",
      "Valaichchenai",
    ],
  },
  {
    name: "Colombo",
    cities: [
      "Battaramulla",
      "Colombo",
      "Dehiwala",
      "Homagama",
      "Kaduwela",
      "Kolonnawa",
      "Maharagama",
      "Moratuwa",
      "Mount Lavinia",
      "Nugegoda",
      "Piliyandala",
      "Rajagiriya",
      "Ratmalana",
      "Sri Jayawardenepura Kotte",
    ],
  },
  {
    name: "Galle",
    cities: [
      "Ahangama",
      "Ambalangoda",
      "Baddegama",
      "Elpitiya",
      "Galle",
      "Hikkaduwa",
      "Karapitiya",
      "Unawatuna",
    ],
  },
  {
    name: "Gampaha",
    cities: [
      "Gampaha",
      "Ja-Ela",
      "Kadawatha",
      "Kandana",
      "Katunayake",
      "Kelaniya",
      "Kiribathgoda",
      "Minuwangoda",
      "Negombo",
      "Nittambuwa",
      "Ragama",
      "Veyangoda",
      "Wattala",
    ],
  },
  {
    name: "Hambantota",
    cities: [
      "Ambalantota",
      "Beliatta",
      "Hambantota",
      "Tangalle",
      "Tissamaharama",
      "Weeraketiya",
    ],
  },
  {
    name: "Jaffna",
    cities: [
      "Chavakachcheri",
      "Jaffna",
      "Karainagar",
      "Nallur",
      "Point Pedro",
      "Valvettithurai",
    ],
  },
  {
    name: "Kalutara",
    cities: [
      "Aluthgama",
      "Bandaragama",
      "Beruwala",
      "Horana",
      "Kalutara",
      "Matugama",
      "Panadura",
      "Wadduwa",
    ],
  },
  {
    name: "Kandy",
    cities: [
      "Akurana",
      "Digana",
      "Gampola",
      "Kadugannawa",
      "Kandy",
      "Katugastota",
      "Nawalapitiya",
      "Peradeniya",
      "Pilimathalawa",
      "Wattegama",
    ],
  },
  {
    name: "Kegalle",
    cities: [
      "Aranayake",
      "Dehiowita",
      "Kegalle",
      "Mawanella",
      "Rambukkana",
      "Ruwanwella",
      "Warakapola",
    ],
  },
  {
    name: "Kilinochchi",
    cities: ["Kilinochchi", "Pallai", "Paranthan", "Poonakary"],
  },
  {
    name: "Kurunegala",
    cities: [
      "Alawwa",
      "Galgamuwa",
      "Kuliyapitiya",
      "Kurunegala",
      "Mawathagama",
      "Narammala",
      "Nikaweratiya",
      "Pannala",
      "Polgahawela",
      "Wariyapola",
    ],
  },
  {
    name: "Mannar",
    cities: ["Mannar", "Murunkan", "Nanattan", "Pesalai"],
  },
  {
    name: "Matale",
    cities: ["Dambulla", "Galewela", "Matale", "Naula", "Rattota", "Ukuwela"],
  },
  {
    name: "Matara",
    cities: [
      "Akuressa",
      "Deniyaya",
      "Dikwella",
      "Hakmana",
      "Kamburupitiya",
      "Matara",
      "Weligama",
    ],
  },
  {
    name: "Monaragala",
    cities: [
      "Bibile",
      "Buttala",
      "Kataragama",
      "Medagama",
      "Monaragala",
      "Wellawaya",
    ],
  },
  {
    name: "Mullaitivu",
    cities: ["Mankulam", "Mullaitivu", "Oddusuddan", "Puthukkudiyiruppu"],
  },
  {
    name: "Nuwara Eliya",
    cities: [
      "Ginigathhena",
      "Hatton",
      "Maskeliya",
      "Nuwara Eliya",
      "Talawakelle",
      "Walapane",
    ],
  },
  {
    name: "Polonnaruwa",
    cities: [
      "Bakamuna",
      "Hingurakgoda",
      "Kaduruwela",
      "Medirigiriya",
      "Polonnaruwa",
    ],
  },
  {
    name: "Puttalam",
    cities: [
      "Anamaduwa",
      "Chilaw",
      "Dankotuwa",
      "Madampe",
      "Marawila",
      "Nattandiya",
      "Puttalam",
      "Wennappuwa",
    ],
  },
  {
    name: "Ratnapura",
    cities: [
      "Balangoda",
      "Eheliyagoda",
      "Embilipitiya",
      "Kuruwita",
      "Pelmadulla",
      "Ratnapura",
    ],
  },
  {
    name: "Trincomalee",
    cities: ["Kantale", "Kinniya", "Mutur", "Nilaveli", "Trincomalee"],
  },
  {
    name: "Vavuniya",
    cities: ["Cheddikulam", "Nedunkeni", "Vavuniya"],
  },
];
