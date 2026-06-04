// import { DEPARTMENTS } from "../../constants/index.js";

// class DepartmentRouterService {
//   detectDepartment(message) {
  
//   if (!message) {
//     throw new Error(
//       "Message is missing"
//     );
//   }

//   const text = String(message)
//     .toLowerCase()
//     .trim();

//    const emsKeywords = [
//       "election",
//       "voter",
//       "campaign",
//       "booth",
//       "political",
//       "candidate",
//       "ems"
//     ];

//     const agriKeywords = [
//       "farmer",
//       "crop",
//       "farming",
//       "agriculture",
//       "seed",
//       "soil",
//       "fertilizer",
//       "agritech"
//     ];

//     const emsMatch =
//       emsKeywords.some((keyword) =>
//         text.includes(keyword)
//       );

//     if (emsMatch) {
//       return DEPARTMENTS.EMS;
//     }

//     return DEPARTMENTS.AGRITECH;
//   }
// }
   


// export default new DepartmentRouterService();


import { DEPARTMENTS } from "../../constants/index.js";

class DepartmentRouterService {
  detectDepartment(message) {
    if (!message) {
      throw new Error("Message is missing");
    }

    const text = String(message).toLowerCase().trim();

    const emsKeywords = [
      "election", "voter", "campaign", "booth", "political", "candidate", "ems", 
      "war room", "crm", "analytics", "survey", "gis", "dialer", "call center"
    ];

    const agriKeywords = [
      "farmer", "crop", "farming", "agriculture", "seed", "soil", "fertilizer", 
      "agritech", "fpo", "processing", "dairy", "ethanol", "mill", "apeda"
    ];

    const emsMatch = emsKeywords.some((keyword) => text.includes(keyword));
    const agriMatch = agriKeywords.some((keyword) => text.includes(keyword));

    if (emsMatch) {
      return "EMS";
    }
    
    if (agriMatch) {
      return "AGRITECH";
    }

    // Return GENERAL so our service layer knows to use the welcome prompt context
    return "GENERAL";
  }
}

export default new DepartmentRouterService();