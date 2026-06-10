import { useState } from 'react';

export default function TermsOfService({ onAccept }: { onAccept: () => void }) {
  const [accepted, setAccepted] = useState(false);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0A0A0B] overflow-auto">
      <div className="glass-card max-w-2xl w-full mx-4 my-8 p-8" style={{ border: '1px solid rgba(0,209,255,0.2)' }}>
        <h1 className="font-sora text-2xl font-bold text-primary mb-1">Termos de Utilizacao</h1>
        <p className="text-xs text-gray-500 mb-6 mono-label">Ultima atualizacao: 10 de junho de 2026</p>

        <div className="text-sm text-gray-300 space-y-4 mb-6 max-h-[50vh] overflow-y-auto pr-2 leading-relaxed">
          <div>
            <h3 className="text-primary font-bold mb-1">1. Aceitacao dos Termos</h3>
            <p>Ao utilizar esta aplicacao web ("Aplicacao"), o utilizador concorda com os presentes Termos de Utilizacao. Caso nao concorde com qualquer parte destes termos, nao devera utilizar a Aplicacao.</p>
          </div>

          <div>
            <h3 className="text-primary font-bold mb-1">2. Natureza Demonstrativa do Servico</h3>
            <p>Esta Aplicacao e disponibilizada para fins de demonstracao, teste e avaliacao. O servico podera ser alterado, suspenso ou descontinuado a qualquer momento, sem aviso previo.</p>
            <p className="mt-1">Nao e garantida a disponibilidade continua da Aplicacao nem a preservacao de qualquer conteudo inserido pelos utilizadores.</p>
          </div>

          <div>
            <h3 className="text-primary font-bold mb-1">3. Dados do Utilizador</h3>
            <p>A Aplicacao foi concebida para minimizar a recolha e armazenamento de dados pessoais.</p>
            <p className="mt-1">Salvo indicacao expressa em contrario, nao armazenamos permanentemente informacoes fornecidas pelos utilizadores alem do estritamente necessario para o funcionamento do servico.</p>
            <p className="mt-1">Os utilizadores nao devem inserir informacoes confidenciais, sensiveis ou cuja perda possa causar prejuizo.</p>
          </div>

          <div>
            <h3 className="text-primary font-bold mb-1">4. Eliminacao da Conta</h3>
            <p>O utilizador pode solicitar a eliminacao da sua conta a qualquer momento.</p>
            <p className="mt-1">Quando uma conta e eliminada:</p>
            <ul className="list-disc pl-5 mt-1 space-y-0.5">
              <li>O acesso a conta e imediatamente revogado;</li>
              <li>Os dados associados a conta sao removidos ou anonimizados dentro de um prazo razoavel;</li>
              <li>A eliminacao e, em regra, irreversivel.</li>
            </ul>
            <p className="mt-1">Poderao subsistir apenas registos tecnicos minimos necessarios para cumprir obrigacoes legais ou garantir a seguranca do sistema.</p>
          </div>

          <div>
            <h3 className="text-primary font-bold mb-1">5. Protecao da API e Chaves de Acesso</h3>
            <p>A Aplicacao utiliza chaves de API para acesso a servicos de Inteligencia Artificial. Estas chaves sao fornecidas e geridas exclusivamente pelo utilizador na seccao <strong className="text-white">DEFINICOES</strong>.</p>
            <p className="mt-1">O utilizador pode, a qualquer momento, <strong className="text-white">apagar a sua chave de API</strong> atraves do botao "Apagar API" disponivel na pagina de Definicoes, removendo imediatamente o acesso a funcionalidades que dependam dessa chave.</p>
            <p className="mt-1">A Aplicacao nao partilha, armazena em texto claro, nem reutiliza as chaves de API para qualquer outro fim que nao o funcionamento directo do servico solicitado pelo utilizador.</p>
          </div>

          <div>
            <h3 className="text-primary font-bold mb-1">6. Utilizacao Permitida</h3>
            <p>O utilizador compromete-se a nao:</p>
            <ul className="list-disc pl-5 mt-1 space-y-0.5">
              <li>Utilizar a Aplicacao para atividades ilegais;</li>
              <li>Tentar obter acesso nao autorizado a sistemas ou dados;</li>
              <li>Interferir com o funcionamento normal da Aplicacao;</li>
              <li>Introduzir conteudos maliciosos, fraudulentos ou ofensivos.</li>
            </ul>
          </div>

          <div>
            <h3 className="text-primary font-bold mb-1">7. Limitacao de Responsabilidade</h3>
            <p>A Aplicacao e fornecida "tal como esta", sem garantias de qualquer tipo.</p>
            <p className="mt-1">Na maxima medida permitida pela lei, os responsaveis pela Aplicacao nao serao responsaveis por perdas, danos, interrupcoes de servico, perda de dados ou quaisquer prejuizos resultantes da utilizacao ou impossibilidade de utilizacao da Aplicacao.</p>
          </div>

          <div>
            <h3 className="text-primary font-bold mb-1">8. Alteracoes aos Termos</h3>
            <p>Os presentes Termos de Utilizacao podem ser alterados a qualquer momento. As alteracoes entram em vigor apos a sua publicacao nesta pagina.</p>
          </div>

          <div>
            <h3 className="text-primary font-bold mb-1">9. Contacto</h3>
            <p>Para questoes relacionadas com estes Termos de Utilizacao ou para solicitar a eliminacao da conta, o utilizador podera contactar os responsaveis pela Aplicacao atraves dos meios de contacto disponibilizados no proprio servico.</p>
          </div>
        </div>

        <div className="border-t border-[#2a2a2b] pt-4">
          <label className="flex items-center gap-3 cursor-pointer mb-4">
            <input type="checkbox" checked={accepted} onChange={e => setAccepted(e.target.checked)}
              className="w-4 h-4 accent-primary cursor-pointer" />
            <span className="text-sm text-gray-300">Aceito os Termos de Utilizacao</span>
          </label>
          <button onClick={onAccept} disabled={!accepted}
            className={`w-full py-2 rounded text-sm font-bold ${accepted ? 'btn-primary' : 'bg-gray-700 text-gray-500 cursor-not-allowed'}`}>
            Continuar
          </button>
        </div>
      </div>
    </div>
  );
}
