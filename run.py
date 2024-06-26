from app import create_app, db as db_app
from app.geneticnameplate import create_geneticnameplate


app = create_app()
geneticnameplate = create_geneticnameplate()

with app.app_context():
    db_app.create_all()

if __name__ == "__main__":
    app.run(debug=True, port=5000)
