/* =====================================================================
   ETERNIA PROPERTIES — PROPERTY DATA
   ---------------------------------------------------------------------
   Every listing below is a SAMPLE placeholder. Replace them with your
   real projects. The website reads everything from this one file.

   Fields for each property:
     id        unique number
     title     project / property name
     zone      "west" | "north" | "south" | "east"
     locality  must match a name in ZONES[zone].localities (for filters)
     type      "Apartment" | "Villa" | "Plot" | "Commercial"
     bhk       e.g. [2,3]  (use [] for plots and commercial)
     price     starting price in LAKH  (e.g. 85 = ₹85 L, 150 = ₹1.5 Cr)
     priceMax  optional upper price in LAKH (shows a range)
     areaMin / areaMax   area in sq ft
     status    "Ready to Move" | "Under Construction" | "New Launch"
     image     file inside the images/ folder
     desc      one or two sentences
     sample    true = shows a "Sample listing" tag. Delete for real ones.
   ===================================================================== */

const ZONES = {
  west: {
    name: "West Hyderabad",
    short: "West",
    page: "west.html",
    localities: ["Gachibowli", "Kokapet", "Financial District", "Madhapur", "Tellapur", "Kondapur"],
    intro: "West Hyderabad is the city's IT and business heart. Gachibowli, the Financial District and Madhapur host major tech campuses, while Kokapet, Tellapur and Kondapur are known for premium high-rise communities, gated villas and quick access to the Outer Ring Road."
  },
  north: {
    name: "North Hyderabad",
    short: "North",
    page: "north.html",
    localities: ["Kompally", "Bachupally", "Miyapur", "Medchal", "Nizampet", "Alwal"],
    intro: "North Hyderabad offers a balanced mix of established neighbourhoods and fast-growing suburbs. Kompally, Bachupally and Miyapur are popular with families for schools, metro access and value-for-money apartments, while Medchal is a strong choice for open plots."
  },
  south: {
    name: "South Hyderabad",
    short: "South",
    page: "south.html",
    localities: ["Shamshabad", "Tukkuguda", "Adibatla", "Maheshwaram", "Ibrahimpatnam", "Kothur"],
    intro: "South Hyderabad grows around the international airport and the aerospace and electronics clusters. Shamshabad, Tukkuguda, Adibatla and Maheshwaram are well known for open plots, villa layouts and long-term investment opportunities."
  },
  east: {
    name: "East Hyderabad",
    short: "East",
    page: "east.html",
    localities: ["Uppal", "LB Nagar", "Nagole", "Boduppal", "Ghatkesar", "Pocharam"],
    intro: "East Hyderabad combines well-connected residential hubs with affordable growth corridors. Uppal, LB Nagar and Nagole have metro connectivity, while Boduppal, Ghatkesar and Pocharam offer budget-friendly apartments, villas and plots near the IT parks of Pocharam."
  }
};

const PROPERTIES = [
  /* ---------------- WEST ---------------- */
  { id: 1,  title: "Sample Skyline Residences", zone: "west", locality: "Kokapet", type: "Apartment", bhk: [3, 4], price: 195, priceMax: 340, areaMin: 2150, areaMax: 3600, status: "New Launch", image: "apartment-1.svg", desc: "Premium high-rise towers with a clubhouse, sky deck and quick access to the Outer Ring Road.", sample: true },
  { id: 2,  title: "Sample Tech Park Homes", zone: "west", locality: "Gachibowli", type: "Apartment", bhk: [2, 3], price: 120, priceMax: 210, areaMin: 1250, areaMax: 2050, status: "Under Construction", image: "apartment-2.svg", desc: "Spacious apartments close to the IT corridor, schools and hospitals.", sample: true },
  { id: 3,  title: "Sample Lakeview Villas", zone: "west", locality: "Tellapur", type: "Villa", bhk: [4], price: 380, priceMax: 520, areaMin: 3800, areaMax: 5200, status: "Ready to Move", image: "villa-1.svg", desc: "Gated community of independent villas with private gardens and a large clubhouse.", sample: true },
  { id: 4,  title: "Sample Business Square", zone: "west", locality: "Financial District", type: "Commercial", bhk: [], price: 160, priceMax: 450, areaMin: 1200, areaMax: 4000, status: "Under Construction", image: "commercial-1.svg", desc: "Grade-A office spaces suited to start-ups and growing companies.", sample: true },
  { id: 5,  title: "Sample Madhapur Heights", zone: "west", locality: "Madhapur", type: "Apartment", bhk: [2, 3], price: 135, priceMax: 230, areaMin: 1300, areaMax: 2100, status: "Ready to Move", image: "apartment-3.svg", desc: "Move-in-ready homes in a well-established neighbourhood near HITEC City.", sample: true },
  { id: 6,  title: "Sample Kondapur Greens", zone: "west", locality: "Kondapur", type: "Apartment", bhk: [3], price: 165, areaMin: 1750, areaMax: 1950, status: "New Launch", image: "apartment-2.svg", desc: "3 BHK homes with open green spaces, a swimming pool and a jogging track.", sample: true },

  /* ---------------- NORTH ---------------- */
  { id: 7,  title: "Sample Kompally Gardens", zone: "north", locality: "Kompally", type: "Apartment", bhk: [2, 3], price: 72, priceMax: 125, areaMin: 1150, areaMax: 1850, status: "Under Construction", image: "apartment-1.svg", desc: "Family-friendly apartments close to schools and the national highway.", sample: true },
  { id: 8,  title: "Sample Bachupally Towers", zone: "north", locality: "Bachupally", type: "Apartment", bhk: [2, 3], price: 78, priceMax: 135, areaMin: 1200, areaMax: 1900, status: "Ready to Move", image: "apartment-3.svg", desc: "Ready homes in a gated community with a clubhouse and children's play area.", sample: true },
  { id: 9,  title: "Sample Miyapur Metro Homes", zone: "north", locality: "Miyapur", type: "Apartment", bhk: [2], price: 68, priceMax: 85, areaMin: 1050, areaMax: 1250, status: "Ready to Move", image: "apartment-2.svg", desc: "Compact 2 BHK homes a short drive from the metro station.", sample: true },
  { id: 10, title: "Sample Medchal Open Plots", zone: "north", locality: "Medchal", type: "Plot", bhk: [], price: 28, priceMax: 60, areaMin: 1350, areaMax: 2700, status: "Ready to Move", image: "plot-1.svg", desc: "Approved layout with black-top roads, avenue plantation and power lines.", sample: true },
  { id: 11, title: "Sample Nizampet Villas", zone: "north", locality: "Nizampet", type: "Villa", bhk: [3, 4], price: 210, priceMax: 290, areaMin: 2600, areaMax: 3400, status: "New Launch", image: "villa-2.svg", desc: "Duplex villas in a quiet gated community with private terraces.", sample: true },
  { id: 12, title: "Sample Alwal Trade Centre", zone: "north", locality: "Alwal", type: "Commercial", bhk: [], price: 55, priceMax: 180, areaMin: 400, areaMax: 2200, status: "Under Construction", image: "commercial-1.svg", desc: "Retail shops and office units on a busy main road.", sample: true },

  /* ---------------- SOUTH ---------------- */
  { id: 13, title: "Sample Airport City Plots", zone: "south", locality: "Shamshabad", type: "Plot", bhk: [], price: 35, priceMax: 90, areaMin: 1500, areaMax: 3600, status: "Ready to Move", image: "plot-1.svg", desc: "Open plots minutes from the international airport, in an approved layout.", sample: true },
  { id: 14, title: "Sample Tukkuguda Meadows", zone: "south", locality: "Tukkuguda", type: "Villa", bhk: [3, 4], price: 145, priceMax: 210, areaMin: 2400, areaMax: 3200, status: "Under Construction", image: "villa-1.svg", desc: "Villas surrounded by landscaped gardens near the Outer Ring Road.", sample: true },
  { id: 15, title: "Sample Adibatla Residency", zone: "south", locality: "Adibatla", type: "Apartment", bhk: [2, 3], price: 58, priceMax: 95, areaMin: 1100, areaMax: 1650, status: "New Launch", image: "apartment-3.svg", desc: "Affordable apartments close to the aerospace SEZ and IT campuses.", sample: true },
  { id: 16, title: "Sample Maheshwaram Farms", zone: "south", locality: "Maheshwaram", type: "Plot", bhk: [], price: 22, priceMax: 48, areaMin: 1800, areaMax: 4500, status: "Ready to Move", image: "plot-2.svg", desc: "Large plots ideal for long-term investment or a weekend home.", sample: true },
  { id: 17, title: "Sample Ibrahimpatnam Enclave", zone: "south", locality: "Ibrahimpatnam", type: "Plot", bhk: [], price: 18, priceMax: 40, areaMin: 1350, areaMax: 3000, status: "Ready to Move", image: "plot-2.svg", desc: "Budget-friendly plots with clear titles and good road connectivity.", sample: true },
  { id: 18, title: "Sample Kothur Logistics Park", zone: "south", locality: "Kothur", type: "Commercial", bhk: [], price: 95, priceMax: 300, areaMin: 5000, areaMax: 20000, status: "New Launch", image: "commercial-2.svg", desc: "Warehousing and commercial land parcels on the Bengaluru highway.", sample: true },

  /* ---------------- EAST ---------------- */
  { id: 19, title: "Sample Uppal Central", zone: "east", locality: "Uppal", type: "Apartment", bhk: [2, 3], price: 82, priceMax: 140, areaMin: 1150, areaMax: 1800, status: "Ready to Move", image: "apartment-1.svg", desc: "Homes near the Uppal metro station and stadium, with full amenities.", sample: true },
  { id: 20, title: "Sample LB Nagar Square", zone: "east", locality: "LB Nagar", type: "Commercial", bhk: [], price: 65, priceMax: 220, areaMin: 450, areaMax: 2500, status: "Under Construction", image: "commercial-2.svg", desc: "Shops and offices in one of East Hyderabad's busiest junctions.", sample: true },
  { id: 21, title: "Sample Nagole Riverside", zone: "east", locality: "Nagole", type: "Apartment", bhk: [2, 3], price: 75, priceMax: 120, areaMin: 1100, areaMax: 1700, status: "New Launch", image: "apartment-2.svg", desc: "Modern apartments with metro access and a large clubhouse.", sample: true },
  { id: 22, title: "Sample Boduppal Homes", zone: "east", locality: "Boduppal", type: "Apartment", bhk: [2], price: 55, priceMax: 70, areaMin: 1000, areaMax: 1200, status: "Ready to Move", image: "apartment-3.svg", desc: "Value-for-money 2 BHK homes in a growing residential area.", sample: true },
  { id: 23, title: "Sample Ghatkesar Villas", zone: "east", locality: "Ghatkesar", type: "Villa", bhk: [3], price: 98, priceMax: 135, areaMin: 2000, areaMax: 2600, status: "Under Construction", image: "villa-2.svg", desc: "Independent villas close to the Outer Ring Road and engineering colleges.", sample: true },
  { id: 24, title: "Sample Pocharam IT Plots", zone: "east", locality: "Pocharam", type: "Plot", bhk: [], price: 30, priceMax: 65, areaMin: 1500, areaMax: 3000, status: "Ready to Move", image: "plot-1.svg", desc: "Open plots near the Pocharam IT park in an approved layout.", sample: true }
];
