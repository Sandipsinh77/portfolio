from flask import Flask, render_template, request, jsonify, send_file
import os
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/download-resume')
def download_resume():
    resume_path = os.path.join(app.static_folder, 'resume', 'Sandipsinh_Jadeja_Resume.pdf')
    return send_file(resume_path, as_attachment=True, download_name='Sandipsinh_Jadeja_Resume.pdf')

@app.route('/contact', methods=['POST'])
def contact():
    data = request.get_json()
    name    = data.get('name', '').strip()
    email   = data.get('email', '').strip()
    subject = data.get('subject', '').strip()
    message = data.get('message', '').strip()

    if not all([name, email, message]):
        return jsonify({'success': False, 'error': 'Please fill all required fields.'}), 400

    # In production, configure SMTP credentials via env vars.
    # For now we just return success so the form works end-to-end.
    print(f"[Contact Form] From: {name} <{email}> | Subject: {subject}\n{message}")
    return jsonify({'success': True, 'message': f"Thanks {name}! I'll get back to you soon."})

if __name__ == '__main__':
    app.run(debug=True, port=5000)