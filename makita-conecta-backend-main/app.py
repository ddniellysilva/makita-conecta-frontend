import os
import sqlite3
from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
import re
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app)

app.config["JWT_SECRET_KEY"] = os.environ.get("JWT_SECRET_KEY")
# Fallback caso a chave não esteja no .env (apenas para evitar erros iniciais)
if not app.config["JWT_SECRET_KEY"]:
    app.config["JWT_SECRET_KEY"] = "chave-padrao-desenvolvimento"

bcrypt = Bcrypt(app)
jwt = JWTManager(app)

# --- Configuração do Banco de Dados (SQLite) ---
DB_NAME = "database.db"

def init_db():
    """Cria a tabela de usuários se ela não existir."""
    with sqlite3.connect(DB_NAME) as conn:
        cursor = conn.cursor()
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                email TEXT NOT NULL UNIQUE,
                password TEXT NOT NULL
            )
        ''')
        conn.commit()
        print("Banco de dados inicializado com sucesso!")

# Inicializa o banco ao ligar o app
init_db()

def is_valid_email(email):
    regex = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
    return re.match(regex, email) is not None

# --- Endpoints da API ---

@app.route("/api/register", methods=["POST"])
def register_user():
    data = request.get_json()
    
    required_fields = ["name", "email", "password"]
    if not data or any(field not in data for field in required_fields):
        return jsonify({"message": "Dados incompletos"}), 400

    email = data.get("email")
    name = data.get("name")
    password = data.get("password")

    if len(name) < 2:
        return jsonify({"message": "O nome deve ter no mínimo 2 caracteres"}), 400
    if not is_valid_email(email):
        return jsonify({"message": "Digite um e-mail válido"}), 400
    if len(password) < 8:
        return jsonify({"message": "A senha deve ter no mínimo 8 caracteres"}), 400

    hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')

    try:
        # Conecta ao banco e tenta inserir
        with sqlite3.connect(DB_NAME) as conn:
            cursor = conn.cursor()
            # O comando SQL INSERT cria o usuário
            cursor.execute("INSERT INTO users (name, email, password) VALUES (?, ?, ?)", 
                           (name, email, hashed_password))
            conn.commit()
            
        print(f"Usuário registrado no Banco de Dados: {email}")
        return jsonify({"message": "Usuário criado com sucesso!"}), 201

    except sqlite3.IntegrityError:
        # Esse erro acontece se o email já existir (UNIQUE constraint)
        return jsonify({"message": "E-mail já cadastrado"}), 409
    except Exception as e:
        print(f"Erro no banco: {e}")
        return jsonify({"message": "Erro interno no servidor"}), 500

@app.route("/api/login", methods=["POST"])
def login_user():
    data = request.get_json()

    if not data or not data.get("email") or not data.get("password"):
        return jsonify({"message": "Dados incompletos"}), 400

    email = data.get("email")
    password = data.get("password")

    # Busca o usuário no banco de dados
    user = None
    with sqlite3.connect(DB_NAME) as conn:
        conn.row_factory = sqlite3.Row # Permite acessar colunas por nome
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM users WHERE email = ?", (email,))
        user = cursor.fetchone()

    # Se não achou usuário ou a senha não bate
    if not user or not bcrypt.check_password_hash(user["password"], password):
        return jsonify({"message": "E-mail ou senha inválidos"}), 401 

    access_token = create_access_token(identity=email)
    return jsonify(access_token=access_token), 200

@app.route("/api/profile", methods=["GET"])
@jwt_required()
def get_profile():
    current_user_email = get_jwt_identity()
    
    with sqlite3.connect(DB_NAME) as conn:
        conn.row_factory = sqlite3.Row
        cursor = conn.cursor()
        cursor.execute("SELECT name, email FROM users WHERE email = ?", (current_user_email,))
        user = cursor.fetchone()

    if not user:
        return jsonify({"message": "Usuário não encontrado"}), 404
    
    return jsonify({
        "name": user["name"],
        "email": user["email"]
    }), 200

if __name__ == "__main__":
    app.run(debug=True, port=5000)