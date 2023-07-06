import { FlushedFeedbackHandler } from "./FlushedFeedbackHandler";

const makeFlushedFeedbackHandlerCss = (
    cssFeedbackContainer: any,
    cssPercentual: any,
    cssAtual: any,
    cssTotal: any,
    mensagemConcluido?: string
) => {
    return new FlushedFeedbackHandlerCss(
        cssFeedbackContainer,
        cssPercentual,
        cssAtual,
        cssTotal,
        mensagemConcluido
    )
}
const makeFlushedFeedbackHandler = (flushedFeedbackHandler: FlushedFeedbackHandlerCss) => {
    return new FlushedFeedbackHandler(flushedFeedbackHandler)
}