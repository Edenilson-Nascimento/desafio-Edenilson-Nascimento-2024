class RecintosZoo {
    analisaRecintos(animal, quantidade) {
        // Dados dos recintos
        const recintos = {
            1: { nomeB: "savana", tamanhoT: 10, animalEx: { MACACO: 3 } },
            2: { nomeB: "floresta", tamanhoT: 5, animalEx: {} },
            3: { nomeB: "savana e rio", tamanhoT: 7, animalEx: { GAZELA: 1 } },
            4: { nomeB: "rio", tamanhoT: 8, animalEx: {} },
            5: { nomeB: "savana", tamanhoT: 9, animalEx: { LEAO: 1 } }
        };

        // Dados dos animais
        const novosAnimais = {
            LEAO: { tamanho: 3, nomeB: ["savana"] },
            LEOPARDO: { tamanho: 2, nomeB: ["savana"] },
            CROCODILO: { tamanho: 3, nomeB: ["rio"] },
            MACACO: { tamanho: 1, nomeB: ["savana", "floresta, savana e rio"] },
            GAZELA: { tamanho: 2, nomeB: ["savana e rio"] },
            HIPOPOTAMO: { tamanho: 4, nomeB: ["savana e rio", "rio"] }
        };

      
        // Verificação de animal válido
        if (!(animal in novosAnimais)) {
            return { erro: "Animal inválido" };
        }
        // Verificação de quantidade válida
        if (quantidade <= 0 || quantidade >recintos.tamanhoT) {
            return { erro: "Quantidade inválida" };
        }

        const animalInfo = novosAnimais[animal];
        const tamanhoAnimal = animalInfo.tamanho;
        const biomasAdequados = animalInfo.nomeB;
        const recintosViaveis = [];

        for (const numero in recintos) {
            const recinto = recintos[numero];
            const biomaRecinto = recinto.nomeB;
            const tamanhoTotal = recinto.tamanhoT;
            const animaisExistentes = recinto.animalEx;

            // Verificação se o bioma do recinto é adequado
            if (!biomasAdequados.includes(biomaRecinto)) {
                continue;
            }

            // Regras especiais para animais carnívoros e Hipopotamos
            const animaisExistentesKeys = Object.keys(animaisExistentes);
            const possuiCarnivoros = animaisExistentesKeys.some(species => ["LEAO", "LEOPARDO", "CROCODILO"].includes(species));
            if (possuiCarnivoros && animaisExistentesKeys.some(species => species !== animal)) {
                continue;
            }

            if (animal === "HIPOPOTAMO" && !biomasAdequados.includes("savana e rio")) {
                continue;0
            }

            if (animal === "MACACO" && animaisExistentesKeys.length === 0) {

                continue;
            }

            // Calcula o espaço ocupado
            let espacoOcupado = Object.entries(animaisExistentes).reduce((total, [animal, qtd]) => {
                return total + (qtd * novosAnimais[animal].tamanho);
            }, 0);

            espacoOcupado += quantidade * tamanhoAnimal;

            // Adiciona espaço extra se há mais de uma espécie
            if (animaisExistentesKeys.length > 0 || quantidade > 1) {
                espacoOcupado += 1;
            }

            // Verifica se há espaço suficiente
            if (espacoOcupado <= tamanhoTotal) {
                const espacoLivre = tamanhoTotal - espacoOcupado;
                recintosViaveis.push(`Recinto ${numero} (espaço livre: ${espacoLivre} total: ${tamanhoTotal})`);
            }
        }

        if (recintosViaveis.length === 0) {
            return { erro: "Não há recinto viável" };
        
        }

        return { recintosViaveis };
    }
}

export { RecintosZoo as RecintosZoo };
