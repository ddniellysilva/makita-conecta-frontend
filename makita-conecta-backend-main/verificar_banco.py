import sqlite3
import os

# Nome do arquivo do banco
DB_NAME = "database.db"

def verificar():
    # 1. Verifica se o arquivo existe
    if not os.path.exists(DB_NAME):
        print(f"ERRO: O arquivo '{DB_NAME}' não foi encontrado nesta pasta.")
        print("Certifique-se de que você rodou 'python app.py' pelo menos uma vez.")
        return

    print(f"Arquivo '{DB_NAME}' encontrado.")

    # 2. Tenta ler os usuários
    try:
        conn = sqlite3.connect(DB_NAME)
        cursor = conn.cursor()
        
        cursor.execute("SELECT id, name, email, password FROM users")
        users = cursor.fetchall()
        
        print(f"\n--- Total de Usuários Encontrados: {len(users)} ---")
        
        if not users:
            print("O banco de dados existe, mas está VAZIO.")
            print("Isso indica que o cadastro não está chegando ao backend ou falhando antes de salvar.")
        else:
            for user in users:
                # Mostramos apenas o começo da senha hash por segurança
                senha_curta = user[3][:10] + "..." if user[3] else "SEM SENHA"
                print(f"ID: {user[0]} | Nome: {user[1]} | Email: {user[2]} | Hash: {senha_curta}")
                
        conn.close()

    except Exception as e:
        print(f"Erro ao ler o banco: {e}")
        print("Talvez a tabela 'users' ainda não tenha sido criada.")

if __name__ == "__main__":
    verificar()