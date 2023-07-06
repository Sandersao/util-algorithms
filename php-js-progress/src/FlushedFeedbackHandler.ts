import { FlushedFeedbackDataHandler } from "./FlushedFeedbackDataHandler"
import { FlushedFeedbackHandlerCss } from "./FlushedFeedbackHandlerCss"

export class FlushedFeedbackHandler {
    private css: FlushedFeedbackHandlerCss
    private timeIntervalMs: number
    private iniciado: boolean
    private total: number
    private status: number
    private finalizado: boolean
    private mensagemConcluido: string
    private mensagemInicial: string
    constructor(flushedFeedbackHandler: FlushedFeedbackHandlerCss) {
        this.timeIntervalMs = 10
        this.iniciado = false
        this.total = 0
        this.status = 0
        this.finalizado = false
        this.mensagemConcluido =
            flushedFeedbackHandler.mensagemConcluido
        this.mensagemInicial =
            flushedFeedbackHandler.mensagemInicial
    }
    _fillInfo(finalizado: boolean, status: number) {
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
    _fillDom(finalizado: boolean, status: number, total: number) {
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
            status.toString()
        document
            .querySelector(this.css.total)
            .innerHTML =
            total.toString()
    }
    _getFlushedData(flushedData: FlushedFeedbackDataHandler) {
        const { done, value } = flushedData
        const status =
            parseInt(
                new TextDecoder().decode(value)
            )
        return { status, done }
    }
    _useFlusedData(flushedData: FlushedFeedbackDataHandler) {
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
    requestProgressedData(uri: string) {
        this._validarExistenciaContainersCss()
        fetch(uri)
            .then(response => {
                return response.body.getReader()
            })
            .then(readerer => {
                const interval = setInterval(() => {
                    readerer.read()
                        .then(flushedData => {
                            this._useFlusedData(flushedData)
                            if (flushedData.done) {
                                clearInterval(interval)
                            }
                        })
                }, this.timeIntervalMs);
            })
    }
}