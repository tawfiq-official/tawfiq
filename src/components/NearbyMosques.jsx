// import { useEffect, useState } from "react";
// import { MapPin, Navigation, ArrowRight } from "lucide-react";

// export default function NearbyMosques() {

//     const [location, setLocation] = useState(null);

//     const [loadingLocation, setLoadingLocation] = useState(true);

//     const [error, setError] = useState("");

//     const [mosques, setMosques] = useState([]);
//     const [loadingMosques, setLoadingMosques] = useState(false);

//     console.log(import.meta.env.VITE_GOOGLE_MAPS_API_KEY);

//     useEffect(() => {
//       if (!navigator.geolocation) {
//         setError("Geolocation is not supported.");
//         setLoadingLocation(false);
//         return;
//       }

//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//         const lat = position.coords.latitude;
//         const lng = position.coords.longitude;

//         setLocation({
//           lat,
//           lng,
//         });

//         fetchNearbyMosques(lat, lng);

//         setLoadingLocation(false);
//         },

//         () => {
//           setError("Unable to detect your location.");

//           setLoadingLocation(false);
//         },
//       );
//     }, []);

//     const fetchNearbyMosques = async (lat, lng) => {
//       setLoadingMosques(true);

//       try {
//         const url = `https://places.googleapis.com/v1/places:searchNearby`;

//         const response = await fetch(url, {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             "X-Goog-Api-Key": import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
//             "X-Goog-FieldMask":
//               "places.displayName,places.location,places.rating,places.formattedAddress",
//           },
//           body: JSON.stringify({
//             includedTypes: ["mosque"],
//             maxResultCount: 10,
//             locationRestriction: {
//               circle: {
//                 center: {
//                   latitude: lat,
//                   longitude: lng,
//                 },
//                 radius: 5000,
//               },
//             },
//           }),
//         });

//         const data = await response.json();

//         console.log(data);

//         setMosques(data.places || []);
//       } catch (err) {
//         console.error(err);
//       }

//       setLoadingMosques(false);
//     };
//   return (
//     <div className="min-h-screen bg-gradient-to-b from-green-50 via-white to-white">
//       {/* Header */}

      
//       <div className="sticky top-0 z-20 bg-white/80 backdrop-blur-xl border-b border-green-100">
//         <div className="max-w-md mx-auto px-5 py-5">
//           <p className="text-green-600 font-bold tracking-[0.25em] text-sm">
//             TAWFIQ
//           </p>

//           <h1 className="text-3xl font-black mt-2">Nearby Mosques</h1>

//           <p className="text-slate-500 mt-2">
//             Discover mosques around your current location.
//           </p>
//         </div>
//       </div>

//       {/* Content */}

//       <div className="max-w-md mx-auto px-4 py-6 space-y-5">
//         {/* Current Location */}

//         <div
//           className="
//             rounded-3xl
//             bg-white/70
//             backdrop-blur-xl
//             border
//             border-green-100
//             shadow-lg
//             p-5
//           "
//         >
//           <div className="flex items-center gap-3">
//             <div className="w-12 h-12 rounded-2xl bg-green-100 flex items-center justify-center">
//               <Navigation className="text-green-700" size={22} />
//             </div>

//             <div>
//               <p className="text-xs uppercase tracking-widest text-green-700 font-bold">
//                 Current Location
//               </p>

//               <h2 className="font-bold text-lg">
//                 {loadingLocation
//                   ? "Detecting..."
//                   : error
//                     ? error
//                     : "Location Found"}
//               </h2>

//               {location && (
//                 <p className="text-sm text-slate-500 mt-1">
//                   {location.lat.toFixed(5)}, {location.lng.toFixed(5)}
//                 </p>
//               )}
//             </div>
//           </div>
//         </div>

//         {/* Mosque Cards will come here */}

//         {/* Mosque Cards */}

//         <div className="space-y-4">
//           {/* Mosque 1 */}

//           <div className="rounded-3xl bg-white/80 backdrop-blur-xl border border-green-100 shadow-lg p-5 hover:shadow-green-200 transition-all">
//             <div className="flex items-start justify-between">
//               <div className="flex gap-4">
//                 <div className="w-12 h-12 rounded-2xl bg-green-100 flex items-center justify-center">
//                   <MapPin size={22} className="text-green-700" />
//                 </div>

//                 <div>
//                   <h2 className="font-bold text-lg">Masjid Noor</h2>

//                   <p className="text-sm text-slate-500 mt-1">⭐ 4.8 • Open</p>

//                   <p className="text-green-700 font-semibold mt-2">
//                     1.2 km away
//                   </p>
//                 </div>
//               </div>

//               <button
//                 className="
//           w-11
//           h-11
//           rounded-2xl
//           bg-green-600
//           hover:bg-green-700
//           text-white
//           flex
//           items-center
//           justify-center
//           transition-all
//         "
//               >
//                 <ArrowRight size={18} />
//               </button>
//             </div>
//           </div>

//           {/* Mosque 2 */}

//           <div className="rounded-3xl bg-white/80 backdrop-blur-xl border border-green-100 shadow-lg p-5 hover:shadow-green-200 transition-all">
//             <div className="flex items-start justify-between">
//               <div className="flex gap-4">
//                 <div className="w-12 h-12 rounded-2xl bg-green-100 flex items-center justify-center">
//                   <MapPin size={22} className="text-green-700" />
//                 </div>

//                 <div>
//                   <h2 className="font-bold text-lg">Jamia Masjid</h2>

//                   <p className="text-sm text-slate-500 mt-1">⭐ 4.9 • Open</p>

//                   <p className="text-green-700 font-semibold mt-2">
//                     2.4 km away
//                   </p>
//                 </div>
//               </div>

//               <button
//                 className="
//           w-11
//           h-11
//           rounded-2xl
//           bg-green-600
//           hover:bg-green-700
//           text-white
//           flex
//           items-center
//           justify-center
//           transition-all
//         "
//               >
//                 <ArrowRight size={18} />
//               </button>
//             </div>
//           </div>

//           {/* View All */}

//           <button
//             className="
//       w-full
//       rounded-3xl
//       border
//       border-green-200
//       bg-green-50
//       hover:bg-green-100
//       py-4
//       font-semibold
//       text-green-700
//       transition-all
//       hover:scale-[1.01]
//     "
//           >
//             Refresh Nearby Mosques
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }
