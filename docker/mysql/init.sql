-- cria o banco
CREATE DATABASE IF NOT EXISTS test-api-sfox;

-- cria usuário com mysql_native_password
CREATE USER 'user'@'%' IDENTIFIED WITH mysql_native_password BY 'password';

-- dá permissões
GRANT ALL PRIVILEGES ON test-api-sfox.* TO 'user'@'%';
FLUSH PRIVILEGES;
