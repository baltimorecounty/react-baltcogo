const reportSubCategoryType = [
    {
        _id: "1",
        type: "Bids, disbursements and vendors",
        ReportType: { _id: "5b21ca3eeb7f6fbccd471818", type: "Budget and Finance Issue" }
    },
   {
        _id: "2",
        type: "Parking, red light and speed camera viloations",
        ReportType: { _id: "5b21ca3eeb7f6fbccd471818", type: "Budget and Finance Issue" }
    },
     {
        _id: "3",
        type: "Personal injury and property claims",
        ReportType: { _id: "5b21ca3eeb7f6fbccd471818", type: "Budget and Finance Issue" }
    },
     {
         _id: "4",
         type: "Property taxes",
         ReportType: { _id: "5b21ca3eeb7f6fbccd471818", type: "Budget and Finance Issue" }
     },
    
    {
         _id: "5",
         type: "Building without a permit",
         ReportType: { _id: "5b21ca3eeb7f6fbccd471814", type: "Building and Development Issue" }

     },
      {
         _id: "6",
         type: "Electrical work without a permit",
         ReportType: { _id: "5b21ca3eeb7f6fbccd471814", type: "Building and Development Issue" }

     },
     {
         _id: "7",
         type: "Grading work without a permit",
         ReportType: { _id: "5b21ca3eeb7f6fbccd471814", type: "Building and Development Issue" }

     },
     {
         _id: "8",
         type: "Plumbing work without a permit",
         ReportType: { _id: "5b21ca3eeb7f6fbccd471814", type: "Building and Development Issue" }

     }  
];

export function getSubCategoryType(id) {

    return reportSubCategoryType.filter(m => m.ReportType._id === id) || {};

}


export function getSubCategoryType1() {
    return reportSubCategoryType;

}
