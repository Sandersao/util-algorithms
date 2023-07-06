export class FlushedFeedbackHandlerCss {
    public feedbackBox: string
    public percentual: string
    public atual: string
    public total: string
    public mensagemConcluido: string
    public mensagemInicial: string

    constructor(
        cssFeedbackContainer: string,
        cssPercentual: string,
        cssAtual: string,
        cssTotal: string,
        mensagemConcluido: string = 'Concluído!',
        mensagemInicial: string = 'Iniciando...'
    ) {
        this.feedbackBox = cssFeedbackContainer
        this.percentual = cssPercentual
        this.atual = cssAtual
        this.total = cssTotal
        this.mensagemConcluido = mensagemConcluido
        this.mensagemInicial = mensagemInicial
    }
}