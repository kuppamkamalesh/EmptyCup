# from flask import Flask, request, jsonify, send_from_directory
# from flask_sqlalchemy import SQLAlchemy
# from flask_cors import CORS
# import os

# app = Flask(__name__, static_folder='static')  # Added static_folder
# CORS(app)  
# app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
# app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
# db = SQLAlchemy(app)

# class Listing(db.Model):
#     id = db.Column(db.Integer, primary_key=True)
#     title = db.Column(db.String(100), nullable=False)
#     rating = db.Column(db.Float)
#     description = db.Column(db.Text)
#     projects = db.Column(db.Integer)
#     years = db.Column(db.Integer)
#     price = db.Column(db.String(10))
#     contacts = db.Column(db.String(200))  
#     shortlisted = db.Column(db.Boolean, default=False)

#     def to_dict(self):
#         return {
#             'id': self.id,
#             'title': self.title,
#             'rating': self.rating,
#             'description': self.description,
#             'projects': self.projects,
#             'years': self.years,
#             'price': self.price,
#             'contacts': eval(self.contacts) if self.contacts else [],
#             'shortlisted': self.shortlisted
#         }
# @app.route('/')
# def serve_index():
#     return send_from_directory(app.static_folder, 'index.html')

# @app.route('/<path:path>')
# def serve_static(path):
#     return send_from_directory(app.static_folder, path)

# @app.route('/api/listings', methods=['GET', 'POST'])
# def handle_listings():
#     if request.method == 'GET':
#         listings = Listing.query.all()
#         return jsonify([listing.to_dict() for listing in listings])
    
#     elif request.method == 'POST':
#         data = request.get_json()
#         new_listing = Listing(
#             title=data['title'],
#             rating=data['rating'],
#             description=data['description'],
#             projects=data['projects'],
#             years=data['years'],
#             price=data['price'],
#             contacts=str(data['contacts']),
#             shortlisted=data.get('shortlisted', False)
#         )
#         db.session.add(new_listing)
#         db.session.commit()
#         return jsonify(new_listing.to_dict()), 201

# @app.route('/api/listings/<int:listing_id>', methods=['GET', 'PUT', 'DELETE'])
# def handle_listing(listing_id):
#     listing = Listing.query.get_or_404(listing_id)
    
#     if request.method == 'GET':
#         return jsonify(listing.to_dict())
    
#     elif request.method == 'PUT':
#         data = request.get_json()
#         listing.title = data.get('title', listing.title)
#         listing.rating = data.get('rating', listing.rating)
#         listing.description = data.get('description', listing.description)
#         listing.projects = data.get('projects', listing.projects)
#         listing.years = data.get('years', listing.years)
#         listing.price = data.get('price', listing.price)
#         listing.contacts = str(data.get('contacts', eval(listing.contacts)))
#         listing.shortlisted = data.get('shortlisted', listing.shortlisted)
#         db.session.commit()
#         return jsonify(listing.to_dict())
    
#     elif request.method == 'DELETE':
#         db.session.delete(listing)
#         db.session.commit()
#         return '', 204

# @app.route('/api/listings/<int:listing_id>/toggle_shortlist', methods=['PUT'])
# def toggle_shortlist(listing_id):
#     listing = Listing.query.get_or_404(listing_id)
#     listing.shortlisted = not listing.shortlisted
#     db.session.commit()
#     return jsonify(listing.to_dict())

# @app.cli.command('initdb')
# def initdb_command():
#     """Initialize the database."""
#     db.create_all()
   
#     sample_listings = [
#         Listing(
#             title="Epic Designs",
#             rating=4.5,
#             description="Passionate team of 4 designers working out of Bangalore",
#             projects=57,
#             years=8,
#             price="$$",
#             contacts=str(["+91 - 984532853", "+91 - 984532854"]),
#             shortlisted=False
#         ),
#         Listing(
#         title="Creative Solutions",
#         rating=3.7,
#         description="Innovative design agency with 10+ years of experience in branding and UI/UX.",
#         projects=120,
#         years=10,
#         price="$$$",
#         contacts=str(["+91 - 987654321", "+91 - 987654322"]),
#         shortlisted=False
#     ),
#     Listing(
#         title="Pixel Perfect",
#         rating=5,
#         description="Specialists in responsive web design and mobile applications.",
#         projects=89,
#         years=6,
#         price="$$",
#         contacts=str(["+91 - 876543210"]),
#         shortlisted=False
#     ),
#     Listing(
#         title="Design Hub",
#         rating=2.3,
#         description="Young and energetic team focused on modern design trends.",
#         projects=42,
#         years=3,
#         price="$",
#         contacts=str(["+91 - 765432109"]),
#         shortlisted=False
#     )  
#     ]
#     db.session.bulk_save_objects(sample_listings)
#     db.session.commit()
#     print('Initialized the database.')

# if __name__ == '__main__':
#     os.makedirs('instance', exist_ok=True)
#     os.makedirs('static', exist_ok=True)
#     app.run(host='0.0.0.0', port=5000)


from flask import Flask, request, jsonify, send_from_directory
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
import os

app = Flask(__name__, static_folder='static')
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

class Listing(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    rating = db.Column(db.Float)
    description = db.Column(db.Text)
    projects = db.Column(db.Integer)
    years = db.Column(db.Integer)
    price = db.Column(db.String(10))
    contacts = db.Column(db.String(200))  
    shortlisted = db.Column(db.Boolean, default=False)

    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'rating': self.rating,
            'description': self.description,
            'projects': self.projects,
            'years': self.years,
            'price': self.price,
            'contacts': eval(self.contacts) if self.contacts else [],
            'shortlisted': self.shortlisted
        }

@app.route('/')
def serve_index():
    return send_from_directory(os.path.abspath('static'), 'index.html')

@app.route('/static/<path:path>')
def serve_static(path):
    return send_from_directory(os.path.abspath('static'), path)

@app.route('/api/listings', methods=['GET', 'POST'])
def handle_listings():
    if request.method == 'GET':
        listings = Listing.query.all()
        return jsonify([listing.to_dict() for listing in listings])
    
    elif request.method == 'POST':
        data = request.get_json()
        new_listing = Listing(
            title=data['title'],
            rating=data['rating'],
            description=data['description'],
            projects=data['projects'],
            years=data['years'],
            price=data['price'],
            contacts=str(data['contacts']),
            shortlisted=data.get('shortlisted', False)
        )
        db.session.add(new_listing)
        db.session.commit()
        return jsonify(new_listing.to_dict()), 201

@app.route('/api/listings/<int:listing_id>', methods=['GET', 'PUT', 'DELETE'])
def handle_listing(listing_id):
    listing = Listing.query.get_or_404(listing_id)
    
    if request.method == 'GET':
        return jsonify(listing.to_dict())
    
    elif request.method == 'PUT':
        data = request.get_json()
        listing.title = data.get('title', listing.title)
        listing.rating = data.get('rating', listing.rating)
        listing.description = data.get('description', listing.description)
        listing.projects = data.get('projects', listing.projects)
        listing.years = data.get('years', listing.years)
        listing.price = data.get('price', listing.price)
        listing.contacts = str(data.get('contacts', eval(listing.contacts)))
        listing.shortlisted = data.get('shortlisted', listing.shortlisted)
        db.session.commit()
        return jsonify(listing.to_dict())
    
    elif request.method == 'DELETE':
        db.session.delete(listing)
        db.session.commit()
        return '', 204

@app.route('/api/listings/<int:listing_id>/toggle_shortlist', methods=['PUT'])
def toggle_shortlist(listing_id):
    listing = Listing.query.get_or_404(listing_id)
    listing.shortlisted = not listing.shortlisted
    db.session.commit()
    return jsonify(listing.to_dict())

@app.cli.command('initdb')
def initdb_command():
    """Initialize the database."""
    db.create_all()
   
    sample_listings = [
        Listing(
            title="Epic Designs",
            rating=4.5,
            description="Passionate team of 4 designers working out of Bangalore",
            projects=57,
            years=8,
            price="$$",
            contacts=str(["+91 - 984532853", "+91 - 984532854"]),
            shortlisted=False
        ),
        Listing(
            title="Creative Solutions",
            rating=3.7,
            description="Innovative design agency with 10+ years of experience in branding and UI/UX.",
            projects=120,
            years=10,
            price="$$$",
            contacts=str(["+91 - 987654321", "+91 - 987654322"]),
            shortlisted=False
        ),
        Listing(
            title="Pixel Perfect",
            rating=5,
            description="Specialists in responsive web design and mobile applications.",
            projects=89,
            years=6,
            price="$$",
            contacts=str(["+91 - 876543210"]),
            shortlisted=False
        ),
        Listing(
            title="Design Hub",
            rating=2.3,
            description="Young and energetic team focused on modern design trends.",
            projects=42,
            years=3,
            price="$",
            contacts=str(["+91 - 765432109"]),
            shortlisted=False
        )  
    ]
    db.session.bulk_save_objects(sample_listings)
    db.session.commit()
    print('Initialized the database.')



if __name__ == '__main__':
    os.makedirs('instance', exist_ok=True)
    os.makedirs('static', exist_ok=True)
    app.run(host='0.0.0.0', port=5000)