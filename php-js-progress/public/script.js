(()=>{"use strict";!function(){function t(t){this.timeIntervalMs=10,this.iniciado=!1,this.total=0,this.status=0,this.finalizado=!1,this.mensagemConcluido=t.mensagemConcluido,this.mensagemInicial=t.mensagemInicial}t.prototype._fillInfo=function(t,e){t?this.finalizado=t:this.iniciado?this.status=e:(this.total=e,this.status=0),this.iniciado=!0},t.prototype._fillDom=function(t,e,n){t?document.querySelector(this.css.feedbackBox).innerHTML=this.mensagemConcluido:(document.querySelector(this.css.percentual).innerHTML="".concat((e/n*100).toFixed(2),"%"),document.querySelector(this.css.atual).innerHTML=e.toString(),document.querySelector(this.css.total).innerHTML=n.toString())},t.prototype._getFlushedData=function(t){var e=t.done,n=t.value;return{status:parseInt((new TextDecoder).decode(n)),done:e}},t.prototype._useFlusedData=function(t){var e=this._getFlushedData(t),n=e.status,i=e.done;this._fillInfo(i,n),this._fillDom(this.finalizado,this.status,this.total)},t.prototype._validarExistenciaContainersCss=function(){var t=null==document.querySelector(this.css.feedbackBox),e=null==document.querySelector(this.css.percentual),n=null==document.querySelector(this.css.atual),i=null==document.querySelector(this.css.total);if(t||e||n||i)throw new Error("Algum dos containers na dom não foi especificado. Utilize uma instância da classe FlushedFeedbackHandlerCss para iniciar as configurações no construtor")},t.prototype.requestProgressedData=function(t){var e=this;this._validarExistenciaContainersCss(),fetch(t).then((function(t){return t.body.getReader()})).then((function(t){var n=setInterval((function(){t.read().then((function(t){e._useFlusedData(t),t.done&&clearInterval(n)}))}),e.timeIntervalMs)}))}}()})();