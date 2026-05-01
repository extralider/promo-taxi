import { Lead } from "../types";

// Configuration for the destination phone number
const DESTINATION_PHONE = "573153553998"; 

/**
 * Generates the WhatsApp link with the pre-filled message specific to the taxi promo.
 */
export const generateWhatsAppLink = (lead: Lead): string => {
  // Message format requested:
  // "Hola quiero aprovechar la promocion del 10% descuento en limpieza dental + valoracion ( mi nombre es)..."
  const message = `Hola, quiero aprovechar la promoción del 10% descuento en limpieza dental + valoración.

Mi nombre es: ${lead.name}
Referido por Taxi: ${lead.referrerId}

Quedo atento/a para agendar mi cita.`;

  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${DESTINATION_PHONE}?text=${encodedMessage}`;
};

/**
 * Sends data to Google Sheets via a Google Apps Script Web App.
 */
export const saveLeadToSheet = async (lead: Lead): Promise<boolean> => {
  // Replace this URL with your actual deployment URL from Google Apps Script
  const SCRIPT_URL = "YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL"; 

  /* 
  === INSTRUCTIONS TO SETUP GOOGLE SHEET ===
  1. Create a new Google Sheet.
  2. Add headers in Row 1: [Date, Name, Phone, ReferrerID, Status]
  3. Go to Extensions > Apps Script.
  4. Delete existing code and paste the following:

  function doPost(e) {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data = JSON.parse(e.postData.contents);
    
    sheet.appendRow([
      new Date(), 
      data.name, 
      data.phone, 
      data.referrerId,
      "PENDIENTE"
    ]);
    
    return ContentService.createTextOutput(JSON.stringify({"result":"success"}))
      .setMimeType(ContentService.MimeType.JSON);
  }

  5. Click "Deploy" > "New Deployment".
  6. Select type "Web app".
  7. Description: "Taxi Lead API".
  8. Execute as: "Me".
  9. Who has access: "Anyone" (Critical for this to work).
  10. Copy the Web App URL and paste it into the SCRIPT_URL variable above.
  */

  if (SCRIPT_URL === "YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL") {
    console.log("Mocking sheet save (Script URL not set):", lead);
    await new Promise(resolve => setTimeout(resolve, 800));
    return true;
  }

  try {
    await fetch(SCRIPT_URL, {
      method: "POST",
      mode: "no-cors", // 'no-cors' is required for simple Google Apps Script posts
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(lead),
    });
    return true;
  } catch (e) {
    console.error("Error saving to sheet", e);
    return false;
  }
};