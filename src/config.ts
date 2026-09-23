/**
 * MI CAFE - Google Apps Script & Application Configuration
 */

// User specified constant URL placeholder
export const GOOGLE_SCRIPT_URL = "PASTE_GOOGLE_APPS_SCRIPT_URL_HERE";

// Local storage key for testing custom script URL directly in browser without rebuild
export const SCRIPT_URL_STORAGE_KEY = "mi_cafe_google_script_url";

/**
 * Returns either custom URL configured via in-app UI or default constant
 */
export function getActiveGoogleScriptUrl(): string {
  if (typeof window !== "undefined") {
    const saved = localStorage.getItem(SCRIPT_URL_STORAGE_KEY);
    if (saved && saved.trim().length > 0) {
      return saved.trim();
    }
  }
  return GOOGLE_SCRIPT_URL;
}

/**
 * Google Apps Script doPost(e) code to be pasted into Google Sheets Script Editor
 * 
 * Setup instructions:
 * 1. Open your Google Sheet.
 * 2. In Row 1, add headers:
 *    Order ID | Date | Time | Customer Name | Phone | Email | Order Type | Table Number | Items | Total | Notes | Order Status
 * 3. Go to Extensions -> Apps Script.
 * 4. Replace Code.gs with this script.
 * 5. Click Deploy -> New deployment -> Select type: Web app.
 * 6. Set Description: "MI CAFE Orders", Execute as: "Me", Who has access: "Anyone".
 * 7. Click Deploy, authorize access, and copy the Web App URL!
 */
export const GOOGLE_APPS_SCRIPT_CODE = `function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.tryLock(10000);

  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Check if headers exist, if not create them
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        "Order ID", 
        "Date", 
        "Time", 
        "Customer Name", 
        "Phone", 
        "Email", 
        "Order Type", 
        "Table Number", 
        "Items", 
        "Total", 
        "Notes", 
        "Order Status"
      ]);
      // Format header row
      sheet.getRange(1, 1, 1, 12)
        .setFontWeight("bold")
        .setBackground("#4A2E18")
        .setFontColor("#FFFFFF");
    }

    var data;
    if (e.postData && e.postData.contents) {
      data = JSON.parse(e.postData.contents);
    } else if (e.parameter) {
      data = e.parameter;
    } else {
      throw new Error("No data received");
    }

    var orderId = data.orderId || "MIC-" + Utilities.getUuid().slice(0, 8);
    var date = data.date || Utilities.formatDate(new Date(), Session.getScriptTimeZone(), "yyyy-MM-dd");
    var time = data.time || Utilities.formatDate(new Date(), Session.getScriptTimeZone(), "hh:mm a");
    var customerName = data.customerName || "";
    var phone = data.phone || "";
    var email = data.email || "";
    var orderType = data.orderType || "Dine In";
    var tableNumber = data.tableNumber || "-";
    var items = data.items || "";
    var total = data.total || 0;
    var notes = data.notes || "";
    var status = data.status || "New Order";

    sheet.appendRow([
      orderId,
      date,
      time,
      customerName,
      phone,
      email,
      orderType,
      tableNumber,
      items,
      total,
      notes,
      status
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ result: "success", orderId: orderId }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ result: "error", error: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}
`;
