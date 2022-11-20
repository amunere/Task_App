from datetime import datetime
import os
from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import func
from flask_cors import CORS
from flask_marshmallow import Marshmallow

# configuration
DEBUG = True
DATETIME = datetime.now()
basedir = os.path.abspath(os.path.dirname(__file__))

# app
app = Flask(__name__)
app.config.from_object(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://login:pass@localhost/dbname'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.secret_key = 'J(*J98j98jww9gc7ep9j[0**68fjf3y9f34f3f3f3fd9wj3o03*&gff7f67F75%&cu(7gF'

# db
db = SQLAlchemy(app)
# marshmallow
ma = Marshmallow(app)


class Task(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text)
    created_at = db.Column(db.DateTime(timezone=True), server_default=func.now())
    deadline = db.Column(db.String(50), nullable=True)
    complete = db.Column(db.Boolean, default=False)

    def create(self):
        db.session.add(self)
        db.session.commit()
        return self

    def __init__(self, title=None, description=None, deadline=None, complete=False):
        self.title = title
        self.description = description
        self.deadline = deadline
        self.complete = complete

    def __repr__(self):
        return f'<Task: {self.title}, Description {self.description}>'

# before request - create db
# @app.before_request
# def create_table():
#     db.create_all()


# CORS
CORS(app, resources={r"/*": {"origins": "*"}})


# serialization
class TaskSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Task


# schema obj
task_schema = TaskSchema()
tasks_schema = TaskSchema(many=True)


# routing
@app.route('/', methods=['GET', 'POST'])
def add_tasks():
    response_object = {'current_date': DATETIME.strftime("%Y-%m-%d")}
    if request.method == 'POST':
        data = request.get_json()
        task = Task(title=data['title'], description=data['description'], deadline=data['deadline'],
                    complete=data['complete'])
        task.create()
        return jsonify(data), 201
    else:
        tasks = Task.query.order_by('id')
        if tasks:
            response_object['tasks'] = tasks_schema.dump(tasks)
        else:
            response_object = {'tasks': ''}
    return response_object


@app.route('/tasks/<int:task_id>', methods=['PUT', 'DELETE'])
def edit_task(task_id):
    if request.method == 'PUT':
        task = Task.query.get_or_404(task_id)
        data = request.get_json()
        for k, v in data.items():
            setattr(task, k, v)
        db.session.commit()
        return jsonify({'status': 'success'}), 201
    if request.method == 'DELETE':
        task = Task.query.get_or_404(task_id)
        db.session.delete(task)
        db.session.commit()
        return jsonify({'status': 'success'}), 201


if __name__ == '__main__':
    app.run()
