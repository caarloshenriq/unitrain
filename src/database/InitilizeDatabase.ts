import { type SQLiteDatabase } from "expo-sqlite";
import { updateDatabase } from "./UpdateDatabase";

export async function InitilizeDatabase(db: SQLiteDatabase) {
  await db.execAsync(
    `PRAGMA foreign_keys = ON;

    CREATE TABLE IF NOT EXISTS workouts (
      workout_id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      weekday TEXT NOT NULL,
      active INTEGER DEFAULT 1
    );

    CREATE TABLE IF NOT EXISTS exercise (
      exercise_id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      description TEXT NOT NULL,
      body_part TEXT NOT NULL,
      img TEXT,
      active INTEGER DEFAULT 1
    );

    CREATE TABLE IF NOT EXISTS workout_exercise (
      workout_id INTEGER NOT NULL,
      exercise_id INTEGER NOT NULL,
      repetition INTEGER NOT NULL,
      series INTEGER NOT NULL,
      PRIMARY KEY (workout_id, exercise_id),
      FOREIGN KEY (workout_id) REFERENCES workouts(workout_id) ON DELETE CASCADE,
      FOREIGN KEY (exercise_id) REFERENCES exercise(exercise_id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS body_info (
      body_info_id INTEGER PRIMARY KEY AUTOINCREMENT,
      measure_type TEXT NOT NULL,
      measurement DECIMAL(5,2) NOT NULL,
      measurement_date DATE NOT NULL DEFAULT (date('now')),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS workouts_info (
      workouts_info_id INTEGER PRIMARY KEY AUTOINCREMENT,
      workout_id INTEGER NOT NULL,
      weight FLOAT NOT NULL,
      date DATE NOT NULL,
      exercise_id INTEGER NOT NULL,
      FOREIGN KEY (workout_id) REFERENCES workouts(workout_id) ON DELETE CASCADE,
      FOREIGN KEY (exercise_id) REFERENCES exercise(exercise_id) ON DELETE CASCADE
    );
    
    INSERT OR IGNORE INTO exercise (exercise_id, name, description, body_part) VALUES
      (1, 'Supino Reto', 'Deite-se no banco, mantenha os pés firmes e execute 3 séries de 10 repetições.', 'Peitoral'),
      (2, 'Supino Inclinado', 'Realize o movimento com foco na parte superior do peitoral, 3 séries de 10 repetições.', 'Peitoral Superior'),
      (3, 'Supino Declinado', 'Execute o movimento para trabalhar a parte inferior do peitoral, 3 séries de 10 repetições.', 'Peitoral Inferior'),
      (4, 'Crucifixo com Halteres', 'Execute o movimento com controle, mantendo a amplitude máxima; 3 séries de 12 repetições.', 'Peitoral'),
      (5, 'Agachamento Livre', 'Mantenha a coluna reta e desça até a altura do quadril; 3 séries de 10 repetições.', 'Pernas/Glúteos'),
      (6, 'Leg Press', 'Ajuste o equipamento corretamente e empurre com as pernas; 3 séries de 12 repetições.', 'Pernas'),
      (7, 'Agachamento Hack', 'Utilize a máquina para apoio, mantendo os pés alinhados; 3 séries de 10 repetições.', 'Quadríceps'),
      (8, 'Cadeira Extensora', 'Isole o quadríceps com movimento controlado; 3 séries de 12 repetições.', 'Quadríceps'),
      (9, 'Mesa Flexora', 'Concentre-se na contração dos isquiotibiais; 3 séries de 12 repetições.', 'Isquiotibiais'),
      (10, 'Stiff', 'Mantenha uma leve curvatura nos joelhos e foque nos isquiotibiais; 3 séries de 10 repetições.', 'Isquiotibiais/Glúteos'),
      (11, 'Levantamento Terra', 'Mantenha a coluna neutra e utilize os glúteos para levantar o peso; 3 séries de 8 repetições.', 'Costas/Posterior'),
      (12, 'Puxada Frontal', 'Sente-se com a postura correta e puxe a barra até o peito; 3 séries de 10 repetições.', 'Costas'),
      (13, 'Puxada Atrás da Cabeça', 'Realize o movimento com cuidado para evitar lesões; 3 séries de 10 repetições.', 'Costas'),
      (14, 'Remada Curvada', 'Mantenha a postura correta, puxando a barra em direção ao abdômen; 3 séries de 10 repetições.', 'Costas'),
      (15, 'Remada Unilateral', 'Execute o movimento com cada braço individualmente; 3 séries de 10 repetições por lado.', 'Costas/Bíceps'),
      (16, 'Remada Baixa', 'Utilize a máquina com controle, puxando a barra em direção ao tronco; 3 séries de 10 repetições.', 'Costas'),
      (17, 'Desenvolvimento de Ombros com Halteres', 'Sente-se e empurre os halteres acima da cabeça; 3 séries de 10 repetições.', 'Ombros'),
      (18, 'Desenvolvimento Militar com Barra', 'Mantenha o tronco firme e execute o movimento com controle; 3 séries de 8 repetições.', 'Ombros'),
      (19, 'Elevação Lateral', 'Levante os halteres lateralmente até a altura dos ombros; 3 séries de 12 repetições.', 'Ombros'),
      (20, 'Elevação Frontal', 'Levante os halteres à frente, mantendo o movimento controlado; 3 séries de 12 repetições.', 'Ombros'),
      (21, 'Encolhimento de Ombros', 'Utilize halteres ou barra para encolher os ombros em direção às orelhas; 3 séries de 15 repetições.', 'Trapézio'),
      (22, 'Rosca Direta com Barra', 'Mantenha os cotovelos fixos e execute a rosca; 3 séries de 10 repetições.', 'Bíceps'),
      (23, 'Rosca Alternada com Halteres', 'Realize o movimento alternado mantendo a forma correta; 3 séries de 10 repetições por braço.', 'Bíceps'),
      (24, 'Rosca Scott', 'Utilize a máquina Scott para isolar os bíceps; 3 séries de 10 repetições.', 'Bíceps'),
      (25, 'Rosca Martelo', 'Mantenha os halteres paralelos e execute o movimento; 3 séries de 12 repetições.', 'Bíceps/Antebraços'),
      (26, 'Tríceps Testa', 'Deitado em banco, execute a extensão dos braços; 3 séries de 10 repetições.', 'Tríceps'),
      (27, 'Tríceps Pulley', 'Utilize a máquina com barra ou corda; 3 séries de 12 repetições.', 'Tríceps'),
      (28, 'Tríceps Francês', 'Com halteres, execute a extensão dos tríceps acima da cabeça; 3 séries de 10 repetições.', 'Tríceps'),
      (29, 'Extensão de Tríceps com Halteres', 'Mantenha os cotovelos próximos à cabeça e estenda os halteres; 3 séries de 10 repetições.', 'Tríceps'),
      (30, 'Abdominal Crunch', 'Realize contração abdominal focando no reto abdominal; 3 séries de 15 repetições.', 'Abdômen'),
      (31, 'Abdominal Inverso', 'Deitado, levante os quadris em direção ao teto; 3 séries de 15 repetições.', 'Abdômen Inferior'),
      (32, 'Abdominal Bicicleta', 'Alterne cotovelos e joelhos para trabalhar os oblíquos; 3 séries de 20 repetições.', 'Oblíquos'),
      (33, 'Elevação de Pernas', 'Levante as pernas sem movimentar a lombar; 3 séries de 15 repetições.', 'Abdômen Inferior'),
      (34, 'Prancha', 'Mantenha o corpo alinhado e contraia o core; segure por 60 segundos.', 'Core'),
      (35, 'Prancha Lateral', 'Sustente o peso com um antebraço mantendo o corpo reto; segure por 45 segundos cada lado.', 'Oblíquos/Core'),
      (36, 'Burpee', 'Combine agachamento, flexão e salto; execute 3 séries de 10 repetições.', 'Corpo Inteiro'),
      (37, 'Flexão de Braços', 'Realize o movimento com o corpo reto; 3 séries de 12 repetições.', 'Peitoral/Tríceps'),
      (38, 'Barra Fixa', 'Utilize o peso do corpo para subir; 3 séries de 8 repetições.', 'Costas/Bíceps'),
      (39, 'Pullover com Halteres', 'Deitado no banco, execute o movimento de extensão; 3 séries de 10 repetições.', 'Peitoral/Costas'),
      (40, 'Cross Over', 'Concentre-se na contração do peitoral ao juntar os braços; 3 séries de 12 repetições.', 'Peitoral'),
      (41, 'Voador (Peck Deck)', 'Ajuste a máquina e execute o movimento concentrado; 3 séries de 12 repetições.', 'Peitoral'),
      (42, 'Adutor de Quadril', 'Realize o movimento controlado, focando na contração interna das coxas; 3 séries de 15 repetições.', 'Adutores'),
      (43, 'Abdutor de Quadril', 'Concentre-se na contração externa das coxas; 3 séries de 15 repetições.', 'Abdutores'),
      (44, 'Panturrilha Sentado', 'Execute o movimento focando na contração da panturrilha; 3 séries de 15 repetições.', 'Panturrilhas'),
      (45, 'Panturrilha em Pé', 'Mantenha o equilíbrio e realize a extensão dos tornozelos; 3 séries de 15 repetições.', 'Panturrilhas'),
      (46, 'Elevação de Quadril', 'Deitado, eleve os quadris contraindo os glúteos; 3 séries de 15 repetições.', 'Glúteos/Posterior'),
      (47, 'Afundo (Lunge)', 'Realize passos alternados mantendo o joelho alinhado; 3 séries de 12 repetições por perna.', 'Pernas/Glúteos'),
      (48, 'Agachamento Sumô', 'Adote uma postura ampla e desça até sentir a contração; 3 séries de 12 repetições.', 'Adutores/Glúteos'),
      (49, 'Hack Machine', 'Utilize a máquina focando a contração dos quadríceps; 3 séries de 10 repetições.', 'Quadríceps'),
      (50, 'Extensão de Pernas', 'Mantenha os pés alinhados e isole o quadríceps; 3 séries de 12 repetições.', 'Quadríceps'),
      (51, 'Flexão de Pernas', 'Foque na contração dos isquiotibiais; 3 séries de 12 repetições.', 'Isquiotibiais'),
      (52, 'Abdução de Ombros', 'Levante os braços lateralmente; 3 séries de 12 repetições.', 'Ombros'),
      (53, 'Adução de Ombros', 'Traga os braços em direção ao corpo; 3 séries de 12 repetições.', 'Peitoral/Ombros'),
      (54, 'Rotação Externa de Ombros', 'Utilize uma faixa ou halteres leves; 3 séries de 15 repetições.', 'Ombros'),
      (55, 'Rotação Interna de Ombros', 'Mantenha o movimento controlado; 3 séries de 15 repetições.', 'Ombros'),
      (56, 'Remada Alta', 'Puxe a barra em direção ao queixo mantendo o tronco ereto; 3 séries de 12 repetições.', 'Costas/Ombros'),
      (57, 'Puxada com Pegada Neutra', 'Utilize a pegada neutra para equilibrar a carga; 3 séries de 10 repetições.', 'Costas/Bíceps'),
      (58, 'Flexão Diamante', 'Posicione as mãos em formato de diamante; execute 3 séries de 10 repetições.', 'Tríceps/Peitoral'),
      (59, 'Flexão com Pés Elevados', 'Eleve os pés para intensificar o exercício; 3 séries de 10 repetições.', 'Peitoral/Tríceps'),
      (60, 'Mergulho em Paralelas', 'Utilize as paralelas para trabalhar os tríceps; 3 séries de 10 repetições.', 'Tríceps/Peitoral'),
      (61, 'Elevação de Calcanhares', 'Foque na contração da panturrilha; 3 séries de 15 repetições.', 'Panturrilhas'),
      (62, 'Agachamento com Salto', 'Realize um salto explosivo após o agachamento; 3 séries de 10 repetições.', 'Pernas/Glúteos'),
      (63, 'Box Jump', 'Salte sobre uma caixa com os dois pés simultaneamente; 3 séries de 10 repetições.', 'Pernas/Glúteos'),
      (64, 'Step-up com Halteres', 'Suba em um banco segurando halteres; 3 séries de 12 repetições por perna.', 'Pernas/Glúteos'),
      (65, 'Agachamento Búlgaro', 'Coloque o pé de trás em um banco e desça; 3 séries de 10 repetições por perna.', 'Pernas/Glúteos'),
      (66, 'Good Morning', 'Com a barra nas costas, incline o tronco mantendo a coluna neutra; 3 séries de 12 repetições.', 'Lombar/Isquiotibiais'),
      (67, 'Levantamento com Barra', 'Realize o movimento completo mantendo a postura correta; 3 séries de 8 repetições.', 'Corpo Inteiro'),
      (68, 'Puxada Inversa', 'Utilize o peso do corpo para puxar; 3 séries de 10 repetições.', 'Costas/Bíceps'),
      (69, 'Abdominal na Bola Suíça', 'Utilize a bola suíça para executar abdominais; 3 séries de 15 repetições.', 'Abdômen'),
      (70, 'Prancha com Apoio no Cotovelo', 'Mantenha o corpo alinhado apoiado no cotovelo; segure por 60 segundos.', 'Core'),
      (71, 'Prancha com Elevação de Pernas', 'Eleve uma perna de cada vez mantendo a estabilidade; 3 séries de 30 segundos por perna.', 'Core/Glúteos'),
      (72, 'Russian Twist', 'Sente-se e gire o tronco de um lado para o outro; 3 séries de 20 repetições.', 'Oblíquos'),
      (73, 'Abdominal Oblíquo no Cabo', 'Utilize o cabo para intensificar o trabalho dos oblíquos; 3 séries de 15 repetições.', 'Oblíquos'),
      (74, 'Elevação de Tronco', 'Deitado, eleve o tronco contra a gravidade; 3 séries de 15 repetições.', 'Lombar'),
      (75, 'Crunch Invertido', 'Realize o crunch focando na contração abdominal; 3 séries de 15 repetições.', 'Abdômen'),
      (76, 'Agachamento Isométrico na Parede', 'Apoie as costas na parede e segure a posição; 3 séries de 60 segundos.', 'Pernas/Glúteos'),
      (77, 'Sprint', 'Corra em alta intensidade por curtos períodos; 5 sprints de 30 segundos.', 'Corpo Inteiro/Cardio'),
      (78, 'Bicicleta Ergométrica', 'Pedale em ritmo moderado por 20 minutos, focando a resistência.', 'Cardio/Pernas'),
      (79, 'Remada Ergométrica', 'Utilize a máquina para simular o remo; 3 séries de 10 repetições.', 'Costas'),
      (80, 'Escada (Stepper)', 'Suba e desça continuamente por 20 minutos.', 'Pernas/Cardio'),
      (81, 'Caminhada na Esteira', 'Mantenha um ritmo constante; 30 minutos de caminhada.', 'Cardio'),
      (82, 'Corrida na Esteira', 'Corra mantendo um ritmo moderado; 20 a 30 minutos.', 'Cardio'),
      (83, 'Bicicleta Estacionária', 'Pedale em ritmo constante por 20 a 30 minutos.', 'Cardio/Pernas'),
      (84, 'Elíptico', 'Utilize a máquina elíptica para um exercício de baixo impacto; 30 minutos.', 'Cardio'),
      (85, 'Circuito de Treino Funcional', 'Combine vários exercícios em circuito; realize 3 rounds de 10 exercícios.', 'Corpo Inteiro'),
      (86, 'Treino HIIT', 'Realize intervalos de alta intensidade seguidos de recuperação; 20 minutos.', 'Corpo Inteiro/Cardio'),
      (87, 'Saltos com Corda', 'Pule a corda de forma contínua; 3 séries de 2 minutos.', 'Cardio/Pernas'),
      (88, 'Battle Ropes', 'Agite as cordas de forma intensa; 3 séries de 30 segundos.', 'Braços/Core'),
      (89, 'Kettlebell Swing', 'Balance o kettlebell com o movimento do quadril; 3 séries de 15 repetições.', 'Glúteos/Posterior'),
      (90, 'Kettlebell Snatch', 'Realize o movimento explosivo com o kettlebell; 3 séries de 10 repetições por braço.', 'Corpo Inteiro'),
      (91, 'Kettlebell Clean and Press', 'Execute o movimento de limpeza e empurrão; 3 séries de 8 repetições por braço.', 'Corpo Inteiro'),
      (92, 'Medicine Ball Slam', 'Levante a medicine ball e jogue-a ao chão com força; 3 séries de 12 repetições.', 'Corpo Inteiro/Posterior'),
      (93, 'Medicine Ball Wall Throw', 'Arremesse a medicine ball contra a parede; 3 séries de 10 repetições.', 'Corpo Inteiro'),
      (94, 'Escalada na Parede', 'Utilize o peso do corpo para escalar; 3 séries de 5 tentativas.', 'Corpo Inteiro/Costas'),
      (95, 'Pular Corda', 'Pule a corda de forma contínua; 3 séries de 2 minutos.', 'Cardio/Pernas'),
      (96, 'Agachamento com Barra', 'Execute o agachamento com a barra nas costas; 3 séries de 10 repetições.', 'Pernas/Glúteos'),
      (97, 'Flexão de Punho com Halteres', 'Realize flexões de punho; 3 séries de 15 repetições por braço.', 'Antebraços'),
      (98, 'Extensão de Punho com Halteres', 'Execute o movimento para fortalecer os extensores; 3 séries de 15 repetições por braço.', 'Antebraços'),
      (99, 'Levantamento de Ombros com Barra', 'Utilize a barra para elevar os ombros; 3 séries de 12 repetições.', 'Trapézio/Ombros'),
      (100, 'Remada com Barra', 'Realize o movimento com a barra, focando a contração das costas; 3 séries de 10 repetições.', 'Costas');
    `
  );
}