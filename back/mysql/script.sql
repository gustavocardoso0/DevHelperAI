-- criar a database
create database if not exists mytasks;
-- ou
-- create database mytasks;

-- informar ao MySQL qual base sobre a qual use schemas usar;
use mytasks;

-- criar tabela para usuario
-- create table if not exists tb_usuario(
	-- id int primary key,
    -- nome varchar(200) not null,
    -- email varchar(50) not null,
    -- senha varchar(50) not null
-- );

-- criar tabela de perguntas
create table if not exists tb_perguntas(
	id_pergunta int primary key auto_increment,
    pergunta varchar(200)
);

-- remover uma coluna de uma tabela:
-- ALTER TABLE tb_perguntas DROP COLUMN nome_pergunta;

-- criar tabela de respostas
create table if not exists tb_respostas(
	id_resposta int primary key auto_increment,
    id_pergunta int,
    resposta varchar(200),
    foreign key (id_pergunta) references tb_perguntas(id_pergunta) 
);

-- altera coluna
ALTER TABLE tb_perguntas
ADD COLUMN data_pergunta TIMESTAMP DEFAULT CURRENT_TIMESTAMP;
-- visualizar tabela:
-- select * from tb_usuario;
-- visualizar tabela tb_perguntas:
select * from tb_perguntas;

-- visualizar tabela tb_respostas:
select * from tb_respostas;

-- visualizar tabela com id_pergunta, pergunta e resposta dada para cada um
SELECT
    p.id_pergunta,
    p.pergunta,
    r.resposta, 
    DATE_FORMAT(p.data_pergunta, '%d/%m/%Y %H:%i:%s') AS data_formatada
FROM
    tb_perguntas p
LEFT JOIN
    tb_respostas r
ON
    p.id_pergunta = r.id_pergunta
    order by r.id_resposta desc;
