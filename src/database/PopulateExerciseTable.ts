import { SQLiteDatabase } from "expo-sqlite";

export async function populateExerciseTable(db: SQLiteDatabase) {
  try {
    const existingColumns = await db.getAllAsync<{ name: string }>(
      `PRAGMA table_info(exercise);`
    );

    db.execAsync(`INSERT OR IGNORE INTO body_part (body_part_id, name) VALUES
                    (1, 'Peitoral'),
                    (2, 'Peitoral Superior'),
                    (3, 'Peitoral Inferior'),
                    (4, 'Pernas/Glúteos'),
                    (5, 'Pernas'),
                    (6, 'Quadríceps'),
                    (7, 'Isquiotibiais'),
                    (8, 'Isquiotibiais/Glúteos'),
                    (9, 'Costas/Posterior'),
                    (10, 'Costas'),
                    (11, 'Costas/Bíceps'),
                    (12, 'Ombros'),
                    (13, 'Trapézio'),
                    (14, 'Bíceps'),
                    (15, 'Bíceps/Antebraços'),
                    (16, 'Tríceps'),
                    (17, 'Abdômen'),
                    (18, 'Abdômen Inferior'),
                    (19, 'Oblíquos'),
                    (20, 'Core'),
                    (21, 'Oblíquos/Core'),
                    (22, 'Corpo Inteiro'),
                    (23, 'Peitoral/Tríceps'),
                    (24, 'Peitoral/Costas'),
                    (25, 'Adutores'),
                    (26, 'Abdutores'),
                    (27, 'Panturrilhas'),
                    (28, 'Glúteos/Posterior'),
                    (29, 'Adutores/Glúteos'),
                    (30, 'Peitoral/Ombros'),
                    (31, 'Costas/Ombros'),
                    (32, 'Tríceps/Peitoral'),
                    (33, 'Lombar/Isquiotibiais'),
                    (34, 'Core/Glúteos'),
                    (35, 'Lombar'),
                    (36, 'Corpo Inteiro/Cardio'),
                    (37, 'Cardio/Pernas'),
                    (38, 'Pernas/Cardio'),
                    (39, 'Cardio'),
                    (40, 'Braços/Core'),
                    (41, 'Corpo Inteiro/Posterior'),
                    (42, 'Corpo Inteiro/Costas'),
                    (43, 'Antebraços'),
                    (44, 'Trapézio/Ombros');
      `);

    const hasBodyPart = existingColumns.some((col) => col.name === "body_part");
    console.log(hasBodyPart);

    if (hasBodyPart) {
      console.log("Migrando tabela exercise...");

      await db.execAsync(`ALTER TABLE exercise RENAME TO exercise_old;`);

      await db.execAsync(`
          CREATE TABLE IF NOT EXISTS exercise (
            exercise_id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            description TEXT NOT NULL,
            body_part_id INTEGER NOT NULL,
            img TEXT,
            active INTEGER DEFAULT 1,
            FOREIGN KEY (body_part_id) REFERENCES body_part(body_part_id) ON DELETE CASCADE,
          );
        `);

      await db.execAsync(`DROP TABLE exercise_old;`);

      console.log("Migração concluída com sucesso.");
    }

    await db.execAsync(`INSERT OR IGNORE INTO exercise (exercise_id, name, description, body_part) VALUES
        (1, 'Supino Reto', 'Deite-se no banco, mantenha os pés firmes e execute', 1),
        (2, 'Supino Inclinado', 'Realize o movimento com foco na parte superior do peitoral', 2),
        (3, 'Supino Declinado', 'Execute o movimento para trabalhar a parte inferior do peitoral', 3),
        (4, 'Crucifixo com Halteres', 'Execute o movimento com controle, mantendo a amplitude máxima', 1),
        (5, 'Agachamento Livre', 'Mantenha a coluna reta e desça até a altura do quadril', 4),
        (6, 'Leg Press', 'Ajuste o equipamento corretamente e empurre com as pernas', 5),
        (7, 'Agachamento Hack', 'Utilize a máquina para apoio, mantendo os pés alinhados', 6),
        (8, 'Cadeira Extensora', 'Isole o quadríceps com movimento controlado', 6),
        (9, 'Mesa Flexora', 'Concentre-se na contração dos isquiotibiais', 7),
        (10, 'Stiff', 'Mantenha uma leve curvatura nos joelhos e foque nos isquiotibiais', 8),
        (11, 'Levantamento Terra', 'Mantenha a coluna neutra e utilize os glúteos para levantar o peso', 9),
        (12, 'Puxada Frontal', 'Sente-se com a postura correta e puxe a barra até o peito', 10),
        (13, 'Puxada Atrás da Cabeça', 'Realize o movimento com cuidado para evitar lesões', 10),
        (14, 'Remada Curvada', 'Mantenha a postura correta, puxando a barra em direção ao abdômen', 10),
        (15, 'Remada Unilateral', 'Execute o movimento com cada braço individualmente', 11),
        (16, 'Remada Baixa', 'Utilize a máquina com controle, puxando a barra em direção ao tronco', 10),
        (17, 'Desenvolvimento de Ombros com Halteres', 'Sente-se e empurre os halteres acima da cabeça', 12),
        (18, 'Desenvolvimento Militar com Barra', 'Mantenha o tronco firme e execute o movimento com controle', 12),
        (19, 'Elevação Lateral', 'Levante os halteres lateralmente até a altura dos ombros', 12),
        (20, 'Elevação Frontal', 'Levante os halteres à frente, mantendo o movimento controlado', 12),
        (21, 'Encolhimento de Ombros', 'Utilize halteres ou barra para encolher os ombros em direção às orelhas', 13),
        (22, 'Rosca Direta com Barra', 'Mantenha os cotovelos fixos e execute a rosca', 14),
        (23, 'Rosca Alternada com Halteres', 'Realize o movimento alternado mantendo a forma correta', 14),
        (24, 'Rosca Scott', 'Utilize a máquina Scott para isolar os bíceps', 14),
        (25, 'Rosca Martelo', 'Mantenha os halteres paralelos e execute o movimento', 15),
        (26, 'Tríceps Testa', 'Deitado em banco, execute a extensão dos braços', 16),
        (27, 'Tríceps Pulley', 'Utilize a máquina com barra ou corda', 16),
        (28, 'Tríceps Francês', 'Com halteres, execute a extensão dos tríceps acima da cabeça', 16),
        (29, 'Extensão de Tríceps com Halteres', 'Mantenha os cotovelos próximos à cabeça e estenda os halteres', 16),
        (30, 'Abdominal Crunch', 'Realize contração abdominal focando no reto abdominal', 17),
        (31, 'Abdominal Inverso', 'Deitado, levante os quadris em direção ao teto', 18),
        (32, 'Abdominal Bicicleta', 'Alterne cotovelos e joelhos para trabalhar os oblíquos', 19),
        (33, 'Elevação de Pernas', 'Levante as pernas sem movimentar a lombar', 18),
        (34, 'Prancha', 'Mantenha o corpo alinhado e contraia o core', 20),
        (35, 'Prancha Lateral', 'Sustente o peso com um antebraço mantendo o corpo reto', 21),
        (36, 'Burpee', 'Combine agachamento, flexão e salto', 22),
        (37, 'Flexão de Braços', 'Realize o movimento com o corpo reto', 23),
        (38, 'Barra Fixa', 'Utilize o peso do corpo para subir', 11),
        (39, 'Pullover com Halteres', 'Deitado no banco, execute o movimento de extensão', 24),
        (40, 'Cross Over', 'Concentre-se na contração do peitoral ao juntar os braços', 1),
        (41, 'Voador (Peck Deck)', 'Ajuste a máquina e execute o movimento concentrado', 1),
        (42, 'Adutor de Quadril', 'Realize o movimento controlado, focando na contração interna das coxas', 25),
        (43, 'Abdutor de Quadril', 'Concentre-se na contração externa das coxas', 26),
        (44, 'Panturrilha Sentado', 'Execute o movimento focando na contração da panturrilha', 27),
        (45, 'Panturrilha em Pé', 'Mantenha o equilíbrio e realize a extensão dos tornozelos', 27),
        ( 46, 'Elevação de Quadril', 'Deitado, eleve os quadris contraindo os glúteos', 28 ),
        ( 47, 'Afundo (Lunge)', 'Realize passos alternados mantendo o joelho alinhado', 5 ),
        ( 48, 'Agachamento Sumô', 'Adote uma postura ampla e desça até sentir a contração', 29 ),
        ( 49, 'Hack Machine', 'Utilize a máquina focando a contração dos quadríceps', 7 ),
        ( 50, 'Extensão de Pernas', 'Mantenha os pés alinhados e isole o quadríceps', 7 ),
        ( 51, 'Flexão de Pernas', 'Foque na contração dos isquiotibiais', 9 ),
        ( 52, 'Abdução de Ombros', 'Levante os braços lateralmente', 12 ),
        ( 53, 'Adução de Ombros', 'Traga os braços em direção ao corpo', 30 ),
        ( 54, 'Rotação Externa de Ombros', 'Utilize uma faixa ou halteres leves', 12 ),
        ( 55, 'Rotação Interna de Ombros', 'Mantenha o movimento controlado', 12 ),
        ( 56, 'Remada Alta', 'Puxe a barra em direção ao queixo mantendo o tronco ereto', 31 ),
        ( 57, 'Puxada com Pegada Neutra', 'Utilize a pegada neutra para equilibrar a carga', 11 ),
        ( 58, 'Flexão Diamante', 'Posicione as mãos em formato de diamante', 32 ),
        ( 59, 'Flexão com Pés Elevados', 'Eleve os pés para intensificar o exercício', 23 ),
        ( 60, 'Mergulho em Paralelas', 'Utilize as paralelas para trabalhar os tríceps', 32 ),
        ( 61, 'Elevação de Calcanhares', 'Foque na contração da panturrilha', 27 ),
        ( 62, 'Agachamento com Salto', 'Realize um salto explosivo após o agachamento', 5 ),
        ( 63, 'Box Jump', 'Salte sobre uma caixa com os dois pés simultaneamente', 5 ),
        ( 64, 'Step-up com Halteres', 'Suba em um banco segurando halteres', 5 ),
        ( 65, 'Agachamento Búlgaro', 'Coloque o pé de trás em um banco e desça', 5 ),
        ( 66, 'Good Morning', 'Com a barra nas costas, incline o tronco mantendo a coluna neutra', 33 ),
        ( 67, 'Levantamento com Barra', 'Realize o movimento completo mantendo a postura correta', 22 ),
        ( 68, 'Puxada Inversa', 'Utilize o peso do corpo para puxar', 11 ),
        ( 69, 'Abdominal na Bola Suíça', 'Utilize a bola suíça para executar abdominais', 17 ),
        ( 70, 'Prancha com Apoio no Cotovelo', 'Mantenha o corpo alinhado apoiado no cotovelo', 20 ),
        ( 71, 'Prancha com Elevação de Pernas', 'Eleve uma perna de cada vez mantendo a estabilidade', 34 ),
        ( 72, 'Russian Twist', 'Sente-se e gire o tronco de um lado para o outro', 19 ),
        ( 73, 'Abdominal Oblíquo no Cabo', 'Utilize o cabo para intensificar o trabalho dos oblíquos', 19 ),
        ( 74, 'Elevação de Tronco', 'Deitado, eleve o tronco contra a gravidade', 35 ),
        ( 75, 'Crunch Invertido', 'Realize o crunch focando na contração abdominal', 17 ),
        ( 76, 'Agachamento Isométrico na Parede', 'Apoie as costas na parede e segure a posição', 5 ),
        ( 77, 'Sprint', 'Corra em alta intensidade por curtos períodos', 36 ),
        ( 78, 'Bicicleta Ergométrica', 'Pedale em ritmo moderado, focando a resistência.', 37 ),
        ( 79, 'Remada Ergométrica', 'Utilize a máquina para simular o remo', 10 ),
        ( 80, 'Escada (Stepper)', 'Suba e desça continuamente', 38 ),
        ( 81, 'Caminhada na Esteira', 'Mantenha um ritmo constante', 39 ),
        ( 82, 'Corrida na Esteira', 'Corra mantendo um ritmo moderado', 39 ),
        ( 83, 'Bicicleta Estacionária', 'Pedale em ritmo constante.', 37 ),
        ( 84, 'Elíptico', 'Utilize a máquina elíptica para um exercício de baixo impacto', 39 ),
        ( 85, 'Circuito de Treino Funcional', 'Combine vários exercícios em circuito', 22 ),
        ( 86, 'Treino HIIT', 'Realize intervalos de alta intensidade seguidos de recuperação', 36 ),
        ( 87, 'Saltos com Corda', 'Pule a corda de forma contínua', 37 ),
        ( 88, 'Battle Ropes', 'Agite as cordas de forma intensa', 40 ),
        ( 89, 'Kettlebell Swing', 'Balance o kettlebell com o movimento do quadril', 28 ),
        ( 90, 'Kettlebell Snatch', 'Realize o movimento explosivo com o kettlebell por braço.', 22 ),
        ( 91, 'Kettlebell Clean and Press', 'Execute o movimento de limpeza e empurrão por braço.', 22 ),
        ( 92, 'Medicine Ball Slam', 'Levante a medicine ball e jogue-a ao chão com força', 41 ),
        ( 93, 'Medicine Ball Wall Throw', 'Arremesse a medicine ball contra a parede', 22 ),
        ( 94, 'Escalada na Parede', 'Utilize o peso do corpo para escalar', 42 ),
        ( 95, 'Pular Corda', 'Pule a corda de forma contínua', 37 ),
        ( 96, 'Agachamento com Barra', 'Execute o agachamento com a barra nas costas', 5 ),
        ( 97, 'Flexão de Punho com Halteres', 'Realize flexões de punho por braço.', 43 ),
        ( 98, 'Extensão de Punho com Halteres', 'Execute o movimento para fortalecer os extensores por braço.', 43 ),
        ( 99, 'Levantamento de Ombros com Barra', 'Utilize a barra para elevar os ombros', 44 ),
        (100, 'Remada com Barra', 'Realize o movimento com a barra, focando a contração das costas', 10 );`);
    console.log("Dados inseridos na tabela exercise com sucesso!");
  } catch (error) {
    console.error("Erro durante a migração da tabela exercise:", error);
  }
}
