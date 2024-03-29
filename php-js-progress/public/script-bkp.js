class FlushedFeedbackHandlerCss {
    constructor(cssFeedbackContainer, cssPercentual, cssAtual, cssTotal, mensagemConcluido = 'Concluído!', mensagemInicial = 'Iniciando...') {
        this.feedbackBox = cssFeedbackContainer
        this.percentual = cssPercentual
        this.atual = cssAtual
        this.total = cssTotal
        this.mensagemConcluido = mensagemConcluido
        this.mensagemInicial = mensagemInicial
    }
}
class FlushedFeedbackHandler {
    constructor(flushedFeedbackHandler) {
        this.css = {
            feedbackBox: flushedFeedbackHandler.feedbackBox,
            percentual: flushedFeedbackHandler.percentual,
            atual: flushedFeedbackHandler.atual,
            total: flushedFeedbackHandler.total
        }
        this.timeIntervalMs = 10
        this.iniciado = false
        this.total = null
        this.status = null
        this.finalizado = null
        this.mensagemConcluido =
            flushedFeedbackHandler.mensagemConcluido
        this.mensagemInicial =
            flushedFeedbackHandler.mensagemInicial
    }
    _fillInfo(finalizado, status) {
        if (finalizado) {
            this.finalizado = finalizado
        } else if (!this.iniciado) {
            this.total = status
            this.status = 0
        } else {
            this.status = status
        }
        this.iniciado = true
    }
    _fillDom(finalizado, status, total) {
        if (finalizado) {
            document
                .querySelector(this.css.feedbackBox)
                .innerHTML =
                this.mensagemConcluido
            return
        }
        document
            .querySelector(this.css.percentual)
            .innerHTML =
            `${(status / total * 100).toFixed(2)}%`
        document
            .querySelector(this.css.atual)
            .innerHTML =
            status
        document
            .querySelector(this.css.total)
            .innerHTML =
            total
    }
    _getFlushedData(flushedData) {
        const { value, done } = flushedData
        const status =
            parseInt(
                new TextDecoder().decode(value)
            )
        return { status, done }
    }
    useFlusedData(flushedData) {
        console.log(flushedData.constructor.name);
        const { status, done } = this
            ._getFlushedData(flushedData)
        this._fillInfo(done, status);
        this._fillDom(
            this.finalizado,
            this.status,
            this.total
        );
    }
    _validarExistenciaContainersCss() {
        const feedbackContainerNaoExiste = document.querySelector(this.css.feedbackBox) == null
        const percentualContainerNaoExiste = document.querySelector(this.css.percentual) == null
        const atualContainerNaoExiste = document.querySelector(this.css.atual) == null
        const totalContainerNaoExiste = document.querySelector(this.css.total) == null
        if (feedbackContainerNaoExiste || percentualContainerNaoExiste || atualContainerNaoExiste || totalContainerNaoExiste) {
            throw new Error(
                'Algum dos containers na dom não foi especificado. ' +
                'Utilize uma instância da classe FlushedFeedbackHandlerCss para iniciar as configurações no construtor'
            )
        }
    }
    requestProgressedData(uri) {
        this._validarExistenciaContainersCss()
        fetch(uri)
            .then(response => {
                return response.body.getReader()
            })
            .then(readerer => {
                const interval = setInterval(() => {
                    readerer.read()
                        .then(flushedData => {
                            this.useFlusedData(flushedData)
                            if (flushedData.done) {
                                clearInterval(interval)
                            }
                        })
                }, this.timeIntervalMs);
            })
    }
}

const testFeedback = new FlushedFeedbackHandler(
    new FlushedFeedbackHandlerCss(
        '.testes',
        '.testes>:nth-child(3)',
        '.testes>:nth-child(1)',
        '.testes>:nth-child(2)'
    )
)

// 'Carga de testes completa'

testFeedback.
    requestProgressedData('/progress.php')