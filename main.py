import requests
from flask import Flask, request, jsonify

# ... your existing Flask setup ...

APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzw11Cf-g7oXQQmyovP4SJ_7s2ScRnLeT7qaaTw_q9phQwUqr2FVIMKpggnOZOg8HbuaQ/exec"

@app.route('/api/verify-partner', methods=['POST'])
def verify_partner():
    data = request.json
    bio_id = data.get('bio_id')
    
    # Call our Google Sheet Nervous System
    response = requests.get(f"{APPS_SCRIPT_URL}?bio_id={bio_id}")
    sheet_data = response.json()
    
    if sheet_data['status'] == 'success' and len(sheet_data['data']) > 0:
        partner = sheet_data['data'][0]
        return jsonify({
            "status": "success",
            "name": partner['Full Name'],
            "package": partner['Package'],
            "admin_note": partner.get('Admin_Notes', "Welcome to the Core.")
        })
    
    return jsonify({"status": "error", "message": "ID not found"}), 404
