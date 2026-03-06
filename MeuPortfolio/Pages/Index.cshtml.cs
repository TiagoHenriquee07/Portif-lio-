using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace MeuPortfolio.Pages
{
    
    public class IndexModel : PageModel
    {
        private readonly ILogger<IndexModel> _logger;

        public IndexModel(ILogger<IndexModel> logger)
        {
            _logger = logger;
        }

    
        public string NomeProfissional { get; set; } = "Tiago Oliveira";
        public string Profissao { get; set; } = "Desenvolvedor Front-end";
        public string Descricao { get; set; } = "Especialista em Segurança Digital e LGPD";
        public string Email { get; set; } = "th05112007@gmail.com";
        public string LinkedIn { get; set; } = "https://www.linkedin.com/in/tiago-oliveira0808/";
        public string GitHub { get; set; } = "https://github.com/TiagoHenriquee07";
        public string Localizacao { get; set; } = "Igaraçu do Tietê, SP - Brasil";

        
        public void OnGet()
        {
            _logger.LogInformation("Página inicial acessada em: {DataHora}", DateTime.Now);
            
            
            LogarAcesso();
        }

        
        private void LogarAcesso()
        {
            _logger.LogInformation(
                "Portfólio acessado - Profissional: {Nome}, Hora: {Hora}",
                NomeProfissional,
                DateTime.Now.ToString("dd/MM/yyyy HH:mm:ss")
            );
        }
    }
}
