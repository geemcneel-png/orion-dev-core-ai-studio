/**
 * ORION DEV CORE - CONNECTIVITY MODULE
 * This file connects your Cloud Run Site to your Google Sheet Engine
 */

const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzw11Cf-g7oXQQmyovP4SJ_7s2ScRnLeT7qaaTw_q9phQwUqr2FVIMKpggnOZOg8HbuaQ/exec";

export const getPartnerData = async (bioId) => {
  try {
    // 1. Call the Google Sheet Engine
    const response = await fetch(`${APPS_SCRIPT_URL}?bio_id=${bioId}`);
    const result = await response.json();

    if (result.status === 'success' && result.data.length > 0) {
      const partner = result.data[0];
      
      // 2. Format the "Briefing" for the AI
      const aiBriefing = `
        You are Mintaka, the AI for Orion Dev Core. 
        You are talking to ${partner['Full Name']}. 
        Their package is ${partner['Package']}. 
        Current project status: ${partner['Status']}.
        Private Note: ${partner['Admin_Notes'] || 'None'}.
        Be professional, witty, and helpful.
      `;

      return {
        name: partner['Full Name'],
        package: partner['Package'],
        status: partner['Status'],
        aiPrompt: aiBriefing
      };
    }
    return null;
  } catch (error) {
    console.error("Connection to Core failed!", error);
    return null;
  }
};
