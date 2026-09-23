/**
 * MI CAFE - Google Apps Script Web App
 * 
 * Paste this code into your Google Sheet's Apps Script Editor:
 * 1. Open your Google Sheet.
 * 2. Create Row 1 with headers:
 *    Order ID | Date | Time | Customer Name | Phone | Email | Order Type | Table Number | Items | Total | Notes | Order Status
 * 3. Go to Extensions -> Apps Script.
 * 4. Paste this entire script into Code.gs.
 * 5. Click Deploy -> New deployment -> Select type: Web app.
 * 6. Set Description: "MI CAFE Orders", Execute as: "Me", Who has access: "Anyone".
 * 7. Click Deploy, authorize access, and copy the Web App URL!
 * 8. In MI CAFE website, paste the URL into src/config.ts or via the in-app "Google Sheets" button.
 */

function doPost(e) {
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
