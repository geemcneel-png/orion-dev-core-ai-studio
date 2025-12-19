// ==========================================
// ⚡BOLT-ABS-PRO - UNIFIED COMMAND CENTER (V3.0)
// STATUS: OPTIMIZED | ENGINE: MINTAKA HYBRID
// ==========================================

const CONFIG = {
  SPREADSHEET_ID: "1IXU0NXYp_YXtUIpyIAs-qdDeQGhSNaRUYF21aE2z3xE", // Your Sheet ID
  SHEET_NAME: "Sheet1",
  DISCORD_WEBHOOK: "https://discord.com/api/webhooks/1451321313065959628/YnEG_wS5lR5hJ-lP1ULXytThJOt0MxGv22jvBmfmWvCgmv24zTGIDEVD7k23zSFjJf7b",
  YOUR_EMAIL: "geemcneel@gmail.com",
  BUSINESS_NAME: "Orion Dev Core"
};

// ==========================================
// 1. SERVE THE HTML INTERFACE
// ==========================================
function doGet() {
  return HtmlService.createTemplateFromFile('Index')
      .evaluate()
      .addMetaTag('viewport', 'width=device-width, initial-scale=1')
      .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

// ==========================================
// 2. HANDLE WEB FORM SUBMISSIONS
// ==========================================
function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const result = processLead(data);
    
    return ContentService.createTextOutput(JSON.stringify({
      status: "success",
      message: "Lead captured successfully!",
      bioId: result.bioId
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (err) {
    Logger.log("❌ Error in doPost: " + err.toString());
    return ContentService.createTextOutput(JSON.stringify({
      status: "error",
      message: err.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

// ==========================================
// 3. MAIN LEAD PROCESSOR
// ==========================================
function processLead(data) {
  try {
    const leadData = {
      name: data.fullName || data.name || "Unknown",
      email: data.email || "No Email",
      package: data.package || data.tier || "Standard",
      message: data.message || data.details || "No details",
      phone: data.phone || ""
    };
    
    const bioId = "BIO-" + Math.floor(Math.random() * 9000 + 1000);
    
    // EXECUTE PROTOCOLS
    saveToSheet(leadData, bioId);
    sendDiscordAlert(leadData, bioId);
    sendCustomerEmail(leadData, bioId);
    scheduleFollowUp(leadData, bioId); // Now uses Smart Logic
    
    return { success: true, bioId: bioId };
    
  } catch (error) {
    Logger.log("❌ Error processing lead: " + error.toString());
    throw error;
  }
}

// ==========================================
// 4. SAVE TO GOOGLE SHEET
// ==========================================
function saveToSheet(data, bioId) {
  const ss = SpreadsheetApp.openById(CONFIG.SPREADSHEET_ID);
  const sheet = ss.getSheetByName(CONFIG.SHEET_NAME);
  if (!sheet) throw new Error("Sheet not found: " + CONFIG.SHEET_NAME);
  
  sheet.appendRow([new Date(), data.name, data.email, data.package, data.message, "Active", bioId, data.phone]);
}

// ==========================================
// 5. DISCORD COMMAND CENTER ALERT
// ==========================================
function sendDiscordAlert(data, bioId) {
  // Gold for PRO/Universe, Blue for Core
  const color = (data.package.includes("PRO") || data.package.includes("Universe")) ? 0xD4AF37 : 0x667eea;
  const emoji = data.package.includes("Universe") ? "🪐" : data.package.includes("Core") ? "⭐" : "🌟";
  
  const payload = {
    username: "⚡BOLT-ABS-PRO",
    avatar_url: "https://cdn-icons-png.flaticon.com/512/4712/4712109.png",
    embeds: [{
      title: `${emoji} NEW ORION LEAD`,
      color: color,
      fields: [
        { name: "👤 Client", value: data.name, inline: true },
        { name: "🆔 Bio-ID", value: bioId, inline: true },
        { name: "💎 Package", value: data.package, inline: true },
        { name: "📧 Email", value: data.email, inline: false },
        { name: "💬 Message", value: data.message || "No message", inline: false }
      ],
      footer: { text: "POPIA Compliant • " + new Date().toLocaleString() }
    }]
  };

  try {
    UrlFetchApp.fetch(CONFIG.DISCORD_WEBHOOK, { method: "post", contentType: "application/json", payload: JSON.stringify(payload) });
  } catch (err) { Logger.log("Discord Error: " + err); }
}

// ==========================================
// 6. CUSTOMER EMAIL
// ==========================================
function sendCustomerEmail(data, bioId) {
  const subject = `Welcome to ${CONFIG.BUSINESS_NAME}: ${data.package} Activation`;
  const body = `Hi ${data.name},\n\n` +
    `⚡BOLT-ABS-PRO has activated your demo request.\n\n` +
    `Package: ${data.package}\nBiometric ID: ${bioId}\n\n` +
    `Our AI manager is processing your request. We will contact you within 24 hours.\n\n` +
    `Legal Note: Orion Dev Core is a POPIA-compliant operator.\n\n` +
    `Best regards,\nGraham & The Orion Team`;

  try {
    GmailApp.sendEmail(data.email, subject, body, { name: CONFIG.BUSINESS_NAME });
  } catch (err) { Logger.log("Email Error: " + err); }
}

// ==========================================
// 7. SMART SCHEDULER (THE "LAWYER LOGIC")
// ==========================================
function scheduleFollowUp(data, bioId) {
  try {
    const calendar = CalendarApp.getDefaultCalendar();
    const durationMinutes = 30;
    
    // Start looking from TOMORROW at 9:00 AM
    let proposedTime = new Date();
    proposedTime.setDate(proposedTime.getDate() + 1);
    proposedTime.setHours(9, 0, 0, 0);

    // Skip Weekends (Sat=6, Sun=0)
    while (proposedTime.getDay() === 0 || proposedTime.getDay() === 6) {
      proposedTime.setDate(proposedTime.getDate() + 1);
    }

    const endOfDayHour = 16; 
    let foundSlot = false;

    // Look 5 days into the future for a slot
    for (let d = 0; d < 5; d++) {
      if (d > 0) { // Reset to 9 AM on next day
        proposedTime.setDate(proposedTime.getDate() + 1);
        proposedTime.setHours(9, 0, 0, 0);
        while (proposedTime.getDay() === 0 || proposedTime.getDay() === 6) {
          proposedTime.setDate(proposedTime.getDate() + 1);
        }
      }

      while (proposedTime.getHours() < endOfDayHour) {
        const endTime = new Date(proposedTime);
        endTime.setMinutes(endTime.getMinutes() + durationMinutes);
        
        // Check for conflicts
        if (calendar.getEvents(proposedTime, endTime).length === 0) {
          // OPEN SLOT FOUND
          const description = `Orion Lead: ${data.name}\nPkg: ${data.package}\nID: ${bioId}\nMsg: ${data.message}`;
          const event = calendar.createEvent(`📞 Follow-up: ${data.name}`, proposedTime, endTime, { description: description });
          event.addPopupReminder(15);
          foundSlot = true;
          break;
        } else {
          // Slot taken, try 30 mins later
          proposedTime.setMinutes(proposedTime.getMinutes() + 30);
        }
      }
      if (foundSlot) break;
    }
  } catch (err) { Logger.log("Calendar Error: " + err); }
}

// ==========================================
// 8. MORNING BRIEFING AGENT (Run via Trigger)
// ==========================================
function sendDailyBriefing() {
  const sheet = SpreadsheetApp.openById(CONFIG.SPREADSHEET_ID).getSheetByName(CONFIG.SHEET_NAME);
  const data = sheet.getDataRange().getValues();
  const today = new Date();
  const oneDayAgo = new Date(today.getTime() - 24 * 60 * 60 * 1000);
  
  let newLeads = [];
  let revenue = 0;

  for (let i = 1; i < data.length; i++) {
    const timestamp = new Date(data[i][0]);
    const name = data[i][1];
    const tier = data[i][3];

    if (timestamp > oneDayAgo) {
      newLeads.push(`- ${name} [${tier}]`);
      if (tier.includes("PRO")) revenue += 5000;
      else if (tier.includes("Standard")) revenue += 2500;
      else revenue += 1500;
    }
  }

  if (newLeads.length === 0) return;

  const subject = `☕ Orion Morning Brief: ${newLeads.length} New Leads`;
  const body = `Good Morning Graham,\n\nActivity Report:\n\n${newLeads.join("\n")}\n\nEst. Value: R${revenue}\n\nGenerated by Mintaka AI`;
  
  MailApp.sendEmail(CONFIG.YOUR_EMAIL, subject, body);
}