class Tabuleiro {
    constructor() {
        this.nome = "Tabuleiro";

        this.tabuleiro = [];
        for (let linha = 0; linha < 8; linha++) {
            this.tabuleiro[linha] = [];
            for (let coluna = 0; coluna < 8; coluna++) {
                this.tabuleiro[linha][coluna] = new Casa(linha, coluna);
            }
        }
        console.log(this.tabuleiro);

        this.selecionada = null;
    }

    colocarPeca(peca, linha, coluna) {
        const casa = this.tabuleiro[linha][coluna];
        casa.setPeca(peca);
    }

    clicarCasa(casa) {
        if (this.selecionada && this.selecionada.peca) {
            const peca = this.selecionada.peca;

            // Verificar se a casa selecionada não tem uma peça da mesma cor
            if (!casa.peca || casa.peca.cor !== peca.cor) {
                casa.setPeca(peca);  // Coloca a peça na nova casa
                this.selecionada.setPeca(null);  // Limpa a casa de origem
                this.selecionada.elementoHtml.classList.remove('selecionada');  // Remove a seleção visual
                this.selecionada = null;  // Reseta a seleção
            }
        } else if (casa.peca) {
            // Se a casa clicada contém uma peça, marque-a como selecionada
            this.selecionada = casa;
            casa.elementoHtml.classList.add('selecionada');  // Destaca a casa selecionada
        }
    }
}

class Casa {
    constructor(linha, coluna) {
        this.linha = linha;
        this.coluna = coluna;
        this.peca = null;

        this.elementoHtml = document.createElement('div');
        this.elementoHtml.classList.add('casa');

        if ((linha + coluna) % 2 == 0) {
            this.elementoHtml.classList.add('clara');
        } else {
            this.elementoHtml.classList.add('escura');
        }
        document.getElementById('tabuleiro').appendChild(this.elementoHtml);

        this.elementoHtml.addEventListener('click', () => {
            tabuleiro.clicarCasa(this);
        });
    }

    setPeca(peca) {
        this.peca = peca;
        this.elementoHtml.innerHTML = peca ? peca.simbolo : '';  // Atualiza o HTML da casa
        if (peca) {
            peca.linha = this.linha;  // Atualiza a linha da peça
            peca.coluna = this.coluna;  // Atualiza a coluna da peça
        }
    }
}

class Peca {
    constructor(cor, linha, coluna) {
        this.cor = cor;
        this.linha = linha;
        this.coluna = coluna;
        this.simbolo = "";
    }

    movimentosPossiveis() {
        return [];
    }

    moverPara(novaLinha, novaColuna) {
        this.linha = novaLinha;
        this.coluna = novaColuna;
    }
}

class Peao extends Peca {
    constructor(cor, linha, coluna) {
        super(cor, linha, coluna);
        this.simbolo = cor === 'branca' ? '&#9817;' : '&#9823;';
    }
}

class Torre extends Peca {
    constructor(cor, linha, coluna) {
        super(cor, linha, coluna);
        this.simbolo = cor === 'branca' ? '&#9814;' : '&#9820;';
    }
}

class Cavalo extends Peca {
    constructor(cor, linha, coluna) {
        super(cor, linha, coluna);
        this.simbolo = cor === 'branca' ? '&#9816;' : '&#9822;';
    }
}

class Bispo extends Peca {
    constructor(cor, linha, coluna) {
        super(cor, linha, coluna);
        this.simbolo = cor === 'branca' ? '&#9815;' : '&#9821;';
    }
}

class Rei extends Peca {
    constructor(cor, linha, coluna) {
        super(cor, linha, coluna);
        this.simbolo = cor === 'branca' ? '&#9812;' : '&#9818;';
    }
}

class Rainha extends Peca {
    constructor(cor, linha, coluna) {
        super(cor, linha, coluna);
        this.simbolo = cor === 'branca' ? '&#9813;' : '&#9819;';
    }
}

const tabuleiro = new Tabuleiro();

// Peças Brancas
const pecasBrancas = [
    new Peao('branca', 1, 0), new Peao('branca', 1, 1), new Peao('branca', 1, 2), new Peao('branca', 1, 3),
    new Peao('branca', 1, 4), new Peao('branca', 1, 5), new Peao('branca', 1, 6), new Peao('branca', 1, 7),
    new Torre('branca', 0, 0), new Torre('branca', 0, 7), new Cavalo('branca', 0, 1), new Cavalo('branca', 0, 6),
    new Bispo('branca', 0, 2), new Bispo('branca', 0, 5), new Rainha('branca', 0, 3), new Rei('branca', 0, 4)
];

// Peças Pretas
const pecasPretas = [
    new Peao('preta', 6, 0), new Peao('preta', 6, 1), new Peao('preta', 6, 2), new Peao('preta', 6, 3),
    new Peao('preta', 6, 4), new Peao('preta', 6, 5), new Peao('preta', 6, 6), new Peao('preta', 6, 7),
    new Torre('preta', 7, 0), new Torre('preta', 7, 7), new Cavalo('preta', 7, 1), new Cavalo('preta', 7, 6),
    new Bispo('preta', 7, 2), new Bispo('preta', 7, 5), new Rainha('preta', 7, 3), new Rei('preta', 7, 4)
];

// Colocar as peças brancas e pretas no tabuleiro
pecasBrancas.forEach(peca => tabuleiro.colocarPeca(peca, peca.linha, peca.coluna));
pecasPretas.forEach(peca => tabuleiro.colocarPeca(peca, peca.linha, peca.coluna));
