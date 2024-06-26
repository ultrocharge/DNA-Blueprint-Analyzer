import os, json

from flask import Blueprint, request, jsonify, send_file
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from sqlalchemy.exc import IntegrityError

from app import db, bcrypt
from app.models import User
from app.config import Constant
from app.geneticnameplate import analyze

main = Blueprint('main', __name__)

# Control Files
@main.route('/upload_csv', methods=['POST'])
def upload_csv():
    pdfInfo = json.loads(request.form.get('pdfInfo'))
    uploadFiles = request.files.getlist('uploadFiles')
    analyze.process_csv_and_export_pdf(files=uploadFiles, pdfInfo=pdfInfo)
    
    return jsonify(message='Successfully downloaded a zip file of DNA BLUE PRINT PDFs!'), 200
    
    # zip_buffer = analyze.process_csv_and_export_pdf(files=uploadFiles, pdfInfo=pdfInfo)
    # return send_file(zip_buffer, as_attachment=True, download_name='generated_reports.zip', mimetype='application/zip')
    return send_file(zip_buffer, as_attachment=True, download_name='generated_reports.zip', mimetype='application/zip')

@main.route('/download/<filename>', methods=['GET'])
def download_file(filename):
    file_path = os.path.join(Constant.RESULT_FOLDER, filename)
    if os.path.exists(file_path):
        return send_file(file_path, as_attachment=True)
    else:
        return jsonify(error='File not found'), 404

# Authentication
@main.route("/register", methods=['POST'])
def register():
    try:
        data = request.get_json()
        hashed_password = bcrypt.generate_password_hash(data['password']).decode('utf-8')
        user = User(username=data['username'], email=data['email'], password=hashed_password)
        db.session.add(user)
        db.session.commit()
        return jsonify(message="User registered successfully"), 201
    except IntegrityError:
        db.session.rollback()  # Rollback the session to recover from the IntegrityError
        return jsonify(error='User with this email or username already exists'), 409
    except Exception as err:
        return jsonify(error=str(err)), 500

@main.route("/login", methods=['POST'])
def login():
    data = request.get_json()
    user = User.query.filter_by(email=data['email']).first()
    if user and bcrypt.check_password_hash(user.password, data['password']):
        access_token = create_access_token(identity={'username': user.username, 'email': user.email})
        return jsonify(access_token=access_token), 200
    return jsonify(message="Invalid credentials"), 401

@main.route("/protected", methods=['GET'])
@jwt_required()
def protected():
    current_user = get_jwt_identity()
    return jsonify(logged_in_as=current_user), 200
