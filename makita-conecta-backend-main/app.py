import os
from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
import re # Importado para validar o e-mail

# --- Configuração Inicial ---

app = Flask(__name__)
CORS(app)
app.config["JWT_SECRET_KEY"] = "super-secret-key-mude-isso" 
bcrypt = Bcrypt(app)
jwt = JWTManager(app)

# --- Banco de Dados Falso (Mock) ---
users = {} 

# --- Função Auxiliar de Validação ---
def is_valid_email(email):
    """Valida o formato do e-mail usando regex."""
    regex = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
    return re.match(regex, email) is not None

# --- Endpoints da API ---

@app.route("/api/register", methods=["POST"])
def register_user():
    data = request.get_json()
    
    # --- Validação de Backend ---
    # Verifica se todos os campos necessários existem
    required_fields = ["name", "email", "password"]
    if not data or any(field not in data for field in required_fields):
        return jsonify({"message": "Dados incompletos"}), 400

    email = data.get("email")
    name = data.get("name")
    password = data.get("password")

    # Verifica as regras de negócio (espelhando o Zod)
    if len(name) < 2:
        return jsonify({"message": "O nome deve ter no mínimo 2 caracteres"}), 400
    
    if not is_valid_email(email):
        return jsonify({"message": "Digite um e-mail válido"}), 400
        
    if len(password) < 8:
        return jsonify({"message": "A senha deve ter no mínimo 8 caracteres"}), 400
    # --- Fim da Validação ---

    # 1. Verificar se o usuário já existe
    if email in users:
        return jsonify({"message": "E-mail já cadastrado"}), 409

    # 2. Gerar o hash da senha
    hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')

    # 3. Salvar o novo usuário
    users[email] = {
        "name": name,
        "password": hashed_password
    }
    print("Usuário registrado:", users[email]) 
    return jsonify({"message": "Usuário criado com sucesso!"}), 201

@app.route("/api/login", methods=["POST"])
def login_user():
    data = request.get_json()

    if not data or not data.get("email") or not data.get("password"):
        return jsonify({"message": "Dados incompletos"}), 400

    email = data.get("email")
    password = data.get("password")

    # Validação de backend (opcional no login, mas bom)
    if not is_valid_email(email):
         return jsonify({"message": "E-mail ou senha inválidos"}), 401
    
    if len(password) < 8:
         return jsonify({"message": "E-mail ou senha inválidos"}), 401

    # 1. Encontrar o usuário
    user = users.get(email)

    # 2. Validar o usuário e a senha
    if not user or not bcrypt.check_password_hash(user["password"], password):
        return jsonify({"message": "E-mail ou senha inválidos"}), 401 

    # 3. Criar Token de Acesso
    access_token = create_access_token(identity=email)

    return jsonify(access_token=access_token), 200


@app.route("/api/profile", methods=["GET"])
@jwt_required()
def get_profile():
    current_user_email = get_jwt_identity()
    user = users.get(current_user_email)
    if not user:
        return jsonify({"message": "Usuário não encontrado"}), 404
    return jsonify({
        "name": user["name"],
        "email": current_user_email
    }), 200


if __name__ == "__main__":
    app.run(debug=True, port=5000)