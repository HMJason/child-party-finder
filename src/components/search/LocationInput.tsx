"use client";

import { useState } from "react";
import { LONDON_BOROUGHS } from "@/lib/constants";

interface LocationInputProps {
  borough: string;
  onBoroughChange: (borough: string) => void;
  postcode?: string;
  onPostcodeChange?: (postcode: string) => void;
  radius?: string;
  onRadiusChange?: (radius: string) => void;
}

const LONDON_POSTCODES: Record<string, { lat: number; lng: number; area: string }> = {
  "EC1": { lat: 51.5194, lng: -0.0960, area: "Clerkenwell" },
  "EC1A": { lat: 51.5194, lng: -0.0960, area: "Clerkenwell" },
  "EC2": { lat: 51.5155, lng: -0.0922, area: "City of London" },
  "EC3": { lat: 51.5085, lng: -0.0864, area: "Tower Hill" },
  "EC4": { lat: 51.5142, lng: -0.0993, area: "Blackfriars" },
  "WC1": { lat: 51.5200, lng: -0.1200, area: "Bloomsbury" },
  "WC2": { lat: 51.5122, lng: -0.1270, area: "Leicester Square" },
  "WC2H": { lat: 51.5122, lng: -0.1270, area: "Leicester Square" },
  "SW1": { lat: 51.4975, lng: -0.1357, area: "Westminster" },
  "SW1A": { lat: 51.5010, lng: -0.1246, area: "Westminster" },
  "SW3": { lat: 51.4882, lng: -0.1686, area: "Chelsea" },
  "SW5": { lat: 51.4874, lng: -0.1807, area: "Earls Court" },
  "SW6": { lat: 51.4738, lng: -0.1954, area: "Fulham" },
  "SW7": { lat: 51.4943, lng: -0.1780, area: "South Kensington" },
  "SW8": { lat: 51.4815, lng: -0.1445, area: "Vauxhall" },
  "SW9": { lat: 51.4750, lng: -0.1400, area: "Brixton" },
  "SW10": { lat: 51.4840, lng: -0.1900, area: "Chelsea" },
  "SW11": { lat: 51.4637, lng: -0.1683, area: "Battersea" },
  "SW12": { lat: 51.4545, lng: -0.1523, area: "Balham" },
  "SW13": { lat: 51.4751, lng: -0.2320, area: "Barnes" },
  "SW14": { lat: 51.4616, lng: -0.2702, area: "East Sheen" },
  "SW15": { lat: 51.4495, lng: -0.2051, area: "Putney" },
  "SW16": { lat: 51.4275, lng: -0.1158, area: "Streatham" },
  "SW17": { lat: 51.4163, lng: -0.1562, area: "Tooting" },
  "SW18": { lat: 51.4571, lng: -0.1861, area: "Wandsworth" },
  "SW19": { lat: 51.4098, lng: -0.1929, area: "Wimbledon" },
  "SW20": { lat: 51.4097, lng: -0.2144, area: "South Wimbledon" },
  "SE1": { lat: 51.5033, lng: -0.0800, area: "Southwark" },
  "SE2": { lat: 51.5009, lng: 0.1311, area: "Woolwich" },
  "SE3": { lat: 51.4889, lng: 0.0645, area: "Blackheath" },
  "SE4": { lat: 51.4785, lng: -0.0355, area: "Brockley" },
  "SE5": { lat: 51.4823, lng: -0.0928, area: "Camberwell" },
  "SE6": { lat: 51.4565, lng: -0.0123, area: "Catford" },
  "SE7": { lat: 51.4895, lng: 0.0063, area: "Charlton" },
  "SE8": { lat: 51.4825, lng: -0.0135, area: "Greenwich" },
  "SE9": { lat: 51.4579, lng: 0.0492, area: "Eltham" },
  "SE10": { lat: 51.4885, lng: 0.0038, area: "Greenwich" },
  "SE11": { lat: 51.4893, lng: -0.1122, area: "Kennington" },
  "SE12": { lat: 51.4548, lng: 0.0267, area: "Lee" },
  "SE13": { lat: 51.4536, lng: -0.0132, area: "Lewisham" },
  "SE14": { lat: 51.4754, lng: -0.0421, area: "New Cross" },
  "SE15": { lat: 51.4793, lng: -0.0624, area: "Peckham" },
  "SE16": { lat: 51.5027, lng: -0.0567, area: "Rotherhithe" },
  "SE17": { lat: 51.4873, lng: -0.0907, area: "Walworth" },
  "SE18": { lat: 51.4879, lng: 0.0677, area: "Woolwich" },
  "SE19": { lat: 51.4325, lng: -0.0879, area: "Crystal Palace" },
  "SE20": { lat: 51.4203, lng: -0.0452, area: "Anerley" },
  "SE21": { lat: 51.4350, lng: -0.0863, area: "Dulwich" },
  "SE22": { lat: 51.4559, lng: -0.0844, area: "East Dulwich" },
  "SE23": { lat: 51.4436, lng: -0.0567, area: "Forest Hill" },
  "SE24": { lat: 51.4542, lng: -0.0912, area: "Herne Hill" },
  "SE25": { lat: 51.4107, lng: -0.0529, area: "South Norwood" },
  "SE26": { lat: 51.4329, lng: -0.0361, area: "Sydenham" },
  "SE27": { lat: 51.4353, lng: -0.0946, area: "West Norwood" },
  "N1": { lat: 51.5386, lng: -0.1039, area: "Islington" },
  "N1C": { lat: 51.5386, lng: -0.1039, area: "Camden" },
  "N2": { lat: 51.6008, lng: -0.1456, area: "East Finchley" },
  "N3": { lat: 51.6017, lng: -0.1906, area: "Finchley" },
  "N4": { lat: 51.5774, lng: -0.1063, area: "Finsbury Park" },
  "N5": { lat: 51.5552, lng: -0.1058, area: "Highbury" },
  "N6": { lat: 51.5736, lng: -0.1458, area: "Highgate" },
  "N7": { lat: 51.5522, lng: -0.1174, area: "Holloway" },
  "N8": { lat: 51.6252, lng: -0.1118, area: "Hornsey" },
  "N9": { lat: 51.6386, lng: -0.0470, area: "Lower Edmonton" },
  "N10": { lat: 51.6102, lng: -0.1282, area: "Muswell Hill" },
  "N11": { lat: 51.6232, lng: -0.1515, area: "New Southgate" },
  "N12": { lat: 51.6171, lng: -0.1757, area: "North Finchley" },
  "N13": { lat: 51.6307, lng: -0.1113, area: "Palmers Green" },
  "N14": { lat: 51.6369, lng: -0.1231, area: "Southgate" },
  "N15": { lat: 51.6013, lng: -0.1073, area: "Seven Sisters" },
  "N16": { lat: 51.5527, lng: -0.0759, area: "Stoke Newington" },
  "N17": { lat: 51.6034, lng: -0.0579, area: "Tottenham" },
  "N18": { lat: 51.6155, lng: -0.0495, area: "Upper Edmonton" },
  "N19": { lat: 51.5654, lng: -0.1254, area: "Archway" },
  "N20": { lat: 51.6293, lng: -0.1853, area: "Whetstone" },
  "N21": { lat: 51.6401, lng: -0.1096, area: "Winchmore Hill" },
  "N22": { lat: 51.6161, lng: -0.1121, area: "Wood Green" },
  "NW1": { lat: 51.5313, lng: -0.1254, area: "Camden" },
  "NW2": { lat: 51.5519, lng: -0.2209, area: "Cricklewood" },
  "NW3": { lat: 51.5577, lng: -0.1659, area: "Hampstead" },
  "NW4": { lat: 51.5813, lng: -0.2264, area: "Hendon" },
  "NW5": { lat: 51.5413, lng: -0.1406, area: "Kentish Town" },
  "NW6": { lat: 51.5343, lng: -0.2043, area: "West Hampstead" },
  "NW7": { lat: 51.6261, lng: -0.2530, area: "Mill Hill" },
  "NW8": { lat: 51.5364, lng: -0.1836, area: "St John's Wood" },
  "NW9": { lat: 51.5876, lng: -0.2806, area: "Colindale" },
  "NW10": { lat: 51.5466, lng: -0.2576, area: "Willesden" },
  "NW11": { lat: 51.5736, lng: -0.1923, area: "Golders Green" },
  "W1": { lat: 51.5100, lng: -0.1500, area: "West End" },
  "W1K": { lat: 51.5127, lng: -0.1891, area: "Mayfair" },
  "W1S": { lat: 51.5114, lng: -0.1435, area: "Piccadilly" },
  "W2": { lat: 51.5126, lng: -0.1871, area: "Paddington" },
  "W3": { lat: 51.4979, lng: -0.2700, area: "Acton" },
  "W4": { lat: 51.4785, lng: -0.2558, area: "Chiswick" },
  "W5": { lat: 51.5101, lng: -0.3016, area: "Ealing" },
  "W6": { lat: 51.4925, lng: -0.2339, area: "Hammersmith" },
  "W7": { lat: 51.5090, lng: -0.3380, area: "Hanwell" },
  "W8": { lat: 51.5016, lng: -0.1929, area: "Kensington" },
  "W9": { lat: 51.5231, lng: -0.2035, area: "Maida Vale" },
  "W10": { lat: 51.5249, lng: -0.2106, area: "North Kensington" },
  "W11": { lat: 51.5085, lng: -0.2021, area: "Notting Hill" },
  "W12": { lat: 51.5034, lng: -0.2479, area: "Shepherd's Bush" },
  "W13": { lat: 51.5185, lng: -0.3089, area: "West Ealing" },
  "W14": { lat: 51.4889, lng: -0.2068, area: "Kensington" },
  "E1": { lat: 51.5099, lng: -0.0059, area: "Whitechapel" },
  "E1W": { lat: 51.5077, lng: -0.0754, area: "Wapping" },
  "E2": { lat: 51.5254, lng: -0.0543, area: "Bethnal Green" },
  "E3": { lat: 51.5158, lng: -0.0129, area: "Bow" },
  "E4": { lat: 51.5697, lng: -0.0050, area: "Chingford" },
  "E5": { lat: 51.5479, lng: -0.0611, area: "Hackney" },
  "E6": { lat: 51.5414, lng: 0.0646, area: "East Ham" },
  "E7": { lat: 51.5554, lng: 0.0057, area: "Forest Gate" },
  "E8": { lat: 51.5419, lng: -0.0760, area: "Hackney" },
  "E9": { lat: 51.5378, lng: -0.0554, area: "Homerton" },
  "E10": { lat: 51.5303, lng: -0.0198, area: "Leyton" },
  "E11": { lat: 51.5530, lng: -0.0024, area: "Leytonstone" },
  "E12": { lat: 51.5396, lng: 0.0463, area: "Manor Park" },
  "E13": { lat: 51.5302, lng: 0.0323, area: "Plaistow" },
  "E14": { lat: 51.5033, lng: -0.0235, area: "Canary Wharf" },
  "E15": { lat: 51.5433, lng: -0.0012, area: "Stratford" },
  "E16": { lat: 51.5083, lng: 0.0341, area: "Royal Docks" },
  "E17": { lat: 51.5654, lng: -0.0207, area: "Walthamstow" },
  "E18": { lat: 51.5783, lng: 0.0286, area: "South Woodford" },
  "E20": { lat: 51.5075, lng: -0.0478, area: "Stratford" },
  "TW1": { lat: 51.4508, lng: -0.3420, area: "Twickenham" },
  "TW2": { lat: 51.4428, lng: -0.3263, area: "Twickenham" },
  "TW3": { lat: 51.4474, lng: -0.3579, area: "Hounslow" },
  "TW4": { lat: 51.4539, lng: -0.3677, area: "Hounslow" },
  "TW5": { lat: 51.4742, lng: -0.3678, area: "Heston" },
  "TW6": { lat: 51.4696, lng: -0.3861, area: "Feltham" },
  "TW7": { lat: 51.4364, lng: -0.3295, area: "Isleworth" },
  "TW8": { lat: 51.4670, lng: -0.2968, area: "Brentford" },
  "TW9": { lat: 51.4613, lng: -0.2940, area: "Kew" },
  "TW10": { lat: 51.4273, lng: -0.2973, area: "Richmond" },
  "TW11": { lat: 51.4091, lng: -0.3303, area: "Teddington" },
  "TW12": { lat: 51.4177, lng: -0.3512, area: "Hampton" },
  "CR0": { lat: 51.4098, lng: -0.0564, area: "Croydon" },
  "CR2": { lat: 51.3566, lng: -0.0943, area: "Sanderstead" },
  "CR4": { lat: 51.4115, lng: -0.1174, area: "Mitcham" },
  "CR5": { lat: 51.3039, lng: -0.1297, area: "Coulsdon" },
  "CR7": { lat: 51.3967, lng: -0.1068, area: "Thornton Heath" },
  "BR1": { lat: 51.4039, lng: 0.0198, area: "Bromley" },
  "BR2": { lat: 51.4039, lng: 0.0198, area: "Bromley" },
  "BR3": { lat: 51.4039, lng: 0.0198, area: "Bromley" },
  "BR5": { lat: 51.4229, lng: 0.0673, area: "Orpington" },
  "BR6": { lat: 51.4229, lng: 0.0673, area: "Orpington" },
  "HA0": { lat: 51.5501, lng: -0.2795, area: "Wembley" },
  "HA1": { lat: 51.5892, lng: -0.3346, area: "Harrow" },
  "HA2": { lat: 51.5892, lng: -0.3346, area: "Harrow" },
  "HA3": { lat: 51.6026, lng: -0.3291, area: "Harrow" },
  "HA4": { lat: 51.5735, lng: -0.3957, area: "Ruislip" },
  "HA5": { lat: 51.6018, lng: -0.4431, area: "Pinner" },
  "HA6": { lat: 51.6282, lng: -0.4113, area: "Northwood" },
  "HA7": { lat: 51.6153, lng: -0.3134, area: "Stanmore" },
  "HA8": { lat: 51.6000, lng: -0.2707, area: "Edgware" },
  "HA9": { lat: 51.5584, lng: -0.2801, area: "Wembley" },
  "EN1": { lat: 51.6538, lng: -0.1115, area: "Enfield" },
  "EN2": { lat: 51.6538, lng: -0.1115, area: "Enfield" },
  "EN3": { lat: 51.6778, lng: -0.0568, area: "Enfield" },
  "EN4": { lat: 51.6500, lng: -0.1597, area: "Barnet" },
  "EN5": { lat: 51.6500, lng: -0.1597, area: "Barnet" },
  "IG1": { lat: 51.5590, lng: 0.0741, area: "Ilford" },
  "IG2": { lat: 51.5590, lng: 0.0741, area: "Ilford" },
  "IG3": { lat: 51.5155, lng: 0.0926, area: "Redbridge" },
  "IG5": { lat: 51.5590, lng: 0.0741, area: "Ilford" },
  "IG6": { lat: 51.5760, lng: 0.0897, area: "Ilford" },
  "IG7": { lat: 51.5915, lng: 0.1088, area: "Chigwell" },
  "IG8": { lat: 51.5830, lng: 0.0266, area: "Woodford Green" },
  "IG11": { lat: 51.5392, lng: 0.0725, area: "Barking" },
  "RM1": { lat: 51.5777, lng: 0.1861, area: "Romford" },
  "RM2": { lat: 51.5596, lng: 0.2073, area: "Gidea Park" },
  "RM3": { lat: 51.6123, lng: 0.2121, area: "Harold Wood" },
  "RM5": { lat: 51.6083, lng: 0.1679, area: "Collier Row" },
  "RM6": { lat: 51.5656, lng: 0.1425, area: "Chadwell Heath" },
  "RM7": { lat: 51.5777, lng: 0.1861, area: "Romford" },
  "RM8": { lat: 51.5411, lng: 0.1303, area: "Dagenham" },
  "RM9": { lat: 51.5317, lng: 0.1219, area: "Becontree" },
  "RM10": { lat: 51.5317, lng: 0.1219, area: "Dagenham" },
  "RM11": { lat: 51.5656, lng: 0.1425, area: "Gidea Park" },
  "RM12": { lat: 51.5656, lng: 0.1425, area: "Hornchurch" },
  "RM14": { lat: 51.5353, lng: 0.1934, area: "Upminster" },
  "KT1": { lat: 51.4203, lng: -0.3012, area: "Kingston" },
  "KT2": { lat: 51.4203, lng: -0.3012, area: "Kingston" },
  "KT3": { lat: 51.4095, lng: -0.2968, area: "New Malden" },
  "KT4": { lat: 51.3948, lng: -0.2535, area: "Worcester Park" },
  "KT5": { lat: 51.3921, lng: -0.2792, area: "Tolworth" },
  "KT6": { lat: 51.3844, lng: -0.3290, area: "Surbiton" },
  "KT7": { lat: 51.3844, lng: -0.3290, area: "Thames Ditton" },
  "KT8": { lat: 51.3844, lng: -0.3290, area: "East Molesey" },
  "KT9": { lat: 51.3844, lng: -0.3290, area: "Chessington" },
  "KT10": { lat: 51.3620, lng: -0.3454, area: "Esher" },
  "KT11": { lat: 51.3147, lng: -0.3329, area: "Cobham" },
  "KT12": { lat: 51.3278, lng: -0.4000, area: "Walton-on-Thames" },
  "KT13": { lat: 51.2841, lng: -0.4886, area: "Weybridge" },
  "KT14": { lat: 51.2841, lng: -0.4886, area: "Byfleet" },
  "KT15": { lat: 51.3147, lng: -0.3329, area: "Addlestone" },
  "KT16": { lat: 51.3147, lng: -0.3329, area: "Chertsey" },
  "KT17": { lat: 51.3147, lng: -0.3329, area: "Epsom" },
  "KT18": { lat: 51.3147, lng: -0.3329, area: "Ewell" },
  "KT19": { lat: 51.3504, lng: -0.2641, area: "Epsom" },
  "KT20": { lat: 51.2841, lng: -0.4886, area: "Tadworth" },
  "SM1": { lat: 51.3618, lng: -0.1945, area: "Sutton" },
  "SM2": { lat: 51.3618, lng: -0.1945, area: "Sutton" },
  "SM3": { lat: 51.3618, lng: -0.1945, area: "Sutton" },
  "SM4": { lat: 51.4108, lng: -0.1945, area: "Morden" },
  "SM5": { lat: 51.3953, lng: -0.1518, area: "Carshalton" },
  "SM6": { lat: 51.3953, lng: -0.1518, area: "Wallington" },
};

const RADIUS_OPTIONS = [
  { value: "", label: "Any distance" },
  { value: "1", label: "Within 1 mile" },
  { value: "3", label: "Within 3 miles" },
  { value: "5", label: "Within 5 miles" },
  { value: "10", label: "Within 10 miles" },
  { value: "15", label: "Within 15 miles" },
];

export function LocationInput({ 
  borough, 
  onBoroughChange,
  postcode = "",
  onPostcodeChange,
  radius = "",
  onRadiusChange
}: LocationInputProps) {
  const [postcodeInput, setPostcodeInput] = useState(postcode);
  const [showPostcode, setShowPostcode] = useState(false);

  const handlePostcodeChange = (value: string) => {
    setPostcodeInput(value);
    if (onPostcodeChange) {
      onPostcodeChange(value.toUpperCase().replace(/\s/g, ""));
    }
  };

  const handleRadiusChange = (value: string) => {
    if (onRadiusChange) {
      onRadiusChange(value);
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          📍 Search Location
        </label>
        
        <button
          type="button"
          onClick={() => setShowPostcode(!showPostcode)}
          className="text-sm text-primary hover:text-primary/80 font-medium mb-2 flex items-center gap-1"
        >
          {showPostcode ? "← Use borough instead" : "🔍 Search by postcode"}
        </button>

        {showPostcode ? (
          <div className="space-y-3">
            <input
              type="text"
              value={postcodeInput}
              onChange={(e) => handlePostcodeChange(e.target.value)}
              placeholder="e.g. SW1A, E14, NW1"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary bg-white transition-colors text-lg"
            />
            {postcodeInput && onRadiusChange && (
              <select
                value={radius}
                onChange={(e) => handleRadiusChange(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary bg-white transition-colors"
              >
                {RADIUS_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            )}
            {postcodeInput && LONDON_POSTCODES[postcodeInput.substring(0, 3).toUpperCase()] && (
              <p className="text-xs text-green-600 flex items-center gap-1">
                ✓ Found: {LONDON_POSTCODES[postcodeInput.substring(0, 3).toUpperCase()].area}
              </p>
            )}
          </div>
        ) : (
          <select
            value={borough}
            onChange={(e) => onBoroughChange(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary bg-white transition-colors text-lg"
          >
            <option value="">All of London</option>
            {LONDON_BOROUGHS.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>
        )}
      </div>
    </div>
  );
}

export { LONDON_POSTCODES };
